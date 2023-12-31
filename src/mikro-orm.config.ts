import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from './constatns';
import { Patient } from './entities/Patient';
import { MedicalRecord } from './entities/MedicalRecord';
import { User } from './entities/User';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s/,
    disableForeignKeys: false,
  },
  entities: [Patient, MedicalRecord, User],
  dbName: 'MRDatabase',
  type: 'postgresql',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
