 // slider js 

var swiper = new Swiper('.mySwiper', {

  loop: true,
  navigation: {
    nextEl: "#previous",
    prevEl: "#next",
  },

});


const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardlist = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartTotal = document.querySelector('.cart-total');
const cartValue = document.querySelector('.cart-value');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');


cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));

closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));

burger.addEventListener('click', () => mobileMenu.classList.toggle('mobile-menu-active'));


let productlist = [];
let cartProduct = [];


const updateTotal = () => {

  let totalPrice = 0;
  let totalQuant = 0;


  document.querySelectorAll('.item').forEach(item => {


    const quantity = parseInt(
      item.querySelector('.qnt-value').textContent
    );


    const price = parseFloat(
      item.querySelector('.item-total').textContent.replace('$', '')
    );


    totalPrice += price;
    totalQuant += quantity;

  });


  cartTotal.textContent = `$ ${totalPrice.toFixed(2)}`;

  cartValue.textContent = totalQuant;

};


const showCard = () => {

  productlist.forEach(product => {

    const orderCard = document.createElement('div');

    orderCard.classList.add('order-card');


    orderCard.innerHTML = `
      <div class="card-image">
        <img src="${product.image}">
      </div>

      <h4>${product.name}</h4>

      <h4 class="price">${product.price}</h4>

      <a href="#" class="btn card-btn">Add to Cart</a>
    `;


    cardlist.appendChild(orderCard);


    const cardBtn = orderCard.querySelector('.card-btn');


    cardBtn.addEventListener('click', (e) => {

      e.preventDefault();

      addToCart(product);

    });

  });

};


const addToCart = (product) => {


  const existingProduct = cartProduct.find(item => item.id === product.id);


  if (existingProduct) {

    alert('Item Already in Your Cart !');

    return;

  }


  cartProduct.push(product);


  let quantity = 1;

  let price = parseFloat(product.price.replace('$', ''));


  const cartItem = document.createElement('div');

  cartItem.classList.add('item');


  cartItem.innerHTML = `
    <div class="img-container">
      <img src="${product.image}">
    </div>


    <div>
      <h4>${product.name}</h4>

      <h4 class="item-total">${product.price}</h4>
    </div>


    <div class="flex">

      <a href="#" class="qnt-btn minus">
        <i class="fa-solid fa-minus"></i>
      </a>


      <h4 class="qnt-value">${quantity}</h4>


      <a href="#" class="qnt-btn plus">
        <i class="fa-solid fa-plus"></i>
      </a>

    </div>
  `;


  cartList.appendChild(cartItem);

  updateTotal();


  const plusBtn = cartItem.querySelector('.plus');

  const minusBtn = cartItem.querySelector('.minus');

  const quantityvalue = cartItem.querySelector('.qnt-value');

  const itmeTotal = cartItem.querySelector('.item-total');


  // Plus Button

  plusBtn.addEventListener('click', (e) => {

    e.preventDefault();

    quantity++;

    quantityvalue.textContent = quantity;

    itmeTotal.textContent = `$${price * quantity}`;

    updateTotal();

  });


  // Minus Button

  minusBtn.addEventListener('click', (e) => {

    e.preventDefault();


    if (quantity > 1) {

      quantity--;

      quantityvalue.textContent = quantity;

      itmeTotal.textContent = `$${price * quantity}`;

      updateTotal();

    }

    else {

      cartItem.remove();

      cartProduct = cartProduct.filter(item => item.id !== product.id);

      updateTotal();

    }

  });

};


const initApp = () => {

  fetch('product.json')

    .then(response => response.json())

    .then(data => {

      productlist = data;

      showCard();

    });

};


initApp();