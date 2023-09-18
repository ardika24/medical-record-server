import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { PatientResolver } from './resolvers/patient';
import { MedicalRecordResolver } from './resolvers/medicalRecord';
import * as dotenv from 'dotenv';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  dotenv.config();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PatientResolver, MedicalRecordResolver],
      validate: false,
    }),
    context: () => ({
      em: orm.em,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main().catch((error) => {
  console.error(error);
});
