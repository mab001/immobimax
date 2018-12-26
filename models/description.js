var keystone = require('keystone');
var Types = keystone.Field.Types;

var Description = new keystone.List('Description', {
    multilingual: true,
map: {name: 'title'},
singular: 'Description',
plural: 'Descriptions',
autokey: {path: 'slug', from: 'title', unique: true}
});

Description.add({
    title: {type: String, required: true},
    subtitle: {type: String},
    text: {type: Types.Textarea}
});


Description.register();