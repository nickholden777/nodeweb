var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
	title: String,
	description: String,
	url: String,
	text: String,
	date: {type: Date, default: Date.now},
});

var Page = mongoose.model('Page', PageSchema);
module.exports = Page;