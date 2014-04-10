var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes');
var users = require('./routes/user');

var pg = require('pg');

var dbVals = fs.readFileSync('config/db.txt').toString().split('\n');
var dbConf = {
	user: dbVals[0],
	password: dbVals[1],
	database: dbVals[2],
	host: dbVals[3],
	port: dbVals[4]
};
var pgClient = new pg.Client(dbConf);

pgClient.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
//   client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//     // client.end();
//   });
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.cookieParser());
app.use(express.session({secret: 'verysecretive'}));
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// app.get('/', routes.index);
app.get('/users', users.list);

app.get('/submit', function(req, res) {
	res.render('submit');
});

app.get('/', function(req, res) {
	var indexQ = pgClient.query('SELECT * FROM confessions;', function(err) { if(err) { console.error("ERROR", err); } });
    var qIndexRes = [];
    indexQ.on('row', function(row) {
      qIndexRes.push(row);
    });
    indexQ.on('end', function(result) {
      //fired once and only once, after the last row has been returned and after all 'row' events are emitted
      //in this example, the 'rows' array now contains an ordered set of all the rows which we received from postgres
      res.render('index', {confessions: result.rows});
    })
});

var createConfession = function(req) {
	pgClient.query("INSERT INTO confessions (body) VALUES ('" + req.body.content + "');",
		function(err) { if(err) { console.error("ERROR", err); } });
	req.session.confessions++;
}

app.post('/create', function(req, res) {
	if(req.session.logged) {
		if(req.session.banned) {
			console.log("Banned!");
		} else {
			createConfession(req);
			// console.log(req.body.content);
			// req.session.confessions++;
		}
	} else {
		req.session.logged = true;
		createConfession(req);
		// console.log(req.body.content);
		// req.session.confessions++;
	}
	if(req.session.confessions > 1) {
		req.session.banned = true;
	}
	res.redirect('/');
});
/// catch 404 an,d forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
