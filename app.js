var express = require('express');
var app = express();
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('GET request to the homepage!');
});

var deptAPI = require('./departmentAPI');
var employeeAPI = require('./employeeAPI');
// Department API
app.get('/api/departments', deptAPI.list);
app.get('/api/department/:id', deptAPI.get);
app.delete('/api/department/:id', deptAPI.delete);
app.put('/api/department/:id', deptAPI.update);
app.post('/api/departments', deptAPI.add);

// Employee API
app.get('/api/employees', employeeAPI.list);
app.get('/api/employee/:id', employeeAPI.get);
app.delete('/api/employee/:id', employeeAPI.delete);
app.put('/api/employee/:id', employeeAPI.update);
app.post('/api/employees', employeeAPI.add);




app.listen(4003);