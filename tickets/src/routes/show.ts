import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@dogslobber/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
	const ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		throw new NotFoundError();
	}

	// defaults to status code 200 if not supplied
	res.send(ticket);
});

export { router as showTicketRouter };
