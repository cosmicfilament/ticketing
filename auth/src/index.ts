'use strict';

/**
  * @module index.ts
  * @author John Butler
  * @description 
*/

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true
	})
);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', (req, res, next) => {
	throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
	// check if env variables are defined
	if (!process.env.JWT_KEY) throw new Error('JWT_KEY is not defined');

	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
		console.log('connected to mongodb/auth');
	} catch (err) {
		console.log(err);
	}
	app.listen(3000, () => console.log('Listening on port 3000.'));
};

start();
