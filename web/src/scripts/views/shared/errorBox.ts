import { eViewNames } from '../../_generated/eViewNames';
import { eEventTypes } from '../../common/eEventTypes';
import View from '../view';
export default class ErrorBox extends View {
	public init(errorText): ErrorBox {
		this.removeElement();
		this.createElement(eViewNames.ErrorBox);
		this.appendError(errorText);
		return this;
	}
	protected getTemplateVars(): Array<{key: string, value: string}> {
		return [{ key: '' , value: '' }];
	}
	protected bindEvents(): void {
		this.bindEvent('close', eEventTypes.Click, this.removeElement.bind(this));
	}
	private appendError(errorText: string) {
		(this.Element.getElementsByClassName('error-text')[0] as HTMLElement).innerText = errorText;
	}
}
