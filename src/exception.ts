/*
	Now you may be wondering why a WeakMap is used here, why not just store the cause inside of the Exception instance like a regular person?
	Well, it seems node will print out any properties stored inside of an uncaught error, which would lead to printing the cause twice.
	This unfortunately even happens when using symbols as keys.
*/
const causes = new WeakMap<Exception, unknown>();

export default class Exception<Cause = unknown> extends Error {

	public static cause<T>(exception: Exception<T>): T | undefined {
		return causes.get(exception) as T | undefined;
	}

	constructor(message?: string, cause?: Cause) {
		super(message);
		this.name = 'Exception';

		if (this.stack != null && cause != null) {
			causes.set(this, cause);

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
