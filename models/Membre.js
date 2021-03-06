var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Membre = new keystone.List('Membre', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Membre.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Admin', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Membre.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Membre.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Membre.register();
