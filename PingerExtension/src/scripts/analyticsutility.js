"use strict";

// This variable should be present in root scope of the document
var _gaq = _gaq || [];
_gaq.push(['_setAccount', config.defaultSettings.analyticCode]);

var analyticsUtility = function () {

    function trackPage(value) {
        _gaq.push(['_trackPageview', value]);
    }

    function trackEvents(value) {
        _gaq.push(['_trackEvent', value, 'clicked']);
    }

    return {
        trackPage: trackPage,
        trackEvents: trackEvents
    }

}();