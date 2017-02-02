exports.checkUrl = function(url){
	return url.replace(/<.*?>/g, '');
};