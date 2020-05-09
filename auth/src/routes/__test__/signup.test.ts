import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test1@test.com', password: 'password' })
		.expect(201);
});

it('returns a 400 on duplicate signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test1@test.com', password: 'password' })
		.expect(201);
});

it('returns a 400 on an invalid email', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'w34', password: 'password' })
		.expect(400);
});

it('returns a 400 on an invalid password', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'p' })
		.expect(400);
});

it('returns a 400 on a missing email or password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({email: 'test@test.com'})
		.expect(400);

		await request(app)
		.post('/api/users/signup')
		.send({password: '1234xyzz'})
		.expect(400);
});

it('sets a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({ email: 'test2@test.com', password: 'password' })
		.expect(201);

		expect(response.get('Set-Cookie')).toBeDefined();
});
