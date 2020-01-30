var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
//2 var User =require('./app/models/user');
var bodyParser =require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/tutorial',function(err) {
    if(err) {
        console.log('Not connected to database' + err);
    } else {
        console.log('Successfully connected to mongodb');
    }
});
/*app.get('/',function(req, res) {
    res.send('Hello World');
});

app.get('/home',function(req, res) {
    res.send('Hello from home');
});*/

/*app.post('/users', function(req,res) {
    res.send('testing users route');
})*/    

/*2 app.post('/users', function(req,res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if(req.body.username == null || req.body.username =='' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email =='') {
        res.send("Ensure username,email,and password were provided");
    } else{
        user.save(function(err) {
            if(err) {
                res.send('Username or Email already exists');
            } else {
                res.send('user created');
            }
        });
    }
    /*user.save();
    res.send('user created');/
});*/

app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
    console.log('Running the server on port ' + port);
});