import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { useRef } from 'react';

// we want this page to only open when user it not logged in;
const LoginPage = () => {
  // for email-password login
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const passwordFieldRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Login Page</h1>
      <ul>
        <li>
          <h3>Email / Password</h3>

          <input
            type='email'
            placeholder='email'
            name='email'
            ref={emailFieldRef}
            required
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            ref={passwordFieldRef}
            required
          />
          <button
            onClick={() => {
              createUserWithEmailAndPassword(
                getAuth(),
                emailFieldRef.current?.value as string,
                passwordFieldRef.current?.value as string
              ).catch((e) => {
                alert(e.code);
              });
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              signInWithEmailAndPassword(
                getAuth(),
                emailFieldRef.current?.value as string,
                passwordFieldRef.current?.value as string
              ).catch((e) => {
                alert(e.code);
              });
            }}
          >
            Log in
          </button>
        </li>

        <li>
          <p>
            <button
              onClick={() => {
                const googleProvider = new GoogleAuthProvider();
                signInWithPopup(getAuth(), googleProvider).catch((e) =>
                  alert(e.code)
                );
              }}
            >
              Continue with Google
            </button>
          </p>
        </li>
      </ul>
    </div>
  );
};

// this will do a server side redirect to the login page if the user is not logged in
export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthed: AuthAction.RENDER,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(LoginPage);
