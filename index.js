var mysql = require('mysql');
var express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
// app.use(express.bodyParser());


var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "userdetails"
});

connection.query('CREATE DATABASE IF NOT EXISTS userdetails', function (err) {
    if (err) throw err;

    connection.query('USE userdetails', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(30),'
            + 'mobile VARCHAR(30),'
            + 'designation VARCHAR(50),'
            + 'email VARCHAR(30)'
            +  ')', function (err) {
                if (err) throw err;
            });
});

  //   var sql = "INSERT INTO users (id, name, mobile, designation, email) VALUES (2, 'Naveen ', '897667899', 'Software engineer', 'naveenv@gmail.com')";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  //   console.log(result);
  // });
});

app.post('/newuser', function(req,res){
    
    // console.log(req.body);
    var user = req.body;
    // console.log(user);
    var sql = "INSERT INTO users SET ?";
    connection.query(sql, user , function(err, result){
        // console.log(result);
        if(err){
            res.send(err);
        }
        else{
            res.send('New record inserted.');
        }
    });
});






app.get('/', function(req, res) {
    console.log(req.query);
    res.send("Hello welcome to user details application.");
});


app.get('/users', function (req, res) {
    connection.query('SELECT * FROM users', 
        function (err, userlist) {
            if (err) throw err;
            console.log(userlist);
            res.send(userlist);

        }
    );
});



app.listen(app.get('port'), function() {
    console.log('Do u wanna know port no: @' + app.get('port'))
})




