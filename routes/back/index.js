var Page = require('../../models/back/pages');

exports.admin = function(req, res){
	res.render('admin/admin');
};

exports.panel = function(req, res){
	if(!req.user)
		res.redirect('/admin');
	else
		res.render('admin/panel');
};

exports.panelPages = function(req, res){
	if(!req.user)
		res.redirect('/admin');
	else
		Page.find({}, function(err, data){
			if(err) throw err;
			else res.render('admin/pages/pages', {data: data});
		});
};

exports.panelPagesNew = function(req, res){
	if(!req.user)
		res.redirect('/admin');
	else
		res.render('admin/pages/page_new');
};

exports.panelPagesNewPost = function(req, res){
	if(!req.user)
		res.redirect('/admin');
	else
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
	if(!req.user)
		res.redirect('/admin');
	else
		var id = req.params.id;
		var page = Page.findById(id, function(err, data){
			res.render('admin/pages/page_edit', {data: data});
		});
};

exports.panelPagesEditPost = function(req, res){
	if(!req.user)
		res.redirect('/admin');
	else
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
	if(!req.user)
		res.redirect('/admin');
	else
		var id = req.params.id;
		Page.remove({_id: id}, function(err){
			if(err) console.log(err);
			else res.redirect('/panel/pages'); 
		});
};