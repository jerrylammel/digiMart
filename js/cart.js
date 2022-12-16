class CartManager {
    constructor(user) {
        this._user = user;
        this._products = [];
    }

    get getAllProducts () {
        return this._products;
    }

    get getNumberOfItems () {
        let sum = 0;
        this._products.forEach((product) => {
            sum += product.quantity;
        });

        return sum;
    }

    getProduct (id) {
        return this._products.filter((product) => product.id === id);
    }

    calculateTotolPrice() {
        let sum = 0;
        this._products.forEach((product) => {
            sum += product.total;
        });

        return sum;
    }

    addProduct (product) {
        this._products.push(product);
        const productStr = JSON.stringify(product);
        localStorage.setItem(`${product.id}`, productStr);
    }

    addProductHTML(product) {
        const productDiv = document.createElement('div');
        productDiv.setAttribute('id', `${product.id}-item`);
        productDiv.setAttribute('class', 'row');

        productDiv.innerHTML = `<div class="col-4 border border-0 border-secondary">
                            ${product.name}
                            </div>
                            <div class="col-2 border border-0 border-secondary">
                                <input class="input-item-quantity" id="${product.id}-item-quantity" onchange="onUpdateQuantity(event)" type="number" value="${product.quantity}" min="0">
                            </div>
                            <div class="col-2 border border-0 border-secondary">
                            $${product.price}
                            </div>
                            <div id="${product.id}-item-total" class="col-2 border border-0 border-secondary">
                            $${product.total}
                            </div>
                            <div class="col-2 border border-0 border-secondary">
                                <button class="btn-remove" id="${product.id}-remove" onclick="onRemoveProductFromCart(event)">Remove</button>
                            </div>`;

        return productDiv;
    }

    renderProduct (productDiv) {
        const shoppingList = document.getElementById("shopping-list");
        const tableTotal = document.getElementById("table-total");
        shoppingList.insertBefore(productDiv, tableTotal);
    }

    addQuantity(product) {
        const productToUpdate = localStorage.getItem(`${product.id}`);
        const productObj = JSON.parse(productToUpdate);
        productObj.quantity += product.quantity;
        productObj.total += product.total;
        const productStr = JSON.stringify(productObj);
        localStorage.setItem(`${product.id}`, productStr);

        const index = this._products.findIndex((product) => product.id === productObj.id);
        this._products[index].quantity = productObj.quantity;
        this._products[index].total = productObj.total;

        return productObj;
        
    }

    updateQuantity(product) {
        const productToUpdate = localStorage.getItem(`${product.id}`);
        const productObj = JSON.parse(productToUpdate);
        productObj.quantity = product.quantity;
        productObj.total = product.total;
        const productStr = JSON.stringify(productObj);
        localStorage.setItem(`${product.id}`, productStr);

        const index = this._products.findIndex((product) => product.id === productObj.id);
        this._products[index].quantity = productObj.quantity;
        this._products[index].total = productObj.total;

        return productObj;
    }

    updateProductHTML(product) {
        const itemQuantity = document.getElementById(`${product.id}-item-quantity`);
        itemQuantity.value = product.quantity;
        const itemTotal = document.getElementById(`${product.id}-item-total`);
        itemTotal.innerText = `$${product.total}`;
    }

    updateTotalOfAllItems() {
        // update total price all items
        const totalPrice = this.calculateTotolPrice();
        const priceDiv = document.getElementById('total-price');
        priceDiv.innerHTML = `$ ${totalPrice}`;
    }

    removeProduct(productId) {
        const indexOfProduct = this._products.findIndex((nextProduct) => nextProduct.id === productId);
        if (indexOfProduct === -1) {
            return;
        }

        this._products.splice(indexOfProduct, 1);
        localStorage.removeItem(productId);
    }

    removepProductHtml(productId) {
        const productElement = document.getElementById(`${productId}-item`);
        if (productElement === null) {
            return;
        }

        if (productElement.parentNode) {
            productElement.parentNode.removeChild(productElement);
        } else {
            console.log("something wrong, a product element must have its parent!");
        }
    }

    loadStoredProducts() {
        const regex = /digimart\d+/;
        for (let index = 0; index < localStorage.length; index++) {
            const keyValue = localStorage.key(index); 
            if ((undefined !== keyValue && (null !== keyValue))) {
                if (null !== keyValue.match(regex)) {
                    const storedItem = localStorage.getItem(keyValue);
                    const productObj = JSON.parse(storedItem);
                    this._products.push(productObj);
                }
            }
        }
    }

    addAllProductsFromLocalStorage (allProducts) {
        allProducts.forEach(product => {
            const pHTML = this.addProductHTML(product);
            this.renderProduct(pHTML);
        });  

        this.updateTotalOfAllItems();
    }
    
}

export { CartManager };