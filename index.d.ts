declare module "exception" {
  export default class Exception extends Error {
    constructor(message: string, cause?: Error)
  }
}
