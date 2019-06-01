import * as express from 'express';

export async function submit(req: express.Request, res: express.Response) {
  const { author, quote } = req.body;
  console.log('authorrrr', author, quote);
  res.status(200).send({ success: true });
}
