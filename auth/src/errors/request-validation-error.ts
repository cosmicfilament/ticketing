'use strict';

/**
  * @module request-validation-error.ts
  * @author John Butler
  * @description 
*/

import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
	statusCode = 400;
	// errors: ValidationError[];
	// the public errors in ctr is same as commented
	constructor (public errors: ValidationError[]) {
		// this.errors = errors;
		super('Error in login parameters');

		// Only because we are extending a builtin class
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors () {
		return this.errors.map(err => {
			return { message: err.msg, field: err.param };
		});
	}
}
