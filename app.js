var express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        morgan = require('morgan')
        https = require('https');
        jwt = require('jsonwebtoken');
        config = require('./config');

// Options for google token validation
var options = {
	host: 'www.googleapis.com',
	path: '/oauth2/v3/tokeninfo?id_token='
};

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');  
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
  next();
});
// Enable url-encoded parsing
app.use(bodyParser.urlencoded({
	extended: true
}));
// Enable JSON parsin
app.use(bodyParser.json());
// Logging to console
app.use(morgan('dev'));

app.get('/',function(req,res){
	res.send('GET request to the homepage!!');
});

// APIS
var deptAPI = require('./departmentAPI');
var employeeAPI = require('./employeeAPI');
var requestAPI = require('./requestAPI');
var requestLineAPI = require('./requestLineAPI');
var feedingAPI = require('./feedingAPI');
var user = require('./user');

employeeAPI.Employee.belongsTo(deptAPI.Department,'department','departmentId','id');
requestLineAPI.RequestLine.belongsTo(requestAPI.Request,'request','requestID','id');

// Route where google token is sent
app.post('/auth', function(request,response){
	// Append id_token to path
	options.path = options.path + request.body.id_token;

	var email = request.body.user.email
	
	user.User.filter({email: email}).run().then(function(user){
		if(!user){
			response.json({ success: false, message: 'Usuario no encontrado' });
		}else{
			var token = jwt.sign(user, config.secret,{
				expiresIn: '24h' // 24 hours
			});

			response.json({
				success: true,
				message: 'Token generated',
				token: token
			});
		}
	});
	// Request to googleapis
	// var req = https.get(options, function(res){
	// 	console.log(options.host + ':' + res.statusCode);
	// 	var output = '';

	// 	// Fetch User by Email
	// 	user.User.filter({email: email}).run().then(function(user){
	// 		if(!user){
	// 			response.json({ success: false, message: 'Usuario no encontrado' });
	// 		}else{
	// 			// Get response from Google validating the token
	// 			res.on('data', function(data){
	// 				output += data;
	// 			}).on('end',function(){
	// 				var outputJS = JSON.parse(output);
	// 				console.log(outputJS);
	// 				if(output.error_description){
	// 					response.json({ success: false, message: 'Usuario no encontrado' });
	// 				}else if(user[0].email == outputJS.email){
	// 					// console.log('Email from db: ' +user[0].email + ' Email on response:'+outputJS.email);
	// 					var token = jwt.sign(user, config.secret,{
	// 						expiresIn: '24h' // 24 hours
	// 					});

	// 					response.json({
	// 						success: true,
	// 						message: 'Token generated',
	// 						token: token
	// 					});
	// 				}
	// 			});
	// 		}
	// 	});
	// });

	// req.on('error',function(err){
	// 	console.log(err)
	// })

	// req.end();
});

app.get('/auth', function(req,res){
	res.send('hi');
});

var api = express.Router();

api.use(function(req,res,next){
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(req.method == 'OPTIONS'){
		next();
	}else{
		if(token){
			jwt.verify(token, config.secret, function(err,decoded){
				if(err){
					return res.json({success:false, message: 'No pudo autenticarse el token'});
				}else{
					res.decoded = decoded
					next()
				}
			})
		}else{
			res.status(403).send({
				success: false,
				message: 'No se encontro un token'
			});
		}
	}
});

app.use('/',api);
// Department API
api.get('/api/departments', deptAPI.list);
api.get('/api/departments/:id', deptAPI.get);
api.delete('/api/departments/:id', deptAPI.delete);
api.put('/api/departments/:id', deptAPI.update);
api.post('/api/departments', deptAPI.add);

// Employee API
api.get('/api/employees', employeeAPI.list);
api.get('/api/employees/:id', employeeAPI.get);
api.delete('/api/employees/:id', employeeAPI.delete);
api.put('/api/employees/:id', employeeAPI.update);
api.post('/api/employees', employeeAPI.add);

// Request API
api.get('/api/requests', requestAPI.list);
api.get('/api/requests/:id', requestAPI.get);
api.delete('/api/requests/:id', requestAPI.delete);
api.put('/api/requests/:id', requestAPI.update);
api.post('/api/requests', requestAPI.add);

// RequestLine API
api.get('/api/requestLines', requestLineAPI.list);
api.get('/api/requestLines/:id', requestLineAPI.get);
api.delete('/api/requestLines/:id', requestLineAPI.delete);
api.put('/api/requestLines/:id', requestLineAPI.update);
api.post('/api/requestLines', requestLineAPI.add);

// Feeding API
api.get('/api/feedings', feedingAPI.list);
api.get('/api/feedings/:id', feedingAPI.get);
app.delete('/api/feedings/:id', feedingAPI.delete);
api.put('/api/feedings/:id', feedingAPI.update);
api.post('/api/feedings', feedingAPI.add);

// User API
api.get('/api/users', user.list);
api.get('/api/users/:id', user.get);
api.delete('/api/users/:id', user.delete);
api.put('/api/users/:id', user.update);
api.post('/api/users', user.add);

app.listen(4003);