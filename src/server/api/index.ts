import express from 'express';

import * as demoData from './demo-data';

const router = express.Router();

router.get('/demo-data', demoData.get);

export default router;
