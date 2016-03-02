var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var httpLogger = require('morgan');
var pkg = require('./package.json');
var PORT = 3000;


/* Setup Database */

mongoose.connect('mongodb://localhost/voting-system');

/* Middlewares*/
app.use(express.static(path.join(__dirname, 'public/')));
app.use(httpLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

/* Schema*/
require('./server/models/Student');
require('./server/models/User');
require('./server/models/Candidate');


/* Routes */
var studentAPI  = require('./server/routes/student');
var adminAPI  = require('./server/routes/admin');
var candidateAPI  = require('./server/routes/candidate');


app.use('/api/student/',studentAPI);
app.use('/api/admin/',adminAPI);
app.use('/api/candidate/',candidateAPI);


/*Config*/

app.listen(PORT);
console.log('-------------------------------');
console.log('Application : ' + pkg.name);
console.log('Version : ' + pkg.version);
console.log('Author : ' + pkg.author);
console.log('-------------------------------');
console.log('Server Listening on PORT : ' + PORT);
