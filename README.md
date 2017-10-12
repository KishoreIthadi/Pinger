<p align="center">
  <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/PingerHeadFile.png"/>
</p>

<p float="left">
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/Websitereadme.PNG" width="280" />
  </kbd>
  
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/SettingsReadme_size.PNG" width="280" /> 
  </kbd>
  
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/remotedbreadme.PNG" width="280" />
  </kbd>
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
* [Contribute](CONTRIBUTION.md)
* [License](License)

---

### **What is PINGER?**
**Pinger is a simple but elegant chrome browser extension to monitor the status of a remote server, website or a remoteDB from your chrome browser.**

---

### **Features**
- Pinger let's you check the status and be notified about the status of any remote server, desktop, website or a remoteDB.

- Pinger notifies you on chrome by push notification as well as via email.

- Pinger allows you to customize the time interval.

- **Note**:
    >- **Pinger will run a chrome background process even if you shut the chrome. You can notice the same in the notification tray in the taskbar.**
    >- **Ensure that you never refer an entity by `localhost` instead give your `IP Address`.**

#### **Status Icons**
- The following table consists of the status icons and what exactly they depict.
 
    <table>
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/loader.gif"/>
        </td>
        <td>Waiting for the response</td>
      </tr>
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/failed.png"/>
        </td>
        <td>Entity is down and polling is done periodically</td>
      </tr>
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/succeeded.png"/>
        </td>
        <td>Entity is Up and polling is done periodically</td>
      </tr> 
      <tr>
        <td>
          <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/UnableToRetrive.jpg"/>
        </td>
        <td>The Pinger Api couldn't reach the entity and polls periodically</td>
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
    - Click on the `Add` Button to add the URL and Email to notify in the respective fields.
    - - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval**).
    
    - **Example**:
    >- **Entity: `https://google.com` (Note: default protocol is `http` and default portnumber is `8080`)**

    **Checkout the following gif to see the functionality graphically.**
    
<p align="center">
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/gifs/website_gif.gif"/>
  </kbd>
</p>

---

#### Server
- **Adding a `Remote Server` to monitor the status**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Remote Server` tab.
    - Click on the `Add` Button to add the entity with the Portnumber and EmailID in the respective fields.(Tooltips helps you with the default Port numbers)
    - **Example**:
    >- **Entity: `10.211.0.118:62949` (Note: default portnumber for Windows server is  `3389` and for Linux, it is `22`)**
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval**).
    
    **Checkout the following gif to see the functionality graphically.**

<p align="center">
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/gifs/remote_server_gif.gif"/>
  </kbd>
</p>

---

#### RemoteDB
- **Adding a `Remote DataBase` to monitor the status**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Remote DB` tab.
    - Click on the `Add` Button to add the URL with the Portnumber and Email to notify.(Tooltips helps you with the default Port numbers)
    - **Example**:
    >- **Entity: `192.168.1.96:1433` (Note: default portnumber for Sql server is  `1433` and for Oracle, it is `1521`)**
    - The extension polls the entity for every `5` min by default. (**how to [change](#settings) the polling interval?**).
    
    **Checkout the following gif to see the functionality graphically.**

<p align="center">
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/gifs/remote_db_gif.gif"/>
  </kbd>
</p>

---

#### Settings
- **To Change/Reset the `Settings` of Pinger**
    - Click on the Pinger Icon in the chrome menu to use the extension.
    - By default the `Website` tab is selected, so head to the `Settings` tab.
    - Add Global Email Address
        - **Global Email address** is used as a default notifying emailID for all the entities across all the tabs. **(NOTE: This field accepts any number of values separated by comma `,`)**
        - Fill in with the emailID in that respective field.
        
        - **Run Interval In Minutes** field is used as time interval to poll the servers.
        - Use the navigation button to increase/decrease *(or)* Fill in with custom number of minutes. By default it is `5` mins and the number **cannot be less than `5`**.
        
        - **Enable Desktop Notifications** checkbox is used to  enable/disable desktop notifications.
        
        - **Reset Pinger Plugin** Button is used to reset the plugin. **(Note: you may loose all the data entered )**
        
        **Checkout the following gif to see the functionality graphically.**

<p align="center">
  <kbd>
    <img src="https://raw.githubusercontent.com/ShekharReddy4/Pinger/develop/PingerExtension/src/images/gifs/settings_gif.gif"/>
  </kbd>
</p>

---

## Contribute                                         
Contributions are always welcome!
Please read the contribution guidelines [here](contribution.md).

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
