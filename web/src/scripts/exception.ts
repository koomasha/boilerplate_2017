declare var window: any;
import { eExceptionTypes } from './_generated/eExceptionTypes';
class Exception {
	constructor(
		public msg: string,
		public type: eExceptionTypes,
		protected aditionalData?: any) {}
	public handleException() {
		switch (this.type) {
			case eExceptionTypes.Show:
				window.__winman.appendError(this.msg);
				break;
			case eExceptionTypes.Relogin:
				window.__winman.reLogin();
				break;
			case eExceptionTypes.Server:
				window.__winman.appendError('Server Error');
				break;
			case eExceptionTypes.Unknown:
				// TODO: log details
				window.__winman.appendError('Unknown Error');
				break;
			default:
				console.log(this.msg);
				// TODO: log details
				break;
		}
	}
}

export {eExceptionTypes, Exception};
