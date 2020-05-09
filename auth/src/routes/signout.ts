'use strict';

/**
  * @module signout.ts
  * @author John Butler
  * @description 
*/

import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
	req.session = null;
	res.send({});
});

export { router as signOutRouter };
