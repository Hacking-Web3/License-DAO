import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
/* eslint-disable */
//import './helpers/__global';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * 🏹 See MainPage.tsx for main app component!
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 *
 * This file loads react.
 * You don't need to change this file!!
 */

/**
 * Loads {@see App} which sets up the application async.
 * The main page is in the component {@see MainPage}
 */
const run = async (): Promise<void> => {
  await import('./helpers/__global');
  // dynamic imports for code splitting
  const { lazy, Suspense, StrictMode } = await import('react');
  const ReactDOM = await import('react-dom');

  const App = lazy(() => import('./App'));

  const subgraphUri = 'https://api.thegraph.com/subgraphs/name/0x00duke/license-dao';

  const client = new ApolloClient({
    uri: subgraphUri,
    cache: new InMemoryCache(),
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <StrictMode>
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      </StrictMode>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

void run();

export {};
