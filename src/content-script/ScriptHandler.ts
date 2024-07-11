
export class ScriptHandler {
    private _loaded: InjectedScripts;
    constructor() {
        this._loaded = {};

        document.addEventListener('keyup', (evt) => {
            const scripts = this._loaded[evt.key] || [];

            if (scripts.length > 0) {
                console.log('Execute: ', scripts);
            }
        })
    }

    loadScript({name, keyBind, content}: InjectedScript) {
        if (Object
            .values(this._loaded)
            .filter(entry => entry.find(l => l.name === name))
            .length) {
            console.warn('[ScriptHandler] ' + name + ' already loaded.');
            return;
        }

        if (!this._loaded[keyBind]) {
            this._loaded[keyBind] = [];
        }

        this._loaded[keyBind].push({
            name,
            content,
            keyBind
        });
    }
}
