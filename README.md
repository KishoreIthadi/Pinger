<p align="center">
  <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/PingerHeadFile.png"/>
</p>

---


## Table of Contents
* [What is **PINGER**?](#what-is-pinger)
* [Features](#features)
* [Install the extension](#install-the-extension)
    * [Chrome WebStore](#chrome-webstore)
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
- Pinger let's you check the status and be notified about the status of any remote server, website or a remoteDB.

- Pinger notifies you on chrome by push notification as well as via email.

- Pinger allows you to customize the time interval.

- **Note**:
    >- **Pinger will run a chrome background process even if you shut the chrome. You can notice the same in the notification tray in the taskbar.**
    <p align = "center">
    <img   src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/Pinger_Win_BG_Processes.PNG">
    </p>
    
    >- **Pinger works for only publicly exposed entities, if you want it to work for local entities host your own API which you can find in `PingerAPI` directory.**
    >- **Ensure that you never refer an entity by `localhost` instead give your `IP Address`.**
    >- **if you clear the history of your chrome browser pinger will get reset, you will loose all your data existing in the pinger extension.**

#### **Status Icons**
- The following table consists of the status icons and what exactly they depict.
 
    <table>
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/loader.gif"/>
        </td>
        <td>**Waiting for the response**</td>
      </tr>
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/failed.png"/>
        </td>
        <td>**Entity is down and polling is done periodically**</td>
      </tr>
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/succeeded.png"/>
        </td>
        <td>**Entity is Up and polling is done periodically**</td>
      </tr> 
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/UnableToRetrive.jpg"/>
        </td>
        <td>**Pinger Extension couldn't reach the Pinger API(Check your Internet connection)**</td>
      </tr>
    </table>
    

---

### **Install the Extension**

You can install the **Pinger** from chrome WebStore or using the developer mode option on chrome settings.

#### Chrome webstore
[![get from chrome web store](https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/available_on_chrome_web_store.png)](https://chrome.google.com/webstore/category/extensions)

---

### **How to use pinger?**

#### Website
- **Adding a `Website` to monitor the status**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected.
    - Click on the `Add` Button to add the Entity and Email(optional) to notify in the respective fields.
    - - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval**).
    
    - **Example**:
    >- **Entity: `https://google.com` (Note: default protocol is `http` and default portnumber is `8080`)**

---

#### Server
- **Adding a `Remote Server` to monitor the status**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Remote Server` tab.
    - Click on the `Add` Button to add the Entity with the Portnumber(manadatory) and EmailID(optional) in the respective fields.(Tooltips helps you with the default Port numbers)
    - **Example**:
    >- **Entity: `10.211.0.118:3389` (Note: if you are trying to keep track of a windows machine the default portnumber would be `3389` and for Linux, it is `22`)**
    >- **Entity: `10.211.0.118:62949` (Note: the potnumber could be any valid port)**
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval**).

---

#### RemoteDB
- **Adding a `Remote DataBase` to monitor the status**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Remote DB` tab.
    - Click on the `Add` Button to add the Entity with the Portnumber(manadatory) and Email(optional) to notify.(Tooltips helps you with the default Port numbers)
    - **Example**:
    >- **Entity: `192.168.1.96:1433` (Note: if you are trying to keep track of a Sql server the default portnumber would be `1433` and for Oracle, it is `1521`)**
    >- **Entity: `192.168.1.96:19323` (Note: the potnumber could be any valid port)**
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval?**).

---

#### Settings
- **To Change/Reset the `Settings` of Pinger**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Settings` tab.
    - Add Global Email Address
        - **Global Email address** is used as a default notifying emailID for all the entities across all the tabs. **(NOTE: This field accepts any number of values separated by comma `,` and not more than `5` values)**
        - Fill in with the emailID in that respective field.
        
        - **Run Interval In Minutes** field is used as time interval to poll the servers.
        - Use the navigation button to increase/decrease *(or)* Fill in with custom number of minutes. By default it is `5` mins and the number **cannot be less than `5` and more than `180`**.
        
        - **Enable Desktop Notifications** checkbox is used to  enable/disable desktop notifications.
        
        - **Reset Pinger Plugin** Button is used to reset the plugin. **(Note: you may loose all the data entered )**

---

## Contribute                                         
Contributions are always welcome!
Please read the contribution guidelines [here](contribution.md).

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)