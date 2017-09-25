"use strict";

var notificationUtility = function () {

    var notifyUser = function (message, type) {

        var settingsObj = localStorageUtility.retriveItem("settings");

        if (!settingsObj.enableNotifications) {
            return;
        }

        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        if (!Notification) {
            alert('Desktop notifications is disabled. Please enable it');
            return;
        } else {

            var icon = "images/info.png";

            if (type == config.notificationType.success) {
                icon = "images/succeeded.png";
            } else if (type == config.notificationType.failure) {
                icon = "images/failed.png";
            }

            var notification = new Notification("", {
                icon: icon,
                body: message,
            });

            setTimeout(function () {
                notification.close();
            }, config.defaultSettings.defaultnotificationInterval * 1000);

            notification.onclick = function () {
                notification.close();
            };
        }
    }

    var checkPendingNotifications = function () {

        var localStorageKeys = localStorageUtility.retriveAllKeys();
        var localStorageList = [];

        if (localStorageKeys.length > 0) {

            for (var i = 0; i < localStorageKeys.length; i++) {

                var key = localStorageKeys[i];
                var obj = localStorageUtility.retriveItem(key);

                if (obj.sendEmail) {

                    if (obj.status == config.taskStatus.alive) {
                        notificationUtility.notifyUser(obj.value.website + " is up and running", 1);
                    }
                    if (obj.status == config.taskStatus.dead) {
                        notificationUtility.notifyUser(obj.value.website + " went down", 2);
                    }

                    localStorageList.push({
                        "taskType": obj.taskType,
                        'value': obj.value.website,
                        'previousState': obj.status,
                        'updatedState': obj.status,
                        'toEmail': obj.value.email,
                        'key': key
                    });
                }
            }

            if (localStorageList.length > 0) {
                APIUtility.sendEmail(localStorageList);
            }
        }
    }

    return {
        notifyUser: notifyUser,
        checkPendingNotifications: checkPendingNotifications
    }
}();