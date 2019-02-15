var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var urlEncodeeParser = bodyParser.urlencoded({extended:false});

// var data = [{item:'Get up inthe morning'},{item:'Start coding'},{item:'go to sleep'}];
var urlEncodeeParser = bodyParser.urlencoded({extended:false});



mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-1unrl.mongodb.net:27017,cluster0-shard-00-01-1unrl.mongodb.net:27017,cluster0-shard-00-02-1unrl.mongodb.net:27017/todo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",{useNewUrlParser :true},(err)=>{
    if(!err){
        console.log("success");
    }
    else{
        console.log(err);
    }
});

var todoSchema = new mongoose.Schema({
    item :String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item:'get start api'}).save(function(err){
    if (err) throw err;
    console.log('saved mother fucker');
});



module.exports = function(app){

    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {dos:data});
        });
        // res.render('todo', {dos: data});

    });

    app.post('/todo', urlEncodeeParser, function(req, res){
       
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req,res){

        Todo.find({item :req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        })  

    });
};