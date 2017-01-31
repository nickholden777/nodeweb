var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	name: String,
	title: String,
	description: String,
	url: String,
	text: String
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;