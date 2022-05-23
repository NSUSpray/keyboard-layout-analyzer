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
        $scope.data = {};
        $scope.data.text = library.get('input-text');
        $scope.settings = {};
        $scope.settings.simplify = library.get('settings-simplify');
        $scope.settings.ctrlKeys = library.get('settings-ctrl-keys');

	    $scope.switchLayout = function(evt, start, idx) {
	        $scope.current = idx;
	    };

	    $scope.showImportDialog = function() {
	        $('#kb-config-import-dialog .kb-config-dialog-txt').val("");
	        $('#kb-config-import-dialog').modal('show');
            $('#kb-config-import-dialog').keyup(function(event) {
                if (event.key === "v" || event.key === "Insert") {
                    $('#kb-config-import-dialog .btn').first().click();
                    $('.kb-config-import').focus();  // WORKAROUND
                }
            });
            setTimeout(function() {$('#kb-config-import-dialog textarea').focus();}, 750);
	    };

	    $scope.showExportDialog = function() {
	        $('#kb-config-export-dialog').modal('show');
	        $('#kb-config-export-dialog .kb-config-dialog-txt').val(JSON.stringify( keyboards.getKeySet($scope.current), undefined, 4 ));
	    };

	    $scope.selectAllExportText = function() {
	        $('#kb-config-export-dialog .kb-config-dialog-txt').select();
	    };

        $scope.copyJson = function() {
            $(".kb-config-copy").addClass("active");
            navigator.clipboard.writeText(JSON.stringify( keyboards.getKeySet($scope.current), undefined, 4 ));
            setTimeout(function() {$(".kb-config-copy").removeClass("active");}, 250);
        }

        $scope.exportJson = function(e) {
            var val = JSON.stringify(keyboards.getKeySet($scope.current),  undefined, 4);
            var $link = $(".kb-config-export");
            $link.attr("href", "data:text/text;," + val);
            var filename = keyboards.getKeySet($scope.current).label + "." + keyboards.getKeySet($scope.current).keyboardType;
            filename = filename.trim().toLowerCase().replace(/ /g, "-");
            $link.attr("download", filename + ".json");

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

	    $scope.importLayout = function() {
	        var res = keyboards.parseKeySet($('#kb-config-import-dialog .kb-config-dialog-txt').val());
	        if ( res.valid ) {	            
	            keyboards.setLayout( $scope.current, {
	            	keySet: $.extend(true, {}, res.keySet),
	            	keyMap: $.extend(true, {}, keyboards.getKeyMapFromKeyboardType(res.keySet.keyboardType))
	            });
	            $('#kb-config-import-dialog').modal('hide');
	        } else {
	            alert(res.reason);
                setTimeout(function() {$('#kb-config-import-dialog textarea').focus();}, 250);
	        }
	    };

	    $scope.loadLayout = function() {
	        var val = $('#kb-config-select-list').find('option:selected').attr('value').split(".");	        
            if (typeof KB.keySet[val[0]] !== 'undefined' && typeof KB.keySet[val[0]][val[1]] !== 'undefined') {
            	keyboards.setLayout( $scope.current, {
	            	keySet: $.extend(true, {}, KB.keySet[val[0]][val[1]]),
            		keyMap: $.extend(true, {}, KB.keyMap[val[0]].s683_225)
            	});
            } else {
		    	$http({
		    		method: 'GET',
		    		url: './layouts/' + val[0] + "." + val[1]
		    	})
		    	.success(function(data, status, headers, config) {
	            	keyboards.setLayout( $scope.current, {
		            	keySet: data,
	            		keyMap: KB.keyMap[val[0]].s683_225
	            	});
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

        $scope.generateOutput = function(txt, simplify, ctrlKeys) {
            if (txt === '' || typeof(txt) === 'undefined') {
                // WORKAROUND
                $location.path('/main');
                setTimeout(function() {$('button').trigger('click');}, 750);
                return;
            }

            library.set('input-text', txt);
            library.set('settings-simplify', simplify);
            library.set('settings-ctrl-keys', ctrlKeys);
            $location.path('/load');
        }
	}
]);

/*
	Controller for the main route
*/

'use strict';

var appControllers = appControllers || angular.module('kla.controllers', []);

appControllers.controller('LoadCtrl', ['$scope', '$routeParams', '$location', '$http', '$timeout', '$log', 'keyboards', 'library', 'resultsGenerator',
	function($scope, $routeParams, $location, $http, $timeout, $log, keyboards, library, resultsGenerator) {

        var analyzeData = function(txt, simplify, ctrlKeys) {
            var settings = {simplify: simplify, ctrlKeys: ctrlKeys};
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
                    analyzeData(
                            library.get('input-text'),
                            library.get('settings-simplify'),
                            library.get('settings-ctrl-keys')
                    );
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
                        analyzeData(
                                library.get('input-text'),
                                library.get('settings-simplify'),
                                library.get('settings-ctrl-keys')
                        );

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

appControllers.controller('MainCtrl', ['$scope', '$location', 'library', 'resultsGenerator', 'textPresets',
	function($scope, $location, library, resultsGenerator, textPresets) {

        $scope.data = {};
        $scope.data.text = library.get('input-text');
        $scope.data.textPreset = library.get('input-text-preset');
        $scope.settings = {};
        $scope.settings.simplify= library.get('settings-simplify');
        $scope.settings.ctrlKeys= library.get('settings-ctrl-keys');

        $scope.applyPreset = function() {
            $scope.data.text = "Loading, one moment please...";
            textPresets.load( $scope.data.textPreset ).then(function(res) {
                $scope.data.text = res;
            });
        }

        if (typeof $scope.data.textPreset === 'undefined')
            $scope.data.textPreset = 'alice-ch1';
        if ( typeof $scope.data.text === 'undefined' )
            $scope.applyPreset();

        $scope.typographic = function(lang) {
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
                    .replaceAll(/(?<=[A-Za-zА-ЯЁа-яё])\.(?=[A-Za-zА-ЯЁа-яё])/g, ". ")
            ;
            $scope.data.text = txt;
        }

        if (typeof $scope.settings.simplify === "undefined")
            $scope.settings.simplify = true;

        if (typeof $scope.settings.ctrlKeys === "undefined")
            $scope.settings.ctrlKeys = false;

		$scope.generateOutput = function(txt, simplify, ctrlKeys) {
            if (txt === '') {
                alert('Please enter in some text to analyze.');
                return;
            }

            library.set('input-text', txt);
            library.set('settings-simplify', simplify);
            library.set('settings-ctrl-keys', ctrlKeys);
            $location.path('/load');
		}

        $scope.$watch('data.text', function(newVal, oldVal) {
            library.set('input-text', $scope.data.text);
        }, true);
        $scope.$watch('data.textPreset', function(newVal, oldVal) {
            library.set('input-text-preset', $scope.data.textPreset);
        }, true);
        $scope.$watch('settings.simplify', function(newVal, oldVal) {
            library.set('settings-simplify', $scope.settings.simplify);
        }, true);
        $scope.$watch('settings.ctrlKeys', function(newVal, oldVal) {
            library.set('settings-ctrl-keys', $scope.settings.ctrlKeys);
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
            $scope.share.url = 'One moment please...';

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