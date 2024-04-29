import { Schema, Types, model } from 'mongoose';

interface IMessage {
  chat: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  type: 'text' | 'image';
  content: string;
}

const messageSchema = new Schema<IMessage>({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, required: true },
  type: { type: Schema.Types.String, required: true },
  content: { type: Schema.Types.String, required: true },
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
