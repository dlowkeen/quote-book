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
  const { email } = req.query;
  const doc = await User.findOne({ user: email });
  console.log('doc', doc);
  if (doc) {
    // TO-DO: CREATE LOGIN ROUTE
    res.status(500).send({ message: 'Email already taken', success: false });
  } else {
    User.create({ user: email });

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
            Name: 'Gavano Support',
          },
          HTMLPart: `<h3>Dear ${email},</h3>
          Thank you for signing up for <a href="https://hidden-inlet-70329.herokuapp.com/">Gavano</a>!<br />
          We will let you know when we are ready to launch!`,
          Subject: 'Sign up success!',
          TextPart: `Dear ${email}, Thank you for signing up for Gavano! We will let you know when we are ready to launch!`,
          To: [
            {
              Email: email,
              Name: 'Customer',
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
