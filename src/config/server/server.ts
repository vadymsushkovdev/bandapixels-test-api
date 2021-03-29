import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../../components/router';

const app: express.Application = express();

Middleware.configure(app);

Routes.init(app);

Middleware.initErrorHandler(app);

app.set('port', process.env.PORT);
app.set('secret', process.env.SECRET);

export default app;
