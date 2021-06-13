(function ($) {

    // Sticky nav
    var $headerStick = $('.Sticky');
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 80) {
            $headerStick.addClass("sticky_element");
        } else {
            $headerStick.removeClass("sticky_element");
        };
    });

    // Menu Categories
    $(window).resize(function () {
        if ($(window).width() >= 768) {
            $('a[href="#"]').on('click', function (e) {
                e.preventDefault();
            });
            $('.categories').addClass('menu');
            $('.menu ul > li').on('mouseover', function (e) {
                $(this).find("ul:first").show();
                $(this).find('> span a').addClass('active');
            }).on('mouseout', function (e) {
                $(this).find("ul:first").hide();
                $(this).find('> span a').removeClass('active');
            });
            $('.menu ul li li').on('mouseover', function (e) {
                if ($(this).has('ul').length) {
                    $(this).parent().addClass('expanded');
                }
                $('.menu ul:first', this).parent().find('> span a').addClass('active');
                $('.menu ul:first', this).show();
            }).on('mouseout', function (e) {
                $(this).parent().removeClass('expanded');
                $('.menu ul:first', this).parent().find('> span a').removeClass('active');
                $('.menu ul:first', this).hide();
            });
        } else {
            $('.categories').removeClass('menu');
        }
    }).resize();

    // Mobile Mmenu
    var $menu = $("#menu").mmenu({
        "extensions": ["pagedim-black"],
        counters: true,
        keyboardNavigation: {
            enable: true,
            enhance: true
        },
        navbar: {
            title: 'MENU'
        },
        offCanvas: {
        pageSelector: "#page"
    },
        navbars: [{position:'bottom',content: ['<a href="#0">© 2020 Allaia</a>']}]}, 
        {
        // configuration
        clone: true,
        classNames: {
            fixedElements: {
                fixed: "menu_fixed"
            }
        }
    });

    // Menu
    $('a.open_close').on("click", function () {
        $('.main-menu').toggleClass('show');
        $('.layer').toggleClass('layer-is-visible');
    });
    $('a.show-submenu').on("click", function () {
        $(this).next().toggleClass("show_normal");
    });
    $('a.show-submenu-mega').on("click", function () {
        $(this).next().toggleClass("show_mega");
    });

    $('a.btn_search_mob').on("click", function () {
        $('.search_mob_wp').slideToggle("fast");
    });

    /* Cart dropdown */
	$('.dropdown-cart, .dropdown-access').hover(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(300);
	});

	/* Cart Dropdown Hidden From tablet */
	$(window).bind('load resize', function () {
		var width = $(window).width();
		if (width <= 768) {
			$('a.cart_bt, a.access_link').removeAttr("data-toggle", "dropdown")
		} else {
			$('a.cart_bt,a.access_link').attr("data-toggle", "dropdown")
		}
	});
})(window.jQuery)