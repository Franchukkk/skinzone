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


})