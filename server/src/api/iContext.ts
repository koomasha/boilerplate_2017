import {User} from '../dal/models/user';
import IApiRequest from './iApiRequest';
export default interface IContext {
	req: IApiRequest;
	res: Response;
	userId: string;
}
