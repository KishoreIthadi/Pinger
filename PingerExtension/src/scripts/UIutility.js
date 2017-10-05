"use strict";

var UIUtility = function () {

    var updateStatus = function (key) {

        var obj = localStorageUtility.retriveItem(key);
        var updatingRow = document.getElementById(key);

        updatingRow.getElementsByTagName("input")[0].setAttribute('data-original-title', obj.value.entity);
        updatingRow.getElementsByTagName("input")[1].setAttribute('data-original-title', obj.value.email);
        updatingRow.getElementsByTagName("input")[1].placeholder = '';

        var img = updatingRow.getElementsByTagName('img')[0];
        var toolTip = '';

        if (obj.unableToRetrive) {
            img.src = "/images/UnableToRetrive.jpg";
            toolTip = 'Status: Unable To Retrive';
        } else {
            if (obj.status == config.taskStatus.alive) {
                img.src = "/images/succeeded.png";
                toolTip = "Status: Alive";
            } else if (obj.status == config.taskStatus.checking) {
                img.src = "/images/loader.gif";
                toolTip = 'Status: Checking';
            } else if (obj.status == config.taskStatus.dead) {
                img.src = "/images/failed.png";
                toolTip = 'Status: Dead';
            }
        }

        //toolTip += ", nextRunAt: " + helperUtility.formatDate(new Date(obj.nextRunAt));

        var settings = localStorageUtility.retriveItem("settings");
        toolTip += ", nextRunAt: " + helperUtility.formatDate(new Date(settings.nextRunAt));

        img.setAttribute('data-original-title', toolTip);
    }

    var populateUI = function () {

        var localStorageKeys = localStorageUtility.retriveAllKeys();

        if (localStorageKeys.length > 0) {

            for (var i = 0; i < localStorageKeys.length; i++) {

                var key = localStorageKeys[i];
                var obj = localStorageUtility.retriveItem(key);

                if (key == "settings") {

                    document.getElementById('txtGolbalEmail').value = obj.globalEmail;
                    document.getElementById('txtRunInterval').value = obj.interval
                    document.getElementById('cbEnableNotifications').checked = obj.enableNotifications;

                } else {
                    addEntity(key, obj, obj.taskType);
                }
            }
        }
    }

    // This method is used for populating new UI and also populating ui with existing data
    var addEntity = function (rowID, data, type) {

        //Disabling btnAddNewRow until the existing row gets valid
        var btnAdd = null;
        var table = null;
        var validationLbl = null;

        var placeholder = null;
        var tooltip = null;


        switch (type) {
            case config.taskType.webSite:
                btnAdd = document.getElementById("btnAddWebSite");
                table = document.getElementById("tblWebSite");
                validationLbl = document.getElementById('lblWebsiteVal');
                placeholder = "URL or IP";
                tooltip = "http://google.com";
                break;
            case config.taskType.server:
                btnAdd = document.getElementById("btnAddServer");
                table = document.getElementById("tblServer");
                validationLbl = document.getElementById('lblServerVal');
                placeholder = "IP:port";
                tooltip = "Default Port Windows:3389, Linux:22";
                break;
            case config.taskType.database:
                btnAdd = document.getElementById("btnAddDB");
                table = document.getElementById("tblDB");
                validationLbl = document.getElementById('lblDBVal');
                placeholder = "IP:port";
                tooltip = "Default Port SQL Server:1433, Oracle: 1521";
        }

        btnAdd.disabled = true;

        var settings = localStorageUtility.retriveItem("settings");

        var dataObj = {
            "entity": '',
            "email": settings != null ? settings.globalEmail : '',
            "imageSrc": '',
            rowID: '',
            unableToRetrive: data == null ? false : data.unableToRetrive,
            statusToolTip: ''
        }

        if (data != null) {
            dataObj.entity = data.value.entity;
            dataObj.email = data.value.email;
            dataObj.status = data.value.status;

            if (dataObj.unableToRetrive) {
                dataObj.imageSrc = "/images/UnableToRetrive.jpg";
                dataObj.statusToolTip = 'Status: Unable To Retrive';
            } else if (data.status == config.taskStatus.alive) {
                dataObj.statusToolTip = "Status: Alive";
                dataObj.imageSrc = '/images/succeeded.png';
            } else if (data.status == config.taskStatus.checking) {
                dataObj.statusToolTip = "Status: Checking";
                dataObj.imageSrc = '/images/loader.gif';
            } else {
                dataObj.statusToolTip = "Status: Dead";
                dataObj.imageSrc = '/images/failed.png';
            }

            dataObj.statusToolTip += ", nextRunAt:" + helperUtility.formatDate(new Date(settings.nextRunAt));
            btnAdd.disabled = false;
        }

        if (rowID == null || rowID == 'undefined') {
            dataObj.rowID = helperUtility.getGUID();
        } else {
            dataObj.rowID = rowID;
        }

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = dataObj.rowID;

        var cellEntity = row.insertCell(0);
        var elementEntity = document.createElement("input");
        elementEntity.setAttribute('data-original-title', dataObj.entity == '' ? tooltip : dataObj.entity);

        elementEntity.className = "form-control customToolTip";
        elementEntity.placeholder = placeholder;
        elementEntity.value = dataObj.entity;
        cellEntity.appendChild(elementEntity);

        var cellEmail = row.insertCell(1);
        var elementEmail = document.createElement("input");
        elementEmail.setAttribute('data-original-title',
            dataObj.email == '' ? "email@gmail.com" : dataObj.email);
        elementEmail.className = "form-control customToolTip";
        elementEmail.placeholder = ", seperated emails";
        elementEmail.value = dataObj.email;
        cellEmail.appendChild(elementEmail);

        var cellValidation = row.insertCell(2);
        var elementValImage = document.createElement("img");
        elementValImage.src = dataObj.imageSrc;
        elementValImage.className = "customToolTip";
        elementValImage.id = "imgStatus";
        elementValImage.setAttribute('data-original-title', dataObj.statusToolTip);
        cellValidation.appendChild(elementValImage);

        var cellSave = row.insertCell(3);
        var elementSave = document.createElement("button");
        elementSave.type = "button";
        elementSave.className = "btn btn-info glyphicon glyphicon-ok btn-sm";
        elementSave.addEventListener('click', function () {

            elementEntity.classList.remove('valFailedBoder');
            elementEmail.classList.remove('valFailedBoder');

            var validateEntity = validationUtility.validateEntity(elementEntity.value, type);
            var validateEmail = validationUtility.validateEmail(elementEmail.value);

            var errorMessage = '';

            var isValid = true;

            if (validateEntity != '') {
                isValid = false;
                elementEntity.classList.add('valFailedBoder');
                errorMessage = validateEntity;
            }
            if (validateEmail != '') {
                isValid = false;
                elementEmail.classList.add('valFailedBoder');
                errorMessage = errorMessage != '' ? (errorMessage + ', ' + validateEmail) : validateEmail;
            }

            validationLbl.innerHTML = errorMessage;

            //TODO Check if this website already exists in the current list
            // Check for multiple scenarions with http://, without http:// etc
            if (isValid) {

                elementEntity.setAttribute('data-original-title', elementEntity.value);
                elementEmail.setAttribute('data-original-title', elementEmail.value);

                // adding space after coma(,). This is needed for multilined tooltip
                var updateEmail = elementEmail.value.replace(/,/g, ", ");

                localStorageUtility.addTask(row.id,
                    type, {
                        'entity': elementEntity.value.toLowerCase(),
                        'email': updateEmail.toLowerCase()
                    })

                APIUtility.checkStatus([row.id], false);

                elementEntity.classList.remove('valFailedBoder');
                elementEmail.classList.remove('valFailedBoder');

                elementEntity.disabled = true;
                elementEmail.disabled = true;
                elementSave.disabled = true;

                btnAdd.disabled = false;
            }
        });
        cellSave.appendChild(elementSave);

        var cellCancel = row.insertCell(4);
        var elementCancel = document.createElement("button");
        elementCancel.type = "button";
        elementCancel.className = "btn btn-danger glyphicon glyphicon-remove btn-sm";
        elementCancel.addEventListener('click', function () {

            validationLbl.innerHTML = '';

            localStorageUtility.deleteItem(row.id);

            var lastRow = table.rows[table.rows.length - 1];

            if (lastRow.id == dataObj.rowID) {
                btnAdd.disabled = false;
            }

            $(this).closest('tr').remove();
        });

        cellCancel.appendChild(elementCancel);

        if (data != null) {
            elementEmail.disabled = true;
            elementEmail.placeholder = ''
            elementEntity.disabled = true;
            elementSave.disabled = true;
        }
    }

    return {
        updateStatus: updateStatus,
        populateUI: populateUI,
        addEntity: addEntity
    }
}();