
// запит для створення продукту
function addProduct(token, title, description, price, email, password, category) {
    fetch('/api/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        title,
        description,
        price,
        account: { email, password },
        category
      })
    })
      .then(res => res.json())
      .then(data => console.log('Add Product:', data))
      .catch(error => console.error('Error:', error));
  }

// запит для задання статусу замовлення
function setOrderStatus(token, orderID, status) {
    fetch('/api/set-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ID: orderID, status })
    })
        .then(res => res.json())
        .then(data => console.log('Set Order Status:', data))
        .catch(error => console.error('Error:', error));
}

// запит для задання отримання всіх замовлень
function getOrders(token, status) {
    fetch('/api/get-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, status })
    })
        .then(res => res.json())
        .then(data => console.log('Orders:', data))
        .catch(error => console.error('Error:', error));
}

// створення замовлення через Stripe
function makeOrderStripe(token, email, phone, name, code="") {
    fetch('/api/make-order-stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email, phone, name, code })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Make Order Stripe:', data)
        updateSubmitOrderHref(data)
      })
      .catch(error => console.error('Error:', error));
  }

// створення замовлення через paypal
function makeOrderPaypal(token, email, phone, name) {
    fetch('/api/make-order-paypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email, phone, name })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Make Order Paypal:', data)
        updateSubmitOrderHref(data)
      })
      .catch(error => console.error('Error:', error));
  }

// створення замовлення через coinpayments
function makeOrderCoinpayments(token, email, phone, name, promo="" , currency="BTC") {
    fetch('/api/make-order-coinpayments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, email, phone, name, currency })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Make Order Coinpayments:', data)
        updateSubmitOrderHref(data)
      })
      .catch(error => console.error('Error:', error));
  }


function checkPaymentMethod () {
  let method = event.target.getAttribute("data-value")
  localStorage.setItem("paymentMethod", method)
  if (method == "paypal") {
    makeOrderPaypal(localStorage.getItem('userId'))
    document.querySelector(".coinpayments-currency").classList.add("d-none")
  } else if (method == "coinpayments") {
    document.querySelector(".coinpayments-currency").classList.remove("d-none")
    makeOrderCoinpayments(localStorage.getItem('userId'), document.querySelector("#email").value, document.querySelector("#phone").value, document.querySelector("#name").value, document.querySelector("#promo").value, document.querySelector(".coinpayments-currency").value)
  } else if (method == "visamastercard"){
    makeOrderStripe(localStorage.getItem('userId'), document.querySelector("#email").value, document.querySelector("#phone").value, document.querySelector("#name").value, document.querySelector("#promo").value)
    document.querySelector(".coinpayments-currency").classList.add("d-none")
  }
}

if (document.querySelector(".coinpayments-currency")) {
  let currencySelect = document.querySelector(".coinpayments-currency");
  currencySelect.addEventListener("change", function() {
    makeOrderCoinpayments(localStorage.getItem('userId'), document.querySelector("#email").value, document.querySelector("#phone").value, document.querySelector("#name").value, document.querySelector("#promo").value, document.querySelector(".coinpayments-currency").value)
  })
}


// функція для оновлення href кнопки підтвердження замовлення
function updateSubmitOrderHref(responseObject) {
  console.log(responseObject);
  if (responseObject.status === "success" && responseObject.data) {
      const submitOrderElement = document.querySelector(".submit-order");

      if (submitOrderElement) {
          submitOrderElement.href = responseObject.data.url;
          console.log("Посилання успішно оновлено!");
      } else {
          console.error("Елемент .submit-order не знайдено на сторінці.");
      }
  } else {
      console.error("Об'єкт має некоректний статус або не містить посилання.");
  }
}

// if (document.querySelector(".submit-order")) {
//   document.querySelector(".submit-order").addEventListener("click", function(e) {
//     e.preventDefault();
//     if (localStorage.getItem("paymentMethod") == "paypal") {
//       makeOrderPaypal(localStorage.getItem('userId'))
//     } else if (localStorage.getItem("paymentMethod") == "coinpayments") {
//       makeOrderCoinpayments(localStorage.getItem('userId'), document.querySelector("#email").value, document.querySelector("#phone").value, document.querySelector("#name").value, document.querySelector("#promo").value, document.querySelector(".coinpayments-currency").value)
//     } else if (localStorage.getItem("paymentMethod") == "visamastercard"){
//       makeOrderStripe(localStorage.getItem('userId'), document.querySelector("#email").value, document.querySelector("#phone").value, document.querySelector("#name").value, document.querySelector("#promo").value)
//     }

//     const nameInput = document.getElementById('name');
//     const surnameInput = document.getElementById('surname');
//     const emailInput = document.getElementById('email');
//     const phoneInput = document.getElementById('phone');
//     const paymentMethodContainer = document.querySelector('.check-out-payment-method');
    
//     function checkFieldsForSubmit() {
//       if (nameInput.value && surnameInput.value && emailInput.value && phoneInput.value) {
//         setTimeout(function () {
//           console.log(e.target.getAttribute("href"));
//           window.location.href = e.target.getAttribute("href");
//         }, 500)
//       } else {
        
//       }
//     }


//   })
// }

if (document.querySelector(".submit-order")) {
  document.querySelector(".submit-order").addEventListener("click", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const inputs = [nameInput, surnameInput, emailInput, phoneInput];

    function checkFieldsForSubmit() {
      let allFieldsValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.border = "2px solid red";
          allFieldsValid = false;
        } else {
          input.style.border = "";
        }
      });

      if (allFieldsValid) {
        setTimeout(function () {
          console.log(e.target.getAttribute("href"));
          window.location.href = e.target.getAttribute("href");
        }, 500);
      }
    }

    checkFieldsForSubmit();
  });
}



async function disableProductFromCart(token, productId, isAddon = false) {
  // event.preventDefault();
  try {
    const response = await fetch('/api/disable-product-from-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: productId,
        token: token,
      }),
    });

    if (!response.ok) {
      throw new Error(`Помилка: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Товар успішно деактивовано:', result);

    if (isAddon == true) {
      transferCartDataToCheckout(localStorage.getItem('userId'))
    } else {
      getCart(localStorage.getItem('userId'))

    }
  } catch (error) {
    console.error('Не вдалося виконати запит:', error);
  }
}



// отримання інформації про замовлення
function getOrderInfo(orderID) {
    fetch('/api/get-order-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Order Info:', data)
        generateOrderTrackingHtml(data)
      })
      .catch(error => console.error('Error:', error));
  }

// Функція для генерації HTML для трекінгу замовлень
function generateOrderTrackingHtml(orderData) {
  
  const container = document.querySelector('.track-container');

  if (!container) {
      console.error("Container '.track-container' not found");
      return;
  }

  if (orderData.status !== "success" || !orderData.data || !Array.isArray(orderData.data.items)) {
      console.error("Invalid order data format");
      container.innerHTML = '<p>Order not found</p>'
      return;
  }


  const orderItemsHtml = orderData.data.items.map(item => `
      <table class="track-order-status w-100 track-status">
          <tr>
              <td>PRODUCT NAME</td>
              <td class="availability text-right">${item.title}</td>
          </tr>
          <tr>
              <td>PRICE</td>
              <td class="availability text-right">$${item.price}</td>
          </tr>
          <tr>
              <td>STATUS</td>
              <td class="availability text-right">${orderData.data.orderStatus.toUpperCase()}</td>
          </tr>
      </table>
  `).join('');

  container.innerHTML = orderItemsHtml;
}


// отримання корзини користувача
function getCart(token) {
  fetch('/api/get-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.data[0] == undefined) {
        console.log('Cart is empty');
        if (document.querySelector(".submit-order")) {
          document.querySelector(".submit-order").style = "pointer-events: none; opacity: 0.7;"
        }
        document.querySelector('.basket-products').innerHTML = '';
        document.querySelector('.basket-footer span').textContent = '$0';

      } else {
        console.log('Cart:', data)
        generateProductCards(data)
      }
    })
    .catch(error => console.error('Error:', error));
}

getCart(localStorage.getItem('userId'))

function getAddonIdFromCartAndDelete (id, token) {
  fetch('/api/get-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.data.forEach(element => {
        if (element.product.ID == id) {
          disableProductFromCart (localStorage.getItem("userId"), element.ID)
          setTimeout(() => {
            transferCartDataToCheckout(localStorage.getItem("userId"))
          }, 200)
        }
      })
    })
    .catch(error => console.error('Error:', error));
}

// Функція для генерації HTML чекаутвої сторінки
function generateProductCards(data) {
  console.log(data);
  const container = document.querySelector('.basket-products');
  const footerSpan = document.querySelector('.basket-footer span');

  if (!container) {
      console.error("Container '.basket-products' not found");
      return;
  }

  if (!footerSpan) {
      console.error("Element '.basket-footer span' not found");
      return;
  }

  if (data.status !== "success" || !Array.isArray(data.data)) {
      console.error("Invalid data format");
      container.innerHTML = '<p style="color: #fff">Basket is empty</p>';
      footerSpan.textContent = '$0';
      return;
  }

  let totalSum = 0;


  const productCardsHtml = data.data.map(product => {
      if (product.product.category == "addon") {
        return '';
      }
      console.log(product.product.title);
      totalSum += product.product.price;
      return `
          <form action="" class="basket-product d-flex align-items-center">
              <div class="basket-image relative">
                  <div class="product-card w-100">
                      <div class="d-flex justify-content-between relative w-100">
                          <div class="w-100">
                              <div class="relative">
                                  <img src="${product.product.image}" alt="product-card" loading="lazy">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="basket-description w-100">
                  <div class="row d-flex align-items-center">
                      <div class="w-80">
                          <strong>${product.product.title}</strong>
                          <b>$${product.product.price}</b>
                      </div>
                      <div class="w-20">
                          <div onclick="disableProductHandle(localStorage.getItem('userId'), ${product.ID})" class="basket-delete-product">
                              <img class="w-100" src="img/basketIcon.png" alt="" loading="lazy">
                          </div>
                      </div>
                  </div>
              </div>
          </form>
          <hr>
      `;
  }).join('');

  container.innerHTML = productCardsHtml;
  footerSpan.textContent = `$${totalSum}`;
}

function disableProductHandle (token, productId, isAddon = false) {
  event.preventDefault;
  disableProductFromCart(token, productId, isAddon);
  document.querySelector(".toast-custom-body").innerHTML = "Successfully removed"
  document.querySelector(".toast-custom").classList.add("show")
  setTimeout(() => {
    document.querySelector(".toast-custom").classList.remove("show")
  }, 2000)
  setTimeout(() => {
    getCart(token);
  }, 1000);
}

function transferCartDataToCheckout (token) {
  fetch('/api/get-cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      renderCartItems(data)
    })
    .catch(error => console.error('Error:', error));
}

// function renderCartItems(cart) {
//   if (cart.status !== "success" || !Array.isArray(cart.data)) {
//       console.error("Invalid cart object");
//       return;
//   }

//   const container = document.querySelector(".checkout-products-scroll-list");

//   if (!container) {
//       console.error("Container .checkout-products-scroll-list not found");
//       return;
//   }

//   container.innerHTML = "";

//   cart.data.forEach(item => {
//       const itemWrapper = document.createElement("div");
//       itemWrapper.classList.add("d-flex", "justify-content-between");

//       const titleSpan = document.createElement("span");
//       titleSpan.textContent = item.product.title;

//       const priceSpan = document.createElement("span");
//       priceSpan.classList.add("checkout-product-price");
//       priceSpan.textContent = `${item.product.price}$`;

//       itemWrapper.appendChild(titleSpan);
//       itemWrapper.appendChild(priceSpan);

//       container.appendChild(itemWrapper);
//   });
// }

// function renderCartItems(cart) {
//   if (cart.status !== "success" || !Array.isArray(cart.data)) {
//     console.error("Invalid cart object");
//     return;
//   }
//   const container = document.querySelector(".checkout-products-scroll-list");
//   if (!container) {
//     console.error("Container .checkout-products-scroll-list not found");
//     return;
//   }
//   container.innerHTML = "";
//   let total_checkout_price = 0;
//   cart.data.forEach(item => {
//     const itemWrapper = document.createElement("div");
//     itemWrapper.classList.add("d-flex", "justify-content-between");
//     const titleSpan = document.createElement("span");
//     titleSpan.textContent = item.product.title;
//     const priceSpan = document.createElement("span");
//     priceSpan.classList.add("checkout-product-price");
//     priceSpan.textContent = `${item.product.price}$`;
//     itemWrapper.appendChild(titleSpan);
//     itemWrapper.appendChild(priceSpan);

//     total_checkout_price += item.product.price;
//     container.appendChild(itemWrapper);
//   });

//   const totalPriceElement = document.querySelector(".total-checkout-price");
//   if (totalPriceElement) {
//     totalPriceElement.textContent = `$${total_checkout_price}`;
//   } else {
//     console.error(".total-checkout-price element not found");
//   }
// }

function renderCartItems(cart) {
  if (cart.status !== "success" || !Array.isArray(cart.data)) {
    console.error("Invalid cart object");
    return;
  }

  // Отримуємо контейнер для товарів
  const listContainer = document.querySelector(".checkout-products-scroll-list");
  const addonsContainer = document.querySelector(".checkout-products-scroll-addons");

  if (!listContainer || !addonsContainer) {
    console.error("One or both containers not found");
    return;
  }

  // Очищаємо контейнери
  listContainer.innerHTML = "";
  addonsContainer.innerHTML = "";

  let total_checkout_price = 0;

  cart.data.forEach(item => {
    const itemWrapper = document.createElement("div");
    itemWrapper.classList.add("d-flex", "justify-content-between");

    const titleSpan = document.createElement("span");
    titleSpan.textContent = item.product.title;

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("checkout-product-price");
    priceSpan.textContent = `${item.product.price}$`;

    itemWrapper.appendChild(titleSpan);
    itemWrapper.appendChild(priceSpan);

    // Збільшуємо загальну вартість
    total_checkout_price += item.product.price;

    // Перевірка категорії і додавання в відповідний контейнер
    if (item.product.category === "addon") {
      addonsContainer.appendChild(itemWrapper); // Додаємо в контейнер addons
    } else {
      listContainer.appendChild(itemWrapper); // Додаємо в стандартний контейнер
    }
  });

  // Оновлюємо загальну вартість
  const totalPriceElement = document.querySelector(".total-checkout-price");
  if (totalPriceElement) {
    totalPriceElement.textContent = `$${total_checkout_price}`;
  } else {
    console.error(".total-checkout-price element not found");
  }

  localStorage.setItem('beforePromocodePrice', document.querySelector(".total-checkout-price").innerHTML);
}



// // Приклад використання
// const products = {
//   "status": "success",
//   "data": [
//       {
//           "productID": "1",
//           "title": "Product Title 1",
//           "price": 100,
//           "quantity": 1,
//           "img": "img/product1.webp"
//       },
//       {
//           "productID": "2",
//           "title": "Product Title 2",
//           "price": 200,
//           "quantity": 2,
//           "img": "img/product2.webp"
//       }
//   ]
// };

// // Викликаємо функцію
// generateProductCards(products);


// отримання списку продуктів
// function fetchProducts(containerToUpdate = false) {
//     fetch('/api/fetch-products', {
//       method: 'GET'
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.status === 'success') {
//           const products = data.data
//           console.log('Products array:', products)
//           if (containerToUpdate != false) {
//               updateProducts(products, containerToUpdate)
//           }
//         } else {
//           console.error('Error fetching products:', data.data);
//         }
//       })
//       .catch(error => console.error('Error:', error));
//   }


function fetchProducts(containerToUpdate = false, addon = false) {
  // додати параметр до URL, якщо addon = true
  const url = addon ? '/api/fetch-products?addon=true' : '/api/fetch-products?addon=false';

  fetch(url, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const products = data.data;
        console.log('Products array:', products);
        if (containerToUpdate !== false) {
          if (containerToUpdate == "addons") {
            updateAddons(products);
          } else {
            updateProducts(products, containerToUpdate);

          }
        }
      } else {
        console.error('Error fetching products:', data.data);
      }
    })
    .catch(error => console.error('Error:', error));
}


// оновлення списку аддонів на сторінці чекаута
function updateAddons(arr) {
  let container = document.querySelector(".addons-list");
  let containerHTML = "";
  arr.forEach(element => {
    containerHTML += `
    <div class="d-flex align-items-center addon-item">
      <input type="checkbox" id="${element.title}" name="${element.ID}">
      <label class="w-80" for="${element.title}">${element.description}</span></label>
    </div>
    `;
  });

  container.innerHTML = containerHTML;
}

  // Оновлення списку продуктів на фронті
function updateProducts(arr, containerToUpdate) {
  const container = document.querySelector(containerToUpdate);
  console.log(container);
  container.innerHTML = "";

  // Функція для створення HTML-карточки продукту
  const createProductCard = (element) => `
      <div class="product-card col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <div class="product-card-content d-flex justify-content-center relative">
              <div>
                  <a href="product-card.html" class="relative" data-value="${element.ID}" onclick="openCardPage()">
                      <img src="${element.image}" alt="product-card" loading="lazy">
                  </a>
                  <hr>
                  <form action="" class="product-card__info">
                      <h3>${element.title}</h3>
                      <p>${element.price}$</p>
                      <button onclick="buyButton()" data-value="${element.ID}">Buy</button>
                  </form>
              </div>
          </div>
      </div>
  `;

  // Функція для обгортання картки в .swiper-slide (для containerToUpdate === "#productsSwiper")
  const wrapInSwiperSlide = (html) => `
      <div class="swiper-slide">
          ${html}
      </div>
  `;

  arr.forEach((element, index) => {
      if (
          (containerToUpdate === "#productsSwiper" && index < 6) || // Перші 12 товарів
          (containerToUpdate === "#random" && element.category === "random") ||
          (containerToUpdate === "#guaranted" && element.category === "guaranted")
      ) {
          let productHTML = createProductCard(element);

          // Додаємо обгортку для .swiper-slide, якщо контейнер "#productsSwiper"
          if (containerToUpdate === "#productsSwiper") {
              productHTML = wrapInSwiperSlide(productHTML);

              // if (document.querySelector('.discounts-slider')) {
              //   const discountsSlider = new Swiper('.discounts-slider', {
              //       loop: true,
              //       pagination: {
              //           el: '.swiper-pagination',
              //           clickable: true
              //       },
              //       navigation: {
              //           nextEl: '.products-button-next',
              //           prevEl: '.products-button-prev',
              //       },
              //       breakpoints: {
              //           320: {
              //               slidesPerView: 1,
              //               spaceBetween: 20
              //           },
              //           768: {
              //               slidesPerView: 2,
              //               spaceBetween: 30
              //           },
              //           1024: {
              //               slidesPerView: 3,
              //               spaceBetween: 30
              //           }
              //       }
              //   });

              // }
          }

          container.innerHTML += productHTML;
      }
  });
  // setTimeout (function () {
  //   if (document.querySelector('.discounts-slider')) {
  //       const discountsSlider = new Swiper('.discounts-slider', {
  //           loop: true,
  //           pagination: {
  //               el: '.swiper-pagination',
  //               clickable: true
  //           },
  //           navigation: {
  //               nextEl: '.products-button-next',
  //               prevEl: '.products-button-prev',
  //           },
  //           breakpoints: {
  //               320: {
  //                   slidesPerView: 1,
  //                   spaceBetween: 20
  //               },
  //               768: {
  //                   slidesPerView: 2,
  //                   spaceBetween: 30
  //               },
  //               1024: {
  //                   slidesPerView: 3,
  //                   spaceBetween: 30
  //               }
  //           }
  //       });

  //     }
  // }, 1000)
}



// отримання детальної інформації про продукт
function fetchProduct(productID) {
    fetch(`/api/fetch-product?ID=${productID}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        console.log('Product Info:', data)
        localStorage.setItem('productData', JSON.stringify(data));
        window.location.href = 'product-card.html'
      })
      .catch(error => console.error('Error:', error));
  }

  function openCardPage() {
    event.preventDefault();
  
    // Знаходимо найближче батьківське гіперпосилання
    const closestLink = event.target.closest('a');
  
    // Перевіряємо, чи було знайдено гіперпосилання
    if (closestLink) {
      const dataValue = closestLink.getAttribute('data-value');
      console.log(dataValue);
      fetchProduct(dataValue);
    } else {
      console.error('Не знайдено батьківського гіперпосилання');
    }
  }

// додавання продукту в корзину
function addProductToCart(token, productID, addon= false ) {
    fetch('/api/add-product-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, productID })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Add to Cart:', data)
        if (addon) {
          setTimeout(transferCartDataToCheckout(localStorage.getItem('userId')), 1000)
        }
        document.querySelector(".toast-custom-body").innerHTML = "Successfully added"
        document.querySelector(".toast-custom").classList.add("show")
        setTimeout(() => {
          document.querySelector(".toast-custom").classList.remove("show")
        }, 2000)
      })
      .catch(error => console.error('Error:', error));
  }

function updateCart(data) {

}
  

function getOrders(token, status) {
  fetch('/api/get-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, status })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        const orders = data.data; // Масив замовлень
        console.log('Orders:', orders);
      } else {
        console.error('Error fetching orders:', data.data);
      }
    })
    .catch(error => console.error('Error:', error));
}
  
function buyButton () {
  event.preventDefault();
  console.log(localStorage.getItem('userId'), event.target.getAttribute('data-value'));
  addProductToCart(localStorage.getItem('userId'), event.target.getAttribute('data-value'))
  // setTimeout(getCart(localStorage.getItem('userId')), 100) 
  // може цей кусочок треба вернути
}

function parseProductData() {
  const productDataRaw = localStorage.getItem('productData');

  if (!productDataRaw) {
    console.error('Дані про продукт не знайдено в localStorage');
    return;
  }

  try {
    const productData = JSON.parse(productDataRaw);
    console.log(productData);
    // Отримання потрібних полів
    const { ID, title, description, price, active, image } = productData.data;
    const img = productData.data.img || 'default_image.jpg';

    document.querySelector(".image-block img").src = image;
    document.querySelector(".text-block h2").innerHTML = title;
    document.querySelector(".availability").innerHTML = active ? "IN STOK" : "NOT IN STOK";
    document.querySelector(".price").innerHTML = price + "$";
    document.querySelector(".product-description h3").innerHTML = description;
    document.querySelector(".text-block button").setAttribute('data-value', ID);
    document.querySelector(".text-block button").setAttribute('onclick', "buyButton()");

    console.log({ title, description, price, active, img });
  } catch (error) {
    console.error('Помилка при парсингу JSON:', error);
  }
}

async function applyPromoCode(promocode) {
  
  try {
    const response = await fetch(`api/check-promo-code?code=${promocode}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === "success") {
      console.log("Промокод успішно застосовано:");
      console.log(`ID: ${result.data.ID}`);
      console.log(`Назва: ${result.data.title}`);
      console.log(`Код: ${result.data.code}`);
      console.log(`Час створення: ${new Date(result.data.timestamp)}`);
      console.log(`Множник: ${result.data.multiplier}`);

      document.querySelector(".total-checkout-price").innerHTML = "$" + Math.ceil(Number(document.querySelector(".total-checkout-price").innerHTML.slice(1)) * result.data.multiplier);
    } else {
      console.error("Промокод не дійсний або виникла помилка.");
      document.querySelector(".total-checkout-price").innerHTML = localStorage.getItem('beforePromocodePrice')
    }
  } catch (error) {
    console.error("Помилка при виконанні запиту:", error.message);
    document.querySelector(".total-checkout-price").innerHTML = localStorage.getItem('beforePromocodePrice')
  }
}

if (document.querySelector("#promo")) {
  document.querySelector("#promo").addEventListener("input", function() {
    applyPromoCode(this.value);
  })
}


// applyPromoCode("dfsdsf");

function fetchSearchProducts(query) {
  const url = `/api/search-product?query=${encodeURIComponent(query)}&category=guaranted`;

  fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => {
      const products = data.data;
      console.log('Searched products array:', products);
      let productsHTML = '';
      products.forEach(product => {
        productsHTML += `
      <div class="product-card col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <div class="product-card-content d-flex justify-content-center relative">
              <div>
                  <a href="product-card.html" class="relative" data-value="${product.ID}" onclick="openCardPage()">
                      <img src="${product.image}" alt="product-card" loading="lazy">
                  </a>
                  <hr>
                  <form action="" class="product-card__info">
                      <h3>${product.title}</h3>
                      <p>${product.price}$</p>
                      <button onclick="buyButton()" data-value="${product.ID}">Buy</button>
                  </form>
              </div>
          </div>
      </div>
  `;
      });
      document.querySelector("#guaranted").innerHTML = productsHTML;
    })
    .catch(error => console.error('Error:', error));
}
if (document.querySelector('.search-btn')) {
  document.querySelector('.search-btn').addEventListener('click', function(event) {
    event.preventDefault();
  
    const query = document.querySelector('input[type="search"]').value.trim();
  
    if (query) {
      fetchSearchProducts(query, 'skins');
    } else {
      console.log('Please enter a search term.');
    }
  });
}


function addonToCart (id) {
  console.log(1);
  addProductToCart(localStorage.getItem('userId'), id, true)
  setTimeout(transferCartDataToCheckout(localStorage.getItem('userId')), 1000)
}



const forms = document.querySelectorAll('.sent-tg-form');

console.log(forms);

forms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const message = form.querySelector('#message').value;

        const body = {
            name,
            email,
            content: message
        };

        try {
            const response = await fetch('/api/send-message-telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const result = await response.json();
                // alert('Повідомлення успішно надіслано!');
                document.querySelector(".toast-custom-body").innerHTML = "Successfully sended"
                document.querySelector(".toast-custom").classList.add("show")
                setTimeout(() => {
                  document.querySelector(".toast-custom").classList.remove("show")
                }, 2000)
            }
        } catch (error) {
            console.error('Помилка:', error);
            alert('Сталася помилка. Перевірте підключення до інтернету та спробуйте ще раз.');
        }
    });
});
