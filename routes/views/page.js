var keystone = require('keystone');
var async = require('async');

exports= module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals= res.locals;

	// Init locals
	locals.section = 'Page';
	locals.filters = {
		page: req.params.page,
	};
	locals.data = {
		pages: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('Page').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.pages = results;

			// Load the counts for each category
			async.each(locals.data.pages, function (pages, next) {

				keystone.list('Page').model.count().exec(function (err, count) {
					pages.pageCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.pages) {
			keystone.list('Page').model.findOne({ key: locals.filters.page }).exec(function (err, result) {
				locals.data.pages = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Page').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
		
		q.exec(function (err, results) {
			locals.data.pages = results;
			next(err);
		});
	});

	// Render the view
	view.render('page');
};
