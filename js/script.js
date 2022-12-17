import { CartManager } from './cart.js';

fetch("../json/products.json")
    .then((data) => data.json())
    .then(products => {
        products.map((product) => {
            document.getElementById("card-list").innerHTML += 
            `<div id="${product.id}" class="col mb-4">
                <div class="card text-center shadow border-2">
                    <img src="${product.imgSrc}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <h6 class="card-subtitle mb-2" id="${product.price}"><small>$ ${product.price}</small></h6>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item ps-0 pe-0">
                                <input type="number" id="${product.id}-quantity" value="1" min="1">
                            </li>
                            <li class="list-group-item ps-0 pe-0">
                                <button id="${product.id}-addtocart}" onclick="addToCart(event)" class="add-to-cart-button">Add to cart</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
        })
    });

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
    // get digimart02 from id digimart02-addtocart
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
        const updatedProductObj = myCart.addQuantity(productObj);
        myCart.updateProductHTML(updatedProductObj);
        myCart.updateTotalOfAllItems();
    } else {
        myCart.addProduct(productObj);
        const productHTML = myCart.addProductHTML(productObj);
        myCart.renderProduct(productHTML);
        myCart.updateTotalOfAllItems();
    }

    updateNumberOfItemsInCart(myCart.getNumberOfItems);
}


window.onRemoveProductFromCart = function (event) {
    event.preventDefault();
    // get digimart02 from id digimart02-remove
    const productId = event.target.id.split('-')[0];
    myCart.removeProduct(productId);
    myCart.removepProductHtml(productId);
    myCart.updateTotalOfAllItems();
    updateNumberOfItemsInCart(myCart.getNumberOfItems);
}

window.onUpdateQuantity = function (event) {
    event.preventDefault();

    // digitmart02 from id digimart02--item-quantity
    const productId = event.target.id.split('-')[0];
    const productInCart = myCart.getProduct(productId)[0];
    const quantity = event.target.value;
    const price = new Number(productInCart.price);
    productInCart.quantity = new Number(quantity);
    productInCart.total = quantity * price;
    const updatedProductObj = myCart.updateQuantity(productInCart);
    myCart.updateProductHTML(updatedProductObj);
    myCart.updateTotalOfAllItems();
    updateNumberOfItemsInCart(myCart.getNumberOfItems);
}

window.displayCart = function (event) {
    event.preventDefault();
    const shoppingCart = document.getElementById("cart");
    const style = shoppingCart.getAttribute("style");
    const newStyle = style.includes("display: block;") ? "display: none;" : "display: block;";
    shoppingCart.setAttribute("style", newStyle);
}

window.closeCart = function (event) {
    event.preventDefault();
    const shoppingCart = document.getElementById("cart");
    shoppingCart.setAttribute("style", "display: none;");
}

window.placeOrder = function () {

}

const updateNumberOfItemsInCart = (number) => {
    const itemAmount = document.getElementById("item-amount");
    itemAmount.innerText = number;
}

const myCart = new CartManager('digiMart');
myCart.loadStoredProducts();
const allProductsInCart = myCart.getAllProducts;
myCart.addAllProductsFromLocalStorage(allProductsInCart);
const numberOfItems = myCart.getNumberOfItems;
updateNumberOfItemsInCart(numberOfItems);