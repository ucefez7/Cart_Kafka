import { createContext } from 'react';

interface UserContextInterface {
  email: string;
  setEmail: (email: string) => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;