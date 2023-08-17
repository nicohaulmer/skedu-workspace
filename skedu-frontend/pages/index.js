import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as React from "react";
import Link from 'next/link';
import { IframeWindowMessages } from '../utils/iframe-window-message';

function checkIframe() {
  console.log(`[${window.origin}] Es un iframe:`, window.self !== window.top);
  return window.self !== window.top;
}

export default function Home() {
  const [accessToken, setAccessToken] = React.useState('Aún no se tiene una token.');

  React.useEffect(() => {
    if (checkIframe()) {
      const workspaceWindow = window.parent;
      // const workspaceUrl = new URL('https://haulmer-angular-wks-testing.azurewebsites.net/');
      const workspaceUrl = new URL('http://localhost:4200');

      // Listen workspace messages to get config with bearer token
      IframeWindowMessages.listenMessages(workspaceUrl.origin, (event) => {
        const accessToken = event.data.payload.accessToken;
        setAccessToken(accessToken);

        // Notify workspace that app is ready
        IframeWindowMessages.sendMessage(workspaceWindow, workspaceUrl.origin, { type: 'READY', data: null });
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Example Skedu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Frontend <a href="https://nextjs.org">Skedu</a>
        </h1>
        <p className='{styles.description}'>Access token: {accessToken}</p>
        <Link href="/rutas/ruta-uno">Ir a ruta uno</Link>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
