import { Schema, model } from 'mongoose';

interface IUser {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

const User = model<IUser>('User', userSchema);

export default User;
