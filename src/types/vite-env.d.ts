/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />


declare const __VERSION__: string
declare const __NAME__: string
declare const __DISPLAY_NAME__: string
declare const __CHANGELOG__: string
declare const __GIT_COMMIT__: string
declare const __GITHUB_URL__: string


declare module 'crypto-browserify' {
    import crypto from 'crypto';
    export = crypto;
}


interface EncryptedMessage {
    iv: string,
    encryptedData: string,
    salt: string
}

type DigestType = 'RSA-MD5'|'RSA-RIPEMD160'|'RSA-SHA1'|'RSA-SHA1-2'|'RSA-SHA224'|'RSA-SHA256'|'RSA-SHA3-224'|
    'RSA-SHA3-256'|'RSA-SHA3-384'|'RSA-SHA3-512'|'RSA-SHA384'|'RSA-SHA512'|'RSA-SHA512/224'|'RSA-SHA512/256'|
    'RSA-SM3'|'blake2b512'|'blake2s256'|'id-rsassa-pkcs1-v1_5-with-sha3-224'|'id-rsassa-pkcs1-v1_5-with-sha3-256'|
    'id-rsassa-pkcs1-v1_5-with-sha3-384'|'id-rsassa-pkcs1-v1_5-with-sha3-512'|'md5'|'md5-sha1'|'md5WithRSAEncryption'|
    'ripemd'|'ripemd160'|'ripemd160WithRSA'|'rmd160'|'sha1'|'sha1WithRSAEncryption'|'sha224'|'sha224WithRSAEncryption'|
    'sha256'|'sha256WithRSAEncryption'|'sha3-224'|'sha3-256'|'sha3-384'|'sha3-512'|'sha384'|'sha384WithRSAEncryption'|
    'sha512'|'sha512-224'|'sha512-224WithRSAEncryption'|'sha512-256'|'sha512-256WithRSAEncryption'|
    'sha512WithRSAEncryption'|'shake128'|'shake256'|'sm3'|'sm3WithRSAEncryption'|'ssl3-md5'|'ssl3-sha1';

interface ChatMessage {
    user: string,
    message: string,
    timestamp?: number
}

interface NestedObject {
    [key: string|number]: string|number|undefined|null|NestedObject|NestedObject[]
}

interface SearchStack {
    obj: any,
    index: number
}

interface InjectedScripts {
    [key: string]: InjectedScript[]
}

interface InjectedScript {
    id?: number,
    name: string,
    keyBind: string,
    content: string,
    origin?: string
}

interface ChatData {
    server: string,
    api: string,
    threadId?: string,
    responses?: ChatMessage[]

}
interface ChromeStoredData {
    entries?: InjectedScript[],
    counter?: number,
    chat?: ChatData
}

interface TextFile {
    value: string|ArrayBuffer|null,
    file_input?: File
}
