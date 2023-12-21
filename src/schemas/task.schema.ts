import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  id: mongoose.Schema.Types.ObjectId,
  description: String,
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
  deadline: String,
  color: String,
  status: String
});
