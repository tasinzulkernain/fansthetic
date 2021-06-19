// Carousel product page
$('.prod_pics').owlCarousel({
    items: 1,
    loop: false,
    margin: 0,
    dots:true,
    lazyLoad:true,
    nav:false
});

// Carousel
$('.products_carousel').owlCarousel({
    center: false,
    items: 2,
    loop: false,
    margin: 10,
    dots:false,
    nav: true,
    lazyLoad: true,
    navText: ["<i class='ti-angle-left'></i>","<i class='ti-angle-right'></i>"],
    responsive: {
        0: {
            nav: false,
            dots:true,
            items: 2
        },
        560: {
            nav: false,
            dots:true,
            items: 3
        },
        768: {
            nav: false,
            dots:true,
            items: 4
        },
        1024: {
            items: 4
        },
        1200: {
            items: 4
        }
    }
});