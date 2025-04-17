import * as path from 'path';

import { HTTPError } from './HttpError';
import { Nunjucks } from './modules/nunjucks';

import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { glob } from 'glob';
import favicon from 'serve-favicon';

const { setupDev } = require('./development');

const env = process.env.NODE_ENV || 'development';
const developmentMode = env === 'development';

export const app = express();
app.locals.ENV = env;

new Nunjucks(developmentMode).enableFor(app);

app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

// Glob function amended to use path.posix.join for cross-platform compatibility
const routes = glob.sync(path.posix.join(__dirname.replace(/\\/g, '/'), 'routes/**/*.+(ts|js)'));

routes
  .map(filename => {
    const absolutePath = path.resolve(filename);
    const route = require(absolutePath);
    return route;
  })
  .forEach(route => {
    if (route.default) {
      route.default(app);
    } else {
      console.log(`Route does not have a default export: ${route}`);
    }
  });

setupDev(app, developmentMode);

// error handler
app.use((err: HTTPError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err?.message || 'An error occurred';
  res.locals.error = env === 'development' ? err : {};
  res.status(err?.status || 500);
  res.render('error');
});
