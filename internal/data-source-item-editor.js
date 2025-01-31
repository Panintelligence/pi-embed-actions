import embedUtils from "./utils/embed-utils.js";

export class DataSourceItemEditor {
    iframe = null;
    dashboardUrl = null;
    assignInitialStateFn = null;

    constructor(iframe, dashboardUrl, assignInitialStateFn) {
        this.iframe = iframe;
        this.dashboardUrl = dashboardUrl;
        this.assignInitialStateFn = assignInitialStateFn;
    }

    open(hasLoaded, itemId) {
        this.runInIframe(hasLoaded, () => {
            embedUtils.sendMessage(this.iframe, 'open-data-source-item-editor', itemId, this.dashboardUrl);
        });
    }

    close(hasLoaded, itemId) {
        this.runInIframe(hasLoaded, () => {
            embedUtils.sendMessage(this.iframe, 'close-data-source-item-editor', itemId, this.dashboardUrl);
        });
    }

    closeAll(hasLoaded) {
        this.runInIframe(hasLoaded, () => {
            embedUtils.sendMessage(this.iframe, 'close-data-source-item-editors', null, this.dashboardUrl);
        });
    }

    runInIframe(hasLoaded, callbackFn) {
        const url = `${this.dashboardUrl}#/dashboard-system/#/dashboardConfig`;
        embedUtils.runInIframe(hasLoaded, this.iframe, url, callbackFn, this.assignInitialStateFn);
    }
}