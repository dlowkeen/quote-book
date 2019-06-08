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
      res.status(200).send({
        quotes: doc.quotes[random] ? [doc.quotes[random]] : null,
        succes: true,
      });
    } else {
      res.status(200).send({ quotes: doc.quotes, succes: true });
    }
  } else {
    console.log('shouldnt have gotten here...');
    res.status(500).send({ success: false });
  }
}

// not actually deleting, just updating to not render
export async function deleteQuote(req: express.Request, res: express.Response) {
  try {
    const { author, quote, user } = req.body;
    const doc = await User.findOne({ user });
    if (doc) {
      for (const q of doc.quotes) {
        if (q.author === author && q.quote === quote) {
          q.status = 'deleted';
        }
      }
      console.log('doc.quotes', doc.quotes);
      const saved = await doc.save();
      console.log('doc after', doc);
      console.log('saved', saved);
      return res.status(200).send({ quotes: doc.quotes, succes: true });
    } else {
      console.log('shouldnt have gotten here');
      return res.status(500).send({ success: false });
    }
  } catch (e) {
    console.log('err', e);
    return res.status(500).send({ success: false, error: e });
  }
}
