![Logo Image](./static/logo.png)

## Pi Embed Actions

-----------------

`pi-embed-actions` is a lightweight JavaScript library designed to simplify interactions between your application and the Pi app embedded within an iframe. It offers a straightforward API to execute actions directly within the embedded Pi app, reducing the need for manual input and simplifying the integration of 
Pi into your app.

The library acts as a wrapper to facilitate various actions, such as opening a report editor, with plans to introduce additional actions in the future to further automate tasks and enhance the API’s capabilities.
<br>
<br>

### Installation

-----------------

#### Prerequisites

> **Note:** You must have npm installed on your machine.

You can verify this by running the following commands in your terminal:

```shell
 npm -v
```

#### Install pi-embed-actions

```shell
 npm install pi-embed-actions --save-dev
```



### Example Usage:

-----------------

```shell
 const dashboard = PiEmbedActions.createDashboard('iframeId', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
 dashboard.reportEditor.open(2);
```

