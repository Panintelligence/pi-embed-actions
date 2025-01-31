import embedUtils from "./utils/embed-utils.js";

export class ReportEditor {
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
            embedUtils.sendMessage(this.iframe, 'open-report-editor', itemId, this.dashboardUrl);
        });
    }

    close(hasLoaded, itemId) {
        this.runInIframe(hasLoaded, () => {
            embedUtils.sendMessage(this.iframe, 'close-report-editor', itemId, this.dashboardUrl);
        });
    }

    closeAll(hasLoaded) {
        this.runInIframe(hasLoaded, () => {
            embedUtils.sendMessage(this.iframe, 'close-report-editors', null, this.dashboardUrl);
        });
    }

    runInIframe(hasLoaded, callbackFn) {
        const url = `${this.dashboardUrl}#/dashboard-system/#/dashboardDesigner`;
        embedUtils.runInIframe(hasLoaded, this.iframe, url, callbackFn, this.assignInitialStateFn);
    }
}