export default class Exception extends Error {
  constructor(message, cause) {
    super(message);

    this.name = "Error";

    if (cause == null) {
      return;
    }

    this.stack += "\nCaused by: ";

    if (cause instanceof Error) {
      this.stack += cause.stack;
    }
    else {
      this.stack += cause.toString();
    }
  }
}
