import { useParams } from 'react-router-dom';
import useUser from '../hooks/useUser';
import api from '../utils/api';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import ChatPlaceholder from '../components/ChatPlaceholder';

function Home() {
  const { user } = useUser();
  const { id: chatId } = useParams();

  if (!user) {
    return <p>You should be redirected soon.</p>;
  }

  const handleLogout = async () => {
    await api.post('/auth/log-out');
  };

  return (
    <div className="flex h-dvh flex-col">
      <ChatList />
      <button
        type="button"
        onClick={handleLogout}
        className="mx-auto rounded-full bg-lime-700 px-4 py-2 font-medium text-white hover:bg-lime-800"
      >
        Log out {user.username}
      </button>
      {chatId ? <Chat id={chatId} /> : <ChatPlaceholder />}
    </div>
  );
}

export default Home;
