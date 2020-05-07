'use strict';

/**
  * @module current-user.ts
  * @author John Butler
  * @description 
*/

import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
	res.send('hello from current user bitches');
});

export { router as currentUserRouter };
