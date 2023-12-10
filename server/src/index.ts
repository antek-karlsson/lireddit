import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import mikroConfig from './mikro-orm.config';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { __PROD__ } from './constants';

import type { MyContext } from './types';

async function main() {
  const orm = await MikroORM.init(mikroConfig);

  await orm.getMigrator().up();

  const emFork = orm.em.fork();

  const app = express();

  // Initialize client.
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
    disableTouch: true,
  });

  // Initialize sesssion storage.
  app.use(
    session({
      name: 'qid',
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: 'qazwsxedcrfvtgbyhnujmik',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __PROD__, // cookie only works in https
        sameSite: 'lax',
      },
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: emFork, req, res }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
}

main().catch((e) => console.error(e));
