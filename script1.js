document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing code for adding/deleting items) ...
    
    // Select the checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Add a click listener to the checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Redirect the user to the thank you page
            window.location.href = 'thank-you.html';
        });
    }

    // ... (the rest of your existing code) ...
});