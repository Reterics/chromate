import {Buffer} from "buffer"


export const applyBrowserUtils = (function(): () => void {
    // Define global process object if it doesn't exist
    if (typeof process === 'undefined') {
        window.process = {
            browser: 1,
            env: {
                NODE_ENV: 'development', // or 'production' based on your environment
            }
        } as unknown as NodeJS.Process;
    }
    if (typeof window.Buffer === 'undefined') {
        window.Buffer = Buffer;
    }
    return ()=> {
        if(!window.process || !window.process.browser) {
            throw new Error('Failed to apply browser utils');
        }
    };
})();
