/*
    sets up the app

    TODO:
    - fix mouse hover for editor and heatmap
    - fix side dialog spacing
*/

var app = angular.module('kla', [
    'ngAnimate',
    'ngRoute',
    'kla.services', 'kla.controllers', 'kla.filters', 'kla.directives']);

var appVer = '34local';//(new Date()).getTime())
app.constant('cacheBustSuffix', '?v='+appVer);

app.config(function ($routeProvider, cacheBustSuffix) {
    $routeProvider
        .when('/', 
            {
                redirectTo: '/config'
            })
        .when('/main', 
            {
                templateUrl: 'partials/main.htm',
                controller: 'MainCtrl'
            })
        .when('/load/:textKey',
            {
                templateUrl: 'partials/load.htm',
                controller: 'LoadCtrl'
            })
        .when('/load',
            {
                templateUrl: 'partials/load.htm',
                controller: 'LoadCtrl'
            })
        .when('/results', 
            {
                templateUrl: 'partials/results.htm',
                controller: 'ResultsCtrl'
            })
        .when('/config', 
            {
                templateUrl: 'partials/config.htm',
                controller: 'ConfigCtrl'
            })
        .when('/about', 
            {
                templateUrl: 'partials/about.htm'
            })
        .otherwise(
            { 
                redirectTo: '/' 
            })
        ;
});

app.run(function() {
    
});

// ok-ing console usage
if (typeof console === 'undefined') {
    var console = {};
    console.log = function(){};
    console.dir = function(){};
}

// email plugin
jQuery.fn.mailto = function() {
    return this.each(function(){
        var email = $(this).attr('href').replace(/\s*\(.+\)\s*/, "@");
        $(this).attr('href', 'mailto:'+email);
    });
};

$('#showNews').click(function() {
    $('#newsModal').modal('show');
});

$('#showAbout').click(function() {
    $('#aboutModal').modal('show');
});

$('.email').mailto(); // setup email link

function letterKeyGroupFirstId(keys, strict=false) {
    var id, minGrLen = 4;
    return keys.find(function(first) {
        id = first.id;
        return (!strict || first.finger === KB.finger.LEFT_PINKY)
                && (
                    keys.filter(function(next) {
                        return next.id >= first.id && next.id < first.id + minGrLen
                                && String.fromCharCode(next.primary).toUpperCase()
                                        !== String.fromCharCode(next.primary);
                    })
                ).length === minGrLen;
    }) && id;
}

function forceLabel(keySet, index="X") {
    var keys = keySet.keys,
        label = keySet.label.trim(),
        id, maxGrLen = 6, ii, char;
    if (label === "") {
        id = letterKeyGroupFirstId(keys, true);
        if (id === undefined)
            id = letterKeyGroupFirstId(keys);
        for (ii = id; ii < id + maxGrLen; ii++) {
            char = String.fromCharCode(keys.find(function(key) { return key.id === ii; }).primary);
            if (char.toUpperCase() === char) break;
            label += char;
        }
        label = (label === "")? "Layout " + index : label.toUpperCase();
    }
    return label;
}

function makeTitle(keySet, index) {
    var label = forceLabel(keySet, index);
    switch (keySet.keyboardType) {
        case "european_ss":
            label += " split-space"; break;
        case "ergodox":
            label = "Ergodox " + label; break;
        case "matrix":
            label += " Matrix"; break;
    }
    return label;
}

$(document).ready(function() {

    document.addEventListener("keydown", function(e) {
    // instead of $(document).on("keydown") because jQuery doesn't get a key code
        var c = e.ctrlKey, a = e.altKey, s = e.shiftKey,
            clear = !c && !a && !s,
            cs = c && !a && !s,
            as = !c && a && !s,
            ss = !c && !a && s,
            k = e.key, cd = e.code,
            inf = !$("input, textarea").is(":focus"),
            pd = function() {e.preventDefault();};
        if (inf && clear && k === "ArrowLeft")
            return $(".switcher[num=prev]").click() && pd();
        if (inf && clear && k === "ArrowRight")
            return $(".switcher[num=next]").click() && pd();
        if (inf && clear && k === " ")
            return $(".switcher[num=last]").click() && pd();
        if (inf && cs && (k === "c" || k === "Insert")
                && window.getSelection().toString() === "")
            return $("#kb-config-copy").click() && pd();
        if (inf && (cs && k === "v" || ss && k === "Insert"))
            return $("#kb-config-import").click() && pd();
        if (cs && k === "Enter")
            return $(".kla-run-button .btn").click() && pd();
        if (as && cd === "Digit1")
            return $(location).attr("href", "#/config") && pd();
        if (as && cd === "Digit2")
            return $(location).attr("href", "#/main") && pd();
        if (as && cd === "Digit3")
            return $(location).attr("href", "#/results") && pd();
        if (clear && k === "Enter"
                && $("#kb-config-select-list").is(":focus")
                && !$(".kb-config-load").attr("disabled"))
            return $(".kb-config-load").click() && pd();
    });

});
