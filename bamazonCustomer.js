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
    //run Start function
    console.log("Welcome to bamazon! This is what we have to offer:")
    displayItems();
})

//Display the items in a table
var displayItems = function () {
    //console.log("Display Items function initiated!")
    let query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        let displayItemsTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
            colWidths: [10, 25, 20, 10, 10]
        });
        for (let i = 0; i < res.length; i++) {
            displayItemsTable.push(
                [res[i].id, res[i].name, res[i].department, res[i].price, res[i].stock]
            );
        }
        console.log("*************************************************************************************")
        console.log(displayItemsTable.toString());
        AskItems();
    });
}

//Ask what Items / Quantity the customer wants to buy
function AskItems() {
    //console.log("Ask Items function initiated!")
    inquirer
        .prompt([{
                name: "ID",
                type: "input",
                message: "Enter item ID for the item you'd like to buy:",
            },
            {
                name: "QUANTITY",
                type: "input",
                message: "How many would you like to buy?",
            }
        ])
        .then(function (answer) {
            //console.log("AskItem function .then initiated!")
            let itemID = answer.ID;
            let itemQuantity = answer.QUANTITY;
            buyItems(itemID, itemQuantity);
        })
};

//Purchase the items / check sql database
function buyItems(id, quantity) {
    //console.log("Buy Items Function Initiated!")
    connection.query("SELECT * FROM products WHERE id = " + id, function (err, res) {
        if (err) throw err;
        //console.log(res)
        if (quantity <= res[0].stock) {
            let totalCost = res[0].price * quantity;
            console.log("Your total cost for " + quantity + " " + res[0].name + " is " + totalCost + ".")
            console.log("Thank you for shopping at Bamazon! Have a wonderful day!")
            console.log("\n")
            console.log("\n")
            connection.query("UPDATE products SET stock = stock - " + quantity + " WHERE id = " + id);
        } else {
            console.log("We do not have enough in stock. Please enter a different amount.")
            console.log("\n")
            console.log("\n")
        }
        displayItems();
    });
};