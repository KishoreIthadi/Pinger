"use strict";

var config = (function () {

    var defaultSettings = {
        defaultInterval: 5,
        enableNotifications: true,
        notificationInterval: 5,
        maxWebsiteCount: 10,
        maxServerCount: 10,
        maxDBCount: 10,
        maxEmailLength: 5,
        minInterval: 5,
        maxInterval: 180,
        entitiesPerRequest: 5,
        analyticCode: ''
    };

    var taskStatus = {
        alive: 1,
        checking: 2,
        dead: 3,
        unableToFetch: 4
    };

    var taskType = {
        webSite: 1,
        server: 2,
        database: 3,
        settings: 4
    };

    var notificationType = {
        success: 1,
        failure: 2,
        info: 3
    };

    var baseURL = "http://localhost:62949/api";

    var URL = {
        baseURL: baseURL,
        statusURL: baseURL + "/Task/CheckTaskStatus",
        emailURL: baseURL + "/Email/SendEmail"
    };

    var validation = {
        success: 1,
        failure: 2,
        validationFailed: 3
    }

    var messageType = {
        log: 1,
        error: 2
    };

    return {
        taskStatus: taskStatus,
        taskType: taskType,
        URL: URL,
        validation: validation,
        defaultSettings: defaultSettings,
        notificationType: notificationType,
        messageType: messageType
    }

})();