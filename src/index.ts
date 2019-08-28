/* Qlog 2.0 created by Nemo at 18:15 */
import { getColorScheme, colorizeLog } from './utils/';

function setup() {
	// TODO get env variables
}

class Qlog {
	scopeStack: Array<string>;
	fields: object;

	constructor(scopeStack: Array<string>, fields: object) {
		this.scopeStack = scopeStack;
		this.fields = fields;
	}

	public addFields(fields: object) {
		this.fields = { ...this.fields, ...fields };
		return this;
	}

	public subScope(scopeName: string) {
		return new Qlog([...this.scopeStack, scopeName], this.fields);
	}

	public info(message: String) {
		this.log('I', message);
	}

	public error(message: String) {
		this.log('E', message);
	}

	public debug(message: String) {
		this.log('D', message);
	}

	public warn(message: String) {
		this.log('W', message);
	}

	public log(category: string, message: String) {
		const { scopeStack, fields } = this;

		const logDate = new Date().toISOString();
		const colorScheme = getColorScheme(category);
		const scope = `${scopeStack} >`;
		const stringifiedFields = JSON.stringify(fields);

		const content = `[[${logDate}] | ${category} | ${scope} | ${message} | ${stringifiedFields}]`;

		// [timestamp,scopeStack,message,fields]
		console.log(colorizeLog(content, colorScheme));
	}
}

export { Qlog };
