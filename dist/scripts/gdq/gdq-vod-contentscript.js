!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=3)}({3:function(t,n){var e=[],o=[];function r(t,n,e){return"table"==e?(t[n].logo,'<a href="'+t[n].link+'" onclick="window.open(this.href); return false;">'+n+"</a>"):null==t[n].logo?'<a href="'.concat(t[n].link,'" onclick="window.open(this.href); return false;">').concat(n,"</a>"):'<a href="'.concat(t[n].link,'" onclick="window.open(this.href); return false;"><img class="runner-logo" src="').concat(t[n].logo,'" />').concat(n,"</a>")}$(document).ready(function(){$("tr:not(.day-split):not(.second-row) td:nth-child(2)").each(function(){e.push($(this).text())}),$("tr:not(.day-split):not(.second-row) td:nth-child(3)").each(function(){o.push($(this).text())}),console.log("Adding Runners"),$.getJSON("https://gist.githubusercontent.com/theoriginalcamper/a65ff06bd3fd30b49db7ff67e5881476/raw/agdq2020_runners.json").done(function(t){console.log(t);var n=t;$.each(o,function(t,e){$("tr:not(.day-split):not(.second-row) td:nth-child(3)").filter(function(){return $(this).text()===e}).each(function(t,o){var a=e.split(", "),i={};console.log(e),0!=e.length&&($.each(a,function(t,e){i[e]=n[e]}),$(this).html(function(t,n){var e=_.keys(t),o="by ";if("table"==n&&(o=""),e.length>2){var a=e.pop(),i=e.pop();$.each(e,function(e,a){o+=r(t,a,n)+", "}),o+=r(t,i,n)+" ",o+="and ",o+=r(t,a,n)}else if(2==e.length){var a=e.pop(),i=e.pop();o+=r(t,i,n),o+=" and ",o+=r(t,a,n)}else 1==e.length?(e[0],o+=r(t,e[0],n)):(console.log("Error no runners."),o="");return o}(i,"table")))})})}),console.log("Starting to add links"),$.getJSON("https://gist.githubusercontent.com/theoriginalcamper/a2565da1234a6142afe5763e2193444b/raw/agdq2020-vod.json").done(function(t){console.log(t);var n=_.keys(t);console.log(n),$.each(n,function(n,e){var o=function(t,n){var e="https://www.twitch.tv/gamesdonequick/v/"+n[t]["video-link"]+"?t="+n[t].time;if(void 0!==n[t].youtube){var o=n[t].youtube;return t+' - <i class="fa fa-check"></i> COMPLETED <a href="'+e+'" class="vod-link"><i class="fa fa-twitch"></i></a> <a href="'+o+'" class="vod-link"><i class="fa fa-youtube"></i></a>'}return'<a href="'+e+'" class="vod-link">'+t+' - <i class="fa fa-check"></i> COMPLETED <i class="fa fa-twitch"></i> Twitch Only</a>'}(e,t);$("tr:not(.day-split):not(.second-row) td:nth-child(2)").filter(function(t){return $(this).text()==e}).html(o)}),console.log("Done")}),console.log("Starting to add bid war indications"),$(".text-gdq-black.well").after('<h4 class="text-gdq-black well"><a href="https://gamesdonequick.com/tracker/bids/agdq2020">Donation Incentives Bid War Tracker</a></h4>')})}});
//# sourceMappingURL=gdqVodContentscript.js.map