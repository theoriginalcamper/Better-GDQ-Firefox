"use strict";function updateUI(e){runners_paragraph.innerHTML=generateFormattedRunnerString(e.runner),game_link_a.href=e.link,game_link_a.onclick=function(){return window.open(this.href),!1},null!=e.category?game_link_a.innerHTML=e.game+" ("+e.category+")":game_link_a.innerHTML=e.game}function updateCalendarUI(e){if(console.log("Calendar updating..."),console.log(e),null!=e){$("#schedule-table tbody").empty();var t="";_.each(e.order,function(n,a){t+=generateScheduleItemString(e.schedule[n],a+1)}),$("#schedule-table tbody").html(t),console.log("Calendar updated.")}}function generateFormattedRunnerString(e){var t=_.keys(e),n="by ";if(t.length>2){var a=t.pop(),o=t.pop();$.each(t,function(t,a){n+=generateRunnerElement(e,a)+", "}),n+=generateRunnerElement(e,o)+" ",n+="and ",n+=generateRunnerElement(e,a)}else if(2==t.length){var a=runner_keys.pop(),o=runner_keys.pop();n+=generateRunnerElement(e,o),n+=" and ",n+=generateRunnerElement(e,a)}else if(1==t.length){t[0];n+=generateRunnerElement(e,t[0])}else console.log("Error no runners."),n="";return n}function generateRunnerElement(e,t){return null==e[t].logo?'<a href="'+e[t].link+'" onclick="window.open(this.href); return false;">'+t+"</a>":'<a href="'+e[t].link+'" onclick="window.open(this.href); return false;"><img class="runner-logo" src="'+e[t].logo+'" />'+t+"</a>"}function generateScheduleItemString(e,t){var n=generateFormattedRunnerString(e.runner);if(null!=e.category)var a=e.title+" ("+e.category+")";else var a=e.title;var o='<tr>\n                                <th scope="row">'+t+'</th>\n                                <td>\n                                    <a class="speedrun-link" id="next-game-title" href="'+e.link+'" onclick="window.open(this.href); return false;"> '+a+'</a>\n                                    <p class="runners-links" id="next-runners-information">'+n+'</p>\n                                </td>\n                                <td style="width: 114px;">\n                                    <p class="text-right"><i class="fa fa-clock-o" aria-hidden="true"></i> '+e.estimate+"</p>\n                                </td>\n                              </tr>";return o}function calculateRefreshRate(e){var t=6e4*e;return t}function updateRefreshRate(e){if("Set Refresh Timer:"==e)return console.log("No change in refresh timer value."),void $.notify({icon:"glyphicon glyphicon-warning-sign",title:"Refresh Timer Update:",message:"Please choose an option from the menu!"},{element:"body",position:null,type:"danger",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,placement:{from:"top",align:"right"}});if("number"==typeof parseInt(e)&&parseInt(e)>0){clearInterval(refreshTimer);var t=calculateRefreshRate(parseInt(e));setInterval(requestDataFromBackground,t),console.log("Refresh Timer has been updated to: "+e+" minutes or "+t+" milliseconds"),$.notify({icon:"glyphicon glyphicon-time",title:"Refresh Timer Update:",message:"Updated to refresh every "+e+" minutes"},{element:"body",position:null,type:"success",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,placement:{from:"top",align:"right"}})}}function sendUpdateCalendarItemsNumber(e){return"Set # of Runs to Display:"==e?(console.log("No change in numbers of runs to display in schedule."),void $.notify({icon:"glyphicon glyphicon-warning-sign",title:"Schedule Items Update",message:"Please choose an option from the menu!"},{element:"body",position:null,type:"danger",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,placement:{from:"top",align:"right"}})):void("number"==typeof parseInt(e)&&parseInt(e)>0&&(port.postMessage({message:"schedule",calendarItemsNumber:parseInt(e)}),$.notify({icon:"glyphicon glyphicon-time",title:"Schedule Items Update:",message:"Updated to display "+e+" runs."},{element:"body",position:null,type:"success",allow_dismiss:!0,newest_on_top:!0,showProgressbar:!1,placement:{from:"top",align:"right"}})))}function requestDataFromBackground(){port.postMessage({message:"request"})}var refreshTimer=null,refreshRate=3e5,port=chrome.runtime.connect({name:"gdq"}),page_elem=document.querySelector("body");console.log(page_elem);var runners_paragraph=document.createElement("p"),game_link_a=document.createElement("a");runners_paragraph.id="gdq-runners-information",game_link_a.id="gdq-speedrun-link",game_link_a.className="speedrun-link",$.get(chrome.extension.getURL("/html/gdq-footer.html"),function(e){$($.parseHTML(e)).appendTo(page_elem)}),$.get(chrome.extension.getURL("/html/settings-menu.html"),function(e){var t=$(".settings-menu");$($.parseHTML(e)).appendTo(t)}),$(page_elem).on("click","ul.dropdown-menu",function(e){e.stopPropagation()}),$(document).ready(function(){function e(e){"add"==e?(console.log("Switch is on. Adding Chat iframe and modifying UI."),$("#stream").removeClass("center-block").addClass("pull-left"),$.get(chrome.extension.getURL("/html/quakenet-chat.html"),function(e){var t=$("#stream");$(t).after($.parseHTML(e))})):"remove"==e&&(console.log("Switch is off. Removing UI."),$("#stream").addClass("center-block").removeClass("pull-left"),$("#quakenet-chat").remove(),$("#quakenet-clear").remove())}function t(e){"add"==e?(console.log("Switch is on. Adding Chat iframe and modifying UI."),$("#stream").removeClass("center-block").addClass("pull-left"),$.get(chrome.extension.getURL("/html/twitch-chat.html"),function(e){var t=$("#stream");$(t).after($.parseHTML(e))})):"remove"==e&&(console.log("Switch is off. Removing UI."),$("#stream").addClass("center-block").removeClass("pull-left"),$("#twitch-chat").remove(),$("#twitch-clear").remove())}$(page_elem).css("margin-bottom","70px"),$(".game-information").append(game_link_a),$(".game-information").append(runners_paragraph),$("#refresh-timer-update").on("submit",function(e){e.preventDefault();var t=$("#refresh-timer-update").serializeArray()[0].value;return updateRefreshRate(t),!1}),$("#schedule-items-update").on("submit",function(e){e.preventDefault();var t=$("#schedule-items-update").serializeArray()[0].value;return console.log(t),sendUpdateCalendarItemsNumber(t),!1}),$(".fa.fa-refresh").click(function(){this.className="fa fa-refresh fa-spin",console.log("Refreshing..."),requestDataFromBackground();var e=this;setTimeout(function(){e.className="fa fa-refresh",console.log("Refresh complete.")},2e3)}),$(".fa.fa-cog").click(function(){this.className="fa fa-cog fa-spin";var e=this;setTimeout(function(){e.className="fa fa-cog"},2e3)}),$("[name='quakenet-chat-switch']").bootstrapSwitch(),$("[name='twitch-chat-switch']").bootstrapSwitch(),$('input[name="quakenet-chat-switch"]').on("switchChange.bootstrapSwitch",function(n,a){console.log("Clicked QUAKENET Switch."),console.log(this),console.log("Twitch State:"),console.log($('input[name="twitch-chat-switch"]').bootstrapSwitch("state")),console.log("Quake State:"),console.log($('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")),$('input[name="twitch-chat-switch"]').bootstrapSwitch("state")?(t("remove"),$('input[name="twitch-chat-switch"]').bootstrapSwitch("state",!1,!0),e($('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")?"add":"remove")):(console.log(),e($('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")?"add":"remove"))}),$('input[name="twitch-chat-switch"]').on("switchChange.bootstrapSwitch",function(n,a){console.log("Clicked Twitch Switch."),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state")?(e("remove"),$('input[name="quakenet-chat-switch"]').bootstrapSwitch("state",!1,!0),t($('input[name="twitch-chat-switch"]').bootstrapSwitch("state")?"add":"remove")):t($('input[name="twitch-chat-switch"]').bootstrapSwitch("state")?"add":"remove")})});var port=chrome.runtime.connect({name:"gdq"});port.postMessage({message:"request"}),port.onMessage.addListener(function(e){"changed"==e.status?(console.log(e),updateUI(e),updateCalendarUI(e.calendar)):"unchanged"==e.status?console.log("Current game has not changed since last request"):"reload"==e.status&&(console.log("Reload has occurred"),console.log(e),updateUI(e),updateCalendarUI(e.calendar))}),refreshTimer=setInterval(requestDataFromBackground,refreshRate);
//# sourceMappingURL=contentscript.js.map
