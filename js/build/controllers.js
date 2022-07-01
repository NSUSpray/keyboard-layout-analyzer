/*
	Controller for the main route
*/

var appControllers = appControllers || angular.module('kla.controllers', []);

appControllers.controller('ConfigCtrl', ['$scope', '$http', '$timeout', '$log', 'keyboards', 'library', '$location',
	function($scope, $http, $timeout, $log, keyboards, library, $location) {
	    $scope.submitter = {};
	    $scope.submitter.name = '';
	    $scope.submitter.url = '';
	    $scope.submitter.email = '';
	    $scope.submitter.submitting = false;
	    $scope.current = 0;
	    $scope.keyboards = keyboards;

        /* TODO: Is it really needed in ConfigCtrl? */
        $scope.data = {};
        $scope.data.text = library.get('input-text');
        $scope.settings = library.get('settings');

        if (typeof $scope.data.layoutPreset === 'undefined')
            $scope.data.layoutPreset = 'none';

	    $scope.switchLayout = function(evt, start, idx) {
	        $scope.current = idx;
	    };

        $scope.showImportDialog = function() {
            $('#kb-config-import-dialog .kb-config-dialog-txt').val("");
            $scope.submitter.importFilter = "all";
            var $importBtn = $('#kb-config-import-dialog .btn').first();
            $('#kb-config-import-dialog').modal('show');
            $('#kb-config-import-dialog').on('paste', function(event) {
                if ($importBtn.hasClass('btn-warning')) return;
                setTimeout(function() {
                    $('#kb-config-import-dialog .btn').first().click();
                    $('#kb-config-import').focus();  // WORKAROUND
                }, 0);
            });
            $('#importFilter').removeClass('hide');
            $importBtn.removeClass('btn-warning');
            $importBtn.html('Import');
            setTimeout(function() {$('#kb-config-import-dialog textarea').focus();}, 750);
        };

	    $scope.showExportDialog = function() {
	        $('#kb-config-export-dialog').modal('show');
	        $('#kb-config-export-dialog .kb-config-dialog-txt').val(JSON.stringify( keyboards.getKeySet($scope.current), undefined, 4 ));
	    };

	    $scope.selectAllExportText = function() {
	        $('#kb-config-export-dialog .kb-config-dialog-txt').select();
	    };

        $scope.copyJson = function(fingering=false) {
            $("#kb-config-copy").addClass("btn-info");
            var keySet = $.extend(true, {}, keyboards.getKeySet($scope.current));
            if (fingering) {
                keySet.label = keySet.author = keySet.moreInfoUrl
                        = keySet.moreInfoText = KB.Key.IGNORE;
                keySet.keys = keySet.keys.map(function(key) {
                    key.primary = key.shift = key.altGr = key.shiftAltGr =
                            KB.Key.IGNORE;
                    return key;
                });
            }
            var val = JSON.stringify( keySet, undefined, 4 );
            navigator.clipboard.writeText(val);
            setTimeout(function() {$("#kb-config-copy").removeClass("btn-info");}, 250);
        }

        $scope.copyAllJson = function() {
            $("#kb-config-copy").addClass("btn-info");
            var val = JSON.stringify({
                name: "",  // TODO
                layouts:
                    keyboards.getLayouts().map(function(layout) { return layout.keySet; })
            }, undefined, 4);
            navigator.clipboard.writeText(val);
            setTimeout(function() {$("#kb-config-copy").removeClass("btn-info");}, 250);
        }

        $scope.exportJson = function(fingering=false) {
            var keySet = $.extend(true, {}, keyboards.getKeySet($scope.current));
            var filename = keySet.label + "." + keySet.keyboardType;
            if (fingering) {
                keySet.label = keySet.author = keySet.moreInfoUrl
                        = keySet.moreInfoText = KB.Key.IGNORE;
                keySet.keys = keySet.keys.map(function(key) {
                    key.primary = key.shift = key.altGr = key.shiftAltGr =
                            KB.Key.IGNORE;
                    return key;
                });
                filename += ".fingering";
            }
            filename = filename.trim().toLowerCase().replace(/\s/g, "-");
            var val = JSON.stringify(keySet);
            var $link = $("#kb-config-export" + (fingering? "-fingering" : ""));
            $link.attr("href", "data:text/text;," + val);
            $link.attr("download", filename + ".kla");
        }

        $scope.exportAllJson = function() {
            var val = JSON.stringify({
                name: "",  // TODO
                layouts:
                    keyboards.getLayouts().map(function(layout) { return layout.keySet; })
            });
            var $link = $("#kb-config-export-all");
            $link.attr("href", "data:text/text;," + val);
            $link.attr("download", "layouts.kla-set");
        }

	    $scope.moreInfoLink = function(keySet) {
	    	if (typeof keySet.moreInfoUrl === 'undefined') {
	    		return 'None';
	    	}
	    	if (typeof keySet.moreInfoText === 'undefined') {
	    		return 'None';
	    	}
	    	if (keySet.moreInfoUrl === '' || keySet.moreInfoText === '') {
	    		return 'None';
	    	}
	    	return '<a href="'+keySet.moreInfoUrl+'">'+keySet.moreInfoText + '</a>';
	    }

        $scope.setLayout = function(keySet, filter="all") {
            if ( Array.isArray(keySet) ) {
                var wait = false;
                if (keySet.filter(function(L) { return typeof L === 'string'; }).length > 0) {
                    var val;
                    for (var i = 0; i < keySet.length; i++) {
                        if (typeof keySet[i] !== "string") continue;
                        val = keySet[i].split(".");
                        // TODO: do it normal
                        if (typeof KB.keySet[val[0]] !== 'undefined'
                                && typeof KB.keySet[val[0]][val[1]] !== 'undefined'
                                && val[2] !== 'fingering')
                            keySet[i] = KB.keySet[val[0]][val[1]];
                        else {
                            $http({
                                method: 'GET',
                                url: './layouts/' + keySet[i],
                                data: i
                            })
                            .success(function(data, status, headers, config) {
                                keySet[config.data] = data;
                                if (keySet.filter(function(L) { return typeof L === "string"; }).length === 0)
                                    for (var j = 0; j < keySet.length; j++)
                                        keyboards.setLayoutAutoKeyMap(j, keySet[j]);
                            })
                            .error(function(data, status, headers, config) {
                                alert('Unexpected Error. Layout not loaded.');
                            });
                            wait = true;
                        }
                    }
                }
                if (!wait) for (var j = 0; j < keySet.length; j++)
                    keyboards.setLayoutAutoKeyMap(j, keySet[j]);
                return {valid: true};
            } else
                return keyboards.setLayoutAutoKeyMap($scope.current, keySet, filter);
        };

	    $scope.importLayout = function() {
	        var res = keyboards.parseKeySets($('#kb-config-import-dialog .kb-config-dialog-txt').val());
            var $importBtn = $('#kb-config-import-dialog .btn').first();
	        if ( res.valid ) {
                if ( Array.isArray(res.keySet) && !$importBtn.hasClass('btn-warning') ) {
                    $('#importFilter').addClass('hide');
                    $importBtn.addClass('btn-warning');
                    $importBtn.html('Import in Place of All Current');
                    return;
                }
                res = $scope.setLayout(res.keySet, $scope.submitter.importFilter);
	        }
            if ( res.valid )
                $('#kb-config-import-dialog').modal('hide');
            else {
	            alert(res.reason);
                setTimeout(function() { $('#kb-config-import-dialog textarea').focus(); }, 250);
	        }
            $importBtn.removeClass('btn-warning');
            $importBtn.html('Import');
	    };

	    $scope.loadLayout = function(loadFilter='all') {
            var value = $scope.data.layoutPreset;
	        var val = value.split(".");
            // TODO: do it normal
            if (typeof KB.keySet[val[0]] !== 'undefined'
                    && typeof KB.keySet[val[0]][val[1]] !== 'undefined'
                    && val[2] !== 'fingering') {
            	keyboards.setLayout( $scope.current, {
	            	keySet: $.extend(true, {}, KB.keySet[val[0]][val[1]]),
            		keyMap: $.extend(true, {}, KB.keyMap[val[0]].s683_225)
            	}, loadFilter);
            } else {
		    	$http({
		    		method: 'GET',
		    		url: './layouts/' + value
		    	})
		    	.success(function(data, status, headers, config) {
                    var res;
                    if ( typeof data.layouts !== 'undefined' && Array.isArray(data.layouts) )
                        res = $scope.setLayout(data.layouts);
                    else
                        res = $scope.setLayout(data, loadFilter);
                    if ( !res.valid ) alert(res.reason);
		    	})
		    	.error(function(data, status, headers, config) {
		    		alert('Unexpected Error. Layout not loaded.');
		    	});
            }
	    };

	    $scope.submitDialog = function() {
	    	$('#kb-config-submit-dialog').modal('show');
	    };

	    $scope.submitLayout = function() {
	    	if ( $.trim($scope.submitter.name) === '' ) {
	    		alert('Please enter in a name.');
	    		return;
	    	}
	    	if ( $.trim($scope.submitter.email) === '' || $scope.submitter.email.indexOf('@') === -1) {
	    		alert('Please enter in an email address.');
	    		return;
	    	}

	    	$scope.submitter.submitting = true;

	    	$http({
	    		method: 'POST',
	    		url: './api/submit-layout.php',
	    		data: {
	    			name: $scope.submitter.name,
	    			url: $scope.submitter.url,
	    			email: $scope.submitter.email,
	    			layout: JSON.stringify( keyboards.getKeySet($scope.current), undefined, 4 )
	    		}
	    	})
	    	.success(function(data, status, headers, config) {
	    		$scope.submitter.submitting = false;
	    		$('#kb-config-submit-dialog').modal('hide');
	    	})
	    	.error(function(data, status, headers, config) {
	    		$scope.submitter.submitting = false;
	    		alert('Unexpected Error. Layout not submitted.');
	    		$('#kb-config-submit-dialog').modal('hide');
	    	});
	    }

        $scope.generateOutput = function() {
            if ($scope.data.text === '' || typeof($scope.data.text) === 'undefined') {
                // WORKAROUND
                $location.path('/main');
                setTimeout(function() {$('button').trigger('click');}, 750);
                return;
            }

            library.set('input-text', $scope.data.text);
            library.set('settings', $scope.settings);
            $location.path('/load');
        }
        $scope.$watch('submitter.importFilter', function(newVal, oldVal) {
            $('#kb-config-import-dialog textarea').focus();
        }, true);
	}
]);

/*
	Controller for the main route
*/

'use strict';

var appControllers = appControllers || angular.module('kla.controllers', []);

appControllers.controller('LoadCtrl', ['$scope', '$routeParams', '$location', '$http', '$timeout', '$log', 'keyboards', 'library', 'resultsGenerator',
	function($scope, $routeParams, $location, $http, $timeout, $log, keyboards, library, resultsGenerator) {

        var analyzeData = function(txt, settings) {
            try {
                if (resultsGenerator.go(txt, settings)) {
                    $location.path('/results');
                }
            } catch(err) {
                alert( err.message );
                $location.path('/config');
            }
        };

        $scope.$on('$viewContentLoaded', function() {

            $timeout(function() {
                var textKey = $routeParams.textKey;
                if (typeof textKey === 'undefined') {
                    analyzeData(library.get('input-text'), library.get('settings'));
                } else {
                    $http({
                        method: 'POST',
                        url: './api/load-results.php',
                        data: {
                            textKey: $routeParams.textKey
                        }
                    })
                    .success(function(data, status, headers, config) {
                        $log.debug('success!!!');
                        $log.debug(data);

                        var layouts = JSON.parse(data.layoutText);
                        var ii;
                        for (ii = 0; ii < layouts.length; ii++) {
                            var res = keyboards.parseKeySet( JSON.stringify(layouts[ii].keySet) );
                            if ( res.valid )
                                keyboards.setLayoutAutoKeyMap(ii, res.keySet);
                            else {
                                $log.debug('unable to load layout');
                                $log.debug(res);
                            }
                        }

                        library.set('input-text', data.inputText);
                        library.set('textKey', textKey)
                        analyzeData(library.get('input-text'), library.get('settings'));

                    })
                    .error(function(data, status, headers, config) {
                        $location.path('/main');
                    });
                }
            }, 500);


        });
	}
]);
/*
	Controller for the main route
*/

'use strict';

var appControllers = appControllers || angular.module('kla.controllers', []);

appControllers.controller('MainCtrl', ['$scope', '$location', 'library', 'resultsGenerator', 'textPresets', 'keyboards',
	function($scope, $location, library, resultsGenerator, textPresets, keyboards) {

        $scope.data = {};
        $scope.data.text = library.get('input-text');
        $scope.data.textPreset = library.get('input-text-preset');
        $scope.data.calcPreset = library.get('input-calc-preset');
        $scope.settings = library.get('settings');
        $scope.layoutNames = keyboards.getLayouts().map(function(layout) {
            return layout.keySet.label;
        });

        $scope.applyTextPreset = function() {
            $scope.data.text = "Loading, one moment please…";
            textPresets.load( $scope.data.textPreset ).then(function(res) {
                $scope.data.text = res;
            });
        }

        if (typeof $scope.data.textPreset === 'undefined')
            $scope.data.textPreset = 'alice-ch1';
        if ( typeof $scope.data.text === 'undefined' )
            $scope.applyTextPreset();

        $scope.typographic = function(lang) {
            $("#typographics #" + lang).addClass("btn-info");
            var txt = $scope.data.text;

            /* spaces */
            txt = txt.replaceAll(/(^ *| *$|(?<= ) *)/gm, "");

            /* quotes */
            switch (lang) {
                case "en": txt = txt
                            .replaceAll(/\"(?<=\S)(.*?)(?=\S)\"/g, "“$1”")
                            .replaceAll(/(?<=\W|^)\'(?=\S)(.*?)(?<=\S)\'(?=\W|$)/gm, "‘$1’")
                    ; break;
                case "ru": txt = txt
                .replaceAll(/\B"(?=\S)(([^"]*|\B"(?=\S)[^"]*(?<=\S)"\B)*)(?<=\S)"\B/g, "«$1»")
                            .replaceAll(/\"(.*?)\"/g, "„$1“")
                    ; break;
            }
            txt = txt
                    .replaceAll(/(?<=[\wА-ЯЁа-яё])\'/g, "’")
                    .replaceAll(/\'(?=[\wА-ЯЁа-яё])/g, "’")
            ;

            /* dashes */
            switch (lang) {
                case "en": txt = txt
                            // .replaceAll(/(\S)\s+--?(\s|$)/gm, "$1 –$2")  // n-dash
                            // .replaceAll(/(\S)\s+---(\s|$)/gm, "$1 —$2")  // m-dash
                            .replaceAll(/^--?(\s)/gm, "–$1")  // quote
                    ; break;
                case "ru": txt = txt
                            .replaceAll(/(\S\s)-{1,3}(\s|$)/gm, "$1—$2")  // dash (maybe minus!)
                            .replaceAll(/^--?(\s.+;)$/gm, "–$1")  // marked list
                            .replaceAll(/^-{1,3}(\s)/gm, "—$1")  // direct speach
                    ; break;
            }
            txt = txt
                    .replaceAll(/(?<!-)--(?!-)/g, "–")
                    .replaceAll(/(?<!-)---(?!-)/g, "—")
                    .replaceAll(/ (–|—)/g, " $1")
                    .replaceAll(/\b(\d+)-{1,3}(\d+)\b/g, "$1–$2")
                    .replaceAll(/\b(\d+)-{1,3}([^\wА-ЯЁа-яё])/g, "$1—$2")
            ;

            /* misc */
            txt = txt
                    .replaceAll("...", "…")
                    .replaceAll("(c)", "©").replaceAll("(R)", "®")
                    //.replaceAll(/(?<=[A-Za-zА-ЯЁа-яё])\.(?=[A-Za-zА-ЯЁа-яё])/g, ". ")  // maybe web-adress
            ;
            $scope.data.text = txt;
            setTimeout(function() {$("#typographics #" + lang).removeClass("btn-info");}, 250);
        }

        $scope.applyCalcPreset = function() {
            switch ($scope.data.calcPreset) {
                case "spray":
                    $scope.settings = {
                        simplify: $scope.settings.simplify,
                        ctrlKeys: $scope.settings.ctrlKeys,
                        autoIndent: $scope.settings.autoIndent,
                        fScoringMethod: "stevep",
                        weightDistance: 5,
                        weightKeystroke: 2,
                        weightSameFinger: 3,
                        weightSameHand: 0,
                        weightSimilarity: 0,
                        scoreThumb: 1.0,
                        scoreIndex: 1.0,
                        scoreMiddle: 1.1,
                        scoreRing: 1.3,
                        scorePinky: 1.6,
                        thetas: {left: 15, right: -20},
                        autoThetas: true,
                        depthThumb: 1.25,
                        depthIndex: 1.0,
                        depthMiddle: 1.1,
                        depthRing: 1.3,
                        depthPinky: 1.6,
                        lateralThumb: 1.25,
                        lateralIndex: 2.0,
                        lateralMiddle: 2.0,
                        lateralRing: 2.0,
                        lateralPinky: 2.0,
                        applyFittsLaw: true,
                        refLayoutIndex: $scope.settings.refLayoutIndex,
                        layerChange: 1,
                        rowChange: 1,
                        fingerChange: 2,
                        handChange: 4,
                        charMissing: 8,
                        charFreqAccounting: true
                    }
                    break;
                case "stevep":
                    $scope.settings = {
                        simplify: $scope.settings.simplify,
                        ctrlKeys: $scope.settings.ctrlKeys,
                        autoIndent: $scope.settings.autoIndent,
                    	fScoringMethod: "stevep",
                    	weightDistance: 5,
                    	weightKeystroke: 2,
                    	weightSameFinger: 3,
                    	weightSameHand: 0,
                        weightSimilarity: 0,
                    	scoreThumb: 1.0,
                    	scoreIndex: 1.0,
                    	scoreMiddle: 1.1,
                    	scoreRing: 1.3,
                    	scorePinky: 1.6,
                        thetas: {left: 10, right: -10},
                        autoThetas: false,
                    	depthThumb: 1.25,
                    	depthIndex: 1.0,
                    	depthMiddle: 1.1,
                    	depthRing: 1.3,
                    	depthPinky: 1.6,
                    	lateralThumb: 1.25,
                    	lateralIndex: 2.0,
                    	lateralMiddle: 2.0,
                    	lateralRing: 2.0,
                    	lateralPinky: 2.0,
                    	applyFittsLaw: true,
                        refLayoutIndex: $scope.settings.refLayoutIndex,
                        layerChange: 1,
                        rowChange: 1,
                        fingerChange: 2,
                        handChange: 4,
                        charMissing: 8,
                        charFreqAccounting: true
                    }
                    break;
                case "patorjk":
                    $scope.settings = {
                        simplify: $scope.settings.simplify,
                        ctrlKeys: $scope.settings.ctrlKeys,
                        autoIndent: $scope.settings.autoIndent,
                    	fScoringMethod: "patorjk",
                    	weightDistance: 2,
                    	weightKeystroke: 2,
                    	weightSameFinger: 1,
                    	weightSameHand: 1,
                        weightSimilarity: 0,
                    	scoreThumb: 1.6,
                    	scoreIndex: 1.2,
                    	scoreMiddle: 1,
                    	scoreRing: 1.4,
                    	scorePinky: 1.6,
                        thetas: {left: 0, right: 0},
                        autoThetas: false,
                    	depthThumb: 1.0,
                    	depthIndex: 1.0,
                    	depthMiddle: 1.0,
                    	depthRing: 1.0,
                    	depthPinky: 1.0,
                    	lateralThumb: 1.0,
                    	lateralIndex: 1.0,
                    	lateralMiddle: 1.0,
                    	lateralRing: 1.0,
                    	lateralPinky: 1.0,
                    	applyFittsLaw: false,
                        refLayoutIndex: $scope.settings.refLayoutIndex,
                        layerChange: 1,
                        rowChange: 1,
                        fingerChange: 2,
                        handChange: 4,
                        charMissing: 8,
                        charFreqAccounting: true
                    }
                    break;
                case "compromise":
                    $scope.settings = {
                        simplify: $scope.settings.simplify,
                        ctrlKeys: $scope.settings.ctrlKeys,
                        autoIndent: $scope.settings.autoIndent,
                        fScoringMethod: "stevep",
                        weightDistance: 5,
                        weightKeystroke: 2,
                        weightSameFinger: 3,
                        weightSameHand: 0,
                        weightSimilarity: 7,
                        scoreThumb: 1.0,
                        scoreIndex: 1.0,
                        scoreMiddle: 1.1,
                        scoreRing: 1.3,
                        scorePinky: 1.6,
                        thetas: {left: 0, right: 0},
                        autoThetas: true,
                        depthThumb: 1.25,
                        depthIndex: 1.0,
                        depthMiddle: 1.1,
                        depthRing: 1.3,
                        depthPinky: 1.6,
                        lateralThumb: 1.25,
                        lateralIndex: 2.0,
                        lateralMiddle: 2.0,
                        lateralRing: 2.0,
                        lateralPinky: 2.0,
                        applyFittsLaw: true,
                        refLayoutIndex: $scope.settings.refLayoutIndex,
                        layerChange: 1,
                        rowChange: 1,
                        fingerChange: 2,
                        handChange: 4,
                        charMissing: 8,
                        charFreqAccounting: true
                    }
                    break;
            }
        }

        if (typeof $scope.settings === "undefined")
            $scope.settings = {};
        if (typeof $scope.settings.simplify === "undefined")
                $scope.settings.simplify = true;
        if (typeof $scope.settings.ctrlKeys === "undefined")
                $scope.settings.ctrlKeys = false;
        if (typeof $scope.settings.autoIndent === "undefined")
                $scope.settings.autoIndent = "none";
        if (typeof $scope.data.calcPreset === "undefined") {
            $scope.data.calcPreset = "spray";
            $scope.applyCalcPreset();
        }
        if (typeof $scope.settings.refLayoutIndex === "undefined") {
            $scope.settings.refLayoutIndex = 0;
        }

		$scope.generateOutput = function() {
            if ($scope.data.text === '') {
                alert('Please enter in some text to analyze.');
                return;
            }

            library.set('input-text', $scope.data.text);
            library.set('settings', $scope.settings);
            $location.path('/load');
		}

        $scope.$watch('data.text', function(newVal, oldVal) {
            library.set('input-text', $scope.data.text);
        }, true);
        $scope.$watch('data.textPreset', function(newVal, oldVal) {
            library.set('input-text-preset', $scope.data.textPreset);
        }, true);
        $scope.$watch('data.calcPreset', function(newVal, oldVal) {
            library.set('input-calc-preset', $scope.data.calcPreset);
        }, true);
        $scope.$watch('settings', function(newVal, oldVal) {
            library.set('settings', $scope.settings);
        }, true);
        $scope.$watch('settings.thetas.left', function(newVal, oldVal) {
            $("#left-hand").css('transform', 'rotate(' + newVal + 'deg) scaleX(-1)');
        }, true);
        $scope.$watch('settings.thetas.right', function(newVal, oldVal) {
            $("#right-hand").css('transform', 'rotate(' + newVal + 'deg)');
        }, true);
	}
]);
/*
	Controller for the main route
*/

var appControllers = appControllers || angular.module('kla.controllers', []);

appControllers.controller('ResultsCtrl', ['$scope', '$location', '$http', '$log', 'library',
	function($scope, $location, $http, $log, library ) {

        $scope.results = library.get();
        $scope.settings = {};
        $scope.settings.cfuIgnoreDups = true;
        $scope.settings.chuIgnoreDups = true;
        $scope.currentHeatmap = 0;
        $scope.share = {};
        $scope.share.showSection = true;
        $scope.share.generatingUrl = false;
        $scope.share.url = '';
        $scope.share.returnedUrl = '';
        $scope.forceLabel = forceLabel;

        // If no result data exist, redirect to the main page
        if ( typeof $scope.results['distance'] === 'undefined') {
            $location.path('/config');
            return;
        }

        if ( $scope.results['input-text'].length > 500000 ) {
            $scope.share.showSection = false;
        }

        function getShareUrl(textKey) {
            return window.location.protocol + '//' + window.location.host + window.location.pathname + '#/load/'+textKey;
        }

        function isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        $scope.getUrlToShare = function() {
            if ($scope.share.returnedUrl !== '') {
                $scope.share.url = $scope.share.returnedUrl;
                return;
            };
            if ($scope.share.generatingUrl === true) return;
            $scope.share.generatingUrl = true;
            $scope.share.url = 'One moment please…';

            var layouts = $.extend(true, [], $scope.results.layouts);
            layouts.pop(); // remove personalized layout

            $http({
                method: 'POST',
                url: './api/save-results.php',
                data: {
                    inputText: $scope.results.inputText,
                    layoutText: JSON.stringify(layouts)
                }
            })
            .success(function(data, status, headers, config) {
                $log.debug('success in saving data');
                $log.debug(data);
                $scope.share.url = getShareUrl(data.textKey);
                $scope.share.returnedUrl = $scope.share.url;
                $scope.share.generatingUrl = false;
            })
            .error(function(data, status, headers, config) {
                $log.debug('failed to save data');
                $log.debug(data);
                $scope.share.url = 'Unable to save data, try again in an hour or two.';
                $scope.share.generatingUrl = false;
            });
        };

        $scope.getKeyLabel = function(primary, shift, altGr, shiftAltGr) {
            var ii, ret = '', newVal, keyCode;
            for(ii = 0; ii < 4; ii++) {
                keyCode = arguments[ii];
                if (isNumber(keyCode)) {
                    newVal = (typeof KB.Key.labels[keyCode] !== 'undefined') ? KB.Key.labels[keyCode] : String.fromCharCode(keyCode);
                    ret = (ii === 0) ? newVal : ret + ' ' + newVal;
                }
            }
            return ret;
        }

        $scope.switchHeatmap = function(evt, start, idx) {
            $scope.currentHeatmap = idx;
        };

        var processInputData = function(tab) {
            var lookup = {
                distance: ['distance'],
                fingerUsage: ['fingerUsage'],
                rowUsage: ['rowUsage'],
                miscellaneous: ['consecFingerPress', 'consecHandPress', 'modifierUse'],
                consecFingerPress: ['consecFingerPress'],
                consecHandPress: ['consecHandPress'],
                modifierUse: ['modifierUse']
            };
            var ii;

            if ( !lookup[tab] ) return;

            for (ii = 0; ii < lookup[tab].length; ii++) {
                    var prop = lookup[tab][ii];
                    $scope.results[prop].seriesData = $scope.results[prop]
                            .displayFilter(
                                $scope.results[prop].displayType, 
                                $scope.results[prop].units, 
                                $scope.results[prop].rawSeriesData,
                                $scope.results[prop].displayData
                            );
                    $scope.results[prop].dirty = Date.now();
            }
        };

        $scope.returnToInput = function() {
            $location.path('/main');
        };

        $scope.tabSwitch = function(evt, tab) {
            evt.preventDefault();
            $(evt.currentTarget).tab('show');
            $log.debug('tab switch!' + tab);
            processInputData(tab);
        };


        // --------------------------------------------------------------------
        // Compute best layout

        var settings = $scope.results.summary.settings;

        $scope.wholeWeight = function() {
            return settings.weightSameHand + settings.weightSameFinger
                    + settings.weightKeystroke + settings.weightDistance
                    + settings.weightSimilarity;
        }

        $scope.score = function(e) {
            var score = e.consecHandScore * settings.weightSameHand
                    + e.consecFingerScore * settings.weightSameFinger
                    + e.fingerScore * settings.weightKeystroke
                    + e.distScore * settings.weightDistance
                    + e.similarityScore * settings.weightSimilarity;
            score /= $scope.wholeWeight();
            return (!isFinite(score))? 0 : score;
        }

        $scope.sortRankedLayouts = function() {
            $scope.results.summary.rankedLayouts.sort(function(a, b) {
                return $scope.score(b) - $scope.score(a);
            });
        }


        /*
            Init and watches
        */
    
        // update share url
        if ( $scope.results.textKey ) {
            $scope.share.url = getShareUrl($scope.results.textKey);
            $scope.share.returnedUrl = $scope.share.url;
            library.set('textKey', null); // for future uses
        }

        $('#results-navbar-link').removeClass('invisible');

        if ($scope.results.summary.isNew) {
            $scope.sortRankedLayouts();
            $scope.results.summary.isNew = false;
        }

        $('.kla-table-adjust th, .kla-table-adjust td')
                .on('mouseenter mouseleave', function(evt) {
            var t = parseInt($(this).index()) + 1;
            var id = $(this).parents('table').find('col:nth-child(' + t + ')').attr('id');
            var anotherBars = $('.kla-table-data .chart-bar div:not(.' + id + ')');
            var thisBar = $('.kla-table-data .' + id);
            if (evt.type === 'mouseenter') {
                anotherBars.addClass('background');
                thisBar.addClass('highlighted');
            } else {
                anotherBars.removeClass('background');
                thisBar.removeClass('highlighted');
            }
        });

        $('.kla-table-data').on('mouseenter mouseleave', '.chart-bar div',
                function(evt) {
            var col = $('#' + $(this).attr('class'));
            var t = parseInt(col.index()) + 1;
            var th = $('.kla-table-adjust th:nth-child(' + t + ')');
            if (evt.type === 'mouseenter')
                th.addClass('highlighted');
            else
                th.removeClass('highlighted');
        });

        var seriesTypes = ['distance', 'fingerUsage', 'rowUsage', 'consecFingerPress', 'consecHandPress', 'modifierUse']
        var ii = 0;
        for (ii = 0; ii < seriesTypes.length; ii++) {
            var prop = seriesTypes[ii];
            $scope.$watch('results["'+prop+'"].units + results["'+prop+'"].displayType', (function() {
                var myProp = prop;
                return function(newVal, oldVal) {
                    processInputData(myProp);
                };
            })(), true);

            $scope.$watch('results["'+prop+'"].rawSeriesData', (function() {
                var myProp = prop;
                return function(newVal, oldVal) {
                    processInputData(myProp);
                };
            })(), true);
        }

        $scope.$watch('settings.cfuIgnoreDups', function(newVal, oldVal, scope) {
            scope.results.consecFingerPress.displayType = (newVal === true) ? 'nodups' : 'dups';
        });

        $scope.$watch('settings.chuIgnoreDups', function(newVal, oldVal, scope) {
            scope.results.consecHandPress.displayType = (newVal === true) ? 'nodups' : 'dups';
        });
	}
]);