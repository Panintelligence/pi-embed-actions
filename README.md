![Logo Image](./static/logo.png)

## Introduction

`pi-embed-actions` is a lightweight JavaScript library designed to simplify interactions with the embedded pi dashboard.
It provides an intuitive API to execute actions directly within the dashboard, minimising manual effort and making integrating pi into your application easier.

## Installation

Currently, `pi-embed-actions` is available only as a minified JavaScript file, which can be downloaded as an artifact from the [GitHub Releases](https://github.com/Panintelligence/pi-embed-actions/releases) page.

To use the library:

1. Go to the [GitHub Releases](https://github.com/Panintelligence/pi-embed-actions/releases).
2. Download the latest version of `pi-embed-actions.min.js`.
3. Add the downloaded file to your project and reference it in your code:

```html
<script src="path/to/pi-embed-actions.min.js"></script>
```

We plan to introduce additional file formats (e.g., modular versions) in future updates to accommodate a wider range of use cases.

## Documentation

Please refer to our [documentation](https://panintelligence.github.io/pi-embed-actions/) for details on how to use this library.

## Examples
<br>

### Basic Usage:
```shell
const dashboard = PiEmbedActions.createDashboard('iframeId', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
dashboard.reportEditor.open(2);
```

### Further examples:

Check our [api-embed-example project](https://github.com/Panintelligence/api-embed-example/tree/main/static_examples) for examples.

