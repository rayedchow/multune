import { AppProps } from 'next/app';
import '../styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
  	<>
	  	<Head>
			<title>Multune</title>
			<meta name="description" content="A multi-music platform" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="icon" href="/logo.png" />
		</Head>
  		<Component {...pageProps} />
	</>
  );
}