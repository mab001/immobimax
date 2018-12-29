var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var ServiceReseauCategory = new keystone.List('ServiceReseauCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ServiceReseauCategory.add({
	name: { type: String, required: true },
});

ServiceReseauCategory.relationship({ ref: 'ServiceReseauTitre', path: 'servicereseautitres', refPath: 'categories' });

ServiceReseauCategory.register();
