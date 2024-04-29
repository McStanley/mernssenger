import expressAsyncHandler from 'express-async-handler';
import User from '../models/User';
import Chat from '../models/Chat';

export const users_GET = expressAsyncHandler(async (req, res, next) => {
  const { query = '', limit = Infinity } = req.query;

  const regex = new RegExp(
    query.toString().replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'),
    'i',
  );

  const users = await User.find({ username: regex }).limit(Number(limit));

  res.json({ users });
});

export const userChats_GET = expressAsyncHandler(async (req, res, next) => {
  const { userID } = req.params;

  if (!userID) {
    res.status(400).json({ error: 'No user id provided' });
    return;
  }

  const chats = await Chat.find({ members: userID }).populate('members');

  res.json({ chats });
});
