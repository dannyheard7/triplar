export class RestError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}