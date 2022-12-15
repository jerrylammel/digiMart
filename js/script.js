import { CartManager } from './cart.js';

const createProductObj = (id) => {
    return {
        id: id,
        imgSrc: "",
        name: "",
        price: 0,
        quantity: 0,
        total: 0
    }
};

window.addToCart = function (event) {
    event.preventDefault();
    // get digimark02 from id digimark02-addtocart
    const productId = event.target.id.split('-')[0];
    const productObj = createProductObj(productId);
    const imgSrc = document.querySelector(`#${productId} img`).getAttribute('src');
    const productName = document.querySelector(`#${productId} .card-title`).innerText;
    const productPrice = document.querySelector(`#${productId} .card-subtitle`).getAttribute('id');
    const quantity = document.getElementById(`${productId}-quantity`).value;

    productObj.id = productId;
    productObj.imgSrc = imgSrc;
    productObj.name = productName;
    productObj.price = new Number(productPrice);
    productObj.quantity = new Number(quantity);
    productObj.total = productObj.price * productObj.quantity;

    const productInCart = myCart.getProduct(productObj.id);
    if (productInCart.length !== 0) {
        // same product is in shopping cart, upate quantity and totol price
        const updatedProductObj = myCart.updateQuantityAndTotalPrice(productObj);
        myCart.updateProductHTML(updatedProductObj);
        myCart.updateTotalOfAllItems();
    } else {
        myCart.addProduct(productObj);
        const productHTML = myCart.addProductHTML(productObj);
        myCart.renderProduct(productHTML);
        myCart.updateTotalOfAllItems();
    }
}

const myCart = new CartManager('digiMart');
myCart.loadStoredProducts();
const allProductsInCart = myCart.getAllProducts;
myCart.addAllProductsFromLocalStorage(allProductsInCart);