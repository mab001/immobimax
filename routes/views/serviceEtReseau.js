var keystone = require('keystone');
var async = require('async');

exports= module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals= res.locals;

	// Init locals
	locals.section = 'serviceEtReseau';
	locals.filters = {
        category: req.params.category,
        paragraphe: req.params.paragraphe,
	};
	locals.data = {
		paragraphes: [],
		categories: [],
	};

	// Load les titres
	view.on('init', function (next) {
		keystone.list('ServiceTitre').model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;
			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});
			}, function (err) {
				next(err);
			});
		});
	});

    	// Load les paragraphe
	view.on('init', function (next) {
		keystone.list('ServiceParagraphe').model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.paragraphes = results;
			// Load the counts for each category
			async.each(locals.data.paragraphes, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});
			}, function (err) {
				next(err);
			});
		});
	});


	

	// Render the view
	view.render('serviceEtReseau');
};
