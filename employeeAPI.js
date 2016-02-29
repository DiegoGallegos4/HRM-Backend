var thinky = require('./utils');

var Employee = thinky.createModel('Employee',{
	name: String,
	lastName: String,
	departmentId: String,
	completeName: String,
	type: String
});

Employee.ensureIndex('name');

exports.list = function(req, res){
	Employee.orderBy({index: 'name'}).run().then(function(employees){
		res.json(employees);
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	Employee.save(req.body).then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.get = function(req, res){
	Employee.get(req.params.id).run().then(function(employee){
		res.json(employee);
	}).error(function(err){
		res.json({message: err})
	});
};

exports.update = function(req, res){
	Employee.get(req.params.id).update(req.params).run().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.delete = function(req, res){
	Employee.get(req.params.id).delete().execute().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

