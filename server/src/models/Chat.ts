import { Schema, Types, model } from 'mongoose';

interface IChat {
  members: Types.ObjectId[];
}

const chatSchema = new Schema<IChat>({
  members: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
});

const Chat = model<IChat>('Chat', chatSchema);

export default Chat;
