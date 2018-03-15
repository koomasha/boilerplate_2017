import Configuration from '../_generated/configuration';
import GqlTypes from '../_generated/gqlTypes';
import {eExceptionTypes, Exception} from '../exception';
class FetchGQL {
	public async query(query) {
		const fetchData: RequestInit = {
			body: JSON.stringify(query),
			credentials: 'include',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}),
			method: 'POST',
		};
		const data =  await this.request(fetchData);
		if (data.errors) {
			for (const e of data.errors) {
				try {
					const exception = JSON.parse(e.message) as Exception;
					new Exception(exception.msg, exception.type, data.errors).handleException();
				} catch ( err ) {
					// TODO: add logger
					throw new Exception('Unknown Error', eExceptionTypes.Unknown, data.errors);
				}
			}
		}
		return data;
	}
	private async request(fetchData: RequestInit): Promise<GqlTypes.IGraphQLResponseRoot> {
		const response = await fetch(Configuration.apiEndpoint, fetchData);
		if (!response.ok) {
			// TODO: add logger
			throw new Exception('Unknown Error', eExceptionTypes.Unknown, response.json());
		}
		return response.json();
	}
}
export default FetchGQL;
