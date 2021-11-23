// Header Scroll
window.onscroll = function (e) {
    if (window.scrollY > 100) {
        document.querySelector("#header").classList.add("scrolled");
    } else if (window.scrollY == 0) {
        document.querySelector("#header").classList.remove("scrolled");
    }
} 