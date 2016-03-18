var thinky = require('./utils');
var r = thinky.r;
var reqLine = require('./requestLineAPI');

var Request = thinky.createModel('Request',{
	reason: String,
	date: Date,
	hour: String,
	feedingType: String,
	created_at: thinky.type.date().default(r.now()),
	created_by: String 
});

Request.hasMany(reqLine.RequestLine,'requestLines','id','requestID');
Request.ensureIndex('date');

exports.list = function(req, res){
	Request.orderBy({index: 'date'}).getJoin({requestLines: true}).run().then(function(requests){
		res.json({
			data: requests,
			profile: res.decoded[0]
		});
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	req.body.created_by = res.decoded[0].username;
	var request = new Request(req.body);
	request.saveAll({requestLines: true}).then(function(result){
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
	//delete req.body['requestLines'];

	Request.get(req.params.id).update(req.body).run().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.delete = function(req, res){
	// Request.get(req.params.id).delete().execute().then(function(result){
	// 	res.json(result);
	// }).error(function(err){
	// 	res.json({message: err});
	// });
	Request.get(req.params.id).run().then(function(result){
		request.deleteAll();
	}).error(function(err){
		res.json({message: err});
	});
};

exports.Request = Request;
