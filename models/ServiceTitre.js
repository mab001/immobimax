var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ServiceTitre = new keystone.List('ServiceTitre', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ServiceTitre.add({
	name: { type: String, required: true },
	title:{ type: String, height: 400 },
});

ServiceTitre.relationship({ ref: 'Service', path: 'services', refPath: 'categories' });

ServiceTitre.register();
