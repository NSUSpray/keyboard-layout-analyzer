/*
    Filter for capitalizing the first letter of a word
*/

var appFilters = appFilters || angular.module('kla.filters', []);

appFilters.filter('capitalize', function() {
    return function(input, scope) {
        if (input) {
            return input.substring(0,1).toUpperCase() + input.substring(1);
        }
    };
});
/*
    Filter for creating a range array - useful for ng-repeat
    ex: n in [20, 29] | makeRange
*/

var appFilters = appFilters || angular.module('kla.filters', []);

appFilters.filter('makeRange', function() {
    return function(input) {
        var lowBound, highBound;
        switch (input.length) {
        case 1:
            lowBound = 0;
            highBound = parseInt(input[0]) - 1;
            break;
        case 2:
            lowBound = parseInt(input[0]);
            highBound = parseInt(input[1]);
            break;
        default:
            return input;
        }
        var result = [];
        for (var i = lowBound; i <= highBound; i++)
            result.push(i);
        return result;
    };
});