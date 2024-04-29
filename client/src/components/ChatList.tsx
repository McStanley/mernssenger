import { useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import useUser from '../hooks/useUser';
import api from '../utils/api';
import NewChat from './NewChat';
import ChatButton from './ChatButton';
import type Chat from '../types/Chat';

const fetcher: Fetcher<Chat[], string> = async (url) => {
  const res = await api.get<{ chats: Chat[] }>(url);
  return res.data.chats;
};

function ChatList() {
  const { user: currentUser } = useUser();
  const { data, isLoading, mutate } = useSWR(
    `/users/${currentUser!._id}/chats`,
    fetcher,
  );
  const [showNewChat, setShowNewChat] = useState(false);

  return (
    <section className="flex gap-3 overflow-x-auto px-4 py-2">
      <button
        type="button"
        onClick={() => setShowNewChat(true)}
        className="flex max-w-24 shrink-0 flex-col items-center"
      >
        <div className="grid size-14 shrink-0 place-items-center rounded-full border border-gray-600 bg-lime-300 text-xl">
          +
        </div>
        <p>New</p>
      </button>
      {!isLoading &&
        !!data?.length &&
        data.map((chat) => <ChatButton chat={chat} key={chat._id} />)}
      {showNewChat && (
        <NewChat
          mutateChatList={mutate}
          closeModal={() => setShowNewChat(false)}
        />
      )}
    </section>
  );
}

export default ChatList;
