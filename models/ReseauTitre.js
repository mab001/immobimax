var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ReseauTitre = new keystone.List('ReseauTitre', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ReseauTitre.add({
	name: { type: String, required: true },
	title:{ type: String, height: 400 },
});


ReseauTitre.register();
