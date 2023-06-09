import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    readTime: Number,
    userId: { type: Schema.Types.ObjectId, require: true },
  },
  {
    timestamps: true,
  }
);

export const BlogModel = mongoose.model('blog', blogSchema);
