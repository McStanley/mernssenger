import { Link, useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import type Chat from '../types/Chat';
import type User from '../types/User';

interface ChatButtonProps {
  chat: Chat;
}

function ChatButton({ chat }: ChatButtonProps) {
  const { id: currentId } = useParams();
  const { user: currentUser } = useUser();

  const labelUser = chat.members.find(
    (user) => user._id !== currentUser!._id,
  ) as User;

  const isOpen = currentId === chat._id;

  return (
    <Link
      to={`/chats/${chat._id}`}
      className="flex max-w-24 shrink-0 flex-col items-center"
    >
      <img
        src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${labelUser._id}&backgroundColor=ffdfbf`}
        alt={labelUser.username}
        className={`size-14 rounded-full border border-gray-600 ${isOpen ? 'border-2' : ''}`}
      />
      <p
        className={`max-w-full overflow-hidden text-ellipsis text-gray-900 ${isOpen ? 'font-medium' : ''}`}
      >
        {labelUser.username}
      </p>
    </Link>
  );
}

export default ChatButton;
