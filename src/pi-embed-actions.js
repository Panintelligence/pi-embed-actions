import {ReportEditor} from "./internal/report-editor.js";
import {DataSourceItemEditor} from "./internal/data-source-item-editor.js";
import embedUtils from "./internal/utils/embed-utils.js";

/**
 * Users need to create one instance of this class per iframe.
 */
export default class PiEmbedActions {
    iframe = null;
    iframeId = null;
    dashboardUrl = null; // e.g. https://pi-dev.uk:8224/pi?lang=en_GB&token=xxx&editorDisplayMode=CONTENT

    /**
     * @type {ReportEditor}
     */
    internalReportEditor = null;
    /**
     * @type {DataSourceItemEditor}
     */
    internalDataSourceItemEditor = null;

    hasLoaded = false;
    assignInitialStateFn = () => {
        this.hasLoaded = true;
    };

    /**
     * Creates a dashboard instance without starting it.
     * This instance serves as a reference for interacting with the dashboard.
     * The dashboard URL should include all necessary query parameters to prevent the library from triggering a browser refresh when switching between the dashboard's display area
     * and the configuration area.
     *
     * @param {string} iframeId - The unique identifier for the iframe in which the dashboard is embedded.
     * @param {string} dashboardUrl - The URL where the dashboard is served, including necessary query parameters.
     *   The following query parameters are supported:
     *     - `token` (optional): A secure token for authentication or access control.
     *     - `locale`: Specifies the language and regional settings for the dashboard (e.g., `lang=en_GB`).
     *     - `editorDisplayMode`: Specifies whether the dashboard should only display the requested content or show in full (default). To display content only, use `editorDisplayMode=CONTENT`.



     * @returns {PiEmbedActions} - An instance of PiEmbedActions object.
     *
     * @example
     * const dashboard = PiEmbedActions.createDashboard('pi_iframe', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
     * dashboard.reportEditor.open(123);
     */
    static createDashboard(iframeId, dashboardUrl) {
        return new PiEmbedActions(iframeId, dashboardUrl);
    };

    constructor(iframeId, dashboardUrl) {
        if (!iframeId) throw new Error('iframeId is required to initialise the embed actions.');
        if (!dashboardUrl) throw new Error('dashboardUrl is required to initialise the embed actions.');
        if (!embedUtils.validateUrl(dashboardUrl)) throw new Error(`Invalid dashboard url: ${dashboardUrl}, please consult the documentation for the expected url structure.`);
        const iframe = document.getElementById(iframeId);
        if (!iframe) throw new Error(`Iframe with id "${iframeId}" not found.`);

        this.iframe = iframe;
        this.iframeId = iframeId;
        this.dashboardUrl = dashboardUrl;
        this.internalReportEditor = new ReportEditor(iframe, dashboardUrl, this.assignInitialStateFn);
        this.internalDataSourceItemEditor = new DataSourceItemEditor(iframe, dashboardUrl, this.assignInitialStateFn);

        this.hasLoaded = !!this.iframe.src; // if src attribute already exists that means the iframe has already been loaded before initialising this library
    };


    /**
     * @namespace PiEmbedActions.reportEditor
     * @description Functional area for interacting with the report editor in the embedded dashboard.
     */
    reportEditor = {
        /**
         * @memberof PiEmbedActions.reportEditor
         * @description Opens the report editor panel with the given itemId by sending a post message to the embedded iframe.
         * @param {number} itemId - The ID of the item (e.g., reportId) to load into the editor.
         * @example
         * const itemId = 42;
         * dashboard.reportEditor.open(itemId);
         */
        open: (itemId) => {
            this.internalReportEditor.open(this.hasLoaded, itemId);
        },
        close: (itemId) => {
            this.internalReportEditor.close(this.hasLoaded, itemId);
        },
        closeAll: () => {
            this.internalReportEditor.closeAll(this.hasLoaded);
        }
    };

    dataSourceItemEditor = {
        open: (itemId) => {
            this.internalDataSourceItemEditor.open(this.hasLoaded, itemId);
        }
    };
}
