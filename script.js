
const products = [
    { id: 1, name: "Anastasiia Shavshyna in Blue", price: 150, imageUrl: "https://thumbs.dreamstime.com/b/beautiful-fashionable-shoes-women-s-leg-stylish-ladies-accessories-blue-bag-denim-dress-skirt-legs-bags-heels-dresses-101587378.jpg", rating: 4 },
    { id: 2, name: "Solid Hollow Out Dress", price: 100, imageUrl: "https://img.ltwebstatic.com/images3_pi/2023/02/06/16756472529111319890cdbd73305df26e56479d0d_thumbnail_720x_wk_shein.jpg", rating: 3 },
    { id: 3, name: "HERMES ROSE GOLD Kelly", price: 1500000, imageUrl: "https://globalboutique.com/wp-content/uploads/2023/09/featured-expensive-hermes-bags.jpg", rating: 5 }
];

let cart = [];
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-4');
        let starRatingHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < product.rating) {
                starRatingHtml += '<span class="star-rating">&#9733;</span>'; 
            } else {
                starRatingHtml += '<span class="star-rating">&#9734;</span>'; 
            }
        }

        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body text-center">
                    <h2 class="card-title">${product.name}</h2>
                    <p class="card-text">$${product.price}</p>
                    <p class="card-text">Some description about the product...</p>
                    <div class="star-rating-container">${starRatingHtml}</div>
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">Shop Now</button>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });  

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-product-id'));
    const product = products.find(p => p.id === productId);
    
    if (!cart.includes(product)) {
        cart.push(product);
    }
    
    renderCart();
}


function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    renderCart();
}


function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    
    cartItems.innerHTML = ''; 

    let totalAmount = 0;
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.name} - $${product.price}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        removeButton.onclick = () => removeFromCart(product.id);
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);
        totalAmount += product.price;
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
}


renderProducts();
