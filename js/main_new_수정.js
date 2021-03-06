
$(document).ready(function(){
    if ($(window).width() > 1200){
        $('#fullpage').fullpage({
            sectionSelector: 'section',
            anchors: ['visual', 'business', 'value01', 'value02', 'news', 'footer'],
            menu: '#menu',
            responsiveWidth:1000,
            responsiveHeight:300,
            recordHistory: true,
            animateAnchor: false,
            afterLoad: function (anchorLink, index,destination) {
                if (destination) {
                    $('#menu').show();
                    $('#menu a').removeClass("color");
                    $('header').removeClass('white');
                    $('.gnb>li>a').removeClass('on');
                    $(".utill>ul>li>a").removeClass("on");
                    $(".utill .btn-fullmenu").removeClass("on");
                    // $('.btn-top').removeClass('show')
                }
                if(index==2){
                    $('.logo').addClass('on');		
                    $('.gnb>li>a').addClass('on');
                    $(".utill>ul>li>a").addClass("on");
                    $(".utill .btn-fullmenu").addClass("on");
                    $("header").addClass("black");
                    // $('.btn-top').addClass('show')
                }
                if(index==3){
                    $('#header').addClass('white');
                    $('#menu a').addClass("color");
                    $('.logo').removeClass('on');	
                    $(".utill>ul>li>a").removeClass("on");
                    $('.btn-top').addClass('show')
                   
                }			
                if (index == 4) {
                    $('.logo').removeClass('on');	
                    // $('.btn-top').addClass('show')
                    setTimeout(function () {
                        $(".value02 .data_box").addClass("event");
                    }, 1000); 
                    $(".utill>ul>li>a").removeClass("on");
                    
                } else {
                    $(".value02 .data_box").removeClass("event");
                }
                if (index == 5) {
                    $(".gnb>li>a").addClass("on");
                    $(".utill>ul>li>a").addClass('on');
                    $(".utill .btn-fullmenu").addClass('on');
                    $('.logo').addClass('on');	
                    // $('.btn-top').addClass('show')
                   
                }
                if (index == 6) {
                    $(".gnb>li>a").addClass("on");
                    $(".utill>ul>li>a").addClass("on");
                    $(".utill .btn-fullmenu").addClass("on");
                    // $('.btn-top').addClass('show')
                    
                }
                
            },
            onLeave: function (index, nextIndex, direction) {
                var $object = $('#fullpage > *:nth-child(' + nextIndex + ')');

                if ($(window).width() > 1200) {
                    $object.find('.obj-animated').each(function (i, item) {
                        var delay = $(item).data('delay');

                        if (isOnce) {
                            // ?????????
                            $(item).addClass('animated ' + $(item).data('ani'));
                            if (delay) $(item).css("animation-delay", delay);
                        } else {
                            // ??????
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

                $(".value02 .data_box").attr("data-nth", "0");
                $(".value02 .data_box>div").removeClass("active");
            }
            // afterResponsive: function(isResponsive){
            // 	$('#header').css('position','absolute');
            // }
        });
    }
    else {
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
    
})

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
	// mobileAnimating();
	swpVisual = new Swiper("#swp-visual-slide", {
		speed: 0,
		effect: 'fade',
		loop: true,
		autoplay: {
				delay:7000
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

$(document).on("mouseenter", ".value02 .data_box.event>div", function () {
    var idx = $(this).index();
    var prt = $(this).closest(".data_box");
    prt.attr("data-nth", idx + 1);
    $(this).addClass("active").siblings("div").removeClass("active");
});

$(document).on("mouseenter", ".foot_imbbox>div>.cont_textdiv a", function () {
    var list = $(this).closest(".foot_imbbox>div");
    var another = list.siblings(".foot_imbbox>div");
    list.removeClass("deactive").addClass("active");
    another.removeClass("active").addClass("deactive");
});

$(document).on("mouseleave", ".value07", function () {
    var lists = $(this).find(".foot_imbbox>div");
    lists.removeClass("active deactive");
});

$(document).on("click",".btn-top",function(e){
    e.preventDefault();
	$.fn.fullpage.moveTo('visual', 0);
});

// var vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty("--vh", `${vh}px`);
// var winW = $(window).width();
// var wid_mobile = 1400;

  
$(document).on("mouseenter",".gnb .depth01",function(){
    var header = $("header");
    header.addClass("active");
    header.find(".depth02").stop().slideDown(300,function(){
    header.find(".depth02").css("height","auto");
    });
});

$(document).on("mouseleave","header",function(){
    if($(this).hasClass("sitemap")) return; // 20220318 ????????????
    var header = $(this);
    header.find(".depth02").stop().slideUp(300,function(){
      header.removeClass("active");
    });
    $(".depth02 li").removeClass("active");
    $(".depth03").stop().slideUp();
});

$(document).on("click",".gnb .depth01",function(){
    if(winW > wid_mobile) return;  
    var list = $(this).closest("li");   
    if(list.find(".depth02").is(":hidden")){
      list.find(".depth02").stop().slideDown(300);
      list.siblings("li").find(".depth02").stop().slideUp(300);       
    }else{
      list.find(".depth02").stop().slideUp(300);
    }
  });

$(document).on("click",".gnb .depth02 .sub",function(){
    var list = $(this).closest("li");
    var allDepth02 = $(".gnb .depth02");
    var th = $('.innerframe').innerHeight(); 
    var gnbbg = $('.gnb_bg');  
    if($("header").hasClass("sitemap") == false){
        if(list.hasClass("active")){
            list.removeClass("active");                     
            list.find(".depth03").slideUp();   
            gnbbg.stop().animate({height:th + 0},300); 
         
        }else{
            allDepth02.find("li").removeClass("active");
            allDepth02.find(".depth03").slideUp();
            list.addClass("active");          
            list.find(".depth03").slideDown();
            gnbbg.stop().animate({height:th + 'px'},300); 
           
        }
    }
});

$(document).on("click",".btn-fullmenu",function(e){
    $("header").addClass("active sitemap");
      if($("#fullpage").length > 0){
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
      }
      $("body").css("overflow","hidden");
      $("header").find(".depth02").stop().slideDown(300,function(){
        $("header").find(".depth02").css("height","auto");
      });
      $(this).addClass("pc-close");
});

$(document).on("click",".btn-fullmenu.pc-close",function(e){
    if($("#fullpage").length > 0){
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
      }
      $("header .depth02").stop().hide();
      $(this).removeClass("pc-close");
      $("body").css("overflow","");
      $("header").removeClass("sitemap active");
 });

 

//?????? ????????? ?????????
function toggleFamilySite(){
    var target = $(".family-site");
    if(target.hasClass("active")){
        target.removeClass("active");
    }else{
        target.addClass("active");
    }
}
