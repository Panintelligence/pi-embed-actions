import {EditorDisplayMode} from "./editor-display-mode.js";

const embedUtils = {};

embedUtils.sendMessage = (iframe, action, itemId, targetUrl) => {
    iframe.contentWindow.postMessage(
        {
            action: action,
            itemId: itemId,
        },
        targetUrl
    );
};

/**
 * Validates the provided dashboard URL to ensure it is a properly formed URL and that it contains a valid `editorDisplayMode` query parameter if supplied.
 * @param {string} dashboardUrl - The dashboard URL string to validate.
 * @returns {boolean} - Returns `true` if the URL is valid and contains a valid `editorDisplayMode` parameter if supplied; `false` otherwise.
 */
embedUtils.validateUrl = (dashboardUrl) => {
    if (!dashboardUrl) return false;
    try {
        const urlObj = new URL(dashboardUrl);
        if (!urlObj.protocol || !urlObj.host) return false;
        const editorDisplayMode = urlObj.searchParams.get('editorDisplayMode');
        return editorDisplayMode ? EditorDisplayMode.validate(editorDisplayMode) : true;
    } catch (e) {
        return false;
    }
};

/**
 * Sets up a listener for load complete messages from the iframe and triggers a callback when the message is received.
 * @param {string} loadCompleteMessage - The type of message indicating the dashboard has loaded.
 * @param {boolean} hasLoaded - Determines whether the dashboard has already loaded. If false, the callback is executed.
 * @param {HTMLElement} iframe - Active iframe
 * @param {function} callbackFn - A function to execute when the load complete message is received
 */
embedUtils.onIframeLoadComplete = (loadCompleteMessage, hasLoaded, iframe, callbackFn) => {
    const handleMessage = (event) => {
        if (event.data && event.data.type === loadCompleteMessage && iframe.contentWindow === event.source) {
            if (!hasLoaded) {
                callbackFn();
                window.removeEventListener('message', handleMessage);
            }
        }
    };
    window.addEventListener('message', handleMessage, false);
};

/**
 * Executes a callback function depending on the iframe's loaded state.
 * If the iframe is already loaded, the callback is executed immediately. Otherwise, the dashboard is loaded using the specified URL, and it waits for the `dashboard-load-complete` message.
 * Once the message is received, assignInitialStateFn is called to set `hasLoaded` to `true` before executing the callback.
 * @param {boolean} hasLoaded -  Indicates whether the dashboard (angular app) has already been loaded.
 * @param {HTMLElement} iframe - Active iframe
 * @param {string} url - The URL of the dashboard to load in the iframe if not already loaded.
 * @param {function} callbackFn - Function to execute either immediately (if loaded) or after the iframe finishes loading.
 * @param {function} assignInitialStateFn - Function to update the initial state and mark that the iframe has loaded.
 */
embedUtils.runInIframe = (hasLoaded, iframe, url, callbackFn, assignInitialStateFn) => {
    if (hasLoaded) {
        callbackFn();
    } else {
        iframe.setAttribute('src', url);
        embedUtils.onIframeLoadComplete('dashboard-load-complete', hasLoaded, iframe, () => {
            assignInitialStateFn();
            callbackFn();
        });
    }
};

export default embedUtils;