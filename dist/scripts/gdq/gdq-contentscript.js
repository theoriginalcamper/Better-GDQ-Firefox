!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t,n){"use strict";var o=null,a=chrome.runtime.connect({name:"gdq"}),s=document.querySelector("body");console.log(s);var i=document.createElement("p"),r=document.createElement("a");function c(e){i.innerHTML=h(e.runner),r.href=e.link,r.onclick=function(){return window.open(this.href),!1},null!=e.category?r.innerHTML=e.game+" ("+e.category+")":r.innerHTML=e.game}function l(e){if(console.log("Calendar updating..."),console.log(e),null!=e){$("#schedule-table tbody").empty();var t="";_.each(e.order,function(n,o){t+=function(e,t,n){var o=h(e.runner);if(null!=e.category)var a=e.title+" ("+e.category+")";else var a=e.title;if(console.log(t),void 0===t[e.title]||0==t[e.title])var s="";else{var s="background-color:#555555;";a='<i class="fa fa-star"></i> '+a}return"<tr style=".concat(s,'>\n                                <th scope="row">').concat(n,'</th>\n                                <td>\n                                    <a class="speedrun-link" id="next-game-title" href="').concat(e.link,'" onclick="window.open(this.href); return false;"> ').concat(a,'</a>\n                                    <p class="runners-links" id="next-runners-information">').concat(o,'</p>\n                                </td>\n                                <td style="width: 114px;">\n                                    <p class="text-right"><i class="fa fa-clock-o" aria-hidden="true"></i> ').concat(e.estimate,"</p>\n                                </td>\n                              </tr>")}(e.schedule[n],e.highlights,o+1)}),$("#schedule-table tbody").html(t),console.log("Calendar updated.")}}function h(e){var t=_.keys(e),n="by ";if(t.length>2){var o=t.pop(),a=t.pop();$.each(t,function(t,o){n+=u(e,o)+", "}),n+=u(e,a)+" ",n+="and ",n+=u(e,o)}else if(2==t.length){o=t.pop(),a=t.pop();n+=u(e,a),n+=" and ",n+=u(e,o)}else if(1==t.length){t[0];n+=u(e,t[0])}else console.log("Error no runners."),n="";return n}function u(e,t){return null==e[t].logo?'<a href="'.concat(e[t].link,'" onclick="window.open(this.href); return false;">').concat(t,"</a>"):'<a href="'.concat(e[t].link,'" onclick="window.open(this.href); return false;"><img class="runner-logo" src="').concat(e[t].logo,'" />').concat(t,"</a>")}function m(){a.postMessage({message:"request"})}i.id="gdq-runners-information",r.id="gdq-speedrun-link",r.className="speedrun-link",$.get(chrome.extension.getURL("/html/gdq-footer.html"),function(e){$($.parseHTML(e)).appendTo(s)}),$.get(chrome.extension.getURL("/html/settings-menu.html"),function(e){var t=$(".settings-menu");$($.parseHTML(e)).appendTo(t)}),$(s).on("click","ul.dropdown-menu",function(e){e.stopPropagation()}),$(document).ready(function(){function e(e){"add"==e?(console.log("Switch is on. Adding Chat iframe and modifying UI."),$("#fixembed").css("display","flex"),$("#fixembed").css("max-height","640px"),$("#fixembed").css("max-width","1600px"),$("#twitch").css("display","flex"),$.get(chrome.extension.getURL("/html/quakenet-chat.html"),function(e){var t=$("#twitch");$(t).after($.parseHTML(e))})):"remove"==e&&(console.log("Switch is off. Removing UI."),$("#fixembed").css("display",""),$("#fixembed").css("max-height","540px"),$("#fixembed").css("max-width","960px"),$("#twitch").css("display",""),$("#quakenet-chat").remove(),$("#quakenet-clear").remove())}function t(e){"add"==e?(console.log("Switch is on. Adding Chat iframe and modifying UI."),$("#fixembed").css("display","flex"),$("#fixembed").css("max-height","640px"),$("#fixembed").css("max-width","1600px"),$("#twitch").css("display","flex"),$.get(chrome.extension.getURL("/html/twitch-chat.html"),function(e){var t=$("#twitch");$(t).after($.parseHTML(e))})):"remove"==e&&(console.log("Switch is off. Removing UI."),$("#fixembed").css("display",""),$("#fixembed").css("max-height","540px"),$("#fixembed").css("max-width","960px"),$("#twitch").css("display",""),$("#twitch-chat").remove(),$("#twitch-clear").remove())}$(s).css("margin-bottom","70px"),$("#twitch").length&&($(s).css("color","#fff"),$(s).css("background-color","#353535")),$("#twitch").wrap('<div style="display:flex; justify-content: center; margin: 279px auto 0 auto;"></div>'),$("#twitch").html('<iframe src="https://player.twitch.tv/?channel=gamesdonequick&parent=gamesdonequick.com" width="100%" height="100%" frameborder="0" scrolling="no" allowFullscreen="true" class="center-block"></iframe>'),$("#twitch").css("margin","0"),$(".game-information").append(r),$(".game-information").append(i),$("#refresh-timer-update").on("submit",function(e){return e.preventDefault(),function(e){if("Set Refresh Timer:"==e)return console.log("No change in refresh timer value."),void $.notify({icon:"glyphicon glyphicon-warning-sign",title:"Refresh Timer Update:",message:"Please choose an option from the menu!"},{element:"body",position:null,type:"danger",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,z_index:10001,placement:{from:"top",align:"right"}});if("number"==typeof parseInt(e)&&parseInt(e)>0){clearInterval(o);var t=6e4*parseInt(e);setInterval(m,t),console.log("Refresh Timer has been updated to: "+e+" minutes or "+t+" milliseconds"),$.notify({icon:"glyphicon glyphicon-time",title:"Refresh Timer Update:",message:"Updated to refresh every "+e+" minutes"},{element:"body",position:null,type:"success",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,z_index:10001,placement:{from:"top",align:"right"}})}}($("#refresh-timer-update").serializeArray()[0].value),!1}),$("#schedule-items-update").on("submit",function(e){e.preventDefault();var t=$("#schedule-items-update").serializeArray()[0].value;return console.log(t),function(e){if("Set # of Runs to Display:"==e)return console.log("No change in numbers of runs to display in schedule."),void $.notify({icon:"glyphicon glyphicon-warning-sign",title:"Schedule Items Update",message:"Please choose an option from the menu!"},{element:"body",position:null,type:"danger",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,z_index:10001,placement:{from:"top",align:"right"}});"number"==typeof parseInt(e)&&parseInt(e)>0&&(a.postMessage({message:"schedule",calendarItemsNumber:parseInt(e)}),$.notify({icon:"glyphicon glyphicon-time",title:"Schedule Items Update:",message:"Updated to display "+e+" runs."},{element:"body",position:null,type:"success",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,z_index:10001,placement:{from:"top",align:"right"}}))}(t),!1}),$(".fa.fa-refresh").click(function(){this.className="fa fa-refresh fa-spin",console.log("Refreshing..."),m();var e=this;setTimeout(function(){e.className="fa fa-refresh",console.log("Refresh complete.")},2e3)}),$(".fa.fa-cog").click(function(){this.className="fa fa-cog fa-spin";var e=this;setTimeout(function(){e.className="fa fa-cog"},2e3)}),$("[name='quakenet-chat-switch']").bootstrapSwitch(),$("[name='twitch-chat-switch']").bootstrapSwitch(),$("[name='theater-mode']").bootstrapSwitch(),$('input[name="theater-mode"]').on("switchChange.bootstrapSwitch",function(t,n){$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")&&(e("remove"),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state",!1,!0)),$('input[name="theater-mode"]').bootstrapSwitch("state")?($("#stream").html(""),$.get(chrome.extension.getURL("/html/quakenet-theater-mode.html"),function(e){console.log("Adding theater mode!"),console.log($.parseHTML(e)),$("footer").after($.parseHTML(e))}),$("#extension-footer").addClass("theater-footer").removeClass("standard-footer")):($("#theater-mode-div").remove(),$("#twitch").html('<iframe src="https://player.twitch.tv/?channel=gamesdonequick" width="100%" height="100%" frameborder="0" scrolling="no" allowFullscreen="true" class="center-block"></iframe>'),$("#extension-footer").addClass("standard-footer").removeClass("theater-footer"))}),$('input[name="quakenet-chat-switch"]').on("switchChange.bootstrapSwitch",function(n,o){console.log("Clicked QUAKENET Switch."),console.log(this),console.log("Twitch State:"),console.log($('input[name="twitch-chat-switch"]').bootstrapSwitch("state")),console.log("Quake State:"),console.log($('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")),$('input[name="twitch-chat-switch"]').bootstrapSwitch("state")?(t("remove"),$('input[name="twitch-chat-switch"]').bootstrapSwitch("state",!1,!0),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")?e("add"):e("remove")):(console.log(),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")?e("add"):e("remove"))}),$('input[name="twitch-chat-switch"]').on("switchChange.bootstrapSwitch",function(n,o){console.log("Clicked Twitch Switch."),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")?(e("remove"),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state",!1,!0),$('input[name="twitch-chat-switch"]').bootstrapSwitch("state")?t("add"):t("remove")):$('input[name="twitch-chat-switch"]').bootstrapSwitch("state")?t("add"):t("remove")})}),(a=chrome.runtime.connect({name:"gdq"})).postMessage({message:"request"}),a.onMessage.addListener(function(e){"changed"==e.status?(console.log(e),console.log("The Current Game is: "+e.game),$()&&(c(e),l(e.calendar))):"unchanged"==e.status?console.log("Current game has not changed since last request"):"reload"==e.status&&(console.log("Reload has occurred"),console.log(e),console.log("The Current Game is: "+e.game),c(e),l(e.calendar))}),o=setInterval(m,3e5)}});
//# sourceMappingURL=gdqContentscript.js.map