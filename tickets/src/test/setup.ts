import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): string[];
		}
	}
}

jest.mock('../nats-wrapper');

let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = 'some_string';
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});

beforeEach(async () => {
	jest.clearAllMocks();
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

// globally scoped in the test environment, only
global.signin = () => {
	// build a JWT payload {id, email}
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'bob@bobster.com'
	};
	// create the JWT
	const token = jwt.sign(payload, process.env.JWT_KEY!);
	// Build session Object {jwt: My_JWT}
	const session = { jwt: token };
	// Turn that session into JSON
	const sessionAsJSON = JSON.stringify(session);
	// base64 encode it
	const toBase64 = Buffer.from(sessionAsJSON).toString('base64');
	// return a string that's the cookie with encoded data
	return [ `express:sess=${toBase64}` ];
};
