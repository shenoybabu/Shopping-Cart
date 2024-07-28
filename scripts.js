let cart = {};

function addToCart(productId) {
    const productElement = document.querySelector(.product[data-id="${productId}"]);
    const cartCountElement = document.getElementById('cart-count');
    const button = productElement.querySelector('button');

    if (!cart[productId]) {
        cart[productId] = {
            id: productId,
            name: productElement.querySelector('h4').innerText,
            price: parseFloat(productElement.querySelector('p').innerText.replace('$', '')),
            quantity: 1
        };
    } else {
        cart[productId].quantity += 1;
    }

    cartCountElement.innerText = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    button.disabled = true;
}

function renderCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalCostElement = document.getElementById('total-cost');

    cartItemsElement.innerHTML = '';
    let totalItems = 0;
    let totalCost = 0;

    Object.values(cart).forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="images/plant${item.id}.jpg" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="updateQuantity(${item.id}, 1)">Increase</button>
            <button onclick="updateQuantity(${item.id}, -1)">Decrease</button>
            <button onclick="removeFromCart(${item.id})">Delete</button>
        `;
        cartItemsElement.appendChild(cartItemElement);

        totalItems += item.quantity;
        totalCost += item.price * item.quantity;
    });

    totalItemsElement.innerText = totalItems;
    totalCostElement.innerText = totalCost.toFixed(2);
}

function updateQuantity(productId, delta) {
    if (cart[productId]) {
        cart[productId].quantity += delta;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        renderCart();
    }
}

function removeFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        renderCart();
    }
}

function checkout() {
    alert('Coming Soon');
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});