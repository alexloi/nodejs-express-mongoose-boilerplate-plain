var mongoose = require('mongoose')
  , Demo = mongoose.model('Demo')
  , async = require('async');

module.exports = function (app) {
  
  // Demo routes
  var demos = require('../app/controllers/demos');
  
  // Home route
  app.get('/', demos.index);

  app.get('/demos/new', demos.new);
  app.post('/demos',  demos.create);
  app.get('/demos/:id', demos.show);
  app.get('/demos/:id/edit', demos.edit);
  app.put('/demos/:id', demos.update);
  app.del('/demos/:id',  demos.destroy);

  app.param('demoId', function (req, res, next, id) {
    Demo
      .findOne({ _id : id })
      .exec(function (err, demo) {
        if (err) return next(err);
        if (!demo) return next(new Error('Failed to load Demo ' + id));
        req.profile = demo;
        next();
      });
  });

  // app.param('id', function(req, res, next, id){
  //   Article
  //     .findOne({ _id : id })
  //     .populate('user', 'name')
  //     .populate('comments')
  //     .exec(function (err, article) {
  //       if (err) return next(err)
  //       if (!article) return next(new Error('Failed to load article ' + id))
  //       req.article = article

  //       var populateComments = function (comment, cb) {
  //         User
  //           .findOne({ _id: comment._user })
  //           .select('name')
  //           .exec(function (err, user) {
  //             if (err) return next(err)
  //             comment.user = user
  //             cb(null, comment)
  //           })
  //       }

  //       if (article.comments.length) {
  //         async.map(req.article.comments, populateComments, function (err, results) {
  //           next(err)
  //         })
  //       }
  //       else
  //         next()
  //     })
  // })

  

}
