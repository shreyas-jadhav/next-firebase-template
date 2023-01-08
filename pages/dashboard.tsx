import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import React from 'react';

const Dashboard = () => {
  const AuthUser = useAuthUser();

  return (
    <div>
      <h1>This page should only be visible when user is logged in</h1>

      <h4>Logged in as</h4>
      <h3>Email: {AuthUser.email}</h3>
      <h3>Name: {AuthUser.displayName}</h3>

      <button onClick={AuthUser.signOut}>Log out</button>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.RENDER,
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})();
export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Dashboard);
