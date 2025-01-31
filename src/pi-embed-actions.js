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
     * Creates a dashboard instance without starting the dashboard. This instance is a reference needed for the interactions with the dashboard to be executed.
     * The dashboard url needs to include all query parameters required, so that this library doesn't trigger the browser refresh when
     * navigating between dashboard display area and config area.
     *
     * @param {string} iframeId - The ID of the iframe.
     * @param {string} dashboardUrlWithQueryParams - token is optional https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT
     * @returns {PiEmbedActions} - An instance of PiEmbedActions object.
     *
     * @example
     * const dashboard = PiEmbedActions.createDashboard('iframeId', 'https://pi-dev.uk:8224/pi?lang=en_GB&editorDisplayMode=CONTENT');
     * dashboard.reportEditor.open(123);
     */
    static createDashboard(iframeId, dashboardUrlWithQueryParams) {
        return new PiEmbedActions(iframeId, dashboardUrlWithQueryParams);
    };

    constructor(iframeId, dashboardUrlWithQueryParams) {
        if (!iframeId) throw new Error('iframeId is required to initialise the embed actions.');
        if (!dashboardUrlWithQueryParams) throw new Error('dashboardUrl is required to initialise the embed actions.');
        if (!embedUtils.validateUrl(dashboardUrlWithQueryParams)) throw new Error(`Invalid dashboard url: ${dashboardUrlWithQueryParams}, please consult the documentation for the expected url structure.`);
        const iframe = document.getElementById(iframeId);
        if (!iframe) throw new Error(`Iframe with id "${iframeId}" not found.`);

        this.iframe = iframe;
        this.iframeId = iframeId;
        this.dashboardUrl = dashboardUrlWithQueryParams;
        this.internalReportEditor = new ReportEditor(iframe, dashboardUrlWithQueryParams, this.assignInitialStateFn);
        this.internalDataSourceItemEditor = new DataSourceItemEditor(iframe, dashboardUrlWithQueryParams, this.assignInitialStateFn);

        this.hasLoaded = !!this.iframe.src; // if src attribute already exists that means the iframe has already been loaded before initialising this library
    };

    reportEditor = {
        /**
         * Opens the report editor panel with the given itemId by sending a post message to the embedded iframe.
         * @param {number} itemId - The ID of the item (e.g., reportId) to load into the editor.
         *
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
