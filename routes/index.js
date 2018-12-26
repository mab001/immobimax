/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var i18n = require("i18n-2");
var keystoneMultilingual = require('keystone-multilingual');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);




// Common Middleware

keystone.pre('render', middleware.lng);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);


keystone.set('404', function (req, res, next) {
    middleware.lng(req, res, next);
	console.log('TEST');
});

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports= module.exports = function (app) {
	// Views
/*	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);*/
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	

	keystoneMultilingual.initMiddleware({
		app: app,
		languageNavMap: {
			"fr" : {
				"home": {
					"label": "Acceuil",
					"key": "home-fr",
					"href": "/"
				},
				"mission": {
					"label": "Mission",
					"key": "mission-en",
					"href": "/mission"
				},
				"blog": {
					"label": "Blog",
					"key": "blog-en",
					"href": "/blog"
				},
				"contact": {
					"label": "Contact",
					"key": "contact-fr",
					"href": "/contact"
				},			
				"page": {
					"label": "Page",
					"key": "page",
					"href": "/page"
				},
				"propriete": {
					"label": "Propriétés",
					"key": "propriete",
					"href": "/propriete"
				}
			},
			"en" : {
				//keys matching
				"home": {
					"label": "Acceuil",
					"key": "home-en",
					"href": "/"
				},
				"mission": {
					"label": "Mission",
					"key": "mission-en",
					"href": "/mission"
				},
				"blog": {
					"label": "Blog",
					"key": "blog-en",
					"href": "/blog"
				},
				"contact": {
					"label": "Contact",
					"key": "contact-en",
					"href": "/contact"
				},
				"page": {
					"label": "Page",
					"key": "page",
					"href": "/page"
				},
				"propriete": {
					"label": "Propriétés",
					"key": "propriete",
					"href": "/propriete"
				}
			}
		},
		languageRouteMap: {
			'home': {
				controller: routes.views.index,
				section: null,
				route: '/'
			},
			'mission': {
				section: null,
				controller: routes.views.mission,
				languages: {
					'fr': {
						route: '/mission'
					},
					'en': {
						route: '/mission'
					}
				}
			},
			'blog': {
				section: null,
				controller: routes.views.blog,
				languages: {
					'fr': {
						route: '/blog'
					},
					'en': {
						route: '/blog'
					}
				}
			},
			'contact': {
				section: null,
				controller: routes.views.contact,
				languages: {
					'fr': {
						route: '/contact'
					},
					'en': {
						route: '/contact'
					}
				}
			},
			'page': {
				section: null,
				controller: routes.views.page,
				languages: {
					'fr': {
						route: '/page'
					},
					'en': {
						route: '/page'
					}
				}
			},
			'propriete': {
				section: null,
				controller: routes.views.propriete,
				languages: {
					'fr': {
						route: '/propriete'
					},
					'en': {
						route: '/propriete'
					}
				}
			}
			
		}
	})
};
