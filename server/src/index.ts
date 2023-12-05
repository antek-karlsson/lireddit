import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

// import { __PROD__ } from './constants';
// import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import { PostResolver } from './resolvers/post';

async function main() {
  const orm = await MikroORM.init(mikroConfig);

  await orm.getMigrator().up();

  const emFork = orm.em.fork();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
    }),
    context: () => ({ em: emFork }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server started on localhost:4000');
  });
}

main().catch((e) => console.error(e));
