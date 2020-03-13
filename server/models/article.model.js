const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imagepath: {
    type: String,
    required: false
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false
});


module.exports = mongoose.model('Article', ArticleSchema);
