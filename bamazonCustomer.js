const mysql = require("mysql");
//const inquirer = require("inquirer");

//Create connection to sql database for data
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

//Connect to the mysql server and sql database
connection.connect(function (err){
    if(err) throw err;
    start();
})

function start(){
    console.log("initiate start function")
    connection.query("SELECT * FROM products", function(err, results){
        let itemDisplay = [];
        if (err) throw err;
        for (var i=0 ; i < results.length; i++){
            itemDisplay.push(results[i]);
        }
        console.log(itemDisplay);
    })
};