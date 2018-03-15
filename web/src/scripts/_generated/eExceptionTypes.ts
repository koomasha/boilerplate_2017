enum eExceptionTypes {
	Unknown = 0, // Unknown uncatched error
	Server, // Unknown catched and logged error
	Show, // Expected error related to user actions
	Relogin, // User login required
}

export {eExceptionTypes};
