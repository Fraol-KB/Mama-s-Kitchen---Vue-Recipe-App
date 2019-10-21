var HRSTGAME = HRSTGAME || {};
var BASEPARAMETERS = BASEPARAMETERS || {};
var HRSTGAME_ANALYTICS = HRSTGAME_ANALYTICS || {};
// console.log(process.env)
/**
 * Object with data and logic to setup a HRSTGAME_ANALYTICS object.
 */
var AnalyticsHelper = {
	getUrlParams: function(parent) {
		var paramStrings = document.location.search.substring(1).split('&'),
			params = {},
			param;

		if (parent != undefined && parent == true && document.referrer.indexOf('?') > -1) {
			paramStrings = document.referrer.split('?')[1].split('&');
		}

		for (var idx = 0, len = paramStrings.length; idx < len; idx++) {
			param = paramStrings[idx].split('=');
			if (param.length === 2) {
				params[param[0]] = param[1];
			}
		}

		return params;
	},
	getAttributesAndMetrics(gametype, gameid, message, values, client_metrics) {
		var attributes = {
			gametype: (gametype && gametype != "null") ? gametype : "none",
			gameid: (gameid && gameid != "null") ? gameid : "none",
			embedsite: (window !== parent) ? document.referrer : window.location.href,
			recirc_version: HRSTGAME_ANALYTICS.recircVersion,
			bundleid: BASEPARAMETERS.bundleConfig ? BASEPARAMETERS.bundleConfig.id : "none"

		};
		// include category. TODO use this global for the other game attributes, instead of passing them
		if (HRSTGAME.gamedata) {
			attributes.category = HRSTGAME.gamedata.promocategory || "none";
			attributes.brand = HRSTGAME.gamedata.brand || "none";
		}
		var metrics = {
			device_width: window.screen.availWidth,
			device_height: window.screen.availHeight,
			browser_width: window.outerWidth,
			browser_height: window.outerHeight,
		};
		// document metrics - typically scrollable document size or for MSN, iFrame size
		if (document.body) {
			metrics.document_width  = document.body.clientWidth;
			metrics.document_height = document.body.clientHeight;
		}
		starttime = starttime || Date.now();
		metrics.elapsed = Date.now() - starttime;

		if (values) {
			$.extend(attributes, values);
		}

		if (client_metrics) {
			$.extend(metrics, client_metrics);
		}
		return {message, attributes, metrics};
	}
}

HRSTGAME.home_url = HRSTGAME_ANALYTICS.home_url;
var starttime = null;

/**
 * set up an onunload catch event that sends analytics before we unload
 *
 * note the funky attachment method - meant to bypass jQuery and be cross-browser compatible
 * just to potentially increase the # of browsers this works on, since it may not work on all
 */
var myAttachEvent = window.attachEvent || window.addEventListener;
var myEventType = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; // IE

    myAttachEvent(myEventType, function(e) {
	var gametype = HRSTGAME.gamedata ? HRSTGAME.gamedata.gametype : "none";
	var gameid = HRSTGAME.gamedata ? HRSTGAME.gamedata.gameid : "none";
});
