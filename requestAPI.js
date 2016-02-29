var thinky = require('./utils');
var r = thinky.r;
var reqLine = require('./requestLineAPI');

var Request = thinky.createModel('Request',{
	reason: String,
	date: Date,
	hour: String,
	created_at: thinky.type.date().default(r.now()) 
});

Request.ensureIndex('date');
Request.hasMany(reqLine.RequestLine,'requestLines','id','requestID');

exports.Request = Request;

exports.list = function(req, res){
	Request.orderBy({index: 'date'}).run().then(function(requests){
		res.json(requests);
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	Request.save(req.body).then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.get = function(req, res){
	Request.get(req.params.id).run().then(function(request){
		res.json(request);
	}).error(function(err){
		res.json({message: err})
	});
};

exports.update = function(req, res){
	Request.get(req.params.id).update(req.params).run().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.delete = function(req, res){
	Request.get(req.params.id).delete().execute().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

module.exports = exports;