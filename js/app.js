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

document.addEventListener("keydown", function(e) {
// instead of $(document).on("keydown") because jQuery doesn't get a key code
    var c = e.ctrlKey, a = e.altKey, s = e.shiftKey,
        cs = c && !a && !s,
        as = !c && a && !s,
        ss = !c && !a && s,
        k = e.key, cd = e.code,
        inf = !$("input, textarea").is(":focus"),
        pd = function() {e.preventDefault();};
    if (inf && cs && k === "ArrowLeft")
        return $(".switcher[num=prev]").click() && pd();
    if (inf && cs && k === "ArrowRight")
        return $(".switcher[num=next]").click() && pd();
    if (inf && cs && k === " ")
        return $(".switcher[num=last]").click() && pd();
    if (inf && cs && (k === "c" || k === "Insert"))
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
    if ($("#kb-config-select-list").is(":focus") && !(c||a||s) && k === "Enter")
        return $(".kb-config-load").click() && pd();
});
