import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, require: true },
  blogId: { type: Schema.Types.ObjectId, require: true },
  title: { type: String, require: true },
  content: { type: String, require: true },
}, {
  timestamps: true,
});


export const CommentModel = mongoose.model('comment', commentSchema);
