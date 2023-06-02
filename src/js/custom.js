document.addEventListener('DOMContentLoaded', function() {

    // Header Scroll
    window.onscroll = function (e) {
        if (window.scrollY > 100) {
            $("#header").addClass("scrolled");
        } else if (window.scrollY == 0) {
            $("#header").removeClass("scrolled");
        }
    } 

    // Hamburger menu
    var expanded = false;
    $("#header__hamburger").click(function() {
        if (!expanded) {
            $(this).addClass("expanded");
            $("#header__dropdown").slideDown(300);
            expanded = true;
        } else {
            $(this).removeClass("expanded");
            $("#header__dropdown").slideUp(300);
            expanded = false;
        }
    });
});
