var mongoose = require('mongoose')
  , Demo = mongoose.model('Demo')
  , _ = require('underscore');


// Show Demo
exports.show = function(req, res){
	res.render('demos/show',{
		title: req.demo.title,
		demo: req.demo,
	});
}

// Show list of demos
exports.index = function(req,res){
	Demo
		.find({})
		.sort({'createdAt': -1})
		.exec(function(err, demos){
			if(err) return res.render('500')
			Demo.count().exec(function(err,count){
				res.render('demos/index', {
					title: 'List of demos'
				   ,demos: demos
				});
			})
		});
}	

// New Demo
exports.new = function(req, res){
	res.render('demos/new', {
		title: 'New Demo',
	    demo: new Demo({})
	});
}

// Create demo
exports.create = function(req,res){
	var demo = new Demo(req.body);

	demo.save(function(err){
		if(err){
			res.render('demos/new',{
				title: 'New demo',
			    demo: demo,
			    errors: err.errors
			});
		} else {
			res.redirect('/demos/'+demo._id);
		}
	});
}

// Edit demo
exports.edit = function(req, res){
	res.render('demos/edit', {
		title: 'Edit '+req.demo.title,
	    demo: req.demo
	});
}

// Update demo
exports.update = function(req, res){
	var demo = req.demo;

	demo = _extend(demo, req.body);
	demo.save(function(err,doc){
		if(err){
			res.render('demos/edit', {
				title: 'Edit demo',
				demo: demo,
				errors: err.erros	
			});
		} else {
			res.redirect('/demos/'+demo._id);
		}
	});
}

// Delete demo
exports.destroy = function(req, res){
	var demo = req.demo;
	demo.remove(function(err){
		res.redirect('/demos');
	});
}