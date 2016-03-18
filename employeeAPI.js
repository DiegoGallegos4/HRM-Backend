var thinky = require('./utils');

var Employee = thinky.createModel('Employee',{
	name: String,
	lastName: String,
	departmentId: String,
	completeName: String,
	pin: Number,
	type: String
});

Employee.ensureIndex('name');

exports.Employee = Employee;

exports.list = function(req, res){
	Employee.orderBy({index: 'name'}).getJoin({department: true}).run().then(function(employees){
		console.log(employees);
		res.json({
			data: employees,
			profile: res.decoded[0]
		});
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	var employee = new Employee(req.body);

	employee.saveAll({department: true}).then(function(result){
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
	delete req.body['department'];
	Employee.get(req.params.id).update(req.body).run().then(function(result){
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

