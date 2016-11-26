export default class Environment {
    result: String;

    constructor(message: String) {
        this.result = 'result!';
        if (message) {
            this.result = 'result is "' + message + '"!';
        }
    }
}