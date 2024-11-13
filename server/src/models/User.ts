import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true } 
);

export default mongoose.model<IUser>('User', UserSchema);
