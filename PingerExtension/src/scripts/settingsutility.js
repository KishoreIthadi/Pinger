"use strict";

var settingsUtility = function () {

    var saveSettings = function (email, interval, enableNotifications) {

        //TODO validations
        var settingsObj = localStorageUtility.retriveItem("settings");

        var obj = {
            "globalEmail": email,
            "interval": interval,
            "enableNotifications": enableNotifications,
            "lastRunAt": new Date(settingsObj.lastRunAt),
            "nextRunAt": new Date(settingsObj.nextRunAt)
        }

        localStorageUtility.addItem("settings", obj);

        document.getElementById("lblSaveSettingsVal").innerHTML = "Updated Sucessfully";
    }

    //setting default values if local storage is empty
    var loadDefaultSettings = function () {
        if (localStorageUtility.retriveItem("settings") == null) {

            var dateTime = new Date();
            var nextRunAt = new Date(dateTime.setMinutes(dateTime.getMinutes() + config.defaultSettings.defaultInterval));

            var obj = {
                "globalEmail": "",
                "interval": config.defaultSettings.defaultInterval,
                "enableNotifications": config.defaultSettings.enableNotifications,
                "lastRunAt": new Date(),
                "nextRunAt": nextRunAt
            }

            localStorageUtility.addItem("settings", obj);
        }
    };

    return {
        saveSettings: saveSettings,
        loadDefaultSettings: loadDefaultSettings
    }

}();