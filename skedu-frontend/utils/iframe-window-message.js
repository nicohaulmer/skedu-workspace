/**
 * @typedef {Object} IframeMessage
 * @property {string} type - Message type: 'CONFIG', 'READY', or 'RESIZE'.
 * @property {*} payload - Message payload.
 */

/**
 * Class for managing messages between iframes and windows.
 */
export class IframeWindowMessages {
    /**
     * Listens for messages from a specific origin and calls the callback function.
     * @param {string} fromOrigin - The expected message origin.
     * @param {function} callback - Callback function to handle received messages.
     * @returns {void}
     */
    static listenMessages(fromOrigin, callback) {
        console.log(`[${window.origin}] Listening for messages`);
        window.addEventListener('message', /** @param {MessageEvent<IframeMessage>} event */ (event) => {
            if (event.origin !== fromOrigin) {
                return;
            }
            console.log(`[${window.origin}] Message received:`, event);
            callback(event);
        });
    }

    /**
     * Sends a message to a specific window.
     * @param {Window} windowElement - The window element to which the message will be sent.
     * @param {string} targetOrigin - The target origin to which the message will be sent.
     * @param {IframeMessage} message - The message to send.
     * @returns {void}
     */
    static sendMessage(windowElement, targetOrigin, message) {
        console.log(`[${window.origin}] Sending message:`, { windowElement, targetOrigin, message });
        windowElement.postMessage(message, targetOrigin);
    }
}
