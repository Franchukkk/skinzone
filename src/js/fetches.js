
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
function makeOrderStripe(token) {
    alert(11);
    fetch('/api/make-order-stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Make Order Stripe:', data)
        updateSubmitOrderHref(data)
      })
      .catch(error => console.error('Error:', error));
  }

// створення замовлення через paypal
function makeOrderPaypal(token) {
    fetch('/api/make-order-paypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Make Order Paypal:', data)
        updateSubmitOrderHref(data)
      })
      .catch(error => console.error('Error:', error));
  }

// створення замовлення через coinpayments
function makeOrderCoinpayments(token) {
    fetch('/api/make-order-coinpayments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
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
  if (method == "paypal") {
    makeOrderPaypal(localStorage.getItem('userId'))
  } else if (method == "coinpayments") {
    makeOrderCoinpayments(localStorage.getItem('userId'))
  } else if (method == "visamastercard"){
    makeOrderStripe(localStorage.getItem('userId'))
  }
}


// функція для оновлення href кнопки підтвердження замовлення
function updateSubmitOrderHref(responseObject) {

  if (responseObject.status === "success" && responseObject.data) {
      const submitOrderElement = document.querySelector(".submit-order");

      if (submitOrderElement) {
          submitOrderElement.href = responseObject.data;
          console.log("Посилання успішно оновлено!");
      } else {
          console.error("Елемент .submit-order не знайдено на сторінці.");
      }
  } else {
      console.error("Об'єкт має некоректний статус або не містить посилання.");
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
        console.log('Cart:', data)
        generateProductCards(data)
      })
      .catch(error => console.error('Error:', error));
  }

// Функція для генерації HTML чекаутвої сторінки
function generateProductCards(data) {
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
      console.log(product.product.title);
      totalSum += product.product.price;
      return `
          <form action="" class="basket-product d-flex align-items-center">
              <div class="basket-image relative">
                  <div class="product-card w-100">
                      <div class="d-flex justify-content-between relative w-100">
                          <div class="w-100">
                              <div class="relative">
                                  <img src="${product.product.img}" alt="product-card">
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
                          <button type="submit">
                              <img src="img/basketIcon.png" alt="">
                          </button>
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

function renderCartItems(cart) {
  if (cart.status !== "success" || !Array.isArray(cart.data)) {
      console.error("Invalid cart object");
      return;
  }

  const container = document.querySelector(".checkout-products-scroll-list");

  if (!container) {
      console.error("Container .checkout-products-scroll-list not found");
      return;
  }

  container.innerHTML = "";

  cart.data.forEach(item => {
      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add("d-flex", "justify-content-between");

      const titleSpan = document.createElement("span");
      titleSpan.textContent = item.title;

      const priceSpan = document.createElement("span");
      priceSpan.classList.add("checkout-product-price");
      priceSpan.textContent = `${item.price}$`;

      itemWrapper.appendChild(titleSpan);
      itemWrapper.appendChild(priceSpan);

      container.appendChild(itemWrapper);
  });
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
function fetchProducts(containerToUpdate = false) {
    fetch('/api/fetch-products', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const products = data.data
          console.log('Products array:', products)
          if (containerToUpdate != false) {
              updateProducts(products, containerToUpdate)
          }
        } else {
          console.error('Error fetching products:', data.data);
        }
      })
      .catch(error => console.error('Error:', error));
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
                        <img src="${element.image}" alt="product-card">
                    </a>
                    <hr>
                    <form action="" class="product-card__info">
                        <h3>${element.title}</h3>
                        <p>${element.price}</p>
                        <button onclick="buyButton()" data-value="${element.ID}">Buy</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    arr.forEach((element, index) => {
        if (
            (containerToUpdate === "#productsSwiper" && index < 12) || // Перші 12 товарів
            (containerToUpdate === "#random" && element.category === "random") ||
            (containerToUpdate === "#guaranted" && element.category === "guaranted")
        ) {
            container.innerHTML += createProductCard(element);
        }
    });
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
function addProductToCart(token, productID) {
    fetch('/api/add-product-to-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, productID })
    })
      .then(res => res.json())
      .then(data => console.log('Add to Cart:', data))
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
}

function parseProductData() {
  const productDataRaw = localStorage.getItem('productData');

  if (!productDataRaw) {
    console.error('Дані про продукт не знайдено в localStorage');
    return;
  }

  try {
    const productData = JSON.parse(productDataRaw);

    // Отримання потрібних полів
    const { title, description, price, active } = productData.data;
    const img = productData.data.img || 'default_image.jpg';

    document.querySelector(".image-block img").src = img;
    document.querySelector(".text-block h2").innerHTML = title;
    document.querySelector(".availability").innerHTML = active ? "IN STOK" : "NOT IN STOK";
    document.querySelector(".price").innerHTML = price + "$";
    document.querySelector(".product-description h3").innerHTML = description;

    console.log({ title, description, price, active, img });
  } catch (error) {
    console.error('Помилка при парсингу JSON:', error);
  }
}

