var thinky = require('./utils');

var User = thinky.createModel('User',{
	name: String,
	lastName: String,
	email: String,
	username: String,
	department: String,
	active: Boolean,
	role: String
});

exports.list = function(req, res){
	User.run().then(function(users){
		res.json({
			data: users,
			profile: res.decoded[0],
			success: true
		});
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	User.save(req.body).then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.get = function(req, res){
	User.get(req.params.id).run().then(function(user){
		res.json(user);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.update = function(req, res){
	User.get(req.params.id).update(req.body).run().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.delete = function(req, res){
	User.get(req.params.id).delete().execute().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.User = User;
