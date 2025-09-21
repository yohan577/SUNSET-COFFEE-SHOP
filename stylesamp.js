document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const body = document.body;

    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const isCloseBtn = event.target.closest('.close-btn');

            if (isCloseBtn) {
                // If the close button is clicked, prevent the card from zooming
                event.stopPropagation();
                item.classList.remove('zoomed');
                body.classList.remove('modal-open');
                return;
            }
            
            // Toggle the zoomed state on the clicked item
            const isZoomed = item.classList.contains('zoomed');
            if (isZoomed) {
                item.classList.remove('zoomed');
                body.classList.remove('modal-open');
            } else {
                // Un-zoom any other open cards first
                document.querySelectorAll('.menu-item.zoomed').forEach(openItem => {
                    openItem.classList.remove('zoomed');
                });
                
                // Then, zoom the clicked card and set the body state
                item.classList.add('zoomed');
                body.classList.add('modal-open');
            }
        });
    });

    // Close the modal when clicking outside the zoomed item
    document.addEventListener('click', (event) => {
        const isClickInsideItem = event.target.closest('.menu-item');
        const zoomedItem = document.querySelector('.menu-item.zoomed');

        if (zoomedItem && !isClickInsideItem) {
            zoomedItem.classList.remove('zoomed');
            body.classList.remove('modal-open');
        }
    });
});