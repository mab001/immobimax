var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Propriete = new keystone.List('Propriete', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

const storage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('./uploads/images'), 
        publicPath: '/images/'
    },
    schema: {
        url: true,
    }
})

Propriete.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Admin', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },
	content: {
		Emplacement: { type: Types.Html, wysiwyg: true, height: 100 },
		Description: { type: Types.Html, wysiwyg: true, height: 550 },
	},
	categories: { type: Types.Relationship, ref: 'ProprieteCategory', many: true },
});

Propriete.schema.virtual('content.full').get(function () {
	return this.content.Description || this.content.Emplacement;
});

Propriete.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Propriete.register();
