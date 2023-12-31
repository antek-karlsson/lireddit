import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Request, Response } from 'express';
import 'express-session';

declare module 'express-session' {
  interface Session {
    userId?: number;
  }
}

export interface MyContext {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
}
