let mongoose = require('mongoose');

//Create a schema
let commentSchema = new mongoose.Schema({
  category_id: String,
  username: String,
  picture: String,
  email: String,
  text: String
} , {timestamps: true});

//Model
let Comment = mongoose.model('Comment', commentSchema);

//exports model
exports.commentModel = Comment
