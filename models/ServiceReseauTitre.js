var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ServiceReseauTitre = new keystone.List('ServiceReseauTitre', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ServiceReseauTitre.add({
	name: { type: String, required: true },
	title:{ type: String, height: 400 },
	categories: { type: Types.Relationship, ref: 'ServiceReseauCategory', many: true },
});



ServiceReseauTitre.register();
