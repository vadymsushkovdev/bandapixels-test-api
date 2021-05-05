import express from 'express';
import 'module-alias/register';
import Middleware from '@config/middleware/middleware';
import Routes from '@components/router';

const app: express.Application = express();

Middleware.configure(app);

Routes(app);

Middleware.initErrorHandler(app);

app.set('port', process.env.PORT);
app.set('secret', process.env.SECRET);

export default app;
