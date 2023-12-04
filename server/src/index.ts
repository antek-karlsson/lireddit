import { MikroORM } from '@mikro-orm/core';

import { __PROD__ } from './constants';
import { Post } from './entities/Post';

import mikroConfig from './mikro-orm.config'

async function main() {
  const orm = await MikroORM.init(mikroConfig);
  
  await orm.getMigrator().up();

  const emFork = orm.em.fork();

  // const post = emFork.create(Post, {
  //   title: 'my first post',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // });
  // await emFork.persistAndFlush(post);

  // console.log('--------sql 2--------');

  // await emFork.insert(Post, {title: 'my first post 2',createdAt: new Date(),
  //   updatedAt: new Date(),});
  // const posts = await emFork.find(Post, {});
  // console.log(posts); 
}

main().catch(e => console.error(e));