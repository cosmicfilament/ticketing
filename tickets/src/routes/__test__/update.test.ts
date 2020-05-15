import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

const buildTicket = () => {
	const title = 'Cream';
	const price = 12;
	const id = new mongoose.Types.ObjectId().toHexString();
	return [ title, price, id ];
};

it('returns a 404 if provided id does not exist', async () => {
	const [ title, price, id ] = buildTicket();

	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', global.signin())
		.send({
			title,
			price
		})
		.expect(404);
});

it('returns a 401 not allowed if user not authenticated', async () => {
	const [ title, price, id ] = buildTicket();

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title,
			price
		})
		.expect(401);
});

it('returns a 401 if user does not own the ticket', async () => {
	const [ title, price ] = buildTicket();
	// login and create a ticket
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({
			title,
			price
		});
	// try to update that ticket as a different user
	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', global.signin())
		.send({
			title,
			price: 99
		})
		.expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
	const cookie = global.signin();
	const [ title, price ] = buildTicket();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title,
			price
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: '',
			price: 99
		})
		.expect(400);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'The Beatles',
			price: -10
		})
		.expect(400);
});

it('updates the ticket provided valid inputs', async () => {
	const cookie = global.signin();
	const [ title, price ] = buildTicket();
	const [ newTitle, newPrice ] = [ 'Blind Faith', 25 ];

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title,
			price
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: newTitle,
			price: newPrice
		})
		.expect(200);

	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send();

	expect(ticketResponse.body.title).toEqual(newTitle);
	expect(ticketResponse.body.price).toEqual(newPrice);
});

it('publishes an event', async () => {
	const cookie = global.signin();

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({
			title: 'Blind Faith',
			price: 25
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({
			title: 'new title',
			price: 100
		})
		.expect(200);

	expect(natsWrapper.client.publish).toHaveBeenCalled();
});
