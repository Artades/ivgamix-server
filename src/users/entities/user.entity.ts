import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserEntity extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Date, default: Date.now })
  dateOfAccountCreation: Date;

  // Добавляем поле tasks с типом массива mongoose.Schema.Types.ObjectId, связанное с схемой TaskEntity
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskEntity' }] })
  tasks: mongoose.Types.ObjectId[];
}

export const UserEntitySchema = SchemaFactory.createForClass(UserEntity);
