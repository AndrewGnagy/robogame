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

//Default
app.use('/', express.static(__dirname + '/../app'));


app.get('/node/npcs/:name', function(req, res){
    db.npcs.find({name: req.params.name}, function(err, npcs) {
      if( err || !npcs.length){
           console.log("no npcs found");    
           res.send("no npcs found");

      }
      else npcs.forEach( function(npc) {
        res.send(npc);
      });
    });
});

app.get('/node/users/:name', function(req, res){
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

app.post('/node/users/:name', function(req, res){
    var name = req.params.name;
    delete req.body._id;
    //console.log('db.users.update({name: '+req.params.name+'}, {$set: '+req.body+'});');
    db.users.update({name: req.params.name}, {$set: req.body});
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

app.get('/node/robots/:robotid', function(req, res){
    var robot = {};
    db.robots.find({_id:ObjectId(req.params.robotid)},{_id:'0'}, function(err, robots) {
        if( err || !robots.length){
            console.log("no robot found");
            res.send("no robot found");
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

app.post('/node/robots/:robotid', function(req, res){
    console.log(req.body);
    db.robots.update({_id:ObjectId(req.params.robotid)}, {$set: req.body});
});

app.listen(8080);
