import type { AppProps } from 'next/app';
import initAuth from '../utils/initAuth';

initAuth();

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
