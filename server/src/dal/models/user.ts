import * as bluebird from 'bluebird';
import * as Configuration from 'config';
import mongoose = require('mongoose');
mongoose.Promise = bluebird;
import { InstanceType, ModelType, prop, Typegoose } from 'typegoose';
mongoose.connect(Configuration.get('PROJECT_NAME.dbConfig.fullPath'), {useMongoClient: true});
enum eViewRoots {
	Login = 'Login',
}
class User extends Typegoose {
	public id?: string;
	@prop({ index: true, unique: true, required: true })
	public email: string;
	@prop({ required: true })
	public password: string;
	@prop({ required: true })
	public firstName: string;
	@prop({ required: true })
	public lastName: string;
	@prop(({ default: eViewRoots.Login, enum: eViewRoots }))
	public defaultView: string;
	@prop()
	public fbId: string;
}

const UserModel = new User().getModelForClass(User, {existingMongoose: mongoose});

export {User, UserModel};
