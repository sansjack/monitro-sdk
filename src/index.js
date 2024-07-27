/**
 * Monitro class for monitoring and logging messages.
 * TODO: refactor hehehe....
 */

const API_URL = process.env.API_URL

class Monitro {
  /**
 * @typedef {Object} Options
 * @property {boolean} [hookExceptions] [hookExceptions=true] - If this is true, any uncaught exceptions will be sent as an event.
 * @property {boolean} [waitForResponse] [waitForResponse=true] - if this is false the function will not wait for a response from the server, if you do not await the event may never get sent! For serverless this maybe good to disable to prevent long function exectution times. But you wont be able to handle or see if it errors!
 * @property {number} [timeout] [timeout=5000] - The timeout in milliseconds for the request to the server Default is 5000ms
 * @property {boolean} [dev] [dev=false] - If this is true, no events will be sent to the server. This is useful for development and testing.
 * @property {boolean} [devWarning] [devWarning=true] - If this is true, a warning will be logged when developer mode is activated and an event was attempted to be sent.
 */
  /**
   * 
   * Creates an instance of Monitro.
   * @param {string} serviceName - The name of the monitor.
   * @param {string} apiKey - The API key for sending data to a monitoring service.
   * @param {Options | undefined} [options] - List of options for the Monitro instance.
   */
  constructor(serviceName, apiKey, options) {
    /**
     * @type {string}
     * @private
     */
    this.apiKey = apiKey

    /**
     * @type {string}
     * @private
     */
    this.serviceName = serviceName

    /**
     * @type {Options}
     * @private
     */
    this.options = options

    if (this.options.dev === undefined) {
      this.options.dev = false
    }
    if (this.options.devWarning === undefined) {
      this.options.devWarning = true
    }

    if (this.options.timeout === undefined) {
      this.options.timeout = 5000
    }

    if (this.options.waitForResponse === undefined) {
      this.options.waitForResponse = true
    }

    if (this.options.hookExceptions === undefined) {
      this.options.hookExceptions = true
    }

    if (this.options.hookExceptions) {
      const uncaught = true
      process.on('uncaughtException', (err) => {
        this.#send(
          err.message,
          'error',
          'Uncaught Exception',
          { error_message: err.message, stack_trace: err.stack },
          uncaught
        )
      })
    }
  }
  
  async #send(name, level, message, data , uncaught = false) {
    try {
      this.#sendDataToApi(this.apiKey, {
        name: name,
        uncaught,
        service_name: this.serviceName,
        level,
        message,
        data,
      })
    }
    catch(error){
      console.error('Monitro failed to send event', error)
    }
  }

  async #sendDataToApi(apiKey, data) {
    try {
      if (this.options.dev) {
        if (this.options.devWarning) {
          console.warn('Developer Mode Activated, no events will be sent monitro')
        }
        return true
      }
      const responsePromise = fetch(`${API_URL}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(this.options.timeout) ,
      })
  
      if (this.options.waitForResponse) {
        const response = await responsePromise
        const responseData = await response.json()

        if (!response.ok) {
          console.error(responseData.message)
          return false
        }
        console.log('Successfully sent event to monitro')
        return true
      } 
        console.log('Event sent to monitro.')
        return true
      
  
    } catch (error) {
      console.log(API_URL)
      console.error('Failed to send event to monitro', error)
      return false
    }
  }
   
  /**
   * Sends a info event.
   * @param {string} name - The Name of the monitor
   * @param {string} message - Further details of the log message.
   * @param {Object | undefined} data - Additional data to log.
   */
  async info(name, message, data = undefined) {
    this.#sendDataToApi(this.apiKey, {
      name: name,
      service_name: this.serviceName,
      level: 'info',
      message,
      data,
    })
    // Here you can add logic to send the message to a monitoring service using the apiKey
  }
  /**
   * Sends a warning event.
   * @param {string} name - The Name of the monitor
   * @param {string} message - Further details of the log message.
   * @param {Object | undefined} data - Additional data to log.
   */
  async warn(name, message, data = undefined) {
    this.#sendDataToApi(this.apiKey, {
      name: name,
      service_name: this.serviceName,
      level: 'warning',
      message,
      data,
    })

  }
  /**
   * Sends a error event.
   * @param {string} name - The Name of the monitor
   * @param {string} message - Further details of the log message.
   * @param {Object | undefined} data - Additional data to log.
   */
  async error(name, message, data = undefined) {
    this.#sendDataToApi(this.apiKey, {
      name: name,
      service_name: this.serviceName,
      level: 'error',
      message,
      data,
    })
    // Here you can add logic to send the message to a monitoring service using the apiKey
  }
}

export { Monitro }

    /* in development, hook console.log, warn, and error */
  //   if (this.options.hookConsole) {
  //     var originalLog = console.log
  //     var originalWarn = console.warn
  //     var originalError = console.error

  //     function customLog(type, ...args) {
  //       type.apply(console, args)

  //       myCustomFunction(type.name, ...args)
  //     }

  //     console.log = function (...args) {
  //       customLog(originalLog, ...args)
  //     }

  //     console.warn = function (...args) {
  //       customLog(originalWarn, ...args)
  //     }

  //     console.error = function (...args) {
  //       customLog(originalError, ...args)
  //     }

  //     function myCustomFunction(type, ...args) {
  //       console.info(`Hooked - ${type}:`, ...args)
  //     }
  //   }
  // }