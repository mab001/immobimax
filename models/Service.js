/*var keystone = require('keystone');
var Types = keystone.Field.Types;

/*
 * Post Model
 * ==========


var Service = new keystone.List('Service', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Service.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Admin', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'ServiceTitre', many: true },
	paragraphes: { type: Types.Relationship, ref: 'ServiceParagraphe', many: true },
});

Service.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Service.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Service.register();*/
 