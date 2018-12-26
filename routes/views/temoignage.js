var keystone = require('keystone');
exports = module.exports = function (req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // set local
    locals.section = 'temoignage';

    //Load Mission
    view.query('temoignage',keystone.list('Temoignage').model.find());

    //Render View
    view.render('temoignage');
};