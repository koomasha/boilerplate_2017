import { eViewNames } from '../_generated/eViewNames';
import Templates from '../_generated/templates';
import { eEventTypes } from '../common/eEventTypes';
import Utils from '../common/utils';
import RootView from './rootView';
export default class View {
	protected root: RootView;
	private element: HTMLElement;
	private elementId: string;
	private parent: View;
	private children: View[] = [];
	public get Parent(): View{
		return this.parent;
	}
	public get Root(): RootView {
		return this.root;
	}
	public get Children(): View[]{
		return this.children;
	}
	public get Element(): HTMLElement {
		return this.element;
	}
	public create<T extends View>(type: { new(): T}): T {
		const child = new type();
		child.root = this.root;
		child.parent = this;
		this.Children.push(child);
		return child;
	}
	public remove(): void {
		for (let i = 0; i <  this.parent.children.length; i++) {
			if (this.parent.children[i].equals(this)) {
				for (const child of this.parent.children[i].children) {
					child.remove();
				}
				this.parent.children[i] = null;
				this.parent.children.splice(i, 1);
				break;
			}
		}
		this.removeElement();
	}
	public removeElement(): void {
		if (this.Element) {
			this.Element.remove();
		}
	}
	protected createElement(viewName: eViewNames, resetElement: boolean = false): void {
		const el = document.createElement('div') as HTMLElement;
		el.innerHTML = this.prepareTemplate(viewName);
		if (resetElement) {
			this.element.innerHTML =  el.children[0].innerHTML;
		} else {
			this.element =  el.children[0] as HTMLElement;
			this.elementId = Utils.generateGUID();
		}
		this.bindEvents();
	}
	protected resetElement(viewName: eViewNames): void {
		this.createElement(viewName, true);
	}
	protected getTemplateVars(): Array<{key: string, value: string}> {
		return [{ key: '', value: ''}];
	}
	protected bindEvents(): void {
		return;
	}
	protected bindEvent(className: string, eventType: eEventTypes, method: () => void, miliSecondsBeforeSave: number = 0) {
		let element = this.Element;
		if (!this.Element.classList.contains(className)) {
			element = this.Element.getElementsByClassName(className)[0] as HTMLElement;
		}
		switch (eventType) {
			case eEventTypes.Click:
				element.onclick = method;
				break;
			case eEventTypes.Change:
				element.onchange = method;
				break;
			case eEventTypes.KeyUp:
				element.onkeyup = method;
				break;
		}
	}
	private prepareTemplate(viewName: eViewNames): string {
		let template = Templates.getTemplate(viewName);
		for (const tv of this.getTemplateVars()){
			template = template.replace(new RegExp('{{' + tv.key + '}}', 'g'), tv.value);
		}
		return template;
	}
	private equals(other: View ): boolean {
		return this.elementId === other.elementId;
	}
}
