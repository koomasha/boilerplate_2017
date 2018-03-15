import { eViewNames } from '../_generated/eViewNames';
import GqlTypes from '../_generated/gqlTypes';
import DatePicker from './shared/datePicker';
import ErrorBox from './shared/errorBox';
import Navigation from './shared/navigation';
import View from './view';
export default class RootView extends View {
	public static createRoot<T extends RootView>(type: { new(): T}, user: GqlTypes.IUser): T {
		const root = new type();
		root.root = root;
		root.initRoot(user);
		return root;
	}
	private datePicker: DatePicker;
	private errorBox: ErrorBox;
	private navigation: Navigation;
	private user: GqlTypes.IUser;
	public get User(): GqlTypes.IUser {
		return this.user;
	}
	public get DatePicker(): DatePicker {
		return this.datePicker;
	}
	public get ErrorBox(): ErrorBox {
		return this.errorBox;
	}
	public appendDatepicker(
		onDateSelect: (timestamp: number) => any,
		datePickerEl: HTMLElement,
		timestamp: number = Date.now(),
	): void {
		this.datePicker.init(onDateSelect, datePickerEl, timestamp);
	}
	public appendErrorBox(errorText: string): void {
		this.Element.getElementsByClassName('error-box-container')[0].appendChild(this.errorBox.init(errorText).Element);
	}
	public remove(): void {
		for ( const child of this.Children) {
			child.remove();
		}
		this.removeElement();
	}
	public clickOnOverlay(onOverlayClick: () => any): void {
		if ((event.target as HTMLElement).classList.contains('overlay')) {
			onOverlayClick();
		}
	}
	private initRoot(user: GqlTypes.IUser): void {
		this.user = user;
		this.errorBox = this.create(ErrorBox);
		this.datePicker = this.create(DatePicker);
		this.createElement(eViewNames.Root);
		this.navigation = this.create(Navigation).init();
		this.Element.appendChild(this.navigation.Element);
	}
}
