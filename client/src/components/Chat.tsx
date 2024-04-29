import { FormEventHandler, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import useSWR, { Fetcher } from 'swr';
import useUser from '../hooks/useUser';
import api from '../utils/api';
import Message from './Message';
import type IMessage from '../types/Message';

interface ChatProps {
  id: string;
}

const fetcher: Fetcher<IMessage[], string> = async (url) => {
  const res = await api.get<{ messages: IMessage[] }>(url);
  return res.data.messages;
};

function Chat({ id }: ChatProps) {
  const { user } = useUser();
  const [draft, setDraft] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading, mutate } = useSWR(`/chats/${id}/messages`, fetcher);

  const handleSend: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await api.post('/messages', {
      chat: id,
      author: user?._id,
      type: 'text',
      content: draft,
    });

    mutate();
    setDraft('');
    setIsSubmitting(false);
  };

  return (
    <main className="flex flex-1 flex-col p-2">
      <div className="flex h-0 flex-auto flex-col-reverse gap-4 overflow-auto p-4">
        {isLoading && (
          <Triangle height="150px" width="150px" wrapperClass="m-auto siz" />
        )}
        {!!data?.length &&
          data.map((message) => (
            <Message message={message} key={message._id} />
          ))}
      </div>
      <div>
        <form onSubmit={handleSend} className="text-lx flex gap-2 p-2">
          <input
            type="text"
            name="message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isSubmitting}
            className={`flex-1 rounded-s-full border-2 p-2 pl-4 ${isSubmitting ? 'cursor-wait' : ''}`}
          />
          <button
            disabled={isSubmitting}
            className={`rounded-e-full border bg-lime-700 py-2 pl-2 pr-3 text-white ${isSubmitting ? 'cursor-wait' : ''}`}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

export default Chat;
