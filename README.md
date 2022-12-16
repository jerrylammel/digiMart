# digiMart

## Setup:
1. It's very easy to use digiMart as it is a web-based app, what you need to do is to put this URL https://jerrylammel.github.io/digiMart/ into a browswer.

## Technologies used in building the digiMart
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Font Awesome

## Requirements and how they have been met:
### Requirements
Create a simple shopping cart as a web app. You may use JavaScript
libraries but they are not a requirement, HTML/CSS and Vanilla JS are
sufficient.  

This app should satisfy the following minimum requirements:  

1. Have a pre-populated (hard coded) array of objects as products.
2. Your product display should have (not limited to) product image,
product name, product price
3. All products should be displayed when the page loads
4. Using an ‘add to cart’ button, the user should be able to add the
products to a shopping cart list
5. The shopping cart lists all products and displays a the total price  

### Stretch Goals
6. The user should also be able to delete the products from the cart, thus
modifying the total price of the cart
7. The user should be able to enter a quantity for each product  

## Implementation

### Overview

All shopping cart relevant functions are added into a class as an individual JS module.
Information of products in the shopping cart is managed as an defined object, which is stored in localStorage as part of the shopping list.
Product items added into the shopping cart will be loaded when the digiMart lanuch.
Users can add a product into the shopping cart as many times as they want and quantity and total price of that product will be accumulated and updated.

### Details:
1. Products are pre-populated. I hard coded HTML elements in the index.html file.
2. To display products for the user to choose from, I use card component in Bootstrap when I hard coded HTML elements for products.
3. With hard coded HTML elements for products, for sure they will be displaed when the page loads.
4. In every card for products, there is a button element. When users click on the button, an event handler will be called, which will add the product into the shopping cart.
5. When a product added into the shopping cart, it's price and quantity will be included. The total price of items in the shopping list will be calculated and updated into the shopping cart.
6. A Remove button is added for each item in the shopping cart. When users click on the Remove button, it's event handler will take this item off the shopping list and update the total price of items in the cart.
7. Users can enter a quantity for a product before they add the product into the shopping cart. Also, users can change the quanity of a product in the shopping list. To enable this, an input in type of number is added into cards of products, as well as in the quantity sections of a product in the shopping list.

## Pending
1. Add "," and decimal in currency strings
2. Responsive to wide range of screen size
3. Stock more products