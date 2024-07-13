import mongoose from 'mongoose';
import Comment from './Comment.js';
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
const { Schema } = mongoose;

const Post = new mongoose.Schema(
    {
        _id: {
			type: String,
			default: uuidv4,
		},
        title: {
            type: String,
            required: true,
        },
        comments: [
            {
                type: String,
                //default: uuid,
                ref: 'Comment',
            },
        ],
        author: {
            type: String,
            //default: uuid,
            //required: true,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
        }
    },{timestamps: true}
);

export default mongoose.model('Post', Post);
