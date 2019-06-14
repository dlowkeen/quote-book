import * as express from 'express';
import { IQuote, User } from '../../../models';
import * as helpers from '../../../utils';

export async function submit(req: express.Request, res: express.Response) {
  const { targetAuthor, targetQuote, user } = req.body;
  const addQuote: IQuote = {
    author: targetAuthor,
    createdOn: new Date(),
    id: helpers.generateId(),
    quote: targetQuote,
    status: 'active',
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

export async function edit(req: express.Request, res: express.Response) {
  try {
    const { targetAuthor, targetId, targetQuote, user } = req.body;
    const updated = await User.findOneAndUpdate(
      { user, 'quotes.id': targetId },
      {
        $set: {
          'quotes.$.quote': targetQuote,
          'quotes.$.author': targetAuthor,
        },
      },
    );
    if (updated) {
      return res.status(200).send({ quotes: updated.quotes, succes: true });
    } else {
      return res.status(500).send({ success: false });
    }
  } catch (e) {
    console.log('err', e);
    return res.status(500).send({ success: false, error: e });
  }
}

export async function get(req: express.Request, res: express.Response) {
  const { qty, user } = req.query;
  const doc = await User.findOne({ user });
  if (doc) {
    if (parseInt(qty, 0) === 1) {
      const availableQuotes: any = [];
      doc.quotes.forEach(x => {
        if (x.status === 'active') {
          availableQuotes.push(x);
        }
      });
      const totalQuotes = availableQuotes.length;
      const random = Math.floor(Math.random() * totalQuotes);
      res.status(200).send({
        quotes: availableQuotes[random] ? [availableQuotes[random]] : null,
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
    const updated = await User.findOneAndUpdate(
      { user, 'quotes.quote': quote, 'quotes.author': author },
      {
        $set: { 'quotes.$.status': 'deleted' },
      },
    );
    if (updated) {
      return res.status(200).send({ quotes: updated.quotes, succes: true });
    }
  } catch (e) {
    console.log('err', e);
    res.status(500).send({ success: false, error: e });
  }
}
