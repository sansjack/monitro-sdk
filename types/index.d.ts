export class Monitro {
    /**
   * @typedef {Object} Options
   * @property {boolean} [hookExceptions] [hookExceptions=true] - If this is true, any uncaught exceptions will be sent as an event.
   * @property {boolean} [waitForResponse] [waitForResponse=true] - if this is false the function will not wait for a response from the server, if you do not await the event may never get sent! For serverless this maybe good to disable to prevent long function exectution times. But you wont be able to handle or see if it errors!
   * @property {number} [timeout] [timeout=5000] - The timeout in milliseconds for the request to the server Default is 5000ms
   */
    /**
     *
     * Creates an instance of Monitro.
     * @param {string} serviceName - The name of the monitor.
     * @param {string} apiKey - The API key for sending data to a monitoring service.
     * @param {Options | undefined} [options] - List of options for the Monitro instance.
     */
    constructor(serviceName: string, apiKey: string, options?: {
        /**
         * [hookExceptions=true] - If this is true, any uncaught exceptions will be sent as an event.
         */
        hookExceptions?: boolean;
        /**
         * [waitForResponse=true] - if this is false the function will not wait for a response from the server, if you do not await the event may never get sent! For serverless this maybe good to disable to prevent long function exectution times. But you wont be able to handle or see if it errors!
         */
        waitForResponse?: boolean;
        /**
         * [timeout=5000] - The timeout in milliseconds for the request to the server Default is 5000ms
         */
        timeout?: number;
    } | undefined);
    /**
     * @type {string}
     * @private
     */
    private apiKey;
    /**
     * @type {string}
     * @private
     */
    private serviceName;
    /**
     * @type {Options}
     * @private
     */
    private options;
    /**
     * Sends a info event.
     * @param {string} name - The Name of the monitor
     * @param {string} message - Further details of the log message.
     * @param {Object | undefined} data - Additional data to log.
     */
    info(name: string, message: string, data?: any | undefined): Promise<void>;
    /**
     * Sends a warning event.
     * @param {string} name - The Name of the monitor
     * @param {string} message - Further details of the log message.
     * @param {Object | undefined} data - Additional data to log.
     */
    warn(name: string, message: string, data?: any | undefined): Promise<void>;
    /**
     * Sends a error event.
     * @param {string} name - The Name of the monitor
     * @param {string} message - Further details of the log message.
     * @param {Object | undefined} data - Additional data to log.
     */
    error(name: string, message: string, data?: any | undefined): Promise<void>;
    #private;
}
