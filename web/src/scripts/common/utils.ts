export default class Utils {
	public static getVarFromQueryString(queryStr: string, varName: string): string {
		const prop = queryStr.split(varName + '=');
		return (prop.length > 1) ? prop[1].split('&')[0] : '';
	}
	public static truncateFBQueryResponse(queryString: string) {
		if (queryString.substr((queryString.length - ('#_=_').length), queryString.length) === '#_=_') {
			queryString = queryString.substr(0, (queryString.length - 4));
		}
		return queryString;
	}
	public static generateGUID(): string {
		// implementation of guid
		return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			// tslint:disable
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
			// tslint:enable
		});
	}
	public static formIsValid(form: HTMLElement): boolean {
		Utils.removeErrorClassFromForm(form);
		const inputs = form.getElementsByTagName('input');
		let invalid: boolean;
		for (const input of inputs as any) {
			switch (input.type) {
				case 'email':
					invalid = Utils.emailNotValid(input.value);
					break;
				case 'password':
					invalid = Utils.passwordNotValid(input.value);
					break;
				case 'text':
					invalid = (Utils.stringIsEmpty(input.value) && input.required);
					break;
				case 'number':
					const value = Number(input.value);
					const min = Number(input.min);
					const max = Number(input.max);
					invalid = (isNaN(value) || value < min || value > max);
					break;
			}
			if (invalid) {
				input.classList.add('invalid');
				break;
			}
		}
		return !invalid;
	}
	public static emailNotValid(email: string): boolean {
		const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
		return !regex.test(email);
	}
	public static passwordNotValid(password: string): boolean {
		return (password.length < 3);
	}
	public static stringIsEmpty(str: string) {
		return (str.length === 0);
	}
	public static removeErrorClassFromForm(element: HTMLElement) {
		const invalidInputs = element.getElementsByClassName('invalid')as any;
		for (const input of invalidInputs) {
			input.classList.remove('invalid');
		}
	}
}
