import AuthApi from '../../_generated/api/authApi';
import { eViewNames } from '../../_generated/eViewNames';
import GqlTypes from '../../_generated/gqlTypes';
import { eEventTypes } from '../../common/eEventTypes';
import Utils from '../../common/utils';
import View from '../view';
import LoginFrame from './loginFrame';

export default class SignupForm extends View {
	private onSignUp: (user: GqlTypes.IUser) => void;
	public init(onSignUp: (user: GqlTypes.IUser) => void): SignupForm {
		this.onSignUp = onSignUp;
		this.createElement(eViewNames.SignupForm);
		return this;
	}
	protected bindEvents(): void {
		this.bindEvent('login-link', eEventTypes.Click, (this.Parent as LoginFrame).setLoginForm.bind(this.Parent));
		this.bindEvent('signup-btn', eEventTypes.Click, this.makeSignup.bind(this));
	}
	private async makeSignup() {
		const signupData = this.getSignupDataFromElement();
		if (signupData) {
			const data = await AuthApi.authLocal({user: signupData, isSignup: true});
			if (data) {
				this.onSignUp(data.authLocal);
			}
		}
	}
	private getSignupDataFromElement(): GqlTypes.IAuthLocalInput {
		let signupData;
		if (Utils.formIsValid(this.Element as HTMLFormElement)) {
			signupData =  {
				email: (this.Element.getElementsByClassName('user-email')[0] as HTMLInputElement).value.toLowerCase(),
				firstName: (this.Element.getElementsByClassName('user-firstname')[0] as HTMLInputElement).value,
				lastName: (this.Element.getElementsByClassName('user-lastname')[0] as HTMLInputElement).value,
				password: (this.Element.getElementsByClassName('user-password')[0] as HTMLInputElement).value,
			};
		}
		return (signupData) ? signupData : null;
	}
}
