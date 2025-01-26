if (!localStorage.getItem('userId')) {
    const userId = crypto.randomUUID()
    localStorage.setItem('userId', userId);
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelector("#productsSwiper")) {
        fetchProducts("#productsSwiper")
    }
    if (document.querySelector("#random")) {
        fetchProducts("#random")
    }
    if (document.querySelector("#guaranted")) {
        fetchProducts("#guaranted")
    }


    if (document.querySelector(".addons-list")) {
        fetchProducts("addons", true)

        setTimeout(function() {
            const checkboxes = document.querySelectorAll('.addons-list input[type="checkbox"]');

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    if (checkbox.checked) {
                        addonToCart(checkbox.name);
                    } else {
                        getAddonIdFromCartAndDelete(checkbox.name, localStorage.getItem("userId"));
                    }
                });
            });

        }, 500)
    }
})



document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelector(".checkout-blocks")) {
        const nameInput = document.getElementById('name');
        const surnameInput = document.getElementById('surname');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const paymentMethodContainer = document.querySelector('.check-out-payment-method');
      
        function checkFields() {
          if (nameInput.value && surnameInput.value && emailInput.value && phoneInput.value) {
            paymentMethodContainer.style.pointerEvents = 'auto';
            paymentMethodContainer.style.opacity = '1';
          } else {
            paymentMethodContainer.style.pointerEvents = 'none';
            paymentMethodContainer.style.opacity = '0.7';
          }
        }
      
        nameInput.addEventListener('input', checkFields);
        surnameInput.addEventListener('input', checkFields);
        emailInput.addEventListener('input', checkFields);
        phoneInput.addEventListener('input', checkFields);
      
        checkFields();
    }
});
