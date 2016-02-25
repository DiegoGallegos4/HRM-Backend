var thinky = require('thinky')({
	host: 'localhost',
	port: 28015,
	db: 'HRM'
});

var r = thinky.r;

var Department = thinky.createModel('Department',{
	name: String,
	abbr: String 
}); 

Department.ensureIndex('name');

exports.list = function(req, res){
	Department.orderBy({index: 'name'}).run().then(function(departments){
		res.json(departments);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.add = function(req, res){
	Department.save(req.body).then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err})
	});
};

exports.get = function(req,res){
	Department.get(req.params.id).run().then(function(department){
		res.json(department);
	}).error(function(err){
		res.json({message: err});
	});
};

//body must be raw on request
exports.delete = function(req,res){
	Department.get(req.params.id).delete().execute().then(function(result){
			res.json(result);
		}).error(function(err){
			res.json({message: err});
		});
};

exports.update = function(req,res){
	Department.get(req.params.id).run().then(function(department){
		if(req.body.name) department.name = req.body.name;
		if(req.body.abbr) department.abbr = req.body.abbr;

		department.save().then(function(result){
			res.json(result);
		}).error(function(err){
			res.json({message: err});
		});
	});
};