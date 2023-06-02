document.addEventListener('DOMContentLoaded', function() {

    // Header Scroll
    window.onscroll = function (e) {
        // Scroll Bar
        if (window.scrollY > 100) {
            $("#header").addClass("scrolled");
        } else if (window.scrollY == 0) {
            $("#header").removeClass("scrolled");
        }
    } 

    // Window Resize 100vh
    window.addEventListener('resize', function() {
        if ($(window).width() < 768) {
            $("#home").css("height", $(window).innerHeight());
        }
    });

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
