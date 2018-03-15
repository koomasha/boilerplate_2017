enum eExceptionTypes {
	Unknown = 0, // Unknown uncatched error
	Server, // Unknown catched and logged error
	Show, // Expected error related to user actions
	Relogin, // User login required
}
export default class Exception extends Error {
	constructor(private msg: string, private type: eExceptionTypes, protected aditionalData?: any) {
		super(JSON.stringify({msg, type, aditionalData}));
	}

	public get  Msg() {
		return this.msg;
	}
}

export {eExceptionTypes, Exception};
