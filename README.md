<p align="center">
  <img src="MD-Resources/PingerHeadFile.png"/>
</p>

---

<p align="center">
  <img src="MD-Resources/Pinger_BlackBorder.gif"/>
</p>

---

## Table of Contents
* [What is **PINGER**?](#what-is-pinger)
* [Features](#features)
* [Install the extension](#install-the-extension)
    * [Chrome WebStore](#chrome-web-store)
* [How to Use Pinger?](#how-to-use-pinger)
    * [Check status of a Website](#website)
    * [Check the status of a Server](#server)
    * [Check the status of a RemoteDB](#remotedb)
    * [Customize Pinger by updating the settings](#settings)
* [Contribute](#contribute)
* [License](#license)

---

### **What is PINGER?**
**Pinger is a simple but elegant chrome browser extension to monitor the status of a remote server, website or a remoteDB from your chrome browser.**

---

### **Features**
- Pinger lets you check the status and be notified about the status of any remote server, website or a remoteDB.

- Pinger notifies you on chrome by push notification as well as via email.

- Pinger allows you to configure how frequently you want to check the status.

- **Note**:
    >- **Pinger will run in the background even when the browser is closed. When running in the background an icon is added in the notification tray of the task bar**
    
    <p align = "center">
      <img src = "MD-Resources/NotificationTray.png">
    </p>
    
    >- **Pinger will only track the status of IP's and URL's which are publicly exposed. Therefore you will not be able to track the IP's and localhost within your domain.**
    >- **If you clear the history of your chrome browser pinger will get reset, you will lose all your existing data in the pinger extension.**

#### **Status Icons**
- The following table consists of the status icons and what exactly they depict.
 
    <table>
      <tr>
        <td>
          <img src="PingerExtension/src/images/loader.gif"/>
        </td>
        <td><b>Waiting for the response</b></td>
      </tr>
      <tr>
        <td>
          <img src="PingerExtension/src/images/failed.png"/>
        </td>
        <td><b>Entity is down and polling is done periodically</b></td>
      </tr>
      <tr>
        <td>
          <img src="PingerExtension/src/images/succeeded.png"/>
        </td>
        <td><b>Entity is Up and polling is done periodically</b></td>
      </tr> 
      <tr>
        <td>
          <img src="PingerExtension/src/images/UnableToRetrive.jpg"/>
        </td>
        <td><b>Pinger Extension couldn't reach the Pinger API(Check your Internet connection)</b></td>
      </tr>
    </table>
    

---

### **Install the Extension**

You can install the **Pinger** from chrome WebStore or using the developer mode option on chrome settings.

#### Chrome Web store
[![get from chrome web store](/MD-Resources/WebStore.png)](https://chrome.google.com/webstore/detail/pinger/jcoegkmjenfpgmkoeomahaioddaajfdk)

---

### **How to use pinger?**

#### Website
- **Adding a `Website` to monitor the status**
    - Click on the Pinger icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected.
    - Click on the `Add` Button to add the Entity and email(optional) to notify in the respective fields.
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval**).
    - **Example**:
    >- **Entity: `https://google.com` (Note: default protocol is `http` and default port number is `8080`)**
    >- **Entity: `216.58.197.46:8080`**

---

#### Server
- **Adding a `Remote Server` to monitor the status**
    - Click on the Pinger icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Remote Server` tab.
    - Click on the `Add` Button to add the Entity with the Port number (mandatory) and email (optional) in the respective fields.(Tooltip helps you with the default Port numbers)
    - **Example**:
    >- **Entity: `10.211.0.118:3389` (Note: if you are trying to keep track of a windows machine the default port number would be `3389` and for Linux, it is `22`)**
    >- **Entity: `10.211.0.118:62949` (Note: the port number could be any valid port)**
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval**).

---

#### RemoteDB
- **Adding a `Remote DataBase` to monitor the status**
    - Click on the Pinger icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Remote DB` tab.
    - Click on the `Add` Button to add the Entity with the Port number(mandatory) and email(optional) to notify.(Tooltip helps you with the default Port numbers)
    - **Example**:
    >- **Entity: `192.168.1.96:1433` (Note: if you are trying to keep track of a Sql server the default port number would be `1433` and for Oracle, it is `1521`)**
    >- **Entity: `192.168.1.96:19323` (Note: the port number could be any valid port)**
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval?**).

---

#### Settings
- **To Change/Reset the `Settings` of Pinger**
    - Click on the Pinger icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Settings` tab.
    - Add Global Email Address
        - **Global Email address** is used as a default notifying email for all the entities across all the tabs. **(NOTE: This field accepts maximum of `5` emails separated by `,`)**
        - **Run Interval In Minutes** field allows you to configure how frequently you want to track the status. **(NOTE: Use the navigation buttons to increase/decrease *(or)* Fill in with custom number of minutes. By default it is `5` mins and the number cannot be less than `5` and more than `180`)**
        - **Enable Desktop Notifications** checkbox is used to  enable/disable desktop notifications.
        - **Reset Pinger Plugin** Button is used to reset the plugin. **(Note: you may lose all the data entered )**

---

## Contribute                                         
Contributions are always welcome!
Please read the contribution guidelines [here](CONTRIBUTION.md).

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
