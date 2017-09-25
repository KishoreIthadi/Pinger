"use strict";

var localStorageUtility = (function () {

    // This function is used to add new website,server,db entity
    function addTask(key, taskType, value) {

        var obj = {
            "taskType": taskType,
            "value": value,
            "status": config.taskStatus.checking,
            "previousStatus": config.taskStatus.checking,
            "unableToRetrive": false,
            "createdAt": new Date(),
            "lastRunAt": new Date(),
            "nextRunAt": new Date(),
            "sendEmail": false
        }

        localStorage.setItem(key, JSON.stringify(obj));
    }

    function addItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function deleteItem(key) {
        localStorage.removeItem(key);
    }

    function updateItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function retriveItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function retriveAllKeys() {

        var localStorageKeys = [];

        if (localStorage.length > 0) {

            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                localStorageKeys.push(key);
            }
        }

        return localStorageKeys;
    }

    function resetLocalStorage() {
        localStorage.clear();
    }

    return {
        addTask: addTask,
        addItem: addItem,
        updateItem: updateItem,
        deleteItem: deleteItem,
        retriveItem: retriveItem,
        retriveAllKeys: retriveAllKeys,
        resetLocalStorage: resetLocalStorage
    }

})();