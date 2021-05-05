/**
 * Middleware Manager
 */
class MiddlewareManager {
    constructor() {
        this.middlewares = {
            // route: [],
        }
    }

    use({
        route, /* string */
        middleware /* function*/
    }) {
        // case custom route
        if (route && typeof route == 'string') {
            // case non existing route
            if (!this.middlewares[route]) {
                this.middlewares[route] = [];
            }

            if (middleware && typeof middleware == 'function') {
                this.middlewares[route].push(middleware)
            }

            // console.log(this.middlewares)
        }

    }




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
     * 
     * @param {Object} input 
     * @param {Number} remainingMiddlewares 
     */
    async executeMiddleware(input, remainingMiddlewares = null) {
        let MM = this;

        // console.log('executeMiddleware ', { input, remainingMiddlewares });

        if (input.route && this.middlewares[input.route]) {

            
            
            if (typeof remainingMiddlewares == "number") {
                
                // console.log('executeMiddleware /if_1', { input, remainingMiddlewares });

                if (remainingMiddlewares > 0) {

                    await this.middlewares[input.route][
                        this.middlewares[input.route].length - remainingMiddlewares
                    ](
                        input,
                        /* recursive next call from the 
                        inside runing middleware function */
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


//      0   1   
//      1   2  



module.exports = MiddlewareManager;