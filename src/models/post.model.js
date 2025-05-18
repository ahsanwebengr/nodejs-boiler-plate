import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    image: {
      type: String
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    desc: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
