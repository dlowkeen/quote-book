import * as express from 'express';
import * as mongoose from 'mongoose';
import { IQuote, User } from '../../../models';

export async function submit(req: express.Request, res: express.Response) {
  const { author, quote, user } = req.body;
  const addQuote: IQuote = {
    author,
    quote,
  };
  // find mongo record of user
  const doc = await User.findOne({ user });
  if (doc) {
    doc.quotes.push(addQuote);
    await doc.save();
  } else {
    console.log('shouldnt have gotten here...');
  }

  // add quote to user
  // save
  res.status(200).send({ success: true });
}
