
export class ScriptInterpreter {
    constructor() {}

    /**
     * @name executeOn
     * @param {any} doc - Source object where we apply on the path, like document
     * @param {string[]} path - the sub-methods or objects on the source objects like querySelector
     */
    async executeOn (doc: unknown, path: string[]): Promise<string> {
        let target = doc;

        while (path.length) {
            const part = path.shift();

            if (!part) {
                continue;
            }
            if (part.endsWith(')')) {
                // Function detected, Parameters are not supported in the moment
                let [method, parameters] = part.split('(');
                parameters = parameters.substring(0, parameters.length - 1);

                // @ts-expect-error The target can be anything, probably a TS error, but catch() will handle it outside
                if (target && typeof target[method] === 'function') {
                    // @ts-expect-error We already checked if it is a function
                    target = await target[method](...parameters
                        .split(',')
                        .map(p => p.startsWith('\'') || p.startsWith('"') ? p.substring(1, p.length - 1) : p));
                } else {
                    console.warn(`${method} is not a function.`);
                }
            } else if (part.endsWith(']')) {
                // Arrays are not supported
                console.warn('Arrays are not supported yet');
            } else if (Object.hasOwn(target as object, part)) {
                // @ts-expect-error We already checked, If it has the property
                target = target[part];
            }
        }
        return target as string;
    }

    /**+
     * @execute
     * @param {string} content - Executable script like document.querySelector('.target').click();
     */
    async execute (content: string): Promise<string[]> {
        const snippets = content.split(';');
        const results: string[] = [];

        for (let i = 0; i < snippets.length; i++){
            const s = snippets[i];
            const keys = s.split(/(?<!['"])\.(?!['"])/g);

            const sourceCommand = keys.shift();

            let result;
            switch (sourceCommand) {
                case 'document':
                    result = await this.executeOn(document, keys).catch(e=> {
                        console.error(e);
                    });
                    break;
                case 'window':
                    result = await this.executeOn(window, keys).catch(e=> {
                        console.error(e);
                    });
                    break;
                case 'console':
                    result = await this.executeOn(console, keys).catch(e=> {
                        console.error(e);
                    });
                    break;
                default:
                    console.warn(`${sourceCommand} is not supported command`);
            }
            results.push(result as string);
        }
        return results;
    }
}
