"use strict";

var UIUtility = function () {

    function updateStatus(key) {

        var obj = localStorageUtility.retriveItem(key);
        var updatingRow = document.getElementById(key);

        if (obj.taskType == config.taskType.webSite) {
            updatingRow.getElementsByTagName("input")[0].setAttribute('data-original-title', obj.value.website);
            updatingRow.getElementsByTagName("input")[1].setAttribute('data-original-title', obj.value.email);
        }
        //TODO for database and server

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

        toolTip += ", nextRunAt: " + helperUtility.formatDate(new Date(obj.nextRunAt));
        img.setAttribute('data-original-title', toolTip);
    }

    function populateUI() {

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
                    switch (obj.taskType) {
                        case config.taskType.webSite:
                            addWebsite(key, obj);
                            break;
                        case config.taskType.server:
                            //TODO
                            break;
                        case config.taskType.database:
                            //TODO
                            break;
                    }
                }
            }
        }
    }

    // Adds new row into tblWesite UI for user to add new website
    // This method is used for populating new UI ad also populating ui with existing data
    function addWebsite(rowID, data) {

        //Disabling btnAddNewRow until the existing row gets valid
        var btnAddWebSite = document.getElementById("btnAddWebSite");
        btnAddWebSite.disabled = true;

        var settings = localStorageUtility.retriveItem("settings");

        var dataObj = {
            "webSite": '',
            "email": settings != null ? settings.globalEmail : '',
            "imageSrc": '',
            rowID: '',
            unableToRetrive: data == null ? false : data.unableToRetrive,
            statusToolTip: ''
        }

        if (data != null) {
            dataObj.webSite = data.value.website;
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

            dataObj.statusToolTip += ", nextRunAt:" + helperUtility.formatDate(new Date(data.nextRunAt));
            btnAddWebSite.disabled = false;
        }

        if (rowID == null || rowID == 'undefined') {
            dataObj.rowID = helperUtility.getGUID();
        } else {
            dataObj.rowID = rowID;
        }

        var tableID = "tblWebSite";
        var table = document.getElementById(tableID);

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = dataObj.rowID;

        var cellWebsite = row.insertCell(0);
        var elementWebSite = document.createElement("input");
        elementWebSite.setAttribute('data-original-title',
            dataObj.webSite == '' ? "http://google.com" : dataObj.webSite);

        elementWebSite.className = "form-control customToolTip";
        elementWebSite.placeholder = "URL or IP";
        elementWebSite.value = dataObj.webSite;
        cellWebsite.appendChild(elementWebSite);

        var cellEmail = row.insertCell(1);
        var elementEmail = document.createElement("input");
        elementEmail.setAttribute('data-original-title',
            dataObj.email == '' ? "email@gmail.com" : dataObj.email);
        elementEmail.className = "form-control customToolTip";
        elementEmail.placeholder = "Email seperated by ,";
        elementEmail.value = dataObj.email;
        cellEmail.appendChild(elementEmail);

        var cellValidation = row.insertCell(2);
        var elementValImage = document.createElement("img");
        elementValImage.src = dataObj.imageSrc;
        elementValImage.className = "customToolTip";
        elementValImage.setAttribute('data-original-title', dataObj.statusToolTip);
        cellValidation.appendChild(elementValImage);

        var cellSave = row.insertCell(3);
        var elementSave = document.createElement("button");
        elementSave.type = "button";
        elementSave.className = "btn btn-info glyphicon glyphicon-ok btn-sm";
        elementSave.addEventListener('click', function () {

            elementWebSite.classList.remove('valFailedBoder');
            elementEmail.classList.remove('valFailedBoder');

            var validateWebSite = validationUtility.validateWebsite(elementWebSite.value);
            var validateEmail = validationUtility.validateEmail(elementEmail.value);

            var errorMessage = '';

            var isValid = true;

            if (validateWebSite != '') {
                isValid = false;
                elementWebSite.classList.add('valFailedBoder');
                errorMessage = validateWebSite;
            }
            if (validateEmail != '') {
                isValid = false;
                elementEmail.classList.add('valFailedBoder');
                errorMessage = errorMessage != '' ? (errorMessage + ', ' + validateEmail) : validateEmail;
            }

            document.getElementById('lblWebsiteVal').innerHTML = errorMessage;

            //TODO Check if this website already exists in the current list
            // Check for multiple scenarions with http://, without http:// etc
            if (isValid) {

                elementWebSite.setAttribute('data-original-title', elementWebSite.value);
                elementEmail.setAttribute('data-original-title', elementEmail.value);

                // adding space after coma(,). This is needed for multilined tooltip

                var updateEmail = elementEmail.value.replace(/,/g, ", ");

                localStorageUtility.addTask(row.id,
                    config.taskType.webSite, {
                        'website': elementWebSite.value.toLowerCase(),
                        'email': updateEmail.toLowerCase()
                    })

                APIUtility.checkWebSiteStatus([row.id], false);

                elementWebSite.classList.remove('valFailedBoder');
                elementEmail.classList.remove('valFailedBoder');

                elementWebSite.disabled = true;
                elementEmail.disabled = true;
                elementSave.disabled = true;

                btnAddWebSite.disabled = false;
            }
        });
        cellSave.appendChild(elementSave);

        var cellCancel = row.insertCell(4);
        var elementCancel = document.createElement("button");
        elementCancel.type = "button";
        elementCancel.className = "btn btn-danger glyphicon glyphicon-remove btn-sm";
        elementCancel.addEventListener('click', function () {

            document.getElementById('lblWebsiteVal').innerHTML = '';

            localStorageUtility.deleteItem(row.id);

            var tblWebSite = document.getElementById('tblWebSite');
            var lastRow = tblWebSite.rows[tblWebSite.rows.length - 1];

            if (lastRow.id == dataObj.rowID) {
                btnAddWebSite.disabled = false;
            }

            $(this).closest('tr').remove();
        });

        cellCancel.appendChild(elementCancel);

        if (data != null) {
            elementEmail.disabled = true;
            elementWebSite.disabled = true;
            elementSave.disabled = true;
        }
    }

    function addServer(rowID, data) {
        //TODO
    }

    function addDB(rowID, data) {
        //TODO
    }

    return {
        updateStatus: updateStatus,
        populateUI: populateUI,
        addWebsite: addWebsite,
        addServer: addServer,
        addDB: addDB
    }
}();