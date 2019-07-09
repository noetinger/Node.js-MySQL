const mysql = require("mysql");
const inquirer = require("inquirer");

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
    //run Start function
    start();
})

//Start function
function start() {
    console.log("initiate start function")
    //run Display function
    displayItems();
};

function displayItems() {
    let itemDisplay = [];
    //connect to database
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        //display each of the items in stock
        for (var i = 0; i < results.length; i++) {
            itemDisplay.push(results[i]);
        }
        console.log(itemDisplay);
        //run askItem function
        AskItem();
    })
};

//Ask what item ID the customer wants to buy
function AskItem() {
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "Enter item ID for the item you'd like to buy: ",
            // validate: function (value) {
            //     //If the input does not equal a 
            //     if (value !== itemDisplay[i].id) {
            //         console.log("Please enter a valid ID");
            //         AskItem();
            //     };
            // }
        }])
        .then(function (answer) {
            console.log("AskItem function complete!")
        })
};

//Ask how many of the item the customer wants to buy
function howMany() {
    
};