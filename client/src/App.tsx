import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import useUser from './hooks/useUser';
import Loading from './pages/Loading';
import Home from './pages/Home';
import Auth from './pages/Auth';
import api from './utils/api';
import objectsEqual from './utils/objectsEqual';
import User from './types/User';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { user, setUser } = useUser();

  useEffect(() => {
    const interceptor = api.interceptors.response.use((res) => {
      setIsInitializing(false);
      api.interceptors.response.eject(interceptor);

      return res;
    });

    return () => api.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    type Response = AxiosResponse<{ user: User | null }>;

    const interceptor = api.interceptors.response.use((res: Response) => {
      if (!objectsEqual(res.data.user, user)) {
        setUser(res.data.user);
      }

      return res;
    });

    return () => api.interceptors.response.eject(interceptor);
  }, [user, setUser]);

  useEffect(() => {
    api.get('/auth/whoami');
  }, []);

  if (isInitializing) {
    return <Loading />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Home /> : <Auth />,
    },
    {
      path: '/chats/:id',
      element: user ? <Home /> : <Auth />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
