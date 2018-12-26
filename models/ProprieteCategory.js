var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var ProprieteCategory = new keystone.List('ProprieteCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ProprieteCategory.add({
	name: { type: String, required: true },
});

ProprieteCategory.relationship({ ref: 'Propriete', path: 'proprietes', refPath: 'categories' });

ProprieteCategory.register();
