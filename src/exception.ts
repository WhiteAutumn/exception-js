export default class Exception extends Error {
	constructor(message?: string, cause?: Error | unknown) {
		super(message);
		this.name = 'Exception';

		if (this.stack != null && cause != null) {
			this.stack += '\nCaused by: ';
			if (cause instanceof Error && cause.stack != null) {
				this.stack += cause.stack;
			}
			else {
				this.stack += cause;
			}
		}
	}
}
