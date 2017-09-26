"use strict";

var settingsUtility = function () {

    var saveSettings = function (email, interval, enableNotifications) {

        //TODO validations

        var obj = {
            "interval": interval,
            "globalEmail": email,
            "enableNotifications": enableNotifications
        }

        localStorageUtility.addItem("settings", obj);

        document.getElementById("lblSaveSettingsVal").innerHTML = "Updated Sucessfully";
    }

    //setting default values if local storage is empty
    var loadDefaultSettings = function () {
        if (localStorageUtility.retriveItem("settings") == null) {

            var obj = {
                "globalEmail": "",
                "interval": config.defaultSettings.defaultInterval,
                "enableNotifications": config.defaultSettings.enableNotifications
            }

            localStorageUtility.addItem("settings", obj);
        }
    };

    return {
        saveSettings: saveSettings,
        loadDefaultSettings: loadDefaultSettings
    }

}();