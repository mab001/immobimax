var keystone = require('keystone');
var async = require('async');

exports= module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals= res.locals;

	// Init locals
	locals.section = 'serviceEtReseau';
	locals.filters = {
        servicereseautitre: req.params.servicereseautitre,
		servicereseauparagraphe: req.params.servicereseauparagraphe,
		category: req.params.category,
	};
	locals.data = {
		servicereseauparagraphes: [],
		servicereseautitres: [],
		reseauxTitres: [],
		typegestion:[],
		categories: [],
	};

	// Load les titres
	view.on('init', function (next) {
		keystone.list('ServiceReseauTitre').model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.servicereseautitres = results;
			// Load the counts for each category
			async.each(locals.data.category, function (category, next) {

				keystone.list('Post').model.count().exec(function (err, count) {
					category.postCount = count;
					next(err);
				});
			}, function (err) {
				next(err);
			});
		});

		keystone.list('ServiceReseauParagraphe').model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.servicereseauparagraphes = results;
		});

		keystone.list('ReseauTitre').model.find().sort('name').exec(function (err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.reseauxTitres = results;
			console.log(locals.data.reseauxTitres);
		});
	
		keystone.list('ServiceTypeGestion').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}
			locals.data.typegestion = results;
			// Load the counts for each category
		
		});
	
	});

	





	view.on('init', function (next) {
		var q = keystone.list('ServiceTypeGestion').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
		})
		q.exec(function (err, results) {
			locals.data.typegestion = results;
			next(err);
		});

	});
	
	// Render the view
	view.render('serviceEtReseau');
};
