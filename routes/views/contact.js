var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	// Init locals
	locals.section = 'Membre';
	locals.filters = {
		membre: req.params.membre,
	};
	locals.data = {
		membres: [],
	};


	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	view.on('init', function (next) {

		keystone.list('Membre').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.membres = results;

			// Load the counts for each category
			async.each(locals.data.membres, function (membres, next) {

				keystone.list('Membre').model.count().exec(function (err, count) {
					membres.pageCount = count;
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
				keystone.list('Membre').model.findOne({ key: locals.filters.membre }).exec(function (err, result) {
					locals.data.membres = result;
					next(err);
				});
			} else {
				next();
			}
		});
	
		// Load the posts
		view.on('init', function (next) {
	
			var q = keystone.list('Membre').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10,
				filters: {
					state: 'published',
				},
			})
			
			q.exec(function (err, results) {
				locals.data.membres = results;
				next(err);
			});
		});


	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		var newEnquiry = new Enquiry.model();
		var updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, phone, enquiryType, message',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
