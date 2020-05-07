'use strict';

/**
  * @module request-validation-error.ts
  * @author John Butler
  * @description 
*/

import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
	constructor (public errors: ValidationError[]) {
		super();

		// Only because we are extending a builtin class
		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}
}
