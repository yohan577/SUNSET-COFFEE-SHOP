document.addEventListener('DOMContentLoaded', () => {

    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const addToCartButtons = document.querySelectorAll('.add-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to filter menu items by category
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Show/hide menu items based on category
            menuItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Function to render the cart
    const renderCart = () => {
        cartItemsContainer.innerHTML = ''; // Clear the cart display
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <p class="cart-item-name">${item.name}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus-btn" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus-btn" data-id="${item.id}">+</button>
                        <span class="cart-item-price">₱${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
            });
        }
        
        cartTotalPriceElement.innerText = `₱${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart to local storage
    };

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const id = event.target.dataset.id;
            const name = menuItem.querySelector('h3').innerText;
            const price = parseFloat(menuItem.querySelector('.price').dataset.price);

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            renderCart();
        });
    });

    // Handle quantity changes in the cart
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('quantity-btn')) {
            const id = event.target.dataset.id;
            const item = cart.find(i => i.id === id);
            
            if (event.target.classList.contains('plus-btn')) {
                item.quantity++;
            } else if (event.target.classList.contains('minus-btn')) {
                item.quantity--;
                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }
            }
            renderCart();
        }
    });

    // Redirect to the checkout page when the button is clicked
    checkoutBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        if (cart.length > 0) {
            window.location.href = 'orderconfirm.html';
        } else {
            alert('Your cart is empty. Please add items to proceed to checkout.');
        }
    });

    // Initial render of the cart
    renderCart();
});