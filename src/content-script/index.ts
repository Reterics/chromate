const script = document.createElement('script');
script.src = chrome.runtime.getURL('src/content-script/connector.js');
(document.head||document.documentElement).appendChild(script);
script.onload = function() {
    script.remove();
};

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
