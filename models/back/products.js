var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: String,
	title: String,
	description: String,
	url: String,
	text: String,
	price: String,
	category: String
});

var Product = mongoose.model('Product', ProductSchema);
module.exports = Product;