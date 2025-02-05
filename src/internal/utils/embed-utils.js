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
 * @param iframe - Active iframe
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
 * This method first checks if the iframe has already loaded. If the iframe has loaded, it immediately executes the callback function.
 * If the iframe hasn't loaded, it sets the `src` attribute of the iframe to the provided URL and waits for the `dashboard-load-complete` message from the iframe.
 * Once the message is received, it calls the `assignInitialStateFn` function to set the initial state and then executes the callback function.
 * @param {boolean} hasLoaded -  A flag indicating whether the dashboard (angular app) has already been loaded.
 * @param iframe - Active iframe
 * @param {string} url - The dashboard URL to load in the iframe if it hasn't been loaded yet.
 * @param {function} callbackFn - The function to be executed after the iframe has finished loading or immediately if already loaded.
 * @param {function} assignInitialStateFn - The function to execute when the iframe load is complete that sets `hasLoaded` to true.
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