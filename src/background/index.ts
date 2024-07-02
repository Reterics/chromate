chrome.runtime.onInstalled.addListener(async (opt) => {
    if (opt.reason === 'install') {
        await chrome.storage.local.clear()

        await chrome.tabs.create({
            active: true,
            url: chrome.runtime.getURL('./src/setup/index.html'),
        })
    } else if (opt.reason === 'update') {
        await chrome.tabs.create({
            active: true,
            url: chrome.runtime.getURL('./src/setup/index.html'),
        })
    }
})


export {}
