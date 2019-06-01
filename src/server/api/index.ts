import express from 'express';

import * as demoData from './demo-data';
import * as email from './email';
import * as quote from './quote';

const router = express.Router();

router.get('/demo-data', demoData.get);
router.get('/email', email.send);
router.post('/quote', quote.submit);

router.get('/healthcheck', (req, res) => {
  return res.send('OK');
});

export default router;
