var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * PostCategory Model
 * ==================
 */

var ServiceTypeGestion = new keystone.List('ServiceTypeGestion', {
	autokey: { from: 'name', path: 'key', unique: true },
});

ServiceTypeGestion.add({
	name: { type: String, required: true },
	title:{ type: String, height: 400 },
	desc: { type: String, height: 100 },
});

ServiceTypeGestion.register();
