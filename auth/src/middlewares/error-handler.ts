'use strict';

/**
  * @module error-handler.ts
  * @author John Butler
  * @description sends back an error object with an array of error messages in it
	* {
	*		errors: {
	* 		message: string, field?: string
	*		}[]
	*	}	
	}
*/

import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}
	res.status(400).send({ errors: [ { message: 'Something went wrong!' } ] });
};
