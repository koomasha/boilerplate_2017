import { eViewNames } from '../../_generated/eViewNames';
import DateMethods from '../../common/dateMethods';
import { eEventTypes } from '../../common/eEventTypes';
import {eDays, eMonths} from '../../common/enDateNames';
import View from '../view';
export default class DatePicker extends View {
	private mondayFirst: boolean = true;
	private onDateSelect: (timestamp: number) => any;
	private datePickerEl: HTMLElement;
	private timestamp: number;
	public init(
		onDateSelect: (timestamp: number) => any,
		datePickerEl: HTMLElement,
		timestamp: number = Date.now(),
	): DatePicker {
		this.timestamp = timestamp;
		this.datePickerEl = datePickerEl;
		this.onDateSelect = onDateSelect;
		this.createDatePickerMonthView();
		return this;
	}
	protected getTemplateVars(): Array<{key: string, value: string}> {
		return [
		{ key: 'title', value: this.getDatePickerTitle()},
		{ key: 'firstDay', value: eDays[eDays.Sunday + Number(this.mondayFirst)].substring(0, 3)},
		{ key: 'secondDay', value: eDays[eDays.Monday + Number(this.mondayFirst)].substring(0, 3)},
		{ key: 'thirdDay', value: eDays[eDays.Tuesday + Number(this.mondayFirst)].substring(0, 3)},
		{ key: 'fourthDay', value: eDays[eDays.Wednesday + Number(this.mondayFirst)].substring(0, 3)},
		{ key: 'fifthDay', value: eDays[eDays.Thursday + Number(this.mondayFirst)].substring(0, 3)},
		{ key: 'sixthDay', value: eDays[eDays.Friday + Number(this.mondayFirst)].substring(0, 3)},
		{ key: 'seventhDay', value: eDays[eDays.Saturday - (eDays.Saturday * Number(this.mondayFirst))].substring(0, 3)},
	]; }
	protected bindEvents(): void {
		this.bindEvent('prev-week', eEventTypes.Click,
			this.resetMonthView.bind(this, DateMethods.getPreviousMonthTimestamp(this.timestamp)));
		this.bindEvent('next-week', eEventTypes.Click,
			this.resetMonthView.bind(this, DateMethods.getNextMonthTimestamp(this.timestamp)));
		this.bindEvent('overlay', eEventTypes.Click, this.Root.clickOnOverlay.bind(this.Root, this.removeElement.bind(this)));
	}
	private createDatePickerMonthView(): void {
		this.removeElement();
		this.createElement(eViewNames.DatePicker);
		this.setElementPosition();
		let timestamp = DateMethods.getFirstDayOfMonthTimestamp(this.timestamp);
		const datesElements = this.Element.getElementsByClassName('dates')[0].getElementsByTagName('div');
		let datecounter = 0;
		for (let weekIndex = 0; weekIndex < 5; weekIndex++) {
			for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
				this.setDateElement(datesElements[datecounter++], timestamp, dayIndex);
			}
			timestamp = DateMethods.getNextWeekTimestamp(timestamp);
		}
		this.Root.Element.appendChild(this.Element);
	}
	private resetMonthView(monthTimestamp: number): void {
		this.timestamp = monthTimestamp;
		this.createDatePickerMonthView();
	}
	private setElementPosition(): void {
		const position = this.datePickerEl.getBoundingClientRect();
		const datepicker = this.Element.getElementsByClassName('datepicker')[0] as HTMLElement;
		datepicker.style.top = position.top.toString();
		datepicker.style.left = (position.left + position.width).toString();
	}
	private getDatePickerTitle(): string {
		return DateMethods.getMonthName(this.timestamp) + ', ' + DateMethods.getYear(this.timestamp);
	}
	private setDateElement(element: HTMLElement, timestamp: number, dayNumber: number) {
		const dayTimestamp = DateMethods.getWeekDayTimestamp(timestamp, dayNumber + Number(this.mondayFirst));
		element.innerText = DateMethods.getDayDate(dayTimestamp).toString();
		element.onclick =  () =>  {
			this.removeElement();
			this.onDateSelect(dayTimestamp);
		};
	}

}
