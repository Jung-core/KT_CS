var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
$(window).resize(function () {
    if($(window).width() > 1200){
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    
});
window.onload = windowonload;
window.location.reload= windowonload;
function windowonload() {
    $("body").addClass("ready");
    setTimeout (function () {
        scrollTo(0,0);

    },100);
}
//스크롤 애니메이팅
var mobileAnimating = function () {
    if ($(window).width() > 1200) return;
    var pointer = $(window).scrollTop() + $(window).height();
    var objs = $(".obj-animated");
    if (objs.length == 0) return;

    objs.each(function () {
        if (pointer > $(this).offset().top + 100 &&
            pointer < $(this).offset().top + $(this).height() + $(window).height()) {
            $(this).addClass("animated " + $(this).data("ani"));
        }
    });
}

// 진입마다 효과를 반복적으로 주고 싶으면 아래 값을 false로 변경
const isOnce = true;
if ($(window).width() > 1200) {
    var fp = $('#fullpage').fullpage({
        verticalCentered: true,
        anchors: ['visual', 'business', 'value01', 'value02', 'news', 'footer'],
        navigation: true,
        navigationPosition: 'right',
        responsiveWidth: 1200,
        // fitToSection: false,
        // autoScrolling: false,
        afterLoad: function (origin, destination, direction) {
            if (destination != 1) {
                if ($(".btn-top").is(":hidden")) {
                    $(".btn-top").fadeIn();
                    $(".scroll-guide").fadeOut();
                }
            } else {
                $(".btn-top").fadeOut();
                $(".scroll-guide").fadeIn();
            }

            if (destination == 4) {
                setTimeout(function () {
                    $(".main-wrap .value02 .info-list").addClass("event");
                }, 1000);
            } else {
                $(".main-wrap .value02 .info-list").removeClass("event");
            }
            /*
            if (destination == 2){
                $("#header").addClass("business");
            }else{
                $("#header").removeClass("business");
            }*/
            if (destination == 2 || destination == 5 || destination == 6) {
                $("#header").addClass("black");
            } else {
                $("#header").removeClass("black");
            }
        },
        onLeave: function (index, nextIndex, direction) {
            var $object = $('#fullpage > *:nth-child(' + nextIndex + ')');

            if ($(window).width() > 1200) {
                $object.find('.obj-animated').each(function (i, item) {
                    var delay = $(item).data('delay');

                    if (isOnce) {
                        // 일회성
                        $(item).addClass('animated ' + $(item).data('ani'));
                        if (delay) $(item).css("animation-delay", delay);
                    } else {
                        // 반복
                        $(item).removeClass('animated ' + $(item).data('ani'))
                        setTimeout(function () {
                            $(item).addClass('animated ' + $(item).data('ani'));
                            if (delay) $(item).css("animation-delay", delay);
                        }, 100);
                    }
                });
            }
            if (nextIndex == 2) {
                swpBiz.autoplay.start();
            } else {
                swpBiz.autoplay.stop();
            }

            $(".main-wrap .value02 .info-list").attr("data-nth", "0");
            $(".main-wrap .value02 .info-list li").removeClass("active");
        }
    });
    $(document).on("click", ".btn-top", function (e) {
        e.preventDefault();
        $.fn.fullpage.moveTo(1);
    });
    $(window).resize(function () {
        responsiveFullpage();
    });
    responsiveFullpage()
    // index page
    function responsiveFullpage() {
        if ($(window).width() <= 1200) {
            $.fn.fullpage.setAutoScrolling(false);
            $.fn.fullpage.setFitToSection(false);
            $.fn.fullpage.setLockAnchors(true);
            //$.fn.fullpage.destroy();
        } else {
            $.fn.fullpage.setAutoScrolling(true);
            $.fn.fullpage.setFitToSection(true);
            $.fn.fullpage.setLockAnchors(false);
        }
    }
} else {
    $(document).on("click", ".btn-top", function (e) {
        e.preventDefault();
        $("html").animate({
            "scrollTop": "0"
        }, 600);
    });

    $(window).scroll(function () {
        $("header").addClass("black");
        if ($(this).scrollTop() > 100) {
            $('.btn-top').fadeIn(500);
        } else {
            $('.btn-top').fadeOut('slow');
        }
        if($(window).scrollTop() < 100){
            $("header").removeClass("black");
        }
    });
}



$(document).on("click", "#swp-visual-slide .btn-pp", function (e) {
    var btn = $(this);
    if (btn.hasClass("pause")) {
        btn.removeClass("pause");
        btn.addClass("play");
        swpVisual.autoplay.stop();
    } else if (btn.hasClass("play")) {
        btn.removeClass("play");
        btn.addClass("pause");
        swpVisual.autoplay.start();
    }
});

var swpVisual;
var swpBiz;
var swpNews;

$(document).ready(function () {
    mobileAnimating();
    swpVisual = new Swiper("#swp-visual-slide", {
        speed: 0,
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 7000
        },
        pagination: {
            el: "#swp-visual-slide .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + "0" + (index + 1) + "<em></em></span>";
            }
        }
    });
    swpBiz = new Swiper("#swp-biz-slide", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 4000
        },
        pagination: {
            el: "#swp-biz-slide .swiper-pagination",
            type: "progressbar"
        },
        navigation: {
            nextEl: "#swp-biz-slide .swiper-button-next",
            prevEl: "#swp-biz-slide .swiper-button-prev",
        },
        on: {
            beforeInit: function () {
                var total = $("#swp-biz-slide .swiper-slide").not(".swiper-slide-duplicate").length;
                if (total < 10) total = "0" + total;
                $("#swp-biz-slide .controller .total").html(total);
                $("#swp-biz-slide .controller .crnt").html("01");
            }
        }
    });
    swpBiz.on("init", function () {
        setTimeout(function () {
            var total = swpBiz.slides.length;
            var crnt = swpBiz.realIndex + 1;
            if (total < 10) total = "0" + total;
            if (crnt < 10) crnt = "0" + crnt;
            $("#swp-biz-slide .controller .crnt").html(crnt);
        }, 200);
    });
    swpBiz.on("slideChange", function () {
        var crnt = swpBiz.realIndex + 1;
        if (crnt < 10) crnt = "0" + crnt;
        $("#swp-biz-slide .controller .crnt").html(crnt);
    });
    swpBiz.autoplay.stop();

    swpNews = new Swiper("#swp-news-slide", {
        speed: 300,
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loopFillGroupWithBlank: true,
        breakpoints: {
            // when window width is >= 320px
            980: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 35,
            },
            600: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 35,
            }
        },
        pagination: {
            el: "#swp-news-slide .swiper-pagination",
            type: "progressbar"
        },
        navigation: {
            nextEl: "#swp-news-slide .swiper-button-next",
            prevEl: "#swp-news-slide .swiper-button-prev",
        },
        on: {
            beforeInit: function () {
                var total = $("#swp-news-slide .swiper-slide").not(".swiper-slide-duplicate").length;
                if (total < 10) total = "0" + total;
                $("#swp-news-slide .controller .total").html(total);
                $("#swp-news-slide .controller .crnt").html("01");
            }
        }
    });
    swpNews.on("init", function () {
        setTimeout(function () {
            var total = swpNews.slides.length;
            var crnt = swpNews.realIndex + 1;
            if (total < 10) total = "0" + total;
            if (crnt < 10) crnt = "0" + crnt;
            $("#swp-news-slide .controller .crnt").html(crnt);
        }, 200);
    });
    swpNews.on("slideChange", function () {
        var crnt = swpNews.realIndex + 1;
        if (crnt < 10) crnt = "0" + crnt;
        $("#swp-news-slide .controller .crnt").html(crnt);
    });

});

$(document).on("mouseenter", ".main-wrap .value02 .info-list.event li", function () {
    var idx = $(this).index();
    var prt = $(this).closest(".info-list");
    prt.attr("data-nth", idx + 1);
    $(this).addClass("active").siblings("li").removeClass("active");
});
$(document).on("mouseenter", ".footer .main-link-page li a", function () {
    var list = $(this).closest("li");
    var another = list.siblings("li");
    list.removeClass("deactive").addClass("active");
    another.removeClass("active").addClass("deactive");
});
$(document).on("mouseleave", ".footer .main-link-page", function () {
    var lists = $(this).find("li");
    lists.removeClass("active deactive");
});


$(window).on("scroll mousewheel touchmove", function (e) {
    if (e.type == "scroll" || e.type == "mousewheel") {}
    mobileAnimating();
});