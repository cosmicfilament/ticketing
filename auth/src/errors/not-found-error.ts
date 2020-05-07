'use strict';

/**
  * @module not-found-error.ts
  * @author John Butler
  * @description 
*/

import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
	statusCode = 404;

	constructor () {
		super('Route not found');
		// Only because we are extending a builtin class
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
	serializeErrors () {
		return [ { message: 'Not Found' } ];
	}
}
