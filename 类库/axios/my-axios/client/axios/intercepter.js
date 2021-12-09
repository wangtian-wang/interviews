export default class Intercepter {
    constructor() {
        this.handlers = [];
    }
    use (resHandler,rejHandler) {
        this.handlers.push({
            resHandler,
            rejHandler
        })
    }
}