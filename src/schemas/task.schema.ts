import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  deadline: String,
  color: String,
  status: String,

  // Добавляем поле user с типом mongoose.Schema.Types.ObjectId, связанное с схемой UserSchema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchema',
  },
});
