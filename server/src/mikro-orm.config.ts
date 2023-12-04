import { __PROD__ } from "./constants";
import { Post } from "./entities/Post";
import type { MikroORM } from "@mikro-orm/postgresql";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  entities: [Post],
  dbName: 'lireddit',
  user: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  debug: !__PROD__,
} as Parameters<typeof MikroORM.init>[0];