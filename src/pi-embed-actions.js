import {ReportEditor} from "./internal/report-editor.js";
import embedUtils from "./internal/utils/embed-utils.js";

/**
 * Main class for interacting with the embedded pi dashboard.
 * `PiEmbedActions` serves as the primary entry point for performing various actions within the embedded dashboard. It provides methods to interact with different
 * functional areas of the dashboard (e.g., report editor), enabling seamless control and dynamic interaction.
 * This class can be instantiated by using `createDashboard()` method.
 */
export class PiEmbedActions {
    iframe = null;
    iframeId = null;
    dashboardUrl = null; // e.g., https://pi-dev.uk:8224/pi?lang=en_GB&token=xxx&editorDisplayMode=CONTENT

    /**
     * @type {ReportEditor}
     */
    internalReportEditor = null;
    hasLoaded = false;

    assignInitialStateFn = () => {
        this.hasLoaded = true;
    };

    /**
     * Creates an instance of `PiEmbedActions` class.
     * This method does not load an instance of the dashboard, it validates and sets the required configuration for the embedded dashboard including its functional areas and features.
     * @static
     * @function
     * @name createDashboard
     * @memberof PiEmbedActions
     * @param {string} iframeId - The unique identifier for the iframe in which the dashboard is embedded.
     * @param {string} dashboardUrl - The URL for the dashboard.
     * ```text
     *    https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT
     *    |____| |_______|  |__|   |__________________________________|
     *      |        |       |                       |
     *   Protocol  Host    Port    List of query parameters in key-value format,
     *                                          separated by `&`
     * ```
     * `dashboardUrl` should include all necessary query parameters to prevent browser reloads when navigating between different functional areas in the dashboard.
     * Most common query parameters (optional):
     *
     * - **`locale`**: Dashboard language and regional settings (e.g., `lang=en_GB`).
     * - **`token`**: Secure access token for authentication (e.g., `token=xxx`).
     * - **`editorDisplayMode`**: Editor display mode (e.g., `editorDisplayMode=CONTENT`). See {@link EditorDisplayMode} for more details.
     *
     * @returns {PiEmbedActions}
     *
     * @example
     * // Basic example of how to create a dashboard instance and embed a Report Editor:
     * // 1. Create a dashboard instance, providing a valid iframeId and dashboardUrl.
     * const dashboard = PiEmbedActions.createDashboard('iframeId', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
     * // 2. Open a specific report in the editor, providing a valid report id.
     * dashboard.reportEditor.open(2);
     */
    static createDashboard(iframeId, dashboardUrl) {
        return new PiEmbedActions(iframeId, dashboardUrl);
    }

    constructor(iframeId, dashboardUrl) {
        if (!iframeId) throw new Error('iframeId is required to initialise the dashboard.');
        if (!dashboardUrl) throw new Error('dashboardUrl is required to initialise the dashboard.');
        if (!embedUtils.validateUrl(dashboardUrl)) throw new Error(`Invalid dashboard url: ${dashboardUrl}. Please consult the documentation for the expected URL structure.`);
        const iframe = document.getElementById(iframeId);
        if (!iframe) throw new Error(`Iframe with id "${iframeId}" not found.`);

        this.iframe = iframe;
        this.iframeId = iframeId;
        this.dashboardUrl = dashboardUrl;
        this.internalReportEditor = new ReportEditor(iframe, dashboardUrl, this.assignInitialStateFn);
    }

    /**
     * @namespace PiEmbedActions.reportEditor
     * @description A functional area for interacting with the Report Editor within the embedded pi dashboard.
     * This namespace provides access to functionalities available in the Report Editor.
     */
    reportEditor = {
        /**
         * Opens the Report Editor panel for a specific report by sending a post message to the embedded iframe to open the Report Editor UI for the given `itemId`.
         *
         * To use `open()` method, `PiEmbedActions` needs to be initiated, refer to {@link PiEmbedActions} for further information or check the code examples listed below.
         *
         * Note: The initial call to this method on `PiEmbedActions` will load the dashboard, while any subsequent calls to `open()` will avoid reloading the dashboard.
         * @function
         * @memberof PiEmbedActions.reportEditor
         * @param {number} itemId - The ID of the report to open in the editor.
         *
         * @see {@link https://github.com/Panintelligence/api-embed-example/blob/main/static_examples/embed_report_editor.html | Full Code Example}
         * @example
         * // 1. Create a dashboard instance, providing a valid iframeId and dashboardUrl.
         * // dashboardUrl must include a valid host, port, and query parameters.
         * const dashboard = PiEmbedActions.createDashboard('iframeId', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
         * // 2. Open a specific report in the editor, providing a valid report id.
         * dashboard.reportEditor.open(2);
         */
        open: (itemId) => {
            this.internalReportEditor.open(this.hasLoaded, itemId);
        },
    };
}