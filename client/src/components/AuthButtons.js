import React, { useContext } from 'react';
import UserContext from '../utils/user-context';
import LogoutButton from './LogoutButton';
import SignupAndLoginButtons from './SignupAndLoginButtons';

const AuthButtons = () => {
  const { user, logout } = useContext(UserContext);
  if (user) {
    return <LogoutButton user={user} logout={logout} />;
  }
  return <SignupAndLoginButtons />;
};

export default AuthButtons;
