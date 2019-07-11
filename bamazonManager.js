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
    displayTasks();
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
                    restockInventoryDisplay();
                    break;
                case 'Add New Product':
                    addNewProductQuestions();
                    break;
            }

        })
}

//View Products for Sale
function viewProducts() {
    console.log("View Products Initiated");
    //List each of the items in a table
    let query = "SELECT * FROM products";
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
    })
    displayTasks();
}

//View Low Inventory
function viewLowInventory() {
    console.log("View Low Inventory Initiated");
    //List items with inventory amount less than 5
    let query = "SELECT * FROM products WHERE stock <= 5";
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
    })
    displayTasks();
}

//Add to Inventory
function restockInventoryDisplay() {
    console.log("Restock Inventory Initiated");
    //List each of the items in a table
    let query = "SELECT * FROM products";
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
    });
    restockInventoryQuestions();
};

function restockInventoryQuestions() {
    //prompt to add more to any item already in stock
    inquirer
        .prompt([{
                name: "ID",
                type: "input",
                message: "Which item would you like to restock? Enter the item ID: "
            },
            {
                name: "QUANTITY",
                type: "input",
                message: "How many would you like to add?"
            }
        ])
        //Call function that adds item to that stock
        .then(function (answer) {
            let itemID = answer.ID;
            let itemQuantity = answer.QUANTITY;
            restock(itemID, itemQuantity);
        })
}

function restock(id, quantity) {
    connection.query("UPDATE products SET stock = stock + " + quantity + " WHERE id = " + id);
    console.log("Item " + id + " restocked!");
    displayTasks();
}


//Add new Product
//prompt for info on new item to add.
function addNewProductQuestions() {
    console.log("Add New Product Initiated");
    inquirer
        .prompt([{
                name: "ID",
                type: "input",
                message: "Create new 4 digit ID: "
            },
            {
                name: "NAME",
                type: "input",
                message: "What is the name of the product? "
            },
            {
                name: "DEPARTMENT",
                type: "input",
                message: "Which Department is it located in? "
            },
            {
                name: "PRICE",
                type: "input",
                message: "What is the price? "
            },
            {
                name: "QUANTITY",
                type: "input",
                message: "How many would you like to add?"
            }
        ])
        .then(function (answer) {
            let itemID = answer.ID;
            let itemName = answer.NAME;
            let itemDpt = answer.DEPARTMENT;
            let itemPrice = answer.PRICE;
            let itemQty = answer.QUANTITY;
            //Call function to add new item
            addNewProduct(itemID, itemName, itemDpt, itemPrice, itemQty);
        })
}

//Function that adds that item.
function addNewProduct(id, name, dpt, price, qty) {
    connection.query('INSERT INTO products (id, name, department, price, stock) VALUES ("' + id + '", "' + name + '", "' + dpt + '",' + price + ',' + qty + ')');
    console.log("Item " + id + " (" + name + ") successfully added!")
    displayTasks();
}

//PROBLEMS:
//console.log's appear before tables? why? setTimeout won't delay...
//Why do I have to hit an arrow to load the prompts?