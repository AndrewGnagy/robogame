var express = require('express');
var app = express();

var databaseUrl = "robodb";
var collections = ["npcs", "users", "robots", "attacks"];
var mongo = require("mongojs");
var ObjectId = mongo.ObjectId;
var db = mongo.connect(databaseUrl, collections);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(express.bodyParser());

app.get('/', function(req, res){
    res.send({hello: "World"});
});

app.get('/npcs/:name', function(req, res){
    db.npcs.find({name: req.params.name}, function(err, npcs) {
      if( err || !npcs.length){
           console.log("no npcs found");    
           res.send("no npcs found");

      }
      else npcs.forEach( function(npc) {
        res.send(npc);
      } );
    });
});

app.get('/users/:name', function(req, res){
   var name = req.params.name;
   db.users.find({name: name}, function(err, user) {
      if( err || !user.length){
          res.send("User not found");
      }
      else
      {
          res.json(user[0]);
      }
    });
});

app.post('/users/:name', function(req, res){
    console.log(req.body);
    db.users.update({name: req.params.name}, {$set: req.body});
    var user = findUser(req.params.name);
    if(typeof user === "string")
        res.send(user);
    res.json(user);
});

app.get('/robots/:robotid', function(req, res){
    var robot = {};
    db.robots.find({_id:ObjectId(req.params.robotid)},{_id:0}, function(err, robots) {
        if( err || !robots.length){
            console.log("no robot found");
            res.send("no user found");
        }
        else{
            robot = robots[0];
            //db.attacks.find({aid: {$in: robots[0].attacks}},{_id:0}, function(err, attack) {
                //robot.attackList = attack;
                res.json(robot);
            //});
        }
    });
});

app.post('/robots/:robotid', function(req, res){
    console.log(req.body);
    db.robots.update({_id:ObjectId(req.params.robotid)}, {$set: req.body});
});

app.listen(8080);
