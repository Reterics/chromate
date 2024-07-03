
class ChromateConnector {
    constructor() {
        this._id = 'D1R_connectExtension';
        this.sendMessage('connected');
    }

    sendMessage(msg) {
        document.dispatchEvent(new CustomEvent(this._id, {
            detail: msg
        }));
    }
}

setTimeout(() => {
    new ChromateConnector();
}, 0);

