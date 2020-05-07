'use strict';

/**
  * @module bad-request-error.ts
  * @author John Butler
  * @description 
*/

import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
	statusCode = 400;
	constructor (public message: string) {
		super(message);

		// Only because we are extending a builtin class
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
	serializeErrors () {
		return [ { message: this.message } ];
	}
}
