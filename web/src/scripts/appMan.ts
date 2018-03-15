import UserApi from './_generated/api/userApi';
import {eViewRoots} from './_generated/eViewRoots';
import GqlTypes from './_generated/gqlTypes';
import LoginRoot from './views/login/loginRoot';
import RootView from './views/rootView';
export default class AppMan {
	private man: RootView;
	constructor() {
		this.init();
	}
	public reLogin() {
		if (this.man && !(this.man instanceof LoginRoot)) {
			this.init();
		}
	}
	public appendError(errorText: string) {
		if (this.man) {
			this.man.appendErrorBox(errorText);
		}
	}
	private async init(user?: GqlTypes.IUser) {
		user = (user) ? user : await this.getMyUser();
		this.removeMan();
		switch (user.defaultView) {
			case eViewRoots.Login:
				this.man = RootView.createRoot(LoginRoot, user).init(this.init.bind(this));
				break;
		}
		this.initDom();
	}
	private removeMan(): void {
		if (this.man) {
			this.man.remove();
		}
	}
	private async getMyUser(): Promise<GqlTypes.IUser> {
		const data =  await UserApi.myUser();
		const dummyUser: GqlTypes.IUserInput = {firstName: '', lastName: '', defaultView: eViewRoots.Login};
		return (data.myUser) ? data.myUser : dummyUser as GqlTypes.IUser;
	}
	private initDom() {
		document.body.innerHTML = '';
		document.body.appendChild(this.man.Element);
	}
}
