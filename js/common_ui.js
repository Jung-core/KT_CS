var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
var winW = $(window).width();
var wid_mobile = 1400;

//팝업 함수
function openPop(el){
  var target = $(el);
  target.stop().fadeIn(200);
  if($("#fullpage").length > 0){
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
  }
  if($(".dimmed").length > 0){

  }else{
    var dimmed = '<div class="dimmed"></div>';
    $("body").css("overflow","hidden").append(dimmed);
  }
}
function closePop(el){
  var target = $(el);
  if(!target) target = $(".layer-pop");
  target.stop().fadeOut(200);
  $("body").css("overflow","");
  if($("#fullpage").length > 0){
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);//푸터 패밀리 사이트
    function toggleFamilySite(){
      var target = $(".family-site");
      if(target.hasClass("active")){
        target.removeClass("active");
      }else{
        target.addClass("active");
      }
    }
  }
  $(".dimmed").remove();
}

//푸터 패밀리 사이트
function toggleFamilySite(){
  var target = $(".family-site");
  if(target.hasClass("active")){
    target.removeClass("active");
  }else{
    target.addClass("active");
  }
}

//스크롤 애니메이팅
var animating = function(){
	var pointer = $(window).scrollTop() + $(window).height();
	var objs = $(".is-animated");
  if(objs.length == 0) return;

	objs.each(function(){
		if(pointer > $(this).offset().top + 100 &&
		pointer < $(this).offset().top + $(this).height() + $(window).height()){
			$(this).addClass("animated "+$(this).data("ani"));
		}
	});
}

// 스크롤 시 라운딩박스 확장
function expandedInit(){
  if($(".expand-wrap").length > 0){
    $(".expand-wrap").addClass("expanded complete");
    $(".expand-wrap .ep-sect").eq(0).find(".img-box").css({
      "height": "100%"
    });
  }
}

$(document).on("click",".btn-popup",function(){
  var target = $(this).attr("href");
  openPop(target);
});
$(document).on("click",".close-pop",function(){
  var thisLayer = $(this).closest(".layer-pop");
  var target = "#"+thisLayer.attr("id");
  closePop(target);
});

$(document).on("mouseenter",".gnb .depth01",function(){
  if(winW <= wid_mobile) return;
  var header = $("#header");

  header.addClass("active");
  header.find(".depth02").stop().slideDown(300,function(){
    header.find(".depth02").css("height","auto");
  });
});

$(document).on("mouseleave","#header",function(){
  if($(this).hasClass("sitemap")) return; // 20220318 수정사항
  if(winW <= wid_mobile) return;
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
  if($("header").hasClass("sitemap") == false){
    if(list.hasClass("active")){
      list.removeClass("active");
      list.find(".depth03").slideUp();
    }else{
      allDepth02.find("li").removeClass("active");
      allDepth02.find(".depth03").slideUp();
      list.addClass("active");
      list.find(".depth03").slideDown();
    }
  }
  
});
$(document).on("click",".sub-wrap .cate-dep03 .mo-menu",function(e){
  var dep03 = $(this).closest(".cate-dep03");
  var opt = dep03.find("ul");
  if(dep03.hasClass("opened")){
    dep03.removeClass("opened");
    opt.stop().slideUp(300,function(){
      opt.removeAttr("style");
    });
  }else{
    dep03.addClass("opened");
    opt.stop().slideDown(300);
  }
});
$(document).on("click",".btn-top",function(e){
  $("html").animate({
    "scrollTop":"0"
  },600);
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
      $('.btn-top.sub').fadeIn(500);
  } else {
      $('.btn-top.sub').fadeOut('slow');
  }
});

/* 20220318 수정사항 - start */
$(document).on("click",".btn-fullmenu",function(e){
  if(winW > wid_mobile){
    $("#header").addClass("active sitemap");
    if($("#fullpage").length > 0){
      $.fn.fullpage.setAllowScrolling(false);
      $.fn.fullpage.setKeyboardScrolling(false);
    }
    $("body").css("overflow","hidden");
    $("#header").find(".depth02").stop().slideDown(300,function(){
      $("#header").find(".depth02").css("height","auto");
    });
    $(this).addClass("pc-close");
  }else{
    $("#header").addClass("active");
    /*
    $(".menu-wrap").stop().animate({
      "left":"0%"
    },400);*/
    $(".menu-wrap").css("display","block");
    $(this).addClass("mo-close");
    $("body").addClass("mo-deactive");
    $("#header .logo").addClass("mo-logo");
  }
});
/* 20220318 수정사항 - end */
$(document).on("click",".btn-fullmenu.mo-close",function(e){
  if(winW > wid_mobile) return;
  $("#header").removeClass("active");
  $(".menu-wrap").css("display","none");
  $(this).removeClass("mo-close");
  $("body").removeClass("mo-deactive");
  $("#header .logo").removeClass("mo-logo");
});
/* 20220318 수정사항 - start */
$(document).on("click",".btn-fullmenu.pc-close",function(e){
  if(winW > wid_mobile) {
    if($("#fullpage").length > 0){
      $.fn.fullpage.setAllowScrolling(true);
      $.fn.fullpage.setKeyboardScrolling(true);
    }
    $("#header .depth02").stop().hide();
    $(this).removeClass("pc-close");
    $("body").css("overflow","");
    $("#header").removeClass("sitemap active");
  }
});
/* 20220318 수정사항 - end */
$(document).on("click",".btn-folding",function(e){
  var list = $(this).closest("li");
  if(list.hasClass("active")){
    list.removeClass("active");
  }else{
    list.addClass("active");
  }
});
$(".depth03.slide-x li a").on("click", function(e){
  
  if(winW > wid_mobile) return;
  $("#header").removeClass("active");
  
  $(".btn-fullmenu").removeClass("mo-close");
  $("body").removeClass("mo-deactive");
  $("#header .logo").removeClass("mo-logo");
});
$(".no-slide").on("click", function(e){
  e.preventDefault();
});
$(".cate-dep03 ul li a").on("click", function(){
  $(".cate-dep03").removeClass("opened");
  if(winW < wid_mobile){
    $(".cate-dep03").removeClass("opened");
    $(".cate-dep03 ul").css("display", "none");
  }
  
});
$(window).on("scroll mousewheel touchmove",function(e){
	if(e.type == "scroll" || e.type == "mousewheel"){
	}
  animating();
});
$(window).resize(function(){
  winW = $(window).width();
  /* 20220318 수정사항 - start */
  if(winW > wid_mobile){
    $("#header").removeClass("active");
    $(".menu-wrap").css("display","block");
    $(".btn-fullmenu").removeClass("mo-close");
    $("body").removeClass("mo-deactive");
    $("#header .logo").removeClass("mo-logo");
    $("#header .depth02").hide();
    $("#header .depth03").hide();
    $("#header .gnb li").removeClass("active");
  }else{
    $("#header").removeClass("sitemap active");
    $(".menu-wrap").css("display","none");
  }
  /* 20220318 수정사항 - end */
});
$(document).ready(function(){
	animating();
});
