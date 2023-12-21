import { Connection } from 'mongoose';
import { TaskSchema } from '../schemas/task.schema';

export const TaskProviders = [
  {
    provide: 'Task_MODEL',
    useFactory: (connection: Connection) => connection.model('Task', TaskSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
