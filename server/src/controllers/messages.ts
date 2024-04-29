import expressAsyncHandler from 'express-async-handler';
import Message from '../models/Message';

export const messages_POST = expressAsyncHandler(async (req, res, next) => {
  const { chat, author, type, content } = req.body;

  const message = new Message({
    chat,
    author,
    createdAt: new Date(),
    type,
    content,
  });

  await message.save();

  res.json({ msg: `Message created with id ${message._id}` });
});
