const express = require('express');
const app = express();
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


// 1. Be Polite, Greet the User

app.get('/greetings/:user', (req, res) => {
    res.send(`<h1>Greetings, ${req.params.user}</h1>`);
    });
    // :user is dynamic, so you can change it in the URL


// 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    // after this point I had to look stuff up because it's not in our lecture notes
    const { number } = req.params;      
    if (isNaN(number)) { // if 'number' is 'Nan' (not a number),
        return res.send('You must specify a number.'); // show this string
        }  
    const maxNumber = parseInt(number); // convert number to an integer
    const randomRoll = Math.floor(Math.random() * (number)); // roll a random number
        res.send(`You rolled a ${randomRoll}.`);
      });    
    // done lookin stuff up for NOW


// 3. I Want THAT One!

app.get('/collectibles/:index', (req, res) => { // Cora helped with this one
    const index = req.params.index;
    const item = collectibles[index]
    if (index < 0 || index > collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

// 4. Filter Shoes by Query Parameters

app.get('/shoes', (req, res) => { // Jonas and chatGPT helped with this one
// .filter() makes a new array with only elements that meet certain conditions
    const minPrice = req.query['min-price']; // create variables for prices in array
    const maxPrice = req.query['max-price'];
    const type = req.query.type; // create variable for types in array
    let filteredShoes = shoes;
    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    res.send(filteredShoes);
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
