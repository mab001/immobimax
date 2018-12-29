var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ServiceReseauParagraphe = new keystone.List('ServiceReseauParagraphe', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ServiceReseauParagraphe.add({
	name: { type: String, required: true },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	categories: { type: Types.Relationship, ref: 'ServiceReseauCategory', many: true },
});



ServiceReseauParagraphe.register();
