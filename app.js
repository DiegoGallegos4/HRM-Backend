var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// app.use(cors());
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');  
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('GET request to the homepage!');
});

var deptAPI = require('./departmentAPI');
var employeeAPI = require('./employeeAPI');
var requestAPI = require('./requestAPI');
var requestLineAPI = require('./requestLineAPI');
console.log(requestAPI);
// Department API
app.get('/api/departments', deptAPI.list);
app.get('/api/departments/:id', deptAPI.get);
app.delete('/api/departments/:id', deptAPI.delete);
app.put('/api/departments/:id', deptAPI.update);
app.post('/api/departments', deptAPI.add);

// Employee API
app.get('/api/employees', employeeAPI.list);
app.get('/api/employees/:id', employeeAPI.get);
app.delete('/api/employees/:id', employeeAPI.delete);
app.put('/api/employees/:id', employeeAPI.update);
app.post('/api/employees', employeeAPI.add);

// Request API
app.get('/api/requests', requestAPI.list);
app.get('/api/requests/:id', requestAPI.get);
app.delete('/api/requests/:id', requestAPI.delete);
app.put('/api/requests/:id', requestAPI.update);
app.post('/api/requests', requestAPI.add);

// RequestLine API
app.get('/api/requestLines', requestLineAPI.list);
app.get('/api/requestLines/:id', requestLineAPI.get);
app.delete('/api/requestLines/:id', requestLineAPI.delete);
app.put('/api/requestLines/:id', requestLineAPI.update);
app.post('/api/requestLines', requestLineAPI.add);

app.listen(4003);