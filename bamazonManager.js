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
function displayTasks() {
    inquirer
        .prompt([{
            name: "action",
            type: "list",
            message: "Choose an option below to manage inventory:",
            choices: ["View Products", "View Low Inventory", "Restock Inventory", "Add New Product"]
        }])
        // Case Switch If ____ task if selected, run ____ function
        .then(function (answer) {
            switch (answer.action) {
                case 'View Products':
                    viewProducts();
                    break;
                case 'View Low Inventory':
                    viewLowInventory();
                    break;
                case 'Restock Inventory':
                    restockInventory();
                    break;
                case 'Add New Product':
                    addNewProduct();
                    break;
            }

        })

}

//View Products for Sale
function viewProducts(){

}
    //List items

//View Low Inventory
function viewLowInventory(){

}
    //List items with inventory amount less than 5

//Add to Inventory
function restockInventory(){

}
    //prompt to add more to any item already in stock
    //Call function that adds item to that stock

//Add new Product
function addNewProduct(){

}
    //prompt for info on new item to add.
    //call function that adds that item.