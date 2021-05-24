/**
 * Middleware Manager
 */
class MiddlewareManager {
    constructor() {
        this.middlewares = {
            // route: [],
        }
    }

    /**
     * Subscribe a middleware or
     * a group comma separated middlewares functions
     * to the Manager
     * @param {String} Route
     * @param {Function } Middleware
     */
    use(
        // route, /* string */
        // middleware /* function or comma separated list of fucntions*/
    ) {

        // case custom route
        const route = [...arguments][0];
        if (route && typeof route == 'string') {
            // case non existing route in MiddlewareManager 
            if (!this.middlewares[route]) {
                this.middlewares[route] = [];
            }

            const middlewares = [...arguments].slice(1);

            for (let m of middlewares) {

                if (typeof m == 'function') {
                    this.middlewares[route].push(m)
                }
            }

        }

        else if (Array.isArray([...arguments][0])) {
            const routes = [...arguments][0];

            for (let route of routes) {
                // case non existing route in MiddlewareManager 
                if (!this.middlewares[route]) {
                    this.middlewares[route] = [];
                }

                const middlewares = [...arguments].slice(1);

                for (let m of middlewares) {

                    if (typeof m == 'function') {
                        this.middlewares[route].push(m)
                    }
                }
            }


        }
    }

    /**
     * Handles the input, 
     * starts the middlewares execution chain.
     * @param {Object} input 
     */
    async handleInput(input) {
        try {
            await this.executeMiddleware(input);
        }
        catch (error) {
            if (error) {
                console.error('Error while processing the input', error)
            }
        }
    }

    /**
     * Executes the middleware chain,
     * Keeping a recursive bind to recall it self
     * to next one from the inside of the current one.
     * @param {Object} input 
     * @param {Number} remainingMiddlewares 
     */
    async executeMiddleware(input, remainingMiddlewares = null) {
        let MM = this;

        if (input.route && this.middlewares[input.route]) {

            if (typeof remainingMiddlewares == "number") {


                if (remainingMiddlewares > 0) {
                    // run the middleware in this turn and pass 
                    // the `next` recursive reference for the next one
                    // in the chain
                    await this.middlewares[input.route][
                        this.middlewares[input.route].length - remainingMiddlewares
                    ](
                        input,
                        function next() {
                            MM.executeMiddleware(input, --remainingMiddlewares);
                        }

                    );

                } else {
                    // end execution chain
                }
            }
            else {

                // call with the full middlewares numbers to execute
                MM.executeMiddleware(input, this.middlewares[input.route].length);
            }
        }
    }
}


module.exports = MiddlewareManager;