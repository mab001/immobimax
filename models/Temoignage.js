var keystone = require('keystone');
var Types = keystone.Field.Types;

var Temoignage = new keystone.List('Temoignage',{
    map : {name : 'title' },
    singular:'Temoignage',
    autokey:{path : 'slug', from: 'title', unique:true}
});

Temoignage.add({
    title: {type: String, required:true},
    Name:{type: String},
    Profession:{type: String},
    Commentaire: {type : Types.Html, wysiwg: true, height:300},
    publishedDate:{type: Date, default: Date.now},
});

Temoignage.register();