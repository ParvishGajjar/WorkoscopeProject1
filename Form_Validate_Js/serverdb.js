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

app.get('/main.html',function(req,res) {
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
   connection.query('SELECT * FROM employee;', (err,rows) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log('Data received from Db');
      res.end(JSON.stringify(rows));
  
   });
})

app.get('/api/skills', function (req, res) {
   connection.query('SELECT * FROM Skill;', (err,rows) => {    // () anonymous function passing arguement err and rows 
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
   connection.query(`Select employee.Emp_id, employee.Firstname, employee.Lastname, employee.Email, employee.Phoneno,employee.DOB, employee.Address,
    employee.City,employee.State, employee.Country, GROUP_CONCAT(  skill.skill_name separator '|') AS 'Skills' from employee 
    left join skill_emp ON employee.Emp_id = skill_emp.Emp_id left join skill ON skill_emp.Skill_id = skill.Skill_id 
    where  employee.Firstname LIKE "%${nameparam}%" OR employee.Lastname LIKE "%${nameparam}%" OR employee.Email LIKE "%${nameparam}%" 
    OR employee.Phoneno LIKE "%${nameparam}%" OR employee.DOB LIKE "%${nameparam}%" OR employee.Address LIKE "%${nameparam}%" 
    OR employee.City LIKE "%${nameparam}%" OR employee.State LIKE "%${nameparam}%" 
    OR skill.skill_name LIKE "%${nameparam}%" group by Emp_id;`, (err,rows) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log('Data received from Db');
      res.end(JSON.stringify(rows));
   });
})
app.post('/api/add',function(req,res){
  connection.query(`INSERT into employee (Firstname,Lastname,email,DOB,Phoneno,Address,City,State,Country) values ('${req.body.username}','${req.body.lname}','${req.body.email}','${req.body.dob}','${req.body.phone}','${req.body.add}','${req.body.city}','${req.body.state}','${req.body.country}');`, (err,result) => {    // () anonymous function passing arguement err and rows 
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
//Getdata to prefill the form
app.get('/api/prefill/:id',(req,res)=>{
   const empid=req.params.id;
   connection.query(`Select employee.Emp_id, employee.Firstname, employee.Lastname, employee.Email, employee.Phoneno,employee.DOB, employee.Gender, employee.Address,
    employee.City,employee.State, employee.Country, GROUP_CONCAT( skill.skill_name) AS 'Skills' from employee 
    left join skill_emp ON employee.Emp_id = skill_emp.Emp_id left join skill ON skill_emp.Skill_id = skill.Skill_id 
    where employee.Emp_id = "${empid}";`, (err,rows) => {    // () anonymous function passing arguement err and rows 
      if(err) 
      {
         throw err;
      }
      console.log(rows);
      console.log("Data received from Db of Employee with  ID: " + empid);
      res.end(JSON.stringify(rows));
   });
})

//update user's data
app.post('/api/updatedata',(req,res)=>{
  connection.query(`update employee set Firstname='${req.body.username}', Lastname='${req.body.lname}',
   Email='${req.body.email}', DOB='${req.body.dob}', Phoneno='${req.body.phone}', Address='${req.body.add}', 
   City='${req.body.city}',State='${req.body.state}',Country='${req.body.country}, Gender='${req.body.gender}' where Emp_id='${req.body.id}';`,(err,result)=>{
    if(err)
    {
      throw err;
    }
    console.log("Data Updated")
    res.send(result);
  })
})

app.listen(3000,(err)=>{
  if(err)
  {
    console.log(err);
  }
  console.log("Running!")
});