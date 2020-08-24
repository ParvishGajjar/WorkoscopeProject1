var express = require('express');
var _ = require('lodash');
const mysql = require('mysql');
var path = require('path');
var app = express();
app.use(express.json())

const connection = mysql.createConnection({ 
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'workone'
});

connection.connect(function(err) {         
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname + '/main.html'));

});
app.get('/style.css',function(req,res) {
 
  res.sendFile(path.join(__dirname + '/style.css'));
});
app.get('/scripts.js',function(req,res) {
 
  res.sendFile(path.join(__dirname + '/scripts.js'));
});
app.get('/search.html',function(req,res) {
 
  res.sendFile(path.join(__dirname + '/search.html'));
});

app.get('/api/users', function (req, res) {
   connection.query('SELECT * FROM UserData;', (err,rows) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log('Data received from Db');
      res.end(JSON.stringify(rows));
  
   });
})
app.get('/api/skills', function (req, res) {
   connection.query('SELECT Skill_name FROM Skill;', (err,rows) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      rows.forEach((item)=>{
        console.log(item["Skill_name"]);
      })
      console.log(rows[0]["Skill_name"]);
      console.log('Skills received from Db');
      res.end(JSON.stringify(rows));
  
   });
})

//Get User's data by passing parameter which would have sublestring from his name
app.get('/api/users/:name', function (req, res) {
   const nameparam=req.params.name;
   connection.query("SELECT * FROM UserData where username LIKE '%"+nameparam+"%';", (err,rows) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log('Data received from Db');
      res.end(JSON.stringify(rows));
   });
})
app.post('/api/add',function(req,res){
  connection.query(`INSERT into employee (Firstname,Lastname,email,DOB,Phoneno,Address) values ('${req.body.username}','${req.body.lname}','${req.body.email}','${req.body.dob}','${req.body.phone}','${req.body.add}');`, (err,result) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log(result);
      id=result["insertId"]
      console.log(id)
      req.body.Skills.forEach((item)=>{
        getskillID(id,item);
      })
      
      res.send(result)
      // skill_emp(result['insertId'])
   });
    function getskillID(id,sname)
    {
      connection.query(`SELECT Skill_id FROM skill where Skill_name="${sname}";`, (err,rows) => {    // () anonymous function passing arguement err and rows 
        if(err) 
        {
          throw err;
        }
        skill_id=rows[0]["Skill_id"]
        console.log(rows[0]["Skill_id"]);
        skill_emp(id,skill_id)
      });
    }
  function skill_emp(id,skill_id){
      connection.query(`INSERT into Skill_Emp (Emp_id,Skill_id) values (${id},${skill_id});`, (err,result) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log(result);
      
      // skill_emp(result['insertId'])
   });
  }
})

app.listen(3000,(err)=>{
  if(err)
  {
    console.log(err);
  }
  console.log("Running!")
});