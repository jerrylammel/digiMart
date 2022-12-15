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
    productObj.price = productPrice;
    productObj.quantity = quantity;
    productObj.total = productPrice * quantity;

    myCart.addProduct(productObj);
    const productHTML = myCart.addProductHTML(productObj);
    myCart.renderProduct(productHTML);
}


const myCart = new CartManager('digiMart');