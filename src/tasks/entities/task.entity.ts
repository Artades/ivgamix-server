import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserEntity } from '../../users/entities/user.entity'; // Импортируем схему пользователя

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

  // Добавляем поле user с типом mongoose.Schema.Types.ObjectId, связанное с схемой UserEntity
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserEntity' })
  user: mongoose.Types.ObjectId;
}

export const TaskEntitySchema = SchemaFactory.createForClass(TaskEntity);
