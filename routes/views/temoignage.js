var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'propriete';
	locals.filters = {
		temoignage: req.params.temoignage,
	};
	locals.data = {
		temoignages: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Temoignage').model.findOne({
			state: 'published',
			slug: locals.filters.temoignage,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.temoignage = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Temoignage').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.temoignages = results;
			next(err);
		});

	});

	// Render the view
	view.render('contact');
};
