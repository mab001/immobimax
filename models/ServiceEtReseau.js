var keystone = require('keystone');
var Types = keystone.Field.Types;

var ServiceEtReseau = new keystone.List('ServiceEtReseau',{
    map : {name : 'title' },
    singular:'ServiceEtReseau',
    autokey:{path : 'slug', from: 'title', unique:true}
});

ServiceEtReseau.add({
    title: {type: String, required:true},
    price:{type: Number},
    qty: {type: Number},
    description: {type : Types.Html, wysiwg: true, height:300},
    publishedDate:{type: Date, default: Date.now},
    categories: { type: Types.Relationship, ref: 'ServiceTitre', many: true },
    paragraphes: { type: Types.Relationship, ref: 'ServiceTitre', many: true },
});

ServiceEtReseau.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

ServiceEtReseau.register();