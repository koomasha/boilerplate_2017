import {eDays, eMonths} from './enDateNames';
import Utils from './utils';
export default class DateMethods {

	public static getWeekDayTimestamp(weekTimestamp: number, dayNumber: number): number {
		const d = new Date(weekTimestamp);
		d.setDate(d.getDate() - d.getDay() + dayNumber);
		return d.getTime();
	}
	public static getDayDate(timestamp: number): number {
		const d = new Date(timestamp);
		return d.getDate();
	}
	public static getYesterdayTimestamp(timestamp: number): number {
		const d = new Date(timestamp);
		d.setDate(d.getDate() - 1);
		return d.getTime();
	}
	public static getTomorowTimestamp(timestamp: number): number {
		const d = new Date(timestamp);
		d.setDate(d.getDate() + 1);
		return d.getTime();
	}
	public static getNextWeekTimestamp(timestamp: number): number {
		const d = new Date(timestamp);
		d.setDate(d.getDate() + (7 - d.getDay()));
		return d.getTime();
	}
	public static getFirstDayOfMonthTimestamp(timestamp: number): number {
		let d = new Date(timestamp);
		d = new Date(d.getFullYear(), d.getMonth(), 1);
		return d.getTime();
	}
	public static getMonthName(timestamp: number): string {
		const d = new Date(timestamp);
		return eMonths[d.getMonth()];
	}
	public static getPreviousMonthTimestamp(timestamp: number): number {
		let d = new Date(timestamp);
		d = new Date(d.getFullYear(), d.getMonth() - 1, 1);
		return d.getTime();
	}
	public static getNextMonthTimestamp(timestamp: number): number {
		let d = new Date(timestamp);
		d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
		return d.getTime();
	}
	public static getYear(timestamp: number): number {
		const d = new Date(timestamp);
		return d.getFullYear();
	}
}
