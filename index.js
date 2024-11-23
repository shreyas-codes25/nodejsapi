const express = require("express");
const bodyParser = require("body-parser")
var mysql = require('mysql');




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database :"nodejsapi"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// New app using express module
const app = express();

app.use(bodyParser.json()); // for JSON data
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/",
    function (req, res) {
        res.sendFile(
            __dirname + "/index.html"
        );
    });

app.post("/",
    function (req, res) {
        res.setHeader('Content-Type', 'application/form-data');
        const {firstName, lastName, email, password} = req.body;
        console.log(req.body);
    //     console.log(res.body);
    //    const firstName = req.body.firstName;
    //    let lastName = req.body.lastName;
    //    let email = req.body.email;
    //    let password = req.body.password;

       console.log(firstName);
       console.log(lastName);
       console.log(email);
       console.log(password);

       var sql = "INSERT INTO user VALUES (?,?,?,?)";
       var values = [firstName, lastName, email, password];
       con.query(sql,values, function (err, result) {
         if (err) {console.log(err)}
         else{
         console.log("1 record inserted");
        }
       });

       res.send(
           "First Name: " + firstName + "<br>" +
           "Last Name: " + lastName + "<br>" +
           "Email: " + email + "<br>" +
           "Password: " + password
       );
        
    });

app.listen(3000, function () {
    console.log(
        "server is running on port 3000"
    );
})