import { Document, Model, model, Schema } from 'mongoose';

export interface IQuote {
  author: string;
  quote: string;
}

export interface IQuoteModel extends IQuote, Document {
  createdOn: Date;
  modifiedOn: Date;
}

export let QuoteSchema: Schema = new Schema({
  createdOn: { type: Date, default: Date.now },
  author: { type: String, required: false },
  quote: { type: String, required: true },
  modifiedOn: { type: Date, default: Date.now },
});

export const Quote: Model<IQuoteModel> = model<IQuoteModel>(
  'quote',
  QuoteSchema,
);
