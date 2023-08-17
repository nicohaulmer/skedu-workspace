export interface IframeMessage {
    type: 'CONFIG' | 'READY' | 'RESIZE';
    payload: any;
}

export class IframeWindowMessages {
    // Listen messages from a specific origin and call the callback function
    public static listenMessages(fromOrigin: string, callback: Function): void {
        console.log(`[${window.origin}] Listening for messages`);
        window.addEventListener('message', (event: MessageEvent<IframeMessage>) => {
            if (event.origin !== fromOrigin) {
                return;
            }
            console.log(`[${window.origin}] Message received:`, event);
            callback(event);
        });
    }

    // Send a message to a specific window
    public static sendMessage(windowElement: Window, targetOrigin: string, message: IframeMessage): void {
        console.log(`[${window.origin}] Sending message:`, { windowElement, targetOrigin, message });
        windowElement.postMessage(message, targetOrigin);
    }
}
