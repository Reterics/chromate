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


chrome.runtime.onMessage.addListener(async (message/*, sender*/) => {
    if (message.status === 'connected') {
        const {counter} = await chrome.storage.local.get(["counter"]);

        await chrome.storage.local.set({
            counter: Number(counter || 0) + 1
        })
    }
})

export {}
