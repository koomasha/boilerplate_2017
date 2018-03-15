import * as Session from 'express-session';
import {User} from '../dal/models/user';
export default interface IApiRequest extends Request {
	session: Session;
	user: User;
	body: any;
}
