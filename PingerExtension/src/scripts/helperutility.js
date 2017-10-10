"use strict";

var helperUtility = (function () {

    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function getGUID() {
        var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase()

        //Checking to see if the generated GUID already exists or not
        if (localStorageUtility.retriveItem(guid) === null) {
            return guid;
        } else {
            getGUID();
        }
    }

    var logMessage = function (message, type) {

        if (type == config.messageType.log) {
            console.log(message);
        } else if (type == config.messageType.error) {
            console.error(message);
        }

    }

    var getEntityCount = function (taskType) {

        var localStorageKeys = localStorageUtility.retriveAllKeys();
        var count = 0;

        if (localStorageKeys.length > 0) {

            for (var i = 0; i < localStorageKeys.length; i++) {

                var key = localStorageKeys[i];

                if (key != "settings") {
                    var obj = localStorageUtility.retriveItem(key);

                    if (obj.taskType == taskType) {
                        count++;
                    }
                }
            }

        }

        return count;
    }

    var formatDate = function formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        var strTime = hours + ':' + minutes + ':' + seconds;
        return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
    }

    return {
        getGUID: getGUID,
        logMessage: logMessage,
        formatDate: formatDate,
        getEntityCount: getEntityCount
    }

})();