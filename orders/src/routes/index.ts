import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { body } from 'express-validator';
import { requireAuth } from '@dogslobber/common';
const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
	// user must be logged in to get orders
	const orders = await Order.find({
		userId: req.currentUser!.id
	}).populate('ticket');

	res.send(orders);
});

export { router as indexOrderRouter };
