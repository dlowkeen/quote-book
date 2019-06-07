import * as express from 'express';
import * as mongoose from 'mongoose';
import * as mailJet from 'node-mailjet';
import * as config from '../../../config';
import { User } from '../../../models';

const mailjet = mailJet.connect(
  config.mailJet.apiKeyPublic,
  config.mailJet.apiKeyPrivate,
);

export async function send(req: express.Request, res: express.Response) {
  const { action, email, password } = req.body;
  const cleanedEmail = email.toLowercase();
  const doc = await User.findOne({ user: cleanedEmail, password });
  console.log('doc', doc);
  if (action === 'login') {
    if (doc) {
      // cool update state
      res.status(200).send({ email, success: true });
    } else {
      // return error: You need to sign up first
      res.status(500).send({
        message: 'Account does not exist. You need to sign up first!',
        success: false,
      });
    }
  } else if (action === 'signup') {
    if (doc) {
      res.status(500).send({
        message: 'Account already exists. Please login.',
        success: false,
      });
    } else {
      User.create({ user: cleanedEmail, password });

      const requestJet = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            Bcc: [
              {
                Email: 'lowkeendonovan@gmail.com',
                Name: 'Donovan Lowkeen',
              },
            ],
            From: {
              Email: 'technology.nudge@gmail.com',
              Name: 'SimpleQuoteBook Support',
            },
            HTMLPart: `<h3>Dear ${email},</h3>
            Thank you for signing up for <a href="https://simple-quote-book.herokuapp.com/">SimpleQuoteBook</a>!<br />
            This is the only email you'll get from us! Please let us know if you need anything.`,
            Subject: 'Sign Up Confirmation',
            TextPart: `Dear ${email}, Thank you for signing up for SimpleQuoteBook! This is the only email you'll get from us! Please let us know if you need anything.`,
            To: [
              {
                Email: email,
                Name: 'User',
              },
            ],
          },
        ],
      });
      requestJet
        .then((result: any) => {
          console.log(result.body);
          res.status(200).send({ success: true, email });
        })
        .catch((err: Error) => {
          console.log(err);
          res.status(500).send({ success: false });
        });
    }
  }
}
