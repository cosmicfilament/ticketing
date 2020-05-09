import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.currentUser) {
		throw new NotAuthorizedError();
	}
	// if there is a currentUser then all is cool so next
	next();
};
