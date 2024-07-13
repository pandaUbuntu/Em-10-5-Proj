import mongoose from 'mongoose';
import User from './User.js';
import Post from './Post.js'
import { uuid } from 'uuidv4';
const { Schema } = mongoose;

const Comment = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuid,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        post: {
            type: String,
            default: uuid,
            required: true,
            ref: 'Post',
        },
        author: {
            type: String,
            default: uuid,
            required: true,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        }
    },{timestamps: true}
);

export default mongoose.model('Comment', Comment);