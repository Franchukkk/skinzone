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
                        disableProductFromCart(localStorage.getItem("userId"), checkbox.name, true);
                    }
                });
            });

        }, 500)
    }
})