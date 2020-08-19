

// SELECTING ALL TEXT ELEMENTS
// var vform = document.getElementById('vform');

var username = document.forms['vform']['username'];
var lname = document.forms['vform']['lname'];
var dob = document.forms['vform']['dob'];
var gender = document.forms['vform']['gender[]'];
var email = document.forms['vform']['email'];
var phone = document.forms['vform']['phone'];
var add = document.forms['vform']['add'];
var skill = document.forms['vform']['skill[]'];
var city = document.forms['vform']['city'];
var state = document.forms['vform']['state'];
var country = document.forms['vform']['country'];

// SELECTING ALL ERROR DISPLAY ELEMENTS
var name_error = document.getElementById('name_error');
var lname_error = document.getElementById('lname_error');
var dob_error = document.getElementById('dob_error');
var email_error = document.getElementById('email_error');
var gender_error = document.getElementById('gender_error');
var phone_error = document.getElementById('phone_error');
var add_error = document.getElementById('add_error');
var skill_error = document.getElementById('skill_error');
var city_error = document.getElementById('city_error');
var state_error = document.getElementById('state_error');
var country_error = document.getElementById('country_error');


// SETTING ALL EVENT LISTENERS
document.getElementById("username_div").addEventListener('blur',usernameValidate,true);
document.getElementById("lname_div").addEventListener('blur',lastnameValidate,true);
document.getElementById("dob_div").addEventListener('blur',DOBValidate,true);
document.getElementById("email_div").addEventListener('blur',emailValidate,true);
document.getElementById("gender_div").addEventListener('click',genderValidate,true);
document.getElementById("phone_div").addEventListener('blur',phonenoValidate,true);
document.getElementById("add_div").addEventListener('blur',addressValidate,true);
document.getElementById("skill_div").addEventListener('click',skillsValidate,true);
document.getElementById("city_div").addEventListener('blur',cityValidate,true);
document.getElementById("state_div").addEventListener('blur',stateValidate,true);
document.getElementById("country_div").addEventListener('blur',countryValidate,true);


// validation function
function Validate() {
usernameValidate();
lastnameValidate();
DOBValidate();
emailValidate();
genderValidate();
phonenoValidate();
addressValidate();
skillsValidate();
cityValidate();
stateValidate();
countryValidate();
if(usernameValidate() && lastnameValidate() && DOBValidate() && emailValidate() && genderValidate() && phonenoValidate() && addressValidate() && 
  skillsValidate() && cityValidate() && stateValidate() && countryValidate()){
  console.log("True")
  return true
}
return false
}


// // event handler functions
function usernameValidate(){
  if((username.value == "") || (username.value.match( /^[a-zA-Z\-]+$/)== null) || (username.value.length < 3)){
    username.style.border = "1px solid red";
    // console.log("hello"+username.value)
    document.getElementById('username_div').style.color = "red";
    name_error.textContent = "Username Should only contain Alphabets and length should be greater than 3";
    username.focus();
    return false
   }
   else{
    username.style.border = "1px solid #5e6e66";
    document.getElementById('username_div').style.color = "#5e6e66";
    name_error.innerHTML = "";
    return true;
  }
}

function lastnameValidate() {
  if ((lname.value == "") || (lname.value.match( /^[a-zA-Z\-]+$/)== null) || (lname.value.length < 3)) {
    lname.style.border = "1px solid red";
    document.getElementById('lname_div').style.color = "red";
    lname_error.textContent = "Lastname invalid";
    lname.focus();
    return false;
  }
  else {
   lname.style.border = "1px solid #5e6e66";
   document.getElementById('lname_div').style.color = "#5e6e66";
   lname_error.innerHTML = "";
   return true;
  }
}

function emailValidate() {
  if ((email.value == "") || (email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)==null)){
    email.style.border = "1px solid red";
    // console.log(!(gender[0].checked || gender[1].checked))
    document.getElementById('email_div').style.color = "red";
    email_error.textContent = "Email is required";
    email.focus();
    return false;
  }
  else{
    email.style.border = "1px solid #5e6e66";
    document.getElementById('email_div').style.color = "#5e6e66";
    email_error.innerHTML = "";
    return true;
  }
}

function DOBValidate() {
  if(dob.value == "") {
    dob.style.border = "1px solid red";
    document.getElementById('dob_div').style.color = "red";
    dob_error.textContent = "DOB invalid";
    dob.focus();
    return false;
  }
  else{
    dob.style.border = "1px solid #5e6e66";
    document.getElementById('dob_div').style.color = "#5e6e66";
    dob_error.innerHTML = "";
    return true;
  }
}

function phonenoValidate() {
  if ((phone.value == "") || (phone.value.match( /^\d{10}$/)== null) || (phone.value.length != 10)) {
    phone.style.border = "1px solid red";
    document.getElementById('phone_div').style.color = "red";
    phone_error.textContent = "Phone Number is invalid";
    phone.focus();
    return false;
  }
  else {
    phone.style.border = "1px solid #5e6e66";
    document.getElementById('phone_div').style.color = "#5e6e66";
    phone_error.innerHTML = "";
    return true;
  }
}

function addressValidate() {
  if (add.value == "") {
    add.style.border = "1px solid red";
    document.getElementById('add_div').style.color = "red";
    add_error.textContent = "Address is required";
    // console.log(skill.checked.length < 3)
    add.focus();
    return false;
  }
 else{
    add.style.border = "1px solid #5e6e66";
    document.getElementById('add_div').style.color = "#5e6e66";
    add_error.innerHTML = "";
    return true;
  }
}

function cityValidate() {
  if (city.value == "") {
    city.style.border = "1px solid red";
  // console.log(!(gender[0].checked || gender[1].checked))
    document.getElementById('city_div').style.color = "red";
    city_error.textContent = "City is required";
    city.focus();
    return false;
  } 

 else {
    city.style.border = "1px solid #5e6e66";
    document.getElementById('city_div').style.color = "#5e6e66";
    city_error.innerHTML = "";
    return true;
  }
}

function stateValidate() {
  if (state.value == "") {
    state.style.border = "1px solid red";
    // console.log(!(gender[0].checked || gender[1].checked))
    document.getElementById('state_div').style.color = "red";
    state_error.textContent = "State is required";
    state.focus();
    return false;
  } 
  else {
    state.style.border = "1px solid #5e6e66";
    document.getElementById('state_div').style.color = "#5e6e66";
    state_error.innerHTML = "";
    return true;
  }
}

function countryValidate() {
  if (country.value == "") {
    country.style.border = "1px solid red";
    // console.log(!(gender[0].checked || gender[1].checked))
    document.getElementById('country_div').style.color = "red";
    country_error.textContent = "Country is required";
    country.focus();
    return false;
  }
  else{
    country.style.border = "1px solid #5e6e66";
    document.getElementById('country_div').style.color = "#5e6e66";
    country_error.innerHTML = "";
    return true;
  }
}

function genderValidate(){
// var things = document.querySelectorAll("[type='radio']");
// for (var i = 0; i < things.length; i++) {
//    things[i].addEventListener("click", function () {
    if (!(gender[0].checked || gender[1].checked)) {
      console.log("error")
    // gender.style.border = "1px solid red";
    document.getElementById('gender_div').style.color = "red";
    gender_error.textContent = "Gender is required";
    // gender.focus();
    return false;
  }
else {
    document.getElementById('gender_div').style.color = "#5e6e66";
    gender_error.innerHTML = "";
      console.log("errorsolve")
    return true;
  }
   // });
  // }
}

function skillsValidate() {
    if (document.querySelectorAll('input[type="checkbox"]:checked').length <= 2) {
    document.getElementById('skill_div').style.color = "red";
    skill_error.textContent = "Minimum 3 Skills are required";
    skill_div.focus();
    return false;
    }
    else{
    document.getElementById('skill_div').style.color = "#5e6e66";
    skill_error.innerHTML = "";
    return true;
  }
}


    //     // window.onload=function(){
    //     var myForm = document.getElementById('vform');
       
    //       event.preventDefault();
    //       var formData = new FormData(myForm),
    //       result = {};


    //       for (var entry of formData.entries())
    //       {
    //         result[entry[0]] = entry[1];
    //       }
    //        result1 = JSON.stringify(result)
    //       // console.log(result);
    //       // document.getElementById("md").innerHTML=result1;
    //         result1=[]
    //  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    //   for (var checkbox of checkboxes) {
    //     // document.body.append(checkbox.value + ' ');
    //     result1.push(checkbox.value)
    //    }
    // // result=JSON.stringify(result);
    // const result2={
    //   ...result,
    //   'Skills':result1[1]
    // }
    // result3=JSON.stringify(result2);
    // document.getElementById("mmd").innerHTML=result3;
    //   console.log(result2);

    //   }

