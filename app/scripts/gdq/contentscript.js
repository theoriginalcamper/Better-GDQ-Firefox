'use strict';

// Timer Variables

var refreshTimer = null;
var refreshRate = 300000;

var port = chrome.runtime.connect({ name: "gdq" });

var page_elem = document.querySelector('body');
console.log(page_elem);

var runners_paragraph = document.createElement('p');
var game_link_a = document.createElement('a');

runners_paragraph.id = "gdq-runners-information";
game_link_a.id = "gdq-speedrun-link";
game_link_a.className = "speedrun-link";

// $.get(chrome.extension.getURL('html/gdq-footer.html'), function(data) {
//     console.log("Loading GDQ Footer");
//     console.log(data);
//     console.log($.parseHTML(data));
//     $($.parseHTML(data)).appendTo(page_elem);
// });

var footerHTML = '<footer class="standard-footer" id="footer">\n    <div class="extension-container">\n        <div class="game-information col-md-11"></div>\n        <div id="options">\n            <i class="fa fa-calendar collapsed" data-toggle="collapse" data-target="#collapseCalendar" aria-expanded="false"></i>\n            <i class="fa fa-refresh" id="settings-icon"></i>\n            <div class="btn-group dropup">\n                <a class="dropdown-toggle" id="settings-link" data-toggle="dropdown">\n                    <i class="fa fa-cog" id="settings-icon"></i>\n                </a>\n                <ul class="dropdown-menu settings-menu" style="left: -150px; margin-bottom: 20px;"></ul>\n            </div>\n        </div>\n        <div style="clear:both;"></div>\n        <div class="collapse col-md-11" id="collapseCalendar">\n            <!-- Schedule -->\n            <p><i class="fa fa-calendar" style="margin-right: 10px;"></i> Next Runs</p>\n            <table class="table" id="schedule-table">\n                <tbody>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</footer>';

var settingsHTML = '<li>\n    <div class="col-md-12">\n        <form class="form" role="form" method="post" action="" accept-charset="UTF-8" id="refresh-timer-update">\n            <div class="form-group">\n                <label for="timer"><i class="fa fa-clock-o" aria-hidden="true"></i> Refresh Timer</label>\n                <select class="form-control" id="refresh-timer-select" name="timer">\n                    <option selected="selected">Set Refresh Timer:</option>\n                    <option value="1">1 minute</option>\n                    <option value="2">2 minutes</option>\n                    <option value="3">3 minutes</option>\n                    <option value="4">4 minutes</option>\n                    <option value="5">5 minutes</option>\n                    <option value="6">6 minutes</option>\n                    <option value="7">7 minutes</option>\n                    <option value="8">8 minutes</option>\n                    <option value="9">9 minutes</option>\n                    <option value="10">10 minutes</option>\n                    <option value="15">15 minutes</option>\n                    <option value="20">20 minutes</option>\n                    <option value="25">25 minutes</option>\n                    <option value="30">30 minutes</option>\n                </select>\n                <button type="submit" class="btn btn-primary" id="refresh-timer-submit"><i class="fa fa-check" id="refresh-form-check" aria-hidden="true"></i></button>\n            </div>\n        </form>\n\n        <form class="form" role="form" method="post" action="" accept-charset="UTF-8" id="schedule-items-update">\n            <div class="form-group">\n                <label for="schedule-items"><i class="fa fa-calendar" aria-hidden="true"></i> Schedule Display</label>\n                <select class="form-control" id="schedule-items-select" name="schedule-items">\n                    <option selected="selected"># of Runs to Display:</option>\n                    <option value="1">1 run</option>\n                    <option value="2">2 runs</option>\n                    <option value="3">3 runs</option>\n                    <option value="4">4 runs</option>\n                    <option value="5">5 runs</option>\n                </select>\n                <button type="submit" class="btn btn-primary" id="schedule-items-submit"><i class="fa fa-check" id="schedule-items-check" aria-hidden="true"></i></button>\n            </div>\n        </form>\n        <div style="margin-bottom: 10px;">\n            <label for="quakenet-chat-switch" id="quakenet-chat-switch"><i class="fa fa-commenting-o" aria-hidden="true"></i> Quake Chat Embed</label>\n            <input type="checkbox" name="quakenet-chat-switch" />\n        </div>\n        <div style="margin-bottom: 10px;">\n            <label for="twitch-chat-switch" id="twitch-chat-switch"><i class="fa fa-twitch" aria-hidden="true"></i> Twitch Chat Embed</label>\n            <input type="checkbox" name="twitch-chat-switch"></input>\n        </div>\n        <div style="margin-bottom: 10px;">\n            <label for="theater-mode" id="theater-mode"><i class="fa fa-film" aria-hidden="true"></i> Quake Theater Mode</label>\n            <input type="checkbox" name="theater-mode" ></input>\n        </div>\n    </div>\n</li>';

var quakeChat = '<div id="quakenet-chat" class="pull-left" style="width: 524px;\n    margin-top: 24px;\n    height: 436px;\n    margin-left: 10px;">\n  <iframe src="https://webchat.quakenet.org/?channels=sdamarathon" width="100%" height="100%" frameborder="0" scrolling="no" class="center-block"></iframe>\n</div>\n<div class="clearfix" id="quakenet-clear"></div>';

var quakeTheatherMode = '<div id="theater-mode-div" style="width: 100%;height: 90%;position: fixed;background-color: #000;z-index: 10000;top: 0;left: 0;">\n    <div class="row" style="height: 100%;">\n        <div class="col-md-8" style="height: 100%; padding: 0px;">\n            <iframe src="https://player.twitch.tv/?channel=gamesdonequick" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="true" class="center-block"></iframe>\n        </div>\n        <div class="col-md-4" style="height: 100%; padding: 0px;">\n            <iframe src="https://webchat.quakenet.org/?channels=sdamarathon" width="100%" height="100%" frameborder="0" scrolling="no" class="center-block"></iframe>\n        </div>\n    </div>\n</div>';

var twitchChat = '<div id="twitch-chat" class="pull-left" style="width: 524px;\n    margin-top: 24px;\n    height: 436px;\n    margin-left: 10px;">\n    <iframe frameborder="0" scrolling="no" id="chat_embed" src="https://www.twitch.tv/gamesdonequick/chat" height="436" width="524"></iframe>\n</div>\n<div class="clearfix" id="twitch-clear"></div>';

// $.get(chrome.extension.getURL('html/settings-menu.html'), function(data) {
//     console.log("Loading Settings Menu");
//     console.log(data);
//     console.log($.parseHTML(data));
//     var menu_ul = $(".settings-menu");
//     $($.parseHTML(data)).appendTo(menu_ul);
// });

$(page_elem).on('click', 'ul.dropdown-menu', function (e) {
    e.stopPropagation();
});

$(document).ready(function () {
    $(page_elem).append(footerHTML);
    var addSettingsMenu = setInterval(function () {
        console.log("Looking for Settings Menu");
        if ($(".settings-menu").length > 0) {
            $(".settings-menu").append(settingsHTML);
            clearInterval(addSettingsMenu);

            $("#refresh-timer-update").on('submit', function (e) {
                e.preventDefault();

                var updateRefreshTimerValue = $('#refresh-timer-update').serializeArray()[0]["value"];

                updateRefreshRate(updateRefreshTimerValue);

                return false;
            });

            $("#schedule-items-update").on('submit', function (e) {
                e.preventDefault();

                var updateScheduleItemsValue = $('#schedule-items-update').serializeArray()[0]["value"];

                console.log(updateScheduleItemsValue);
                sendUpdateCalendarItemsNumber(updateScheduleItemsValue);

                return false;
            });

            $(".fa.fa-refresh").click(function () {
                this.className = 'fa fa-refresh fa-spin';
                console.log("Refreshing...");
                requestDataFromBackground();
                var that = this;
                setTimeout(function () {
                    that.className = 'fa fa-refresh';
                    console.log("Refresh complete.");
                }, 2000);
            });

            $(".fa.fa-cog").click(function () {
                this.className = 'fa fa-cog fa-spin';
                var that = this;
                setTimeout(function () {
                    that.className = 'fa fa-cog';
                }, 2000);
            });
        }
    }, 1000);
    $(page_elem).css('margin-bottom', '70px');
    $('#stream').html('<iframe src="https://player.twitch.tv/?channel=gamesdonequick" width="100%" height="100%" frameborder="0" scrolling="no" allowFullscreen="true" class="center-block"></iframe>');
    $('#stream').css('margin-top', '24px');
    $('.game-information').append(game_link_a);
    $('.game-information').append(runners_paragraph);

    var addBootstrapSwitches = setInterval(function () {
        if ($("[name='quakenet-chat-switch']").length > 0) {
            $("[name='quakenet-chat-switch']").bootstrapSwitch();
            $("[name='twitch-chat-switch']").bootstrapSwitch();
            $("[name='theater-mode']").bootstrapSwitch();

            $('input[name="theater-mode"]').on('switchChange.bootstrapSwitch', function (event, state) {
                if ($('input[name="quakenet-chat-switch"]').bootstrapSwitch('state')) {
                    updateQuakeChat('remove');
                    $('input[name="quakenet-chat-switch"]').bootstrapSwitch('state', false, true);
                }

                if ($('input[name="theater-mode"]').bootstrapSwitch('state')) {
                    $('#stream').html('');
                    $('#battlescene').before(quakeTheatherMode);
                    $('#footer').addClass('theater-footer').removeClass('standard-footer');
                } else {
                    $('#theater-mode-div').remove();
                    $('#stream').html('<iframe src="https://player.twitch.tv/?channel=gamesdonequick" width="100%" height="100%" frameborder="0" scrolling="no" allowFullscreen="true" class="center-block"></iframe>');
                    $('#footer').addClass('standard-footer').removeClass('theater-footer');
                }
            });

            $('input[name="quakenet-chat-switch"]').on('switchChange.bootstrapSwitch', function (event, state) {
                console.log('Clicked QUAKENET Switch.');
                console.log(this);
                console.log("Twitch State:");
                console.log($('input[name="twitch-chat-switch"]').bootstrapSwitch('state'));
                console.log("Quake State:");
                console.log($('input[name="quakenet-chat-switch"]').bootstrapSwitch('state'));

                if ($('input[name="twitch-chat-switch"]').bootstrapSwitch('state')) {
                    updateTwitchChat('remove');
                    $('input[name="twitch-chat-switch"]').bootstrapSwitch('state', false, true);
                    if ($('input[name="quakenet-chat-switch"]').bootstrapSwitch('state')) {
                        updateQuakeChat('add');
                    } else {
                        updateQuakeChat('remove');
                    }
                } else {
                    console.log();
                    if ($('input[name="quakenet-chat-switch"]').bootstrapSwitch('state')) {
                        updateQuakeChat('add');
                    } else {
                        updateQuakeChat('remove');
                    }
                }
            });

            $('input[name="twitch-chat-switch"]').on('switchChange.bootstrapSwitch', function (event, state) {
                console.log('Clicked Twitch Switch.');
                if ($('input[name="quakenet-chat-switch"]').bootstrapSwitch('state')) {
                    updateQuakeChat('remove');
                    $('input[name="quakenet-chat-switch"]').bootstrapSwitch('state', false, true);
                    if ($('input[name="twitch-chat-switch"]').bootstrapSwitch('state')) {
                        updateTwitchChat('add');
                    } else {
                        updateTwitchChat('remove');
                    }
                } else {
                    if ($('input[name="twitch-chat-switch"]').bootstrapSwitch('state')) {
                        updateTwitchChat('add');
                    } else {
                        updateTwitchChat('remove');
                    }
                }
            });

            clearInterval(addBootstrapSwitches);
        }
    }, 1000);

    /*
        QUAKENET IRC THEATER MODE BUTTON
    */

    function updateQuakeChat(msg) {
        if (msg == 'add') {
            console.log('Switch is on. Adding Chat iframe and modifying UI.');
            $('#stream').removeClass('center-block').addClass('pull-left');
            var twitchStream = $("#stream");
            $(twitchStream).after(quakeChat);
        } else if (msg == 'remove') {
            console.log('Switch is off. Removing UI.');
            $('#stream').addClass('center-block').removeClass('pull-left');
            $('#quakenet-chat').remove();
            $('#quakenet-clear').remove();
        }
    }

    function updateTwitchChat(msg) {
        if (msg == 'add') {
            console.log('Switch is on. Adding Chat iframe and modifying UI.');
            $('#stream').removeClass('center-block').addClass('pull-left');
            var twitchStream = $("#stream");
            $(twitchStream).after(twitchChat);
        } else if (msg == 'remove') {
            console.log('Switch is off. Removing UI.');
            $('#stream').addClass('center-block').removeClass('pull-left');
            $('#twitch-chat').remove();
            $('#twitch-clear').remove();
        }
    }
});

//Port Listeners

var port = browser.runtime.connect({ name: "gdq" });
port.postMessage({ message: "request" });
port.onMessage.addListener(function (msg) {
    if (msg.status == "changed") {
        console.log(msg);
        console.log("The Current Game is: " + msg.game);
        if ($()) {
            updateUI(msg);
            updateCalendarUI(msg.calendar);
        }
    } else if (msg.status == "unchanged") {
        console.log("Current game has not changed since last request");
    } else if (msg.status == "reload") {
        console.log("Reload has occurred");
        console.log(msg);
        console.log("The Current Game is: " + msg.game);
        updateUI(msg);
        updateCalendarUI(msg.calendar);
    }
});

/*
  Object
    Game
    Runner
    Estimate
    Category
    Link
*/

function updateUI(msg) {
    runners_paragraph.innerHTML = generateFormattedRunnerString(msg.runner);
    game_link_a.href = msg.link;
    game_link_a.onclick = function () {
        window.open(this.href);
        return false;
    };

    if (msg.category != null) {
        game_link_a.innerHTML = msg.game + ' (' + msg.category + ')';
    } else {
        game_link_a.innerHTML = msg.game;
    }
}

function updateCalendarUI(msg) {
    console.log("Calendar updating...");
    console.log(msg);
    if (msg != null) {
        $('#schedule-table tbody').empty();

        var scheduleString = "";
        _.each(msg.order, function (gameTitle, index) {
            scheduleString += generateScheduleItemString(msg.schedule[gameTitle], msg.highlights, index + 1);
        });

        $('#schedule-table tbody').html(scheduleString);
        console.log("Calendar updated.");
    } else {
        return;
    }
}

function generateFormattedRunnerString(runners) {
    var runners_keys = _.keys(runners);
    var runner_string = "by ";
    if (runners_keys.length > 2) {
        var last_runner = runners_keys.pop();
        var second_runner = runners_keys.pop();
        $.each(runners_keys, function (index, runner_key) {
            runner_string += generateRunnerElement(runners, runner_key) + ', ';
        });

        runner_string += generateRunnerElement(runners, second_runner) + ' ';
        runner_string += 'and ';
        runner_string += generateRunnerElement(runners, last_runner);
    } else if (runners_keys.length == 2) {
        var last_runner = runners_keys.pop();
        var second_runner = runners_keys.pop();

        runner_string += generateRunnerElement(runners, second_runner);
        runner_string += ' and ';
        runner_string += generateRunnerElement(runners, last_runner);
    } else if (runners_keys.length == 1) {
        var runner_key = runners_keys[0];
        runner_string += generateRunnerElement(runners, runners_keys[0]);
    } else {
        console.log("Error no runners.");
        runner_string = "";
    }
    return runner_string;
}

function generateRunnerElement(runnerObject, runner_key) {
    if (runnerObject[runner_key]["logo"] == null) {
        return '<a href="' + runnerObject[runner_key]["link"] + '" onclick="window.open(this.href); return false;">' + runner_key + '</a>';
    } else {
        return '<a href="' + runnerObject[runner_key]["link"] + '" onclick="window.open(this.href); return false;"><img class="runner-logo" src="' + runnerObject[runner_key]["logo"] + '" />' + runner_key + '</a>';
    }
}

function generateScheduleItemString(scheduleItemObject, highlightsObject, index) {
    var runnerString = generateFormattedRunnerString(scheduleItemObject.runner);
    if (scheduleItemObject.category != null) {
        var titleString = scheduleItemObject.title + ' (' + scheduleItemObject.category + ')';
    } else {
        var titleString = scheduleItemObject.title;
    }

    console.log(highlightsObject);

    if (typeof highlightsObject[scheduleItemObject.title] == 'undefined' || highlightsObject[scheduleItemObject.title] == false) {
        var highlightStyle = '';
    } else {
        var highlightStyle = 'background-color:#555555;';
        titleString = '<i class="fa fa-star"></i> ' + titleString;
    }

    var scheduleItemString = '<tr style=' + highlightStyle + ' >\n                                <th scope="row">' + index + '</th>\n                                <td>\n                                    <a class="speedrun-link" id="next-game-title" href="' + scheduleItemObject.link + '" onclick="window.open(this.href); return false;"> ' + titleString + '</a>\n                                    <p class="runners-links" id="next-runners-information">' + runnerString + '</p>\n                                </td>\n                                <td style="width: 114px;">\n                                    <p class="text-right"><i class="fa fa-clock-o" aria-hidden="true"></i> ' + scheduleItemObject.estimate + '</p>\n                                </td>\n                              </tr>';

    return scheduleItemString;
}

function calculateRefreshRate(minutes) {
    // body...
    var milliseconds = minutes * 60000;

    return milliseconds;
}

function updateRefreshRate(newRate) {
    if (newRate == "Set Refresh Timer:") {
        console.log("No change in refresh timer value.");

        $.notify({
            icon: 'glyphicon glyphicon-warning-sign',
            title: 'Refresh Timer Update:',
            message: 'Please choose an option from the menu!'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "danger",
            allow_dismiss: true,
            newest_on_top: true,
            showProgressbar: false,
            z_index: 10001,
            placement: {
                from: "top",
                align: "right"
            }
        });

        return;
    } else if (typeof parseInt(newRate) == "number" && parseInt(newRate) > 0) {
        clearInterval(refreshTimer);
        var milliseconds = calculateRefreshRate(parseInt(newRate));
        setInterval(requestDataFromBackground, milliseconds);
        console.log("Refresh Timer has been updated to: " + newRate + " minutes or " + milliseconds + " milliseconds");

        $.notify({
            icon: 'glyphicon glyphicon-time',
            title: 'Refresh Timer Update:',
            message: 'Updated to refresh every ' + newRate + ' minutes'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "success",
            allow_dismiss: true,
            newest_on_top: true,
            showProgressbar: false,
            z_index: 10001,
            placement: {
                from: "top",
                align: "right"
            }
        });
    }
}

function sendUpdateCalendarItemsNumber(newCalendarItemsNumber) {
    if (newCalendarItemsNumber == "Set # of Runs to Display:") {
        console.log("No change in numbers of runs to display in schedule.");

        $.notify({
            icon: 'glyphicon glyphicon-warning-sign',
            title: 'Schedule Items Update',
            message: 'Please choose an option from the menu!'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "danger",
            allow_dismiss: true,
            newest_on_top: true,
            showProgressbar: false,
            z_index: 10001,
            placement: {
                from: "top",
                align: "right"
            }
        });

        return;
    } else if (typeof parseInt(newCalendarItemsNumber) == "number" && parseInt(newCalendarItemsNumber) > 0) {
        port.postMessage({ message: "schedule", calendarItemsNumber: parseInt(newCalendarItemsNumber) });

        $.notify({
            icon: 'glyphicon glyphicon-time',
            title: 'Schedule Items Update:',
            message: 'Updated to display ' + newCalendarItemsNumber + ' runs.'
        }, {
            // settings
            element: 'body',
            position: null,
            type: "success",
            allow_dismiss: true,
            newest_on_top: true,
            showProgressbar: false,
            z_index: 10001,
            placement: {
                from: "top",
                align: "right"
            }
        });
    }
}

function requestDataFromBackground() {
    port.postMessage({ message: "request" });
}
refreshTimer = setInterval(requestDataFromBackground, refreshRate);