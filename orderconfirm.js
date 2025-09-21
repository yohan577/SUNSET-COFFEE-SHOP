document.addEventListener('DOMContentLoaded', () => {

    const summaryItemsList = document.getElementById('summary-items-list');
    const summarySubtotalElement = document.getElementById('summary-subtotal');
    const summaryTotalElement = document.getElementById('summary-total');

    // Get cart data from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const shippingFee = 50.00;
    let subtotal = 0;

    // Render items in the summary list
    if (cart.length === 0) {
        summaryItemsList.innerHTML = '<p class="empty-cart-message">No items in your cart.</p>';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>₱${(item.price * item.quantity).toFixed(2)}</span>
            `;
            summaryItemsList.appendChild(listItem);
            subtotal += item.price * item.quantity;
        });
    }

    const total = subtotal + shippingFee;

    // Update the total elements on the page
    summarySubtotalElement.innerText = `₱${subtotal.toFixed(2)}`;
    summaryTotalElement.innerText = `₱${total.toFixed(2)}`;

});