import * as mongoose from 'mongoose';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TaskSchema } from './task.schema';

export const UserSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfAccountCreation: {
    type: Date,
    default: Date.now,
  },

  // Добавляем поле tasks с типом массива mongoose.Schema.Types.ObjectId, связанное с схемой TaskSchema
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskSchema',
    },
  ],
});
