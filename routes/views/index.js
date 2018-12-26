var keystone = require('keystone');
var i18n =  require('i18n-2');

exports=module.exports = function (req, res) {


	if (req.query.lng) {
		//req.i18n.setLocale(req.query.lng);
		req.i18n.setLocale(req.query.lng);
		res.cookie('lang', req.query.lng, { maxAge: 900000, httpOnly: true });
		req.i18n.setLocaleFromCookie();
		res.locals.user = req.user;
	//res.i18n.setLocale('en');
		console.log(':)');	
	}

	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	var descs = keystone.list('Description');

	
	view.on('init', (next) => {
		//req.i18n.setLocale('fr');
		//req.i18n.setLocaleFromCookie();
		//req.i18n.language='fr';
		var language = req.i18n.getLocale();
		keystone.list('Language').model.findOne({ key: language }).exec(function(err, result) {
			locals.language = result;

		//	console.log(locals.language['_id']);

			next(err);
		});
		
	});

	
//	view.query('Descriptions',keystone.list('Post').descs.model.find().where());
	

	view.on('init', function (next) {

		var q = keystone.list('Description').model.find().where('language',locals.language['_id']);

		q.exec(function (err, results) {
			locals.Descriptions = results;
			next(err);
		});

	});


	// Render the view
	view.render('index');
};
