/*
    Defines the <keyboarddisplay> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('keyboarddisplay', [
    '$timeout',
    function($timeout) {
        var instance = 0;
        return {
            restrict: 'E',
            
            scope: {
                layout: '='
            },

            template: '<div id="{{id}}"></div>',

            controller: function($scope) {
                $scope.id = 'kla-kbd-container-'+instance++;
                $scope.keyboard = null;
            },

            link: function(scope, element, attrs, controller) {
                $timeout(function() {
                    if ( $('#'+scope.id).length === 0 ) return;

                    scope.keyboard = new KB.Keyboard({
                        container: scope.id,
                        layout: scope.layout,
                        type: 'display'
                    });
                }, 0);
            }
        };
    }
]);

/*
    Defines the <keyboardeditor> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('keyboardeditor', [
    '$timeout',
    'keyboards',
    function($timeout, keyboards) {
        var instance = 0;
        return {
            restrict: 'E',
            
            scope: {
                'name': '@name',
                'current': '='
            },

            template: '<div id="{{id}}"></div>',

            controller: function($scope) {
                $scope.id = 'kla-kb-container-'+instance++;
            },

            link: function(scope, element, attrs, controller) {
                $timeout(function() {
                    keyboards.registerKeyboard( attrs.name, scope.id );//$(element).attr('id')
                }, 0);

                scope.$watch('current', function(newVal, oldVal) {
                    if (newVal === parseInt(scope.name, 10)) {
                        $('#'+scope.id).removeClass('hide');
                        $('#'+scope.id).addClass('showinline');
                    } else {
                        $('#'+scope.id).removeClass('showinline');
                        $('#'+scope.id).addClass('hide');
                    }
                }, true);
            }
        };
    }
]);

/*
    Defines the <keyboarddisplay> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('keyboardheatmap', [
    '$timeout',
    function($timeout) {
        var instance = 0;

        var getHeatmapData = function(keyData) {
            var ii = 0, 
                len = keyData.length,
                max = 0,
                data = [];
            for (ii = 0; ii < len; ii++) {
                data.push({
                    x: keyData[ii].cx,
                    y: keyData[ii].cy,
                    count: keyData[ii].count || -1
                });
                if ( max < keyData[ii].count ) {
                    max = keyData[ii].count;
                }
            }
            
            return {
                max: max,
                data: data
            };
        };

        var pointerEventsCheck = function() {
            var element = document.createElement('x');
            element.style.cssText = 'pointer-events:auto';
            return element.style.pointerEvents === 'auto';
        }

        return {
            restrict: 'E',
            
            scope: {
                'layout': '=',
                'keydata': '=',
                'current': '=',
                'myindex': '@'
            },

            template: '<div id="{{id}}"><div id="{{hmId}}"></div><div id="{{infoId}}"></div><div style="font-weight:bold;position:relative;z-index:2;">{{forceLabel(layout.keySet)}}</div></div>',

            controller: function($scope) {
                var myInstance = instance++;
                $scope.id = 'kla-kbhm-container-'+myInstance;
                $scope.hmId = 'kla-kbhm-map-'+myInstance;
                $scope.infoId = 'kla-kbhm-info-'+myInstance;
                $scope.keyboard = null;
                $scope.forceLabel = forceLabel;
            },

            link: function(scope, element, attrs, controller) {
                $timeout(function() {
                    if ( $('#'+scope.id).length === 0 ) return;

                    $('#'+scope.infoId).css({
                        margin: '10px',
                        position: 'relative',
                        zIndex: '2'
                    })
                    if (pointerEventsCheck() === true) {
                        $('#'+scope.infoId).html('Hover over a key to get its press count');  
                    } else {
                        $('#'+scope.infoId).html('');
                    }

                    scope.keyboard = new KB.Keyboard({
                        container: scope.hmId,
                        layout: scope.layout,
                        type: 'heatmap',
                        onKeyMouseOver: function(idx) {
                            if (pointerEventsCheck() === true) {
                                $('#'+scope.infoId).html('Pressed ' + scope.keydata[idx].count + ' times');
                                /*
                                $('#'+scope.hmId).css({
                                    'cursor': 'pointer'
                                });
                                */
                            }
                        },
                        onKeyboardMouseOut: function() {
                            $('#'+scope.infoId).html('Hover over a key to get its press count');  
                            $('#'+scope.hmId).css({
                                'cursor': 'default'
                            });
                        }
                    });

                    var config = {
                        element: document.getElementById(scope.hmId),
                        radius: 30,
                        opacity: 50
                    };

                    var heatmap = h337.create(config); 
                    heatmap.store.setDataSet(getHeatmapData(scope.keydata));
                }, 0);

                scope.$watch('current', function(newVal, oldVal) {
                    if (newVal === parseInt(scope.myindex, 10)) {
                        $('#'+scope.id).removeClass('hide');
                        $('#'+scope.id).addClass('showinline');
                    } else {
                        $('#'+scope.id).removeClass('showinline');
                        $('#'+scope.id).addClass('hide');
                    }
                }, true);
            }
        };
    }
]);

/*
    Defines the <keyboard> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('keyboard', [
    'keyboards',
    function(keyboards) {
        return {
            restrict: 'E',
            scope: {
                'name': '@name'
            },
            controller: function($scope) {

            },

            link: function(scope, element, attrs, controller) {
                keyboards.registerKeyboard( attrs.name, $(element).attr('id') );
            }
        };
    }
]);

'use strict';

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('navbarLink', ['$location', 
    function($location) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controller) {
                // Watch for the $location
                scope.$watch(function() {
                    return $location.path();
                }, function(newValue, oldValue) {
                    $('li[navbar-link]').each(function(k, li) {
                        var $li = $(this).find('a'),
                            pattern = $li.attr('href').replace('#','#?'),
                            regexp = new RegExp('^' + pattern + '$', ['i']);

                        if (regexp.test(newValue)) {
                            $(this).addClass('active');
                        } else {
                            $(this).removeClass('active');
                        }
                    });
                });
            }
        };
    }
]);
/*
    Defines the <keyboarddisplay> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('paginate', [
    function() {
        var instance = 0;

        return {
            restrict: 'E',
            
            scope: {
                start: '@',
                stop: '@',
                handler: '='
            },

            templateUrl: 'partials/paginate.htm',

            controller: function($scope, $element, keyboards) {
                $scope.start = parseInt($scope.start, 10);
                $scope.stop = parseInt($scope.stop, 10);
                $scope.maxVal = $scope.stop - $scope.start;
                $scope.keyboards = keyboards;

                $scope.makeTitle = makeTitle;
                $scope.shortTitle = function(keySet, index) {
                    var label = makeTitle(keySet, index),
                        l = label,
                        maxPagLength = 118,
                        numSwitchers = $(".switcher.common").length,
                        maxLabelLength =
                                (maxPagLength - 2*numSwitchers) / ($scope.stop - $scope.start + 1);
                    for (i = 1; l.replaceAll(/[WMЩЮЖМШ]/ug, "...")
                            .replaceAll(/[^ijlI. ᴱˢ]/ug, "..").length > maxLabelLength; ++i) {
                        switch (i) {
                            // trash
                            case 1: l = l.replaceAll(/[^\wа-яё -]/ugi, "").replaceAll(/-/ug, " "); break;
                            // type
                            case 2:
                                l = l.replace(/(.*) split[ -]space$/u, "$1ˢˢ")
                                        .replace(/^Ergodox (.*)/u, "$1ᴱ")
                                        .replace(/(.*) Matrix$/u, "$1ᴹ");
                                break;
                            // vowels
                            case 3: l = l.replaceAll(/(?<=[\wА-ЯЁа-яё])[aeiouyаеёийоуыэюя]/ug, ""); break;
                            // abbreviation
                            case 4: l = l.replaceAll(/([A-Za-zА-ЯЁа-яё][a-zа-яё])[a-zа-яё]+/ug, "$1."); break;
                            // dots
                            case 5: l = l.replaceAll(/\./ug, ""); break;
                            case 6:  // lower
                                l = l.replaceAll(/(?<=[\wА-ЯЁа-яё])[a-zа-яё]/ug, "")
                                .replaceAll(/(?<=[\wА-ЯЁа-яё])[A-ZА-ЯЁ]/ug, function(a) {return a.toLowerCase();})
                                .replaceAll(/ /ug, "");
                                break;
                            // digits
                            case 7: l = l.replaceAll(/(\d)\d+/ug, "$1"); break;
                            default: i = 3; break;
                        }
                        l = l.trim();
                    }
                    return (l == "")? label.slice(0, 6) + "…" : l;
                };

                $scope.current = 0;

                var last = 0 + !$scope.current;
                $scope.handleNav = function(evt, start, idx) {

                    idx = (idx === 'next') ? $scope.current + 1 : idx;
                    idx = (idx === 'prev') ? $scope.current - 1 : idx;
                    idx = (idx === 'last') ? last : idx;

                    if (idx === $scope.current) return;
                    if (idx < 0) idx = $scope.maxVal;
                    if (idx > $scope.maxVal) idx = 0;

                    last = $scope.current;
                    $scope.current = idx;

                    if (typeof $scope.handler !== 'undefined') {
                        $scope.handler(evt, $scope.start, idx); // callback
                    }
                }  
            },

            link: function(scope, element, attrs, controller) {

            }
        };
    }
]);

/*
    Defines the <keyboard> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('piechart', [
    function() {

        var instance = 0;

        return {
            restrict: 'E',

            scope: {
                'width': '@width',
                'height': '@height',
                'source':'=',
                'series':'='
            },

            template: '<div id="piechart-{{id}}" class="jqplot-target"></div>',

            controller: function($scope, $element) {
                var pieData = [];

                $scope.id = instance++;
                $scope.chartId = 'piechart-' + $scope.id;
                $scope.plot = null;

                $scope.getFormattedPieChartData = function() {
                    var ii, elm, pieData = [];
                    for (ii = 0; ii < $scope.source.seriesData[$scope.series].length; ii++) {
                        elm = [];
                        //elm.push( $scope.source.displayLabels[$scope.source.displayType][ii]);
                        elm.push( $scope.source.displayData[$scope.source.displayType][ii].label );
                        elm.push( $scope.source.seriesData[$scope.series][ii]);
                        pieData.push(elm);
                    }
                    return pieData;
                };

                $scope.updateChart = function() {

                    if ( typeof $scope.source === 'undefined') return;
                    if ( typeof $scope.series === 'undefined') return;

                    pieData = $scope.getFormattedPieChartData();;

                    var pieColors = [];
                    var ii = 0;
                    for (ii = 0; ii < $scope.source.displayData[$scope.source.displayType].length; ii++) {
                        pieColors.push( $scope.source.displayData[$scope.source.displayType][ii].color );
                    }

                    var plotOpts = {
                        grid: {
                            background: '#ecf0f1'
                        },
                        seriesDefaults:{
                            renderer:$.jqplot.PieRenderer,
                            rendererOptions: {
                                shadowDepth: 2,
                                showDataLabels: true,
                                startAngle:-90
                            }
                        },
                        legend: {
                            show: true,
                            placement: 'outsideGrid'
                        },
                        seriesColors: pieColors,
                    };

                    $('#'+ $scope.chartId).width($scope.width).height($scope.height);
                    $('#'+ $scope.chartId).css({
                        color:'#2a2a2a',
                        position:'relative'
                    })

                    if ( $scope.plot ) {
                        $scope.plot.destroy();
                    }
                    $scope.plot = $.jqplot($scope.chartId, [pieData], plotOpts);

                    $('#'+ $scope.chartId ).bind('jqplotDataHighlight', 
                        function (ev, seriesIndex, pointIndex, data ) {
                            $('#piechart-'+$scope.id+' .jqplot-table-legend tr').css({
                                'background-color': 'transparent'
                            })
                            var trIndex = pointIndex + 1;
                            $('#piechart-'+$scope.id+' .jqplot-table-legend tr:nth-child('+trIndex+')').css({
                                'background-color': '#ffffff'
                            })
                        }
                    );

                    $('#'+ $scope.chartId).bind('jqplotDataUnhighlight', 
                        function (ev) {
                            $('#piechart-'+$scope.id+' .jqplot-table-legend tr').css({
                                'background-color': 'transparent'
                            })
                        }
                    );
                }; // end updateChart

            },

            link: function(scope, element, attrs, controller) {
                scope.$watch('source.dirty', function(newVal, oldVal) {
                    scope.updateChart();
                }, true);

            }
        };
    }
]);

/*
    Defines the <klaresulttable> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('resultoptions', [
    function() {
        var instance = 0;
        return {
            restrict: 'E',
            scope: {
                'source':'=',
                'displayopts':'@'
            },
            templateUrl: './partials/result-options.htm',
            controller: function($scope) {
                $scope.settings = {};
                $scope.settings.id = instance++;
                $scope.settings.showDisplayType = ($scope.displayopts === 'false' || $scope.displayopts === false) ? 'none' : 'inline-block';

                $scope.$watch('source.units', function(newVal, oldVal, scope) {
                    if (scope.also1) {
                        scope.also1.units = newVal;
                    }
                    if (scope.also2) {
                        scope.also2.units = newVal;
                    }
                }, true);

                if ( !$scope.source ) return;

                var idx = 0;
                for (idx = 0; idx < $scope.source.rawSeriesData.length; idx++) {
                    $scope.$watch('source.rawSeriesData['+idx+'].visible', (function() {
                        var newIdx = idx;
                        return function(newVal, oldVal, scope) {
                            // TODO: crazy bad hack, but it works
                            if (scope.source.rawSeriesData.dups) {
                                scope.source.rawSeriesData.dups[newIdx].visible = newVal;
                            }
                            if (scope.source.rawSeriesData.nodups) {
                                scope.source.rawSeriesData.nodups[newIdx].visible = newVal;
                            }
                        }
                    })(), true);
                }
            } // end controller
        }
    }
]); 
/*
    Defines the <klaresulttable> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('resulttable', [
    function() {
        return {
            restrict: 'E',
            scope: {
                'source':'='
            },
            templateUrl: './partials/result-table.htm',
            controller: function($scope, $element) {
                $scope.format = function(num) {
                    switch ($scope.source.units) {
                        case 'Key Presses':
                            return num.toFixed(0);
                        default: 
                            return num.toFixed(1);
                    }
                };
            }
        }
    }
]); 
/*
    Defines the <keyboard> tag
*/

var appDirectives = appDirectives || angular.module('kla.directives', []);

appDirectives.directive('seriesbarchart', ['$log',
    function($log) {

        var instance = 0;

        return {
            restrict: 'E',

            scope: {
                'width': '@width',
                'height': '@height',
                'source':'='
            },

            template: '<div id="seriesbarchart-{{id}}" class="jqplot-target"></div>',

            controller: function($scope, $element) {
                $scope.id = instance++;
                $scope.chartId = 'seriesbarchart-' + $scope.id;
                $scope.plot = null;

                var unitDisplay = function(unitType) {
                    switch (unitType) {
                        case 'Centimeters': return 'cm';
                        case 'Meters': return 'm';
                        case 'Miles': return 'mi';
                        case 'Feet': return 'ft';
                        case 'Percent': return '%';
                        default: return '';
                    }
                };
                var unitsFixedTo = function(unitType) {
                    switch (unitType) {
                        case 'keypresses': return 0;
                        default: return 1;
                    }
                };

                $scope.updateChart = function() {
                    if ( typeof $scope.source === 'undefined') return;
                    var seriesData = $scope.source.seriesData;

                    // create tool tip if needed
                    if ( $('#chartpseudotooltip').length === 0) {
                        $(document.body).append('<div id="chartpseudotooltip" class="kla-chart-tooltip"></div>');
                    }

                    //$log.debug('update chart');
                    //$log.debug($scope.source.seriesData);
                    if (seriesData.length === 0) {
                        //$log.debug('no data to draw');
                        if ( $scope.plot ) {
                            $scope.plot.destroy();
                        }
                        return;
                    }

                    var ticks = $scope.source.seriesData.labels;
                    var series = [];
                    var idx = 0;
                    while ( $scope.source.seriesData[idx] ) {
                        series.push({label:$scope.source.seriesData.seriesLabels[idx], color: $scope.source.seriesData.seriesColors[idx]});
                        idx++;
                    }

                    var plotOpts = {

                        grid: {
                            background: '#ecf0f1'
                        },

                        seriesDefaults:{
                            renderer:$.jqplot.BarRenderer,
                            rendererOptions: {
                                fillToZero: true,
                                barWidth: null,
                                barPadding:3,
                                shadowDepth: 2
                            }
                        },

                        series: series,

                        legend: {
                            show: true,
                            placement: 'outsideGrid'
                        },

                        axes: {
                            xaxis: {
                                renderer: $.jqplot.CategoryAxisRenderer,
                                ticks: ticks
                            },
                            yaxis: {
                                pad: 1.05,
                                tickOptions: {formatString: '%d'+unitDisplay($scope.source.units)},
                                min: 0
                            }
                        }
                    };

                    $('#'+ $scope.chartId).width($scope.width).height($scope.height);

                    if ( $scope.plot ) {
                        $scope.plot.destroy();
                    }
                    $scope.plot = $.jqplot($scope.chartId, seriesData, plotOpts);

                    $('#'+ $scope.chartId).bind('jqplotDataHighlight', 
                        function (ev, seriesIndex, pointIndex, data ) {
                            var mouseX = ev.pageX ;
                            var mouseY = ev.pageY - 38;
                            var items = $scope.source.seriesData.seriesLabels;

                            $('#chartpseudotooltip').html( //items[seriesIndex] + ', ' + 
                                data[1].toFixed( unitsFixedTo($scope.source.units) ) + 
                                unitDisplay($scope.source.units) );

                            var cssObj = {
                                'position' : 'absolute',
                                'left' : mouseX + 'px',
                                'top' : mouseY + 'px',
                                'display':'block'
                            };
                            $('#chartpseudotooltip').css(cssObj);

                            $('#seriesbarchart-'+$scope.id+' .jqplot-table-legend tr').css({
                                'background-color': 'transparent'
                            })
                            var trIndex = seriesIndex + 1;
                            $('#seriesbarchart-'+$scope.id+' .jqplot-table-legend tr:nth-child('+trIndex+')').css({
                                'background-color': '#ffffff'
                            })
                        }
                    );

                    $('#'+ $scope.chartId).bind('jqplotDataUnhighlight', 
                        function (ev) {
                            $('#chartpseudotooltip').html('');
                            $('#chartpseudotooltip').css({
                                'display':'none'
                            });
                            $('#seriesbarchart-'+$scope.id+' .jqplot-table-legend tr').css({
                                'background-color': 'transparent'
                            })
                        }
                    );

                    $('#seriesbarchart-'+$scope.id+' .jqplot-table-legend tr').bind('mouseover',
                        function(ev) {
                            $(this).css({'background-color': '#ffffff'});
                            $('#'+$scope.chartId+' .jqplot-series-canvas').css({'opacity': '0.4'});
                            $('#'+$scope.chartId+' .jqplot-series-canvas').eq($(this).index())
                                    .css({'opacity': '1.0'});
                        }
                    );

                    $('#seriesbarchart-'+$scope.id+' .jqplot-table-legend tr').bind('mouseout',
                        function(ev) {
                            $(this).css({'background-color': 'transparent'});
                            $('#'+$scope.chartId+' .jqplot-series-canvas').css({'opacity': '1.0'});
                        }
                    );
                }; // end updateChart

            },

            link: function(scope, element, attrs, controller) {
                scope.$watch('source.seriesData + source.dirty', function(newVal, oldVal) {
                    scope.updateChart();
                }, true);

            }
        };
    }
]);
