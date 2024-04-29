import useUser from '../hooks/useUser';
import type Message from '../types/Message';

interface MessageProps {
  message: Message;
}

function Message({ message }: MessageProps) {
  const { user } = useUser();

  const isOwnMessage = message.author._id === user!._id;

  return (
    <article
      className={`break-anywhere max-w-[70%] rounded-3xl p-4 text-lg text-white ${isOwnMessage ? 'self-end rounded-br-none bg-lime-600' : 'self-start rounded-bl-none bg-slate-600'}`}
    >
      <p>{message.content}</p>
    </article>
  );
}

export default Message;
