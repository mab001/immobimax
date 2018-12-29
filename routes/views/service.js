/*
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'Service';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		services: [],
		categories: [],
	};



// Load all categories
view.on('init', function (next) {

	keystone.list('ServiceTitre').model.find().sort('name').exec(function (err, results) {

		if (err || !results.length) {
			return next(err);
		}

		locals.data.categories = results;

		// Load the counts for each category
		async.each(locals.data.categories, function (category, next) {

			keystone.list('Service').model.count().where('categories').in([category.id]).exec(function (err, count) {
				category.postCount = count;
				next(err);
			});

		}, function (err) {
			next(err);
		});
	});
});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('ServiceTitre').model.findOne({ key: locals.filters.category }).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});




	// Load all categories
	view.on('init', function (next) {

		keystone.list('Service').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.services = results;

			// Load the counts for each category
			async.each(locals.data.services, function (services, next) {

				keystone.list('Service').model.count().exec(function (err, count) {
					services.pageCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Service').model.findOne({
			state: 'published',
			slug: locals.filters.service,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.service = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Service').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.services = results;
			next(err);
		});

	});

	// Render the view
	view.render('serviceEtReseau');
};
*/