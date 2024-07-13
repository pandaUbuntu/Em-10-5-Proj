import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import Post from './Post.js';

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuid,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String
        },
        roles: [
            {
                type: String,
                ref: 'Role'
            }
        ],
        comments: [
            {
                type: String,
                ref: 'Comment',
            },
        ],
        posts: [
            {
                type: String,
                ref: 'Post',
            },
        ]
    },{timestamps: true}
);

export default mongoose.model('User', UserSchema);
