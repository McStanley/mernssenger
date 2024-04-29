import expressAsyncHandler from 'express-async-handler';
import Chat from '../models/Chat';
import Message from '../models/Message';

export const chats_POST = expressAsyncHandler(async (req, res, next) => {
  const { members } = req.body;

  const chat = new Chat({ members });

  await chat.save();

  res.json({ msg: `created a chat with id ${chat._id}` });
});

export const messages_GET = expressAsyncHandler(async (req, res, next) => {
  const { chatID } = req.params;

  const messages = await Message.find({ chat: chatID })
    .sort({ createdAt: 'desc' })
    .populate('author');

  res.json({ messages });
});
