import { expect } from 'chai';

import Exception from './exception';

describe('The exceptions-with-cause package', () => {

	it('should be constructable without message', () => {
		const exception = new Exception();
		expect(exception).to.be.instanceOf(Error);
		expect(exception).to.be.instanceOf(Exception);
	});

	it('should have name equal to Exception', () => {
		const exception = new Exception();
		expect(exception).to.have.property('name').equal('Exception');
	});

	it('should be constructable without cause', () => {
		const exception = new Exception('Test');
		expect(exception).to.be.instanceOf(Error);
		expect(exception).to.be.instanceOf(Exception);
	});

	it('should have message property equal to message argument', () => {
		const expected = 'Test Error';
		const exception = new Exception(expected);
		expect(exception).to.have.property('message').equal(expected);
	});

	it('should be constructable with cause', () => {
		const cause = new Error('Actual error');
		const exception = new Exception('Error', cause);
		expect(exception).to.be.instanceOf(Error);
		expect(exception).to.be.instanceOf(Exception);
	});

	it('should have a correctly formatted stack with cause', () => {
		const cause = new Error('Actual error');
		const exception = new Exception('Error', cause);
		expect(exception).to.have.property('stack').match(/(?:.+:.+\r?\n)(?:\s+at .+\r?\n)+Caused by: (?:.+:.+\r?\n)(?:\s+at .+\r?\n)+/);
	});

	it('should have correctly formatted stack with cause when using non error as cause', () => {
		const cause = { toString: () => 'Fault' };
		const exception = new Exception('Error', cause);
		expect(exception.stack?.endsWith('Caused by: Fault')).to.be.true;
	});

	it('should return correct cause of exception', () => {
		const cause = new Error('Actual error');
		const exception = new Exception('Error', cause);
		const actual = Exception.cause(exception);
		expect(actual).to.equal(cause);
	});

});
