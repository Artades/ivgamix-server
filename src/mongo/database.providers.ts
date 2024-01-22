import { config } from 'dotenv';
import * as mongoose from 'mongoose';

config();
export const databaseProviders = [
  
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DB_PASSWORD),
  },
];
