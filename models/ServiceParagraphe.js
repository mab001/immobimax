var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ServiceParagraphe = new keystone.List('ServiceParagraphe', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ServiceParagraphe.add({
	name: { type: String, required: true },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
});

ServiceParagraphe.relationship({ ref: 'Service', path: 'services', refPath: 'paragraphes' });

ServiceParagraphe.register();
