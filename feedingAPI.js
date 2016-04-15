var thinky = require('./utils');
var r = thinky.r;
var requestLine = require('./requestLineAPI').RequestLine;
var employee = require('./employeeAPI').Employee;

var Feeding = thinky.createModel('Feeding',{
	employeeID: String,
	price: Number,
	pin: Number,
	confirm: Boolean,
	payment: Boolean,
	tries: String,
	createdBy: String,
	reqLineId: String,
	requestID: String,
	date: Date
});

Feeding.ensureIndex('date');
Feeding.hasOne(requestLine,'requestLine','reqLineId','id');
Feeding.belongsTo(employee,'employee','employeeID','id');


var generatePin = function(){
	return Math.round( Math.random() * 9000 ) + 1000;
};

exports.Feeding = Feeding;

exports.list = function(req, res){
	Feeding.orderBy({index: 'date'}).getJoin({requestLine: true, employee: true}).run().then(function(feedings){
		res.json({
			data: feedings,
			profile: res.decoded[0],
			success: true
		});
	}).error(function(err){
		res.json({message:err});
	});
};

exports.add = function(req, res){
	req.body.createdBy = res.decoded[0].username;
	if(!req.body['pin']) req.body['pin'] = generatePin();
	Feeding.save(req.body).then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.get = function(req, res){
	Feeding.get(req.params.id).run().then(function(feeding){
		res.json(request);
	}).error(function(err){
		res.json({message: err})
	});
};

exports.update = function(req, res){
	Feeding.get(req.params.id).update(req.body).run().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};

exports.delete = function(req, res){
	Feeding.get(req.params.id).delete().execute().then(function(result){
		res.json(result);
	}).error(function(err){
		res.json({message: err});
	});
};


