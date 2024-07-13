import {ScriptHandler} from "./ScriptHandler.ts";

const script = document.createElement('script');
script.src = chrome.runtime.getURL('src/content-script/connector.js');
(document.head||document.documentElement).appendChild(script);
script.onload = function(): void {
    script.remove();
};

const scriptInjector = new ScriptHandler();

// Event listener
document.addEventListener('D1R_connectExtension', (e: CustomEventInit) => {
    // e.detail contains the transferred data
    if (e.detail === 'connected') {
        return chrome.runtime.sendMessage({
            status: 'connected'
        })
    }
});


function applyLatestScripts(): void {
    chrome.storage.local.get(["entries"]).then((value) => {
        console.log('Latest Script applied', value.entries ? value.entries : []);

        if (value.entries) {
            Object.values(value.entries).forEach(entry => {
                scriptInjector.loadScript(entry as InjectedScript)
            })
        }
    })

}
chrome.runtime.onMessage.addListener((message) => {
    if (message.message === "scriptUpdate") {
        console.log("Received message", message);
        applyLatestScripts();
    }
});


console.log('Content Script integrated');
applyLatestScripts()
