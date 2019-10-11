var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "dbuser2",
  password: "dbuser2",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //runSearch();
  listProduct();
});

function listProduct() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i]);
    }
    gatherInfo();
  });
}

function gatherInfo() {
  inquirer
    .prompt({
      name: "idChoice",
      type: "number",
      message: "Please select the id of the item you would like to buy.",
      choices: [
        1,2,3,4,5,6,7,8,9,10
      ]
    })
    .then(function(answer) {
      gatherQuantity(answer.idChoice);
    })
  };



function gatherQuantity(id) {
  inquirer
    .prompt({
      name: "quantity",
      type: "number",
      message: "How many would you like to buy?"
    })
    .then(function(answer) {
      var query = "SELECT stock_quantity FROM products WHERE item_id = " + id;
      //console.log(query);
      //console.log(id);
      connection.query(query, function(err, res) {
        //console.log(res[0].stock_quantity + "" + answer.quantity)
        if(res[0].stock_quantity < answer.quantity) {
          console.log(`Insufficient quantity!`);
          gatherInfo();
        }
        else{
          var quantityToReduce = res[0].stock_quantity - answer.quantity;
          reduceQuantity(quantityToReduce, id, answer.quantity);
        }
      });
    });
}

function reduceQuantity(quantityToReduce, id, quanPurchased) {
  var query = "UPDATE products SET stock_quantity = "+ quantityToReduce +" WHERE item_id = " + id;
  connection.query(query, function(err, res) {
    console.log("Stock has been updated to reflect recent purchases.")
    valueOfPurchase(quanPurchased, id);
  });
}

  function valueOfPurchase(quantityPurchased, id) {
    var query = "SELECT price FROM products WHERE item_id = " + id;
    connection.query(query, function(err, res) {
      console.log(res[0].price + " " + id + " " + quantityPurchased);
      var priceOfPurchase = quantityPurchased * res[0].price;
        console.log("Thank you for your purchase.  You have been charged for $" + priceOfPurchase);
        gatherInfo();
      })     
  }


