var Page = require('../../models/back/pages');
var check = require('../../libs');

exports.pages = function(req, res){
	if(!req.params.page) var page = 'index';
	else var page = check.checkUrl(req.params.page);
	console.log(page);

	Page.findOne({url: page}, function(err, data){
		if(err){
			handleError(err);
		} else {
			if(!data){
				var data = {"title": "Error 404"};
				res.status(404).render('front/partials/page', {data: data});
			} else {
				res.render('front/partials/page', {data: data});
			}
		}		
	});
};