// var connection=require('./serverdb.js');
// setTimeout(()=>{
//   var connection=require('./serverdb.js');
//   console.log(connection);
// },2000)


console.log(typeof connection);
module.exports={
// Get all user's data.
getEmployeeData: function(req, res) {
  connection.query("SELECT * FROM employee;", (err, rows) => {
    // () anonymous function passing arguement err and rows
    if (err) {
      throw err;
    }

    console.log("Data received from Db");

    res.send(JSON.stringify(rows));
  });
},

// Get Skill Data from Skill table.
 getSkillsData: function(req, res) {
  connection.query("SELECT * FROM Skill;", (err, rows) => {
    // () anonymous function passing arguement err and rows

    if (err) {
      throw err;
    }

    rows.forEach((item) => {
      console.log(item["Skill_name"]);
    });

    console.log(rows[0]["Skill_name"]);
    console.log("Skills received from Db");

    res.end(JSON.stringify(rows));
  });
},

//Get User's data by passing parameter which would have sublestring from his name
searchData: function(req, res) {
  const nameparam = req.params.name;
  connection.query(
    `Select employee.Emp_id, employee.Firstname, employee.Lastname, employee.Email, employee.Phoneno,employee.DOB, employee.Address,
      employee.City,employee.State, employee.Country, GROUP_CONCAT(  skill.skill_name separator '|') AS 'Skills' from employee 
      left join skill_emp ON employee.Emp_id = skill_emp.Emp_id left join skill ON skill_emp.Skill_id = skill.Skill_id 
      where  employee.Firstname LIKE "%${nameparam}%" OR employee.Lastname LIKE "%${nameparam}%" OR employee.Email LIKE "%${nameparam}%" 
      OR employee.Phoneno LIKE "%${nameparam}%" OR employee.DOB LIKE "%${nameparam}%" OR employee.Address LIKE "%${nameparam}%" 
      OR employee.City LIKE "%${nameparam}%" OR employee.State LIKE "%${nameparam}%" 
      OR skill.skill_name LIKE "%${nameparam}%" group by Emp_id;`,
    (err, rows) => {
      // () anonymous function passing arguement err and rows

      if (err) {
        throw err;
      }

      console.log("Data received from Db");

      res.end(JSON.stringify(rows));
    }
  );
},

//Insert User's Data on Form Submission.
addData: function(req, res) {
  connection.query(
    `INSERT into employee (Firstname,Lastname,email,DOB,Phoneno,Address,City,State,Country,Gender)
      values ('${req.body.username}','${req.body.lname}','${req.body.email}','${req.body.dob}','${req.body.phone}',
      '${req.body.add}','${req.body.city}','${req.body.state}','${req.body.country}',
      '${req.body.gender}');`,
    (err, result) => {
      // () anonymous function passing arguement err and rows

      if (err) {
        throw err;
      }
      console.log(result);

      id = result["insertId"];
      console.log(id);

      // console.log(req.body.Skills)

      req.body.Skills.forEach((item) => {
        skill_emp(id, item);
      });

      res.send(result);
      // skill_emp(result['insertId'])
    }
  );
},


// Insert Skill's of employee in Skill-Employee Relational Table.
skill_emp: function(id, skill_id) {
  connection.query(
    `INSERT into Skill_Emp (Emp_id,Skill_id) values (${id},${skill_id});`,
    (err, result) => {
      // () anonymous function passing arguement err and rows
      if (err) {
        throw err;
      }
      console.log("Skill ID: "+skill_id+" inserted of employee-"+id);
      // skill_emp(result['insertId'])
    }
  );
},

// Get user's data to prefill the form.
prefillData: function(req, res) {
  const empid = req.params.id;
  connection.query(
    `Select employee.Emp_id, employee.Firstname, employee.Lastname, employee.Email, employee.Phoneno,employee.DOB, employee.Gender, employee.Address,
        employee.City,employee.State, employee.Country, GROUP_CONCAT( skill.skill_name separator '|') AS 'Skills' from employee 
        left join skill_emp ON employee.Emp_id = skill_emp.Emp_id left join skill ON skill_emp.Skill_id = skill.Skill_id 
        where employee.Emp_id = "${empid}";`,
    (err, rows) => {
      // () anonymous function passing arguement err and rows
      if (err) {
        throw err;
      }
      var date = moment(rows[0]["DOB"]).format("YYYY-MM-DD");
      rows[0]["DOB"] = date;
      const str = rows[0]["Skills"];
      const arr = _.split(str, "|");
      // console.log(arr);
      // rows[0]["Skills"] = [];
      rows[0]["Skills"] = arr;
      console.log(rows);
      console.log("Data received from Db of Employee with  ID: " + empid);

      res.end(JSON.stringify(rows));
    }
  );
},

// Update user's data.
updateData: function(req, res, next) {
  connection.query(
    `update employee set Firstname='${req.body.username}', Lastname='${req.body.lname}',
      Email='${req.body.email}', DOB='${req.body.dob}', Phoneno='${req.body.phone}', Address='${req.body.add}', 
      City='${req.body.city}',State='${req.body.state}',Country='${req.body.country}', Gender='${req.body.gender}' where Emp_id='${req.body.id}';`,
    (err, result) => {
      if (err) {
        throw err;
      }

      const id = req.body.id;
      console.log("Data Updated");

      const skills = req.body.Skills;
      skillinsertion(skills, id);

      console.log("Skill Data Updated");
      res.send(result);
      next(); //hello Call-back function called
    }
  );
},

//hello function to check calling extra callback function
hello: function(req,res) {
  console.log("hello");
  // res.send("Hello");
},

// Check's for data to be inserted is already present or not(If not call's for insertion of Skill for an employee and call's for deletion of previous skills).
skillinsertion: function(skillids, id) {
  connection.query(
    `select Skill_id from skill_emp where Emp_id='${id}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }

      const arr = [];
      rows.forEach((item) => {
        arr.push(item["Skill_id"]);
      });
      console.log(arr);

      const newarr = [];
      skillids.forEach((item) => {
        newarr.push(parseInt(item));
      });
      console.log(newarr);

      const atodel = _.difference(arr, newarr);
      const atoins = _.difference(newarr, arr);

      if (atodel && atodel.length > 0) {
        atodel.forEach((item) => {
          deleteSkillForUser(id, item);
        });
      }

      if (atoins && atoins.length > 0) {
        atoins.forEach((item) => {
          skill_emp(id, item);
        });
      }
    }
  );
},

// Delete's User's old Skills.
deleteSkillForUser: function(id, skill_id) {
  connection.query(
    `delete from skill_emp where Emp_id=${id} and Skill_id=${skill_id};`,
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log("Deleted Skill " + skill_id + " of employee " + id);
    }
  );
},

// Check app listening or not?
 listen: function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Running!");
}
};
// export {getEmployeeData,getSkillsData,searchData,addData,skill_emp,prefillData,updateData,hello,skillinsertion,deleteSkillForUser,listen};