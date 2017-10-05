"use strict";

var backgroundUtility = function () {

    var getInterval = function () {
        var settingsObj = localStorageUtility.retriveItem("settings");

        if (settingsObj == null) {
            //setting default values if local storage is empty
            settingsUtility.loadDefaultSettings();
        }

        settingsObj = localStorageUtility.retriveItem("settings");

        //settingsObj.interval is in minutes, converting to milliseconds and returning
        return settingsObj.interval * 60 * 1000;
    }

    var startProcess = null;

    var startTimer = function () {

        helperUtility.logMessage(new Date() + " Timer Started ************************", config.messageType.log);

        startProcess = setInterval(function () {

                helperUtility.logMessage(new Date() + " BackGround Task Started ************************", config.messageType.log);

                var localStorageKeys = localStorageUtility.retriveAllKeys();
                var websiteList = [];
                var serverList = [];
                var DBList = [];

                if (localStorageKeys.length > 0) {

                    for (var i = 0; i < localStorageKeys.length; i++) {

                        var key = localStorageKeys[i];

                        if (key != "settings") {
                            var obj = localStorageUtility.retriveItem(key);

                            switch (obj.taskType) {
                                case config.taskType.webSite:
                                    websiteList.push(key);
                                    break;
                                case config.taskType.server:
                                    serverList.push(key);
                                    break;
                                case config.taskType.database:
                                    DBList.push(key);
                                    break;
                            }
                        }
                    }

                    Promise
                        .all([
                            APIUtility.checkStatus(websiteList, true),
                            APIUtility.checkStatus(DBList, true),
                            APIUtility.checkStatus(serverList, true)
                        ]).then(function (values) {
                            notificationUtility.checkPendingNotifications();
                            updateSettings();
                        }).catch(function (error) {
                            helperUtility.logMessage(error, config.messageType.error);
                            updateSettings();
                        });
                }
            },
            getInterval()
        );
    }

    var stopTimer = function () {
        helperUtility.logMessage(new Date() + " Timer Stopped ************************", config.messageType.log);
        clearInterval(startProcess);
    }

    var updateInterval = function () {
        helperUtility.logMessage(new Date() + " Interval Updated ************************", config.messageType.log);
        clearInterval(startProcess);
        updateSettings();
        startTimer();
    }

    var updateSettings = function () {
        // updating settings
        var settingsObj = localStorageUtility.retriveItem("settings");
        settingsObj.lastRunAt = new Date();
        var dateTime = new Date(settingsObj.lastRunAt);
        settingsObj.nextRunAt = new Date(dateTime.setMinutes(dateTime.getMinutes() + settingsObj.interval));
       localStorageUtility.updateItem("settings", settingsObj);
    }

    return {
        startTimer: startTimer,
        stopTimer: stopTimer,
        updateInterval: updateInterval
    }
}();

(function () {

    backgroundUtility.startTimer();

    window.addEventListener('storage', function (e) {
        if (e.key == "settings") {
            if (JSON.parse(e.oldValue).interval != JSON.parse(e.newValue).interval) {
                backgroundUtility.updateInterval();
            }
        }
    });
})();