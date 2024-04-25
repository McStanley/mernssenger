import useUser from '../hooks/useUser';
import api from '../utils/api';

function Home() {
  const { user } = useUser();

  if (!user) {
    return <p>You should be redirected soon.</p>;
  }

  const handleLogout = async () => {
    await api.post('/auth/log-out');
  };

  return (
    <div className="m-auto">
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-full bg-lime-700 px-4 py-2 font-medium text-white hover:bg-lime-800"
      >
        Log out {user.username}
      </button>
    </div>
  );
}

export default Home;
