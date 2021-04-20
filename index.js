export default class Exception extends Error {
  constructor(message, cause) {
    super(message);

    this.name = "Error";

    if (cause != null) {
      this.stack += "\nCaused by: " + error.stack;
    }
  }
}
