var thinky = require('./utils');

var RequestLine = thinky.createModel('RequestLine',{
	requestID: String,
	feeding: Boolean,
	transportation: Boolean,
	approved: Boolean,
	transportationConfirmation: Boolean,
	feedingId: String
});

RequestLine.ensureIndex('requestID');


exports.list = function(req, res){
	RequestLine.orderBy({index: 'requestID'}).getJoin({request: true}).run().then(function(requestLines){
		res.json({
			data: requestLines,
			profile: res.decoded[0]
		});
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
		res.json({message: err});
	});
};

exports.update = function(req, res){
	RequestLine.get(req.params.id).update(req.body).run().then(function(result){
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

exports.RequestLine =RequestLine;

