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



        const checkboxes = document.querySelectorAll('.addons-list input[type="checkbox"]');
        console.log(checkboxes);
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                addonToCart(checkbox.name);
            });
        });
    }
})