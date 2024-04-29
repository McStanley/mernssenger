import useSWR, { Fetcher, KeyedMutator } from 'swr';
import Overlay from './Overlay';
import User from '../types/User';
import api from '../utils/api';
import { useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import useUser from '../hooks/useUser';
import type Chat from '../types/Chat';

interface NewChatProps {
  mutateChatList: KeyedMutator<Chat[]>;
  closeModal: () => void;
}

const fetcher: Fetcher<User[], string> = async (url) => {
  const res = await api.get<{ users: User[] }>(url);
  return res.data.users;
};

function NewChat({ mutateChatList, closeModal }: NewChatProps) {
  const { user: currentUser } = useUser();
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSWR(
    `/users?query=${encodeURIComponent(query)}&limit=5`,
    fetcher,
  );

  if (!currentUser) {
    return <p>You will be redirected soon.</p>;
  }

  return (
    <Overlay handleClick={closeModal}>
      <section className="relative max-w-xl rounded-2xl bg-white px-6 py-6">
        <button
          type="button"
          onClick={closeModal}
          className="absolute left-4 top-2 font-bold text-gray-700"
        >
          X
        </button>
        <p className="text-center text-xl">Start a new conversation</p>
        <input
          type="text"
          name="username"
          value={query}
          placeholder="Username"
          onChange={(e) => setQuery(e.target.value)}
          className="mt-6 w-full rounded-xl border-2 border-gray-300 px-4 py-2"
        />
        {isLoading && <MagnifyingGlass wrapperClass="mx-auto mt-6" />}
        {!isLoading && !!data?.length && (
          <>
            <div className="mt-8 flex flex-col gap-4">
              {data
                .filter((user) => user._id !== currentUser._id)
                .map((user) => (
                  <button
                    className="flex items-center gap-4 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={async () => {
                      await api.post('/chats', {
                        members: [currentUser._id, user._id],
                      });

                      closeModal();
                      mutateChatList();
                    }}
                    key={user._id}
                  >
                    <img
                      src={`https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${user._id}&backgroundColor=ffdfbf`}
                      alt={user.username}
                      className="size-14 rounded-full border-2 border-gray-600"
                    />
                    <p className="break-anywhere text-lg font-medium tracking-wide">
                      {user.username}
                    </p>
                  </button>
                ))}
            </div>
          </>
        )}
        {!isLoading && !data?.length && (
          <p className="mt-8 text-center text-lg text-gray-800">No results.</p>
        )}
      </section>
    </Overlay>
  );
}

export default NewChat;
