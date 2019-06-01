import express from 'express';

import * as demoData from './demo-data';
import * as email from './email';

const router = express.Router();

router.get('/demo-data', demoData.get);
router.get('/email', email.send);

router.get('/healthcheck', (req, res) => {
  return res.send('OK');
});

export default router;
