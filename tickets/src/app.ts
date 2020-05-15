import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler, currentUser } from '@dogslobber/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { IndexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test'
	})
);
// if logged in will put current user on the app object
// so that we can use it for validation on route handlers
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(IndexTicketRouter);
app.use(updateTicketRouter);

app.all('*', (req, res, next) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
