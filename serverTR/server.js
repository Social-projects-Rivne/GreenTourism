var express = require('express');
var app = express();

var morgan = require('morgan');

app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/../app'));

var port = 3333;
app.listen(port, function(){
	console.log('Server has started on http://localhost:' + port + '...');
});