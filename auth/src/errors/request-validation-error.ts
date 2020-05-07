'use strict';

/**
  * @module request-validation-error.ts
  * @author John Butler
  * @description 
*/

import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
	// errors: ValidationError[];
	// the public errors in ctr is same as commented
	constructor (public errors: ValidationError[]) {
		// this.errors = errors;
		super();

		// Only because we are extending a builtin class
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}
}
