import Head from 'next/head';
import styles from '../styles/Home.module.css';
import * as React from "react";
import Link from 'next/link';

function checkIframe() {
  console.log('[SKEDU] Es un iframe:', window.self !== window.top);
  return window.self !== window.top;
}

function listenMessages(fromOrigin, callback) {
  console.log('[SKEDU] Escuchando mensajes');
  window.addEventListener('message', (event) => {
      // console.log({event, fromOrigin});
      if (event.origin !== fromOrigin) { return; }
      console.log('[SKEDU] Mensaje recibido:', event);
      callback(event);
  });
}

function sendMessage(message, windowElement, targetOrigin) {
  console.log('[SKEDU] Enviando mensaje:', {message, windowElement, targetOrigin});
  windowElement.postMessage(message, targetOrigin);
}

export default function Home() {
  React.useEffect(() => {
    if (checkIframe()) {
      const workspaceWindow = window.parent;
      // const workspaceUrl = new URL('https://haulmer-angular-wks-testing.azurewebsites.net/');
      const workspaceUrl = new URL('http://localhost:4200');

      // Listen workspace messages to get config with bearer token
      listenMessages(workspaceUrl.origin, () => {
        console.log('[SKEDU] Configuración recibida. Ahora se debería renderizar la app (No se hizo en este ejemplo).');
      });

      // Notify workspace that app is ready
      sendMessage({
        type: 'init',
        data: 'ready'
      }, workspaceWindow, workspaceUrl.origin);
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
