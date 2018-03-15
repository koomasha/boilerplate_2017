import AuthApi from '../../_generated/api/authApi';
import Configuration from '../../_generated/configuration';
import { eViewNames } from '../../_generated/eViewNames';
import View from '../view';
export default class SocialLogin extends View {
	public init(): SocialLogin {
		this.createElement(eViewNames.SocialLogin);
		return this;
	}
	protected getTemplateVars(): Array<{key: string, value: string}> {
		return [{ key: 'fbLoginUrl', value: Configuration.fbLoginUrl},
				{ key: 'googleLoginUrl', value: Configuration.googleLoginUrl}];
	}
}
