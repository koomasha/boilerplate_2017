declare var window: any;
import AuthApi from './_generated/api/authApi';
import Configuration from './_generated/configuration';
import fetchGQL from './api/fetchGQL';
import AppMan from './appMan';
import Utils from './common/utils';
window.addEventListener('load', async () => {
	window.__fetch = new fetchGQL();
	await socialLoginRedirect();
	window.__winman = new AppMan();
});
window.addEventListener('error', (event) => {
	// TODO: some logs
	console.log('Hello error: ' + JSON.stringify(event));
});
window.addEventListener('unhandledrejection', (event) => {
	event.preventDefault();
	if (event.reason) {
		// TODO: some logs
		console.log('Hello unhandledrejection: ' + JSON.stringify(event.reason));
	}
});
async function socialLoginRedirect() {
	const queryString = Utils.truncateFBQueryResponse(window.location.toString());
	const code = Utils.getVarFromQueryString(queryString, 'code');
	const loginState = Utils.getVarFromQueryString(queryString, 'state');
	if (!Utils.stringIsEmpty(code)) {
		switch (loginState) {
			case Configuration.stateFBLogin:
				await AuthApi.authFB({code});
				break;
			case Configuration.stateGoogleLogin:
				await AuthApi.authGoogle({code});
				break;
		}
		window.location.href = '/';
	}
}
