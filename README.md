![Logo Image](./static/logo.png)

## Pi Embed Actions

-----------------

`pi-embed-actions` is a lightweight JavaScript library designed to streamline interactions between your application and the embedded Pi application within an iframe. The library provides a simple API interface for calling direct actions on the embedded Pi app, reducing the need for manual user intervention and simplifying the process of embedding Pi into your application.

This library serves as a wrapper to perform a variety of actions that can be triggered from your app, such as opening a report editor. In the future, more actions will be added to further automate embedding tasks and expand the capabilities of this API.
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
 dashboard.reportEditor.open(123);
```

