import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as Configuration from 'config';
import * as RedisConnect from 'connect-redis';
import * as Cors from 'cors';
import * as express from 'express';
import * as Session from 'express-session';
import * as Redis from 'redis';
import schema from './api/schema';

const serverConfig = Configuration.get('PROJECT_NAME.serverConfig');
const EXPRESS_APP_PORT = serverConfig.port;
const app = express();
const redisStore = RedisConnect(Session);
const redisClient = Redis.createClient(serverConfig.redisPort, serverConfig.redisHost);
app.use(Cors({
	credentials: true,
	origin: (origin, callback) => {
		const originIsWhitelisted = serverConfig.whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
}));
app.use(Session({
	resave: true,
	saveUninitialized: true,
	secret: serverConfig.sessionSecret,
	store: new redisStore({
		client: redisClient,
		ttl: serverConfig.sessionTTL,
	}),
}));
app.use('/api', bodyParser.json(), graphqlExpress((req, res) => {
	// tslint:disable
	return { context: {req, res, userId: (req['session']) ? req['session'].userId : null}, schema };
	// tslint:enable
}));
app.use('/sandbox', bodyParser.json(), graphiqlExpress({
											endpointURL: '/api',
											query: 'mutation { authLocal(user: {email:"", password:""}, isSignup: false)}',
										}));
app.listen(EXPRESS_APP_PORT, () => console.log('listening on port: ' + EXPRESS_APP_PORT));
