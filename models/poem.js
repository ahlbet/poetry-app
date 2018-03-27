'use strict';

const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  lines: [String]
});

poemSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Poem', poemSchema);