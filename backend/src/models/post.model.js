import { Schema, model } from 'mongoose'

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required']
    }
})

const Post = model('Post', postSchema);

export { Post }