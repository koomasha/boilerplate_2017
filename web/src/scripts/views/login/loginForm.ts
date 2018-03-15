import AuthApi from '../../_generated/api/authApi';
import { eViewNames } from '../../_generated/eViewNames';
import GqlTypes from '../../_generated/gqlTypes';
import { eEventTypes } from '../../common/eEventTypes';
import Utils from '../../common/utils';
import View from '../view';
import LoginFrame from './loginFrame';
export default class LoginForm extends View {
	private onLogin: (user: GqlTypes.IUser) => void;
	public init(onLogin: (user: GqlTypes.IUser) => void): LoginForm {
		this.onLogin = onLogin;
		this.createElement(eViewNames.LoginForm);
		return this;
	}
	protected bindEvents(): void {
		this.bindEvent('login-btn', eEventTypes.Click, this.makeLogin.bind(this));
		this.bindEvent('signup-link', eEventTypes.Click, (this.Parent as LoginFrame).setSignupForm.bind(this.Parent));
	}
	private async makeLogin() {
		const loginData = this.getLoginDataFromElement();
		if (loginData) {
			const data = await AuthApi.authLocal({user: loginData, isSignup: false});
			if (data) {
				this.onLogin(data.authLocal);
			}
		}
	}
	private getLoginDataFromElement(): GqlTypes.IAuthLocalInput {
		let loginData = null;
		if (Utils.formIsValid(this.Element as HTMLFormElement)) {
			loginData =  {
				email: (this.Element.getElementsByClassName('user-email')[0] as HTMLInputElement).value.toLowerCase(),
				password: (this.Element.getElementsByClassName('user-password')[0] as HTMLInputElement).value,
			};
		}
		return loginData;
	}
}
