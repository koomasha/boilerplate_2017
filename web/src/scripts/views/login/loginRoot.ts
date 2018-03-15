import GqlTypes from '../../_generated/gqlTypes';
import RootView from '../rootView';
import LoginFrame from './loginFrame';
export default class LoginRoot extends RootView  {
	private loginFrame: LoginFrame;
	public init(postAuth: (user: GqlTypes.IUser) => void): LoginRoot {
		this.loginFrame = this.create(LoginFrame).init(postAuth);
		this.Element.appendChild(this.loginFrame.Element);
		return this;
	}

}
