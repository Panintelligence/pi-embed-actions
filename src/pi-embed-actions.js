import {ReportEditor} from "./internal/report-editor.js";
import embedUtils from "./internal/utils/embed-utils.js";

/**
 * Main class for interacting with embedded pi dashboard.
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
     * Initialises a `PiEmbedActions` instance for embedding a dashboard.
     * This method sets up the required configuration for interacting with the embedded dashboard, including its functional areas and features, without automatically starting it.
     * @static
     * @function
     * @name createDashboard
     * @memberof PiEmbedActions
     * @param {string} iframeId - The unique identifier for the iframe in which the dashboard is embedded.
     * @param {string} dashboardUrl - The URL for the dashboard. `dashboardUrl` should include all necessary query parameters to avoid triggering browsers reloads when navigating between different functional areas in the dashboard.
     * Most common query parameters:
     *
     * - **`locale`**: Dashboard language and regional settings (e.g., `lang=en_GB`).
     * - **`token`** (optional): Secure access token for authentication.
     * - **`editorDisplayMode`** (optional): Editor display mode (e.g., editorDisplayMode=CONTENT). See {@link EditorDisplayMode} for more details.
     * @returns {PiEmbedActions} `PiEmbedActions` instance that is used to interact with the embedded dashboard.
     *
     * @example
     * const dashboard = PiEmbedActions.createDashboard('iframeId', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
     * dashboard.reportEditor.open(2); // Open report editor for item with ID 2.
     */
    static createDashboard(iframeId, dashboardUrl) {
        return new PiEmbedActions(iframeId, dashboardUrl);
    }

    constructor(iframeId, dashboardUrl) {
        if (!iframeId) throw new Error('iframeId is required to initialise the embed actions.');
        if (!dashboardUrl) throw new Error('dashboardUrl is required to initialise the embed actions.');
        if (!embedUtils.validateUrl(dashboardUrl)) throw new Error(`Invalid dashboard url: ${dashboardUrl}. Please consult the documentation for the expected URL structure.`);
        const iframe = document.getElementById(iframeId);
        if (!iframe) throw new Error(`Iframe with id "${iframeId}" not found.`);

        this.iframe = iframe;
        this.iframeId = iframeId;
        this.dashboardUrl = dashboardUrl;
        this.internalReportEditor = new ReportEditor(iframe, dashboardUrl, this.assignInitialStateFn);
        // this.hasLoaded = !!this.iframe.src;
    }

    /**
     * @namespace PiEmbedActions.reportEditor
     * @description A functional area for interacting with the Report Editor within the embedded pi dashboard.
     * This namespace provides access to functionalities available in the Report Editor.
     */
    reportEditor = {
        /**
         * Opens the Report Editor panel for a specific report by sending a post message to the embedded iframe to open the Report Editor UI for the given `itemId`.
         * @function
         * @memberof PiEmbedActions.reportEditor
         * @param {number} itemId - The ID of the report to open in the editor.
         * @example
         * dashboard.reportEditor.open(2); // Opens the Report Editor for report ID 2.
         */
        open: (itemId) => {
            this.internalReportEditor.open(this.hasLoaded, itemId);
        },
    };
}