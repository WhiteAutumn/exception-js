const CAUSE = Symbol.for('exceptions-with-cause/cause');

export default class Exception <Cause> extends Error {
	public readonly [CAUSE]?: Cause;

	constructor(message?: string, cause?: Cause) {
		super(message);
		this.name = 'Exception';
		this[CAUSE] = cause;

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
