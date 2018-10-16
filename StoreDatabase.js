// JS for Hello Grocery Website. Adds items to cart and creates maps on button clicks
//var shoppinglistinput = ["Tortillas", "Cheese", "Cake"]
var shoppinglistinput = [];

// adds items from user input to shoppinglist
var outputcart = document.getElementById("outputcart");
outputcart.addEventListener('click', function(){
    shoppinglistinput = outputCart();
});

// creating demo map
var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [
      { data: { id: "Entrance" },  
      position: { x: 0, y: 300 }},
      { data: { id: 'Bread' },
      position: { x: 0, y: 200 } },
      { data: { id: 'Cheese' },
      position: { x: 0, y: 100 } },
      { data: { id: 'Milk' },
      position: { x: 0, y: 0 } },
      { data: { id: 'Soup' },
      position: { x: 100, y: 200 } },
      { data: { id: 'Tortillas' },
      position: { x: 100, y: 100 } },
      { data: { id: 'Carrots' },
      position: { x: 100, y: 0 } },
      { data: { id: 'Ice Cream' },
      position: { x: 200, y: 200 } },
      { data: { id: 'Cake' },
      position: { x: 200, y: 100 } },
      { data: { id: 'Sauces' },
      position: { x: 200, y: 0 } },
      { data: { id: 'Checkout' },
      position: { x: 200, y: 300 } },
      ],
      layout: {
        name: 'preset'
      },
      style: [
        {
            selector: 'node',
            style: {
                label: 'data(id)'
  
            }
        },
        {
            selector: 'edge',
            style: {
              'curve-style': 'bezier',
              'width': 4,
              'mid-target-arrow-shape': 'triangle',
              'line-color': '#9dbaea',
              'mid-target-arrow-color': '#000000'
            }
          }],
  });

// Takes items from selectable menu and adds them to list for other functions
function outputCart(){
    var i = 0;
   var selectItems = document.getElementsByName('products')[i].selectedOptions; 
    var out = [];
    for(let options of selectItems){
     out.push(options.value);
   }
    document.getElementsByName('output')[i].value= out.join(", ");
    var allElements = cy.elements();
    var allEdges  = allElements.filter('edge');
    cy.remove(allEdges);
    return out;
}

// calls getDirections function on button click
var directbutton = document.getElementById("directbutton");
directbutton.addEventListener('click', function(){
    getDirections(shoppinglistinput);
});

// Calculates path between locations and adds edges to graph based on path
function getDirections(shoppinglistinput){
class StoreLocation {
    constructor(name, x, y, up, down, right, left) {
      this.x = x;
      this.y = y;
      this.up = up;
      this.down = down;
      this.right = right;
      this.left = left;
    }
  }

// Creating locations and adding their attributes
const Entrance = new StoreLocation;
const Bread = new StoreLocation;
const Cheese = new StoreLocation;
const Milk = new StoreLocation;
const Soup = new StoreLocation;
const Tortillas = new StoreLocation;
const Carrots = new StoreLocation;
const IceCream = new StoreLocation;
const Cake = new StoreLocation;
const Sauces = new StoreLocation;
const Checkout = new StoreLocation;

Entrance.name = "Entrance";
Entrance.x = 0;
Entrance.y = 0;
Entrance.up = Bread;
Entrance.down = "NULL";
Entrance.right = "NULL";
Entrance.left = "NULL";

Bread.name = "Bread";
Bread.x = 0;
Bread.y = 1;
Bread.up = Cheese;
Bread.down = Entrance;
Bread.right = Soup;
Bread.left = "NULL";

Cheese.name = "Cheese";
Cheese.x = 0;
Cheese.y = 2;
Cheese.up = Milk;
Cheese.down = Bread;
Cheese.right = "NULL"
Cheese.left = "NULL";

Milk.name = "Milk";
Milk.x = 0;
Milk.y = 3;
Milk.up = "NULL";
Milk.down = Cheese;
Milk.right = Carrots;
Milk.left = "NULL";

Soup.name = "Soup";
Soup.x = 1;
Soup.y = 1;
Soup.up = Tortillas;
Soup.down = "NULL";
Soup.right = IceCream;
Soup.left = Bread;

Tortillas.name = "Tortillas";
Tortillas.x = 1;
Tortillas.y = 2;
Tortillas.up = Carrots;
Tortillas.down = Soup;
Tortillas.right = "NULL";
Tortillas.left = "NULL";

Carrots.name = "Carrots";
Carrots.x = 1;
Carrots.y = 3;
Carrots.up = "NULL";
Carrots.down = Tortillas;
Carrots.right = Sauces;
Carrots.left = Milk;

IceCream.name = "Ice Cream";
IceCream.x = 2;
IceCream.y = 1;
IceCream.up = Cake;
IceCream.down = Checkout;
IceCream.right = "NULL";
IceCream.left = Soup;

Cake.name = "Cake";
Cake.x = 2;
Cake.y = 2;
Cake.up = Sauces;
Cake.down = IceCream;
Cake.right = "NULL";
Cake.left = "NULL";

Sauces.name = "Sauces";
Sauces.x = 2;
Sauces.y = 3;
Sauces.up = "NULL";
Sauces.down = Cake;
Sauces.right = "NULL";
Sauces.left = Carrots;

Checkout.name = "Checkout";
Checkout.x = 2;
Checkout.y = 0;
Checkout.up = IceCream;
Checkout.down = "NULL";
Checkout.right = "NULL";
Checkout.left = "NULL";


const locations = [Entrance, Bread, Cheese, Milk, Soup, Tortillas, Carrots, IceCream, Cake, Sauces, Checkout]
var shoppinglist = []
// turning the input from the drop down into list of locations we need to go to

for (var x = 0; x<locations.length; x++){
    if (shoppinglistinput.includes(locations[x].name)){
    shoppinglist.push(locations[x])
    console.log(locations[x].name)
    }
}

// optional text content. Can replace the map or be used for test function.
// comment out edge creating lines and un-comment text creation lines
const Directions = document.getElementById("Directions");
Directions.textContent = "";

// calculating location 
var distance = 0;
var currentlocation = Entrance;
var shortestd = 10000;
var targetlocation = Entrance;
var currentid = 1;


// making instructions until shopping list is empty
while (shoppinglist.length > 0){
    
    // if there is only one thing in shoppinglist, dont calculate distance
    if (shoppinglist.length == 1){
        console.log("only one thing left in the list")
        targetlocation = shoppinglist[0];
        console.log("headed to: ", targetlocation.name)
        console.log("are they equal:", currentlocation.name == targetlocation.name)

var directionstring = ""
var currentx = currentlocation.x
var currenty = currentlocation.y
 while (currentlocation != targetlocation){
     // move one to the right
     if (currentx < targetlocation.x && currentlocation.right != "NULL"){
        currentx = currentx + 1;
        // immediately below are optional text instructions. test function will not operate properly while they are commented out
        //directionstring = "Go from: " + currentlocation.name + " right to: " + currentlocation.right.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;

        // all cy.add lines are adding edges to the graph. comment them out if you wish to use text based instructions
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.right.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.right;
     } 
     // or move one to the left
     else if (currentx > targetlocation.x && currentlocation.left != "NULL") {
        currentx = currentx - 1;
        //directionstring = "Go from: " + currentlocation.name + " left to: " + currentlocation.left.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.left.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.left;

        // if in the middle of the isle and cant go left or right
     } else if (currentx != targetlocation.x && currentlocation.left == "NULL" && currentlocation.right == "NULL"){
        // check up and down
        // move up one
        if (currentlocation.up != "NULL"){
            currenty = currenty + 1;
            //directionstring = "Go from: " + currentlocation.name + " up to: " + currentlocation.up.name + "\r\n";
            //Directions.textContent = Directions.textContent + directionstring;
            cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.up.name}}]);
            currentid = currentid + 1;
            currentlocation = currentlocation.up;
         } 
         // or move down one
         else if (currentlocation.down != "NULL") {
            currenty = currenty - 1;
            //directionstring = "Go from: " + currentlocation.name + " down to: " + currentlocation.down.name + "\r\n";
            //Directions.textContent = Directions.textContent + directionstring;
            cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.down.name}}]);
            currentid = currentid + 1;
            currentlocation = currentlocation.down;
     }
     // if in correct x position and need to move up or down
 } else if (currentx == targetlocation.x){
    if (currenty < targetlocation.y && currentlocation.up != "NULL"){
        currenty = currenty + 1;
        //directionstring = "Go from: " + currentlocation.name + " up to: " + currentlocation.up.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.up.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.up;
     } 
     // or move one to the left
     else if (currenty > targetlocation.y && currentlocation.down != "NULL") {
        currenty = currenty - 1;
        //directionstring = "Go from: " + currentlocation.name + " down to: " + currentlocation.down.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.down.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.down;
 }

 }
if (currentlocation == targetlocation){
    console.log("we got there!");
    //directionstring = "We've reached " + currentlocation.name + "!\r\n";
    //Directions.textContent = Directions.textContent + directionstring;
    shoppinglist = shoppinglist.filter(function(e) { return e != targetlocation })
}
}

    } 
    
    
    
    // otherwise, first calculate distances for all possible locations
    else {
        shortestd = 10000;
    for (var x = 0; x < shoppinglist.length; x++){
        console.log("current x : ", currentlocation.x, "current y: ", currentlocation.y, "item: ", shoppinglist[x].name, "item x: ", shoppinglist[x].x, "item y: ", shoppinglist[x].y)
        var a = Math.abs(currentlocation.x - shoppinglist[x].x);
        console.log("a is: ", a);
        var b = Math.abs(currentlocation.y - shoppinglist[x].y);
        console.log("b is: ", b);
        var distance = b + a;
    console.log("distance for ", shoppinglist[x].name, "is: ", distance);
    if (distance < shortestd){
        shortestd = distance;
        targetlocation = shoppinglist[x];
    } 
    }
    console.log("we picked the shortest distance was to: ", targetlocation.name);
// whichever distance is shortest, figure out best path to that target location
var directionstring = ""
var currentx = currentlocation.x
var currenty = currentlocation.y
 while (currentlocation != targetlocation){
     // move one to the right
     if (currentx < targetlocation.x && currentlocation.right != "NULL"){
        currentx = currentx + 1;
        //directionstring = "Go from: " + currentlocation.name + " right to: " + currentlocation.right.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.right.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.right;
     } 
     // or move one to the left
     else if (currentx > targetlocation.x && currentlocation.left != "NULL") {
        currentx = currentx - 1;
        //directionstring = "Go from: " + currentlocation.name + " left to: " + currentlocation.left.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.left.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.left;
        // if in the middle of the isle and cant go left or right
     } else if (currentx != targetlocation.x && currentlocation.left == "NULL" && currentlocation.right == "NULL"){
        // check up and down
        // move up one
        if (currentlocation.up != "NULL"){
            currenty = currenty + 1;
            //directionstring = "Go from: " + currentlocation.name + " up to: " + currentlocation.up.name + "\r\n";
            //Directions.textContent = Directions.textContent + directionstring;
            cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.up.name}}]);
            currentid = currentid + 1;
            currentlocation = currentlocation.up;
         } 
         // or move down one
         else if (currentlocation.down != "NULL") {
            currenty = currenty - 1;
            //directionstring = "Go from: " + currentlocation.name + " down to: " + currentlocation.down.name + "\r\n";
            //Directions.textContent = Directions.textContent + directionstring;
            cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.down.name}}]);
            currentid = currentid + 1;
            currentlocation = currentlocation.down;
     }
 } else if (currentx == targetlocation.x){
    if (currenty < targetlocation.y && currentlocation.up != "NULL"){
        currenty = currenty + 1;
        //directionstring = "Go from: " + currentlocation.name + " up to: " + currentlocation.up.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.up.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.up;
     } 
     // or move one to the left
     else if (currenty > targetlocation.y && currentlocation.down != "NULL") {
        currenty = currenty - 1;
        //directionstring = "Go from: " + currentlocation.name + " down to: " + currentlocation.down.name + "\r\n";
        //Directions.textContent = Directions.textContent + directionstring;
        cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.down.name}}]);
        currentid = currentid + 1;
        currentlocation = currentlocation.down;
 }

 }
if (currentlocation == targetlocation){
    console.log("we got there!")
    //directionstring = "We've reached " + currentlocation.name + "!\r\n";
    //Directions.textContent = Directions.textContent + directionstring;
    shoppinglist = shoppinglist.filter(function(e) { return e != targetlocation })
}
console.log("now that we reached our destination, our shopping list is: ", shoppinglist);

}
    }
}




console.log("we got all our shopping!")
console.log("now let's go checkout")
//directionstring = "We got all our items! Now let's go to the checkout.\r\n";
//Directions.textContent = Directions.textContent + directionstring;
var directionstring = "";
var currentx = currentlocation.x;
var currenty = currentlocation.y;
targetlocation = Checkout;
console.log(currentlocation.name);
console.log("currentx is: ", currentx);
console.log("currenty is: ", currenty);
console.log("Checkout x is: ", Checkout.x);
console.log("Checkout y is: ", Checkout.y);
console.log(currentlocation.right)
console.log(currentlocation == Checkout)
while (currentlocation != Checkout){
    // move one to the right
    if (currentx < targetlocation.x && currentlocation.right != "NULL"){
       currentx = currentx + 1;
       console.log("moving right");
       //directionstring = "Go from: " + currentlocation.name + " right to: " + currentlocation.right.name + "\r\n";
       //Directions.textContent = Directions.textContent + directionstring;
       cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.right.name}}]);
        currentid = currentid + 1;
       currentlocation = currentlocation.right;
    } 
    // or move one to the left
    else if (currentx > targetlocation.x && currentlocation.left != "NULL") {
       currentx = currentx - 1;
       console.log("moving left");
       //directionstring = "Go from: " + currentlocation.name + " left to: " + currentlocation.left.name + "\r\n";
       //Directions.textContent = Directions.textContent + directionstring;
       cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.left.name}}]);
        currentid = currentid + 1;
       currentlocation = currentlocation.left;
       // if in the middle of the isle and cant go left or right
    } else if (currentx != targetlocation.x && currentlocation.left == "NULL" && currentlocation.right == "NULL"){
       // check up and down
       // move up one
       console.log("in the middle of an isle");
       if (currentlocation.down != "NULL"){
           currenty = currenty - 1;
           //directionstring = "Go from: " + currentlocation.name + " up to: " + currentlocation.up.name + "\r\n";
           //Directions.textContent = Directions.textContent + directionstring;
           cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.down.name}}]);
            currentid = currentid + 1;
           currentlocation = currentlocation.down;
        } 
        // or move one to the left
        else if (currentlocation.up != "NULL") {
           currenty = currenty + 1;
           //directionstring = "Go from: " + currentlocation.name + " down to: " + currentlocation.down.name + "\r\n";
           //Directions.textContent = Directions.textContent + directionstring;
           cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.up.name}}]);
            currentid = currentid + 1;
           currentlocation = currentlocation.up;
    }
    // if in correct x position and need to move up or down
} else if (currentx == targetlocation.x){
    console.log("got the right x, just need to move up and down");
   if (currenty > targetlocation.y && currentlocation.down != "NULL"){
       currenty = currenty - 1;
       //directionstring = "Go from: " + currentlocation.name + " up to: " + currentlocation.up.name + "\r\n";
       //Directions.textContent = Directions.textContent + directionstring;
       cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.down.name}}]);
       currentid = currentid + 1;
       currentlocation = currentlocation.down;
    } 
    // or move one to the left
    else if (currenty < targetlocation.y && currentlocation.up != "NULL") {
       currenty = currenty + 1;
       //directionstring = "Go from: " + currentlocation.name + " down to: " + currentlocation.down.name + "\r\n";
       //Directions.textContent = Directions.textContent + directionstring;
       cy.add([{group: "edges", data: {id: currentid, source: currentlocation.name, target: currentlocation.up.name}}]);
        currentid = currentid + 1;
       currentlocation = currentlocation.up;
}

}
if (currentlocation == Checkout){
   console.log("At the checkout!")
   //directionstring = "We've reached the Checkout!\r\n";
   // Directions.textContent = Directions.textContent + directionstring;
}
}
}


// function to test algorithm is creating the correct path.
// Call from console

// ###############################################################################
// WILL NOT FUNCTION CORRECTLY UNLESS TEXT DIRECTIONS LINES HAVE BEEN UN-COMMENTED
// ###############################################################################
function testDirections1(){
    lyst = ["Tortillas", "Cheese", "Cake"];
    getDirections(lyst);
    const testtext = "Go from: Entrance up to: Bread\r\nGo from: Bread up to: Cheese\r\nWe've reached Cheese!\r\nGo from: Cheese up to: Milk\r\nGo from: Milk right to: Carrots\r\nGo from: Carrots down to: Tortillas\r\nWe've reached Tortillas!\r\nGo from: Tortillas up to: Carrots\r\nGo from: Carrots right to: Sauces\r\nGo from: Sauces down to: Cake\r\nWe've reached Cake!\r\nWe got all our items! Now let's go to the checkout.\r\nGo from: Cake down to: Ice Cream\r\nGo from: Ice Cream down to: Checkout\r\nWe've reached the Checkout!"
    const comparetext = Directions.textContent;
    console.log(testtext);
    console.log(comparetext);
    if (comparetext.trim() === testtext.trim()){
        console.log("Success!");
        return;
    } else {
        console.log("Your shopping trip suuuuuuucked");
        return;
    }
}
