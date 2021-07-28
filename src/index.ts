import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import config from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();

  const app = express();

  // GraphQL
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  //! app.get('/', (_, res) => {
  //   // If you don't use a parameter (req) use _ (best practice)
  //!   res.send('hello!');
  //! }); WE ARE USING GRAPHQL, NOT REST
  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  }); // express starts a server on localhost:4000 now
  // const post = orm.em.create(Post, { title: 'my first post' }); // just an instance of post, doesn't insert into database NANI
  // await orm.em.persistAndFlush(post);

  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main().catch((err) => {
  console.error(err);
});
