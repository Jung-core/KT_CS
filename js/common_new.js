// var vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty("--vh", "${vh}px");
var winW = $(window).width();
var wid_mobile = 1024;

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


$(document).on("mouseenter",".gnb .depth01",function(){
	if(winW <= wid_mobile) return;
	var header = $("header");
	header.addClass("active");
	header.find(".depth02").stop().slideDown(300,function(){
	header.find(".depth02").css("height","auto");
	});
});
	
$(document).on("mouseleave","header",function(){
		if($(this).hasClass("sitemap")) return; // 20220318 수정사항
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
	if(winW > wid_mobile){ 
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
		}else{
			$("header").addClass("active");			
			$("nav").css("display","block");
			$(this).addClass("mo-close");
			$("body").addClass("mo-deactive");
			$(".headerInner h1").addClass("mo-logo");
		}
});

/* 20220318 수정사항 - end */
$(document).on("click",".btn-fullmenu.mo-close",function(e){
  if(winW > wid_mobile) return;
  $("header").removeClass("active");
  $("nav").css("display","none");
  $(this).removeClass("mo-close");
  $("body").removeClass("mo-deactive");
  $(".headerInner h1").removeClass("mo-logo");
});
	
$(document).on("click",".btn-fullmenu.pc-close",function(e){
		if($("#fullpage").length > 0){
				// $.fn.fullpage.setAllowScrolling(true);
				// $.fn.fullpage.setKeyboardScrolling(true);
			}
			$("header .depth02").stop().hide();
			$(this).removeClass("pc-close");
			$("body").css("overflow","");
			$("header").removeClass("sitemap active");
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
    $("header").removeClass("active");
    $("navp").css("display","block");
    $(".btn-fullmenu").removeClass("mo-close");
    $("body").removeClass("mo-deactive");
    $(".headerInner h1").removeClass("mo-logo");
    $("header .depth02").hide();
    $("header .depth03").hide();
    $("header .gnb li").removeClass("active");
  }else{
    $("header").removeClass("sitemap active");
    $("nav").css("display","none");
  }
  /* 20220318 수정사항 - end */
});

$(document).ready(function(){
	animating();
});
