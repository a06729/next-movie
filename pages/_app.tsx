import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
