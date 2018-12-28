var keystone = require('keystone');
var async = require('async');

exports= module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals= res.locals;

	// Init locals
	locals.section = 'Propriete';
	locals.filters = {
		propriete: req.params.propriete,
	};
	locals.data = {
		proprietes: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('Propriete').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.proprietes = results;

			// Load the counts for each category
			async.each(locals.data.proprietes, function (proprietes, next) {

				keystone.list('Propriete').model.count().exec(function (err, count) {
					proprietes.pageCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {

		if (req.params.proprietes) {
			keystone.list('Propriete').model.findOne({ key: locals.filters.Propriete }).exec(function (err, result) {
				locals.data.proprietes = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {

		var q = keystone.list('Propriete').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
		
		q.exec(function (err, results) {
			locals.data.proprietes = results;
			next(err);
		});
	});

	// Render the view
	view.render('propriete');
};
