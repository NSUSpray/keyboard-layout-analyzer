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

	    $scope.switchLayout = function(evt, start, idx) {
	        $scope.current = idx;
	    };

        $scope.showImportDialog = function() {
            $('#kb-config-import-dialog .kb-config-dialog-txt').val("");
            $scope.submitter.importFilter = "all";
            var $importBtn = $('#kb-config-import-dialog .btn').first();
            $('#kb-config-import-dialog').modal('show');
            $('#kb-config-import-dialog').keyup(function(event) {
                if (event.key === "v" || event.key === "Insert") {
                    if ($importBtn.hasClass('btn-warning')) return;
                    $('#kb-config-import-dialog .btn').first().click();
                    $('#kb-config-import').focus();  // WORKAROUND
                }
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
                var ignore = 0;
                keySet.label = keySet.author = keySet.moreInfoUrl
                        = keySet.moreInfoText = ignore;
                keySet.keys = keySet.keys.map(function(key) {
                    key.primary = key.shift = key.altGr = key.shiftAltGr =
                            ignore;
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
                var ignore = 0;
                keySet.label = keySet.author = keySet.moreInfoUrl
                        = keySet.moreInfoText = ignore;
                keySet.keys = keySet.keys.map(function(key) {
                    key.primary = key.shift = key.altGr = key.shiftAltGr =
                            ignore;
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
                for (var i = 0; i < keySet.length; i++)
                    keyboards.setLayout( i, {
                        keySet: $.extend(true, {}, keySet[i]),
                        keyMap: $.extend(true, {}, keyboards.getKeyMapFromKeyboardType(keySet[i].keyboardType))
                    });
                return {valid: true};
            } else {
                return keyboards.setLayout( $scope.current, {
                    keySet: $.extend(true, {}, keySet),
                    keyMap: $.extend(true, {}, keyboards.getKeyMapFromKeyboardType(keySet.keyboardType))
                }, filter);
            }
        }

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
            var value = $('#kb-config-select-list').find('option:selected').attr('value');
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
                $location.path('/main');
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
                            if ( res.valid ) {              
                                keyboards.setLayout( ii, {
                                    keySet: $.extend(true, {}, res.keySet),
                                    keyMap: $.extend(true, {}, keyboards.getKeyMapFromKeyboardType(res.keySet.keyboardType))
                                });
                            } else {
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
                        thetaL: 25,
                        thetaR: -15,
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
                    	thetaL: 10,
                    	thetaR: -10,
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
                        fingerChange: 1,
                        handChange: 1,
                        charMissing: 1,
                        charFreqAccounting: false
                    }
                    break;
                case "patorjk":
                    $scope.settings = {
                        simplify: $scope.settings.simplify,
                        ctrlKeys: $scope.settings.ctrlKeys,
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
                    	thetaL: 0,
                    	thetaR: 0,
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
                        fingerChange: 1,
                        handChange: 1,
                        charMissing: 1,
                        charFreqAccounting: false
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
        if (typeof $scope.data.calcPreset === "undefined") {
            $scope.data.calcPreset = "stevep";
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
        $scope.$watch('settings.thetaL', function(newVal, oldVal) {
            $("#left-hand").css('transform', 'rotate(' + newVal + 'deg) scaleX(-1)');
        }, true);
        $scope.$watch('settings.thetaR', function(newVal, oldVal) {
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
            var lookup = {}, ii;
            lookup['distance'] = ['distance'];
            lookup['fingerUsage'] = ['fingerUsage'];
            lookup['rowUsage'] = ['rowUsage'];
            lookup['miscellaneous'] = ['consecFingerPress', 'consecHandPress', 'modifierUse']
            lookup['consecFingerPress'] = ['consecFingerPress']
            lookup['consecHandPress'] = ['consecHandPress']
            lookup['modifierUse'] = ['modifierUse']

            if ( !lookup[tab] ) return;

            for (ii = 0; ii < lookup[tab].length; ii++) {
                    var prop = lookup[tab][ii];
                    $scope.results[prop].seriesData = $scope.results[prop].displayFilter(   $scope.results[prop].displayType, 
                                                                                            $scope.results[prop].units, 
                                                                                            $scope.results[prop].rawSeriesData,
                                                                                            $scope.results[prop].displayData );
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

        /*
            Init and watches
        */
    
        // update share url
        if ( $scope.results.textKey ) {
            $scope.share.url = getShareUrl($scope.results.textKey);
            $scope.share.returnedUrl = $scope.share.url;
            library.set('textKey', null); // for future uses
        }

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

        $('#results-navbar-link').removeClass('invisible');
	}
]);