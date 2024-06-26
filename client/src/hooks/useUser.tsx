import { useContext } from 'react';
import UserContext from '../contexts/User';

const useUser = () => useContext(UserContext);

export default useUser;
