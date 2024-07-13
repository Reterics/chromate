import {ScriptInterpreter} from "./ScriptInterpreter.ts";

export class ScriptHandler {
    private readonly _loaded: InjectedScripts;
    private _interpreter: ScriptInterpreter;
    constructor() {
        this._loaded = {};
        this._interpreter = new ScriptInterpreter();

        document.addEventListener('keyup', (evt: KeyboardEvent) => {
            const scripts = this._loaded[evt.key] || [];

            if (scripts.length > 0) {
                console.log('Execute: ', scripts);
                const results:string[] = [];
                scripts.reduce( async (promise: Promise<string[]>, script) => {
                    const result: string[] = await promise;
                    results.push(result.join("\n"));
                    return this._interpreter.execute(script.content);
                }, Promise.resolve([]))
                    .then(() => {
                        console.log('Scripts are executed ', results);
                    })
            }
        })
    }

    loadScript({name, keyBind, content}: InjectedScript): void {
        if (Object
            .values(this._loaded)
            .filter(entry => entry.find(l => l.name === name))
            .length) {
            console.warn(`[ScriptHandler] ${name} already loaded.`);
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
