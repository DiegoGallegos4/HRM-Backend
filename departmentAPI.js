var thinky = require('./utils');
var employee = require('./employeeAPI');
var r = thinky.r;

var Department = thinky.createModel('Department',{
	name: String,
	abbr: String 
}); 
Department.hasMany(employee.Employee,'employees','id','departmentId');
Department.ensureIndex('name');

exports.Department = Department;

exports.list = function(req, res){
	Department.orderBy({index: 'name'}).run().then(function(departments){
		res.json({
			data: departments,
			profile: res.decoded[0]
		});
	}).error(function(err){
		res.json({message: err});
	});
};

exports.add = function(req, res){
	var department = new Department(req.body);

	department.saveAll({employees: true}).then(function(result){
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

