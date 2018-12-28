/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var keystone = require('keystone');
var _ = require('lodash');

var i18n =  require('i18n-2');
/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/


exports.lng = function (req, res, next) {
/*
	if (req.query.lng) {
		req.i18n.setLocale(req.query.lng);
		
		res.cookie('lang', req.query.lng, { maxAge: 900000, httpOnly: true });
		res.i18n.setLocaleFromCookie();
	}*/
	next();
};

/*
exports.setLocale = function (req, res, next){
	if (req.params.lang) {
		req.setLocale(req.params.lang);
	} else
		res.redirect('/');
	next();
}*/

/*
exports.init = function (req, res, next) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	if (req.query.lng) {
		//req.i18n.setLocale(req.query.lng);
		res.cookie('lang', req.query.lng, { maxAge: 900000, httpOnly: true });
		res.locals.user = req.user;
		 res.locals.language='en';
	//res.i18n.setLocale('en');
	}	
	res.locals.user = req.user;
	next();
};*/

exports.initLocals = function (req, res, next) {
	
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/'  },
		{ label: 'Service et Reseaux', key: 'serviceEtReseau', href: '/serviceEtReseau'  },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
		{ label: 'Page', key: 'page', href: '/page' },
		{ label: 'Propriete', key: 'propriete', href: '/propriete' },
	];

	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
