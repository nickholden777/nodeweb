var Page = require('../../models/back/pages');
var Products = require('../../models/back/products');
var Category = require('../../models/back/categories');

exports.admin = function(req, res){
	res.render('admin/admin');
};

exports.panel = function(req, res){
	if(req.session.passport.user === 'undefined')
		res.redirect('/admin');
	else
		res.render('admin/panel');
};

exports.panelPages = function(req, res){
	Page.find({}, function(err, data){
		if(err) throw err;
		else res.render('admin/pages/pages', {data: data});
	});
};

exports.panelPagesNew = function(req, res){
	res.render('admin/pages/page_new');
};

exports.panelPagesNewPost = function(req, res){
	var name = req.body.name;
	var title = req.body.title;
	var url = req.body.url;
	var description = req.body.description;
	var text = req.body.text;

	var page = new Page({
			name: name,
			title: title, 
			url: url,
			description: description,
			text: text
		});
		page.save(function(err){
			console.log(err);
		});

		res.redirect('/panel/pages');
};

exports.panelPagesEdit = function(req, res){
	var id = req.params.id;
	var page = Page.findById(id, function(err, data){
		res.render('admin/pages/page_edit', {data: data});
	});
};

exports.panelPagesEditPost = function(req, res){
	var id = req.params.id;
	var name = req.body.name;
	var title = req.body.title;
	var url = req.body.url;
	var description = req.body.description;
	var text = req.body.text;

	Page.update({_id: id}, {$set: {
		name: name,
		title: title, 
		description: description, 
		url: url, 
		text: text}}, 
		function(err, page){
			if(err) console.log(err);
			res.redirect('/panel/pages');
		});
};

exports.panelPagesDel = function(req, res){
	var id = req.params.id;
	Page.remove({_id: id}, function(err){
		if(err) console.log(err);
		else res.redirect('/panel/pages'); 
	});
};

/*==============================PRODUCTS===============================*/

exports.products = function(req, res){
	Products.find({}, function(err, data){
		if(err) throw err;
		else res.render('admin/products/all', {data: data});
	});
};

exports.panelProductsNew = function(req, res){
	var categories = Category.find({}, function(err, data){
		if(err) console.log(err);
		else res.render('admin/products/product_new', {categories: data});
	});
};

exports.panelProductsNewPost = function(req, res){
	var name = req.body.name;
	var title = req.body.title;
	var url = req.body.url;
	var description = req.body.description;
	var text = req.body.text;
	var category = req.body.category;
	var price = req.body.price;

	var product = new Products({
			name: name,
			category: category,
			title: title, 
			url: url,
			description: description,
			text: text,
			price: price
		});
		product.save(function(err){
			console.log(err);
		});

		res.redirect('/panel/products');
};

exports.panelProductsEdit = function(req, res){
	var id = req.params.id;
	Products.findById(id, function(err, data){
		if(err){
			console.log(err);
		} else { 
			Category.find({}, function(err, cats){
				if(err) console.log(err);
				res.render('admin/products/product_edit', {
					data: data, 
					categories: cats
				});
			});	
		}	
	});
};

exports.panelProductsEditPost = function(req, res){
	var id = req.params.id;

	var name = req.body.name;
	var title = req.body.title;
	var url = req.body.url;
	var description = req.body.description;
	var text = req.body.text;
	var price = req.body.price;
	var category = req.body.category;

	Products.update({_id: id}, {$set: {
		name: name,
		category: category,
		price: price,
		title: title, 
		description: description, 
		url: url, 
		text: text}}, 
		function(err, page){
			if(err) console.log(err);
			res.redirect('/panel/products');
		});
};

exports.panelProductsDel = function(req, res){
	var id = req.params.id;
	Products.remove({_id: id}, function(err){
		if(err) console.log(err);
		else res.redirect('/panel/products'); 
	});
};

/*==============================CATEGORIES===============================*/

exports.categories = function(req, res){
	Category.find({}, function(err, data){
		if(err) throw err;
		else res.render('admin/categories/all', {data: data});
	});
};

exports.panelCategoriesNew = function(req, res){
	res.render('admin/categories/category_new');
};

exports.panelCategoriesNewPost = function(req, res){
	var name = req.body.name;
	var title = req.body.title;
	var url = req.body.url;
	var description = req.body.description;
	var text = req.body.text;

	var category = new Category({
			name: name,
			title: title, 
			url: url,
			description: description,
			text: text
		});
		category.save(function(err){
			console.log(err);
		});

		res.redirect('/panel/categories');
};

exports.panelCategoriesEdit = function(req, res){
	var id = req.params.id;
	var category = Category.findById(id, function(err, data){
		res.render('admin/categories/category_edit', {data: data});
	});
};

exports.panelCategoriesEditPost = function(req, res){
	var name = req.body.name;
	var id = req.params.id;
	var title = req.body.title;
	var url = req.body.url;
	var description = req.body.description;
	var text = req.body.text;

	Category.update({_id: id}, {$set: {
		name: name,
		title: title, 
		description: description, 
		url: url, 
		text: text}}, 
		function(err){
			if(err) console.log(err);
		});
		res.redirect('/panel/categories');
};

exports.panelCategoriesDel = function(req, res){
	var id = req.params.id;
	Category.remove({_id: id}, function(err){
		if(err) console.log(err);
		else res.redirect('/panel/categories'); 
	});
};