import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import {
	requireAuth,
	validateRequest,
	NotFoundError,
	BadRequestError,
	OrderStatus
} from '@dogslobber/common';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';

import { Order } from '../models/order';
import { Ticket } from '../models/ticket';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
	'/api/orders',
	requireAuth,
	[
		body('ticketId')
			.not()
			.isEmpty()
			// creates a small degree of coupling to the tickets service
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage('TicketId must be provided')
	],
	validateRequest,
	async (req: Request, res: Response) => {
		// Find the ticket user is trying to order in the db
		const { ticketId } = req.body;
		const desiredTicket = await Ticket.findById(ticketId);
		if (!desiredTicket) {
			throw new NotFoundError();
		}
		// Make sure that the ticket is not already reserved
		// Look at all orders to see if there is an order with status != cancelled
		// which would mean that it is already reserved. so throw error
		const isReserved = await desiredTicket.isReserved();
		if (isReserved) {
			throw new BadRequestError('Ticket is already reserved.');
		}
		// Calculate an expiration date for this order
		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
		// Build the order and save to db
		const order = Order.build({
			userId: req.currentUser!.id,
			status: OrderStatus.Created,
			expiresAt: expiration,
			ticket: desiredTicket
		});
		await order.save();
		new OrderCreatedPublisher(natsWrapper.client).publish({
			id: order.id,
			status: order.status,
			userId: order.userId,
			expiresAt: order.expiresAt.toISOString(),
			ticket: {
				id: ticketId.id,
				price: ticketId.price
			}
		});

		res.status(201).send(order);
	}
);

export { router as newOrderRouter };
