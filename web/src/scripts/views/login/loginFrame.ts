import { eViewNames } from '../../_generated/eViewNames';
import GqlTypes from '../../_generated/gqlTypes';
import View from '../view';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import SocialLogin from './socialLogin';

export default class LoginFrame extends View {
	private loginForm: LoginForm;
	private signupForm: SignupForm;
	private socialLogin: SocialLogin;
	private postAuth: (user: GqlTypes.IUser) => void;
	public init(postAuth: (user: GqlTypes.IUser) => void): LoginFrame {
		this.postAuth = postAuth;
		this.createElement(eViewNames.LoginFrame);
		this.setLoginForm();
		this.setSocialLogin();
		return this;
	}
	public setLoginForm(): void {
		if (this.signupForm) {
			this.signupForm.remove();
		}
		this.loginForm = this.create(LoginForm).init(this.postAuth);
		this.Element.getElementsByClassName('form')[0].appendChild(this.loginForm.Element);
	}
	public setSignupForm(): void {
		if (this.loginForm) {
			this.loginForm.remove();
		}
		this.signupForm = this.create(SignupForm).init(this.postAuth);
		this.Element.getElementsByClassName('form')[0].appendChild(this.signupForm.Element);
	}
	protected setSocialLogin(): void {
		this.socialLogin = this.create(SocialLogin).init();
		this.Element.getElementsByClassName('social')[0].appendChild(this.socialLogin.Element);
	}

}
