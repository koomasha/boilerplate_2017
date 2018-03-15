import * as fs from 'fs';
import { GraphQLSchema } from 'graphql';
import * as tools from 'graphql-tools';
import { error } from 'util';
import {eExceptionTypes, Exception} from '../exception';

const typeDefinitionsArray = new Array<string>();
const loginMethods = ['authLocal', 'authFB', 'authGoogle'];

(fs.readdirSync('bin/api/schemas/', {}) as string[]).forEach((value, index, array) => {
	const f = fs.readFileSync('bin/api/schemas/' + value, 'utf8');
	typeDefinitionsArray.push(f);
});

const schema: GraphQLSchema = tools.makeExecutableSchema({ typeDefs: [...typeDefinitionsArray] });
(fs.readdirSync('bin/api/resolvers/', {}) as string[]).forEach((file: string) => {
	if (file.endsWith('.js')) {
		const resolver = require('./resolvers/' + file);
		const func = (
			o: object) => {
			for (const key in o) {
				if (typeof (o[key]) !== 'function') {
					func(o[key]);
				} else {
					const originalFunc = o[key];
					o[key] = (obj,  args, context, info) => {
						try {
							if (!loginMethods.includes(info.fieldName) && !context.userId) {
								throw new Exception('Please login', eExceptionTypes.Relogin);
							}
							return originalFunc(obj,  args, context, info);
						} catch (err) {
							if (err instanceof Exception) {
								throw err;
							}
							// TODO: add logger
							throw new Exception('Server error', eExceptionTypes.Server, err);
						}
					};
				}
			}
		};
		func(resolver);
		tools.addResolveFunctionsToSchema(schema, resolver);
	}
});

export default schema;
