import {ScriptHandler} from "./ScriptHandler.ts";

const script = document.createElement('script');
script.src = chrome.runtime.getURL('src/content-script/connector.js');
(document.head||document.documentElement).appendChild(script);
script.onload = function() {
    script.remove();
};

const scriptInjector = new ScriptHandler();

// Event listener
document.addEventListener('D1R_connectExtension', function(e: CustomEventInit) {
    // e.detail contains the transferred data
    if (e.detail === 'connected') {
        return chrome.runtime.sendMessage({
            status: 'connected'
        })
    } else {
        console.log('Unknown event ', e);
    }
});


function applyLatestScripts() {
    chrome.storage.local.get(["entries"]).then((value) => {
        console.log('Latest Script applied', value.entries ? value.entries : []);

        if (value.entries) {
            Object.values(value.entries).forEach(entry => {
                scriptInjector.loadScript(entry as InjectedScript)
            })
        }
    })

}
chrome.runtime.onMessage.addListener(function (message) {
    if (message.message === "scriptUpdate") {
        console.log("recieved message", message);
        applyLatestScripts();
    }
});


console.log('Content Script integrated');
applyLatestScripts()
