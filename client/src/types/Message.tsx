import User from './User';

interface Message {
  _id: string;
  chat: string;
  author: User;
  createdAt: Date;
  type: 'text' | 'image';
  content: string;
}

export default Message;
