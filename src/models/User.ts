import { Document, Model, model, Schema } from 'mongoose';

export interface IQuote {
  author: string;
  quote: string;
  createdOn: Date;
}

export interface IUserModel extends Document {
  createdOn: Date;
  modifiedOn: Date;
  user: string;
  quotes: IQuote[];
}

export let UserSchema: Schema = new Schema({
  createdOn: { type: Date, default: Date.now },
  quotes: [Schema.Types.Mixed],
  user: { type: String, required: true },
  modifiedOn: { type: Date, default: Date.now },
});

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);
