class CartManager {
    constructor(user) {
        this._user = user;
        this._products = [];
    }

    get getAllProducts () {
        return this._products;
    }

    getProduct (id) {

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

        productDiv.innerHTML = `<div class="col-4 border border-top-0 border-start-1 border-bottom-1 border-end-0 border-secondary">
                            ${product.name}
                            </div>
                            <div class="col-2 border border-top-0 border-start-1 border-bottom-1 border-end-0 border-secondary">
                            ${product.quantity}
                            </div>
                            <div class="col-2 border border-top-0 border-start-1 border-bottom-1 border-end-0 border-secondary">
                            $${product.price}
                            </div>
                            <div class="col-2 border border-top-0 border-start-1 border-bottom-1 border-end-0 border-secondary">
                            $${product.total}
                            </div>
                            <div class="col-2 border border-top-0 border-start-1 border-bottom-1 border-end-1 border-secondary">
                                <button class="btn-remove" id="${product.id}-remove">Remove</button>
                            </div>`;

        return productDiv;
    }

    renderProduct (productDiv) {
        const shoppingList = document.getElementById("shopping-list");
        const tableTotal = document.getElementById("table-total");
        shoppingList.insertBefore(productDiv, tableTotal);
        // update total price all items
        const totalPrice = this.calculateTotolPrice();
        const priceDiv = document.getElementById('total-price');
        priceDiv.innerHTML = `$ ${totalPrice}`;
    }

    removeProduct(productId) {

    }

    removepProductHtml(productId) {

    }

    loadStoredProducts() {

    }

    addAllProductsFromLocalStorage (allProducts) {
    }
    
}

export { CartManager };