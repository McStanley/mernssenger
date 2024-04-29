import User from './User';

interface Chat {
  _id: string;
  members: User[];
}

export default Chat;
