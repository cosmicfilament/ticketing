'use strict';

/**
  * @module user.ts
  * @author John Butler
  * @description 
*/

import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the props required to create a new user
interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the props that a User model has
// represents the whole collection of docs
interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the props that a User Document has
// represents a single record
// mongodb might add fields to the doc that are not on the attrs
interface UserDoc extends mongoose.Document {
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform (doc, ret) {
				delete ret.password;
				delete ret.__v;
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});
// factory build function that uses typescripts' type checking
userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
