import * as express from 'express';
import * as mongoose from 'mongoose';

export async function submit(req: express.Request, res: express.Response) {
  const { author, quote } = req.body;
  res.status(200).send({ success: true });
}
