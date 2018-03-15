import * as express from 'express';
import Configuration from './scripts/_generated/configuration';

const EXPRESS_APP_PORT = Configuration.port;
const app = express();
app.use(express.static(__dirname + '/public', { maxAge: '24h' }));
app.listen(EXPRESS_APP_PORT, () => console.log('listening on port: ' + EXPRESS_APP_PORT));
app.use((req, res) => {
	res.status(404).sendFile('/public/404.html', {root: __dirname });
});
