"use strict";

var APIUtility = (function () {

    var checkStatus = function checkWebSiteStatus(keys, isBackGroundTask) {

        // list which will be sent to API
        var localStorageList = [];
        var settingsObj = localStorageUtility.retriveItem("settings");

        // building json list for API
        keys.forEach(function (key) {
            var obj = localStorageUtility.retriveItem(key);

            localStorageList.push({
                "taskType": obj.taskType,
                'entity': obj.value.entity,
                'previousState': obj.previousStatus,
                'updatedState': obj.previousStatus,
                'toEmail': obj.value.email,
                'key': key
            });

            // updating status
            obj.status = config.taskStatus.checking;
            obj.unableToRetrive = false;
            localStorageUtility.updateItem(key, obj);

            // updating UI
            // We will not update the UI if it is a background task
            if (!isBackGroundTask) {
                UIUtility.updateStatus(key);
            }
        });

        var entitiesPerRequest = config.defaultSettings.entitiesPerRequest;

        var def = $.Deferred();
        var requests = [];

        for (var i = 0; i < Math.ceil(localStorageList.length / entitiesPerRequest); i++) {

            let items = localStorageList.slice(i * entitiesPerRequest, (i * entitiesPerRequest) + entitiesPerRequest);

            requests.push(

                    $.ajax({
                        method: "POST",
                        url: config.URL.statusURL,
                        dataType: "JSON",
                        contentType: "application/json",
                        data: JSON.stringify(items),
                        success: function (data) {

                            data.forEach(function (item) {

                                var updatedObj = localStorageUtility.retriveItem(item.Key);
                                updatedObj.sendEmail = false;

                                if (item.PreviousState == config.taskStatus.checking &&
                                    item.UpdatedState == config.taskStatus.dead) {
                                    // This condition executes when the entity is added for the first time and it fails
                                    updatedObj.sendEmail = true;
                                } else if (item.PreviousState != config.taskStatus.checking &&
                                    item.PreviousState != item.UpdatedState) {
                                    updatedObj.sendEmail = true;
                                }

                                updatedObj.status = item.UpdatedState;
                                updatedObj.previousStatus = item.UpdatedState;

                                updatedObj.unableToRetrive = false;

                                localStorageUtility.updateItem(item.Key, updatedObj);

                                if (!isBackGroundTask) {
                                    UIUtility.updateStatus(item.Key);
                                }
                            });
                        },
                        error: function (data) {

                            items.forEach(function (item) {

                                var obj = localStorageUtility.retriveItem(item.key);

                                // updating status
                                obj.unableToRetrive = true;
                                obj.status = config.taskStatus.unableToFetch;

                                localStorageUtility.updateItem(item.key, obj);

                                // updating UI
                                // We will not update the UI if it is a background task
                                if (!isBackGroundTask) {
                                    UIUtility.updateStatus(item.key);
                                }

                            });

                        }
                    })
            )
        }

        $.when.apply($, requests).then(function () {
            def.resolve();
        }).catch(function(error){
            def.reject(error);
        });

        return def.promise();
    }

    var sendEmail = function sendEmail(list) {

        $.ajax({
            method: "POST",
            url: config.URL.emailURL,
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify(list),
            success: function (data) {

                list.forEach(function (item) {

                    var updatedObj = localStorageUtility.retriveItem(item.key);
                    updatedObj.sendEmail = false;
                    localStorageUtility.updateItem(item.key, updatedObj);

                });
            },
            error: function (data) {
                helperUtility.logMessage(data, config.messageType.error);
            }
        });
    }

    return {
        checkStatus: checkStatus,
        sendEmail: sendEmail
    }

})();