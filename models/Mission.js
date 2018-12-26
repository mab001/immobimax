var keystone = require('keystone');
var Types = keystone.Field.Types;

var Mission = new keystone.List('Mission',{
    map : {name : 'title' },
    singular:'Mission',
    autokey:{path : 'slug', from: 'title', unique:true}
});

Mission.add({
    title: {type: String, required:true},
    price:{type: Number},
    qty: {type: Number},
    description: {type : Types.Html, wysiwg: true, height:300},
    publishedDate:{type: Date, default: Date.now},
});

Mission.register();