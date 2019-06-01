import axios from 'axios';
import express from 'express';
import { API } from '../../../config';

import { delay } from '../../../utils';

export const demoData = [
  {
    categories: [
      {
        _id: '_1',
        children: [],
        name: 'categoryName',
        rootNode: true,
      },
    ],
    createdDate: new Date().toISOString(),
    filename: 'filename',
    id: '1',
  },
];

export async function get(req: express.Request, res: express.Response) {
  try {
    // DEMO LOGIC
    // kill time to mock real request
    await delay(1000);
    // For demo's sake, flip a coin to succeed or fail
    const rand = Math.random();
    if (rand > 0.5) {
      return res.json(demoData);
    } else {
      return res.status(500).send('Sorry... your request has failed.');
    }

    // ACTUAL HTTP(S) REQUEST
    // const { data } = await axios.get(
    //   `${API.uri}/data?id=${req.query.id}`,
    // );

    // res.json(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}
