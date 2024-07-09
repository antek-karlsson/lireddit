/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChakraProvider } from '@chakra-ui/react';
import { Client, fetchExchange, Provider } from 'urql';
import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import theme from '../theme';
import { AppProps } from 'next/app';
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql';

function updateQueryHelper<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateFunction: (r: Result, q: Query) => Query,
) {
  return cache.updateQuery(
    queryInput,
    (data) => updateFunction(result, data as any) as any,
  );
}

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            updateQueryHelper<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              },
            );
          },
          register: (_result, args, cache, info) => {
            updateQueryHelper<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              },
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: 'include',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
