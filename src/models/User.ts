import { Document, Model, model, Schema } from 'mongoose';

export interface IQuote {
  author: string;
  createdOn: Date;
  id: string;
  quote: string;
  status: string;
}

export interface IUserModel extends Document {
  createdOn: Date;
  modifiedOn: Date;
  password: string;
  user: string;
  quotes: IQuote[];
}

export let UserSchema: Schema = new Schema({
  createdOn: { type: Date, default: Date.now },
  quotes: [Schema.Types.Mixed],
  password: { type: String, required: true },
  user: { type: String, required: true },
  modifiedOn: { type: Date, default: Date.now },
});

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);
