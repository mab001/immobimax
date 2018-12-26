var keystone = require('keystone');
exports = module.exports = function (req, res){
    var view = new keystone.View(req, res);
    var locals = res.locals;

    // set local
    locals.section = 'mission';

    //Load Mission
    view.query('mission',keystone.list('Mission').model.find());

    //Render View
    view.render('mission');
};