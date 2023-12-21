import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TaskEntity extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Date, default: Date.now })
  dateOfCreation: Date;

  @Prop()
  deadline?: string;

  @Prop()
  color?: string;

  @Prop()
  status: string;
}

export const TaskEntitySchema = SchemaFactory.createForClass(TaskEntity);
