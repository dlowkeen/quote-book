import * as express from 'express';
import * as mongoose from 'mongoose';
import { IQuote, User } from '../../../models';

export async function submit(req: express.Request, res: express.Response) {
  const { author, quote, user } = req.body;
  const addQuote: IQuote = {
    author,
    createdOn: new Date(),
    quote,
  };
  const doc = await User.findOne({ user });
  if (doc) {
    doc.quotes.push(addQuote);
    await doc.save();
    res.status(200).send({ success: true });
  } else {
    console.log('shouldnt have gotten here...');
    res.status(500).send({ success: false });
  }
}

export async function get(req: express.Request, res: express.Response) {
  const { qty, user } = req.query;
  const doc = await User.findOne({ user });
  if (doc) {
    if (parseInt(qty, 0) === 1) {
      const totalQuotes = doc.quotes.length;
      const random = Math.floor(Math.random() * totalQuotes);
      res.status(200).send({ quotes: doc.quotes[random], succes: true });
    } else {
      res.status(200).send({ quotes: doc.quotes, succes: true });
    }
  } else {
    console.log('shouldnt have gotten here...');
    res.status(500).send({ success: false });
  }
}
