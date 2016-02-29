var thinky = require('./utils');
var r = thinky.r;
var req = require('./requestAPI');

var RequestLine = thinky.createModel('RequestLine',{
	requestID: String,
	feeding: Boolean,
	transportation: Boolean,
	approved: Boolean,
	transporationConfirmation: Boolean,
	feedingType: String,
	pin: Number
});
RequestLine.ensureIndex('requestID');
//RequestLine.belongsTo(req.Request,'request','requestID','id');
exports.RequestLine =RequestLine;

exports.list = function(req, res){
	RequestLine.orderBy({index: 'requestID'}).run().then(function(requestLines){
		res.json(requestLines);
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	RequestLine.save(req.body).then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.get = function(req, res){
	RequestLine.get(req.params.id).run().then(function(requestLine){
		res.json(requestLine);
	}).error(function(err){
		res.json({message: err})
	});
};

exports.update = function(req, res){
	RequestLine.get(req.params.id).update(req.params).run().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.delete = function(req, res){
	RequestLine.get(req.params.id).delete().execute().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

module.exports = exports;