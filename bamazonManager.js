const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

//Create connection to sql database for data
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

//Connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to the bamazon Managers portal!")
    console.log("Which task would you like to complete?")
    //run function to display tasks
})

//Display tasks function using inquirer
    // Case Switch If ____ task if selected, run ____ function

//View Products for Sale
    //List items

//View Low Inventory
    //List items with inventory amount less than 5

//Add to Inventory
    //prompt to add more to any item already in stock
    //Call function that adds item to that stock

//Add new Product
    //prompt for info on new item to add.
    //call function that adds that item.
