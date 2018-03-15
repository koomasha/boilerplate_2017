import AuthApi from '../../_generated/api/authApi';
import { eViewNames } from '../../_generated/eViewNames';
import GqlTypes from '../../_generated/gqlTypes';
import Utils from '../../common/utils';
import View from '../view';
export default class Navigation extends View {
	public init(): Navigation {
		this.createElement(eViewNames.Navigation);
		this.setLogoutBtn();
		return this;
	}
	protected getTemplateVars(): Array<{key: string, value: string}> {
		return [{ key: 'firstName', value: this.Root.User.firstName}];
	}

	private setLogoutBtn(): void {
		if (!Utils.stringIsEmpty(this.Root.User.firstName) && !Utils.stringIsEmpty(this.Root.User.lastName)) {
			const logoutEl = document.createElement('div') as HTMLDivElement;
			logoutEl.classList.add('link');
			logoutEl.innerText = 'Logout';
			logoutEl.onclick = async () => {
				await AuthApi.logout();
				window.location.href = '/';
			};
			this.Element.getElementsByClassName('navigation')[0].appendChild(logoutEl);
		}
	}
}
