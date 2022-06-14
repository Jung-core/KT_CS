var onlyEngNum = /^[a-z A-Z 0-9 -]+$/;
var onlyEngKorNum = /[a-z A-Z 0-9 (가-힣)]+$/;
var isSpace = /[\s]/g;

$(function(){
	$('body').on('propertychange change keyup paste input', '.only_num', function(){
		var val = $(this).val().replace(/[^0-9.\-]/g, '');

		if(val!='-' && (val=='' || isNaN(val))){
			$(this).val('');
		}
		else{
			$(this).val(val);
		}

		if($(this).is('.comma')){
			$(this).val(comma(parseInt('0' + $(this).val())));
		}
	});

	$('body').on('propertychange change keyup paste input', '.only_numchar', function(){
		$(this).val($(this).val().replace(/[^0-9]/g, ''));
	});
});

function trySearch(f){
	var f = document.getElementById(f);

	f.submit();
}

function disableKey(obj){
	if($(obj).attr("readonly")){
		event.returnValue = false;
	}
}

function checkAll(obj_all, obj, check){
	if(check==1){
		$("#" + obj_all).prop("checked", true);
	}
	else if(check==0){
		$("#" + obj_all).prop("checked", false);
	}

	$("input[name='" + obj + "']").prop("checked", $("#" + obj_all).is(":checked"));
}

function checkAll2(obj_all, obj, check){
	if(check==1){
		$("#" + obj_all).attr("checked", true);
	}
	else if(check==0){
		$("#" + obj_all).attr("checked", false);
	}

	$("[id^=" + obj + "]").attr("checked", $("#" + obj_all).is(":checked"));
}

function nextFocus(id, num, next_id){
	if($("#" + id).val().length==num){
		if($("select[name='" + next_id + "']").length){
			$("#" + next_id).focus();
		}
		else{
			$("#" + next_id).select();
		}
	}
}


function goHref(url, target){
	if(!url){
		alert("오픈 준비중입니다.");
		return;
	}

	if(!target){
		location.href = url;
	}
}

function submitHref(action, target, add_param){
	var f = $("#form_href");

	f.empty();

	if(add_param){
		var arr_param;
		var param_info;
		var param_name;
		var param_value;
		var param_obj;

		arr_param = add_param.split("&");

		for(var i=0; i<arr_param.length; i++){
			param_info = arr_param[i].split("=");
			param_name = param_info[0];
			param_value = param_info[1];
			param_obj = f.find("#" + param_name);

			if(param_obj.length){
				param_obj.val(param_value);
			}
			else{
				f.append("<input type='hidden' name='" + param_name + "' id='" + param_name + "' value='" + param_value + "' />");
			}
		}
	}

	f.attr("action", action);

	if(target){
		f.attr("target", target);
	}
	else{
		f.attr("target", "_self");
	}

	f.submit();
}

function submitParam(action, target, add_param){
	var f = $("#form_param");

	if(add_param){
		var arr_param;
		var param_info;
		var param_name;
		var param_value;
		var param_obj;

		arr_param = add_param.split("&");

		for(var i=0; i<arr_param.length; i++){
			param_info = arr_param[i].split("=");
			param_name = param_info[0];
			param_value = param_info[1];
			param_obj = f.find("#" + param_name);

			if(param_value==""){
				param_obj.remove();
			}
			else{
				if(param_obj.length){
					param_obj.val(param_value);
				}
				else{
					f.append("<input type='hidden' name='" + param_name + "' id='" + param_name + "' value='" + param_value + "'>");
				}
			}
		}
	}

	f.attr("action", action);

	if(target){
		f.attr("target", target);
	}
	else{
		f.attr("target", "_self");
	}

	f.submit();
}


function makeParam(add_param){
	var f = $("#form_param");

	if(add_param){
		var arr_param;
		var param_info;
		var param_name;
		var param_value;
		var param_obj;

		arr_param = add_param.split("&");

		for(var i=0; i<arr_param.length; i++){
			param_info = arr_param[i].split("=");
			param_name = param_info[0];
			param_value = param_info[1];
			param_obj = f.find("#" + param_name);

			if(!param_obj.length){
				f.append("<input type='hidden' name='" + param_name + "' id='" + param_name + "' value='" + param_value + "'>");
			}
		}
	}
}

function addParam(f){
	var i;
	var param_name;
	var param_cnt = $("#form_param").children().length;

	for(i=0; i<param_cnt; i++){
		param_name = $("#form_param").children().eq(i).attr("name");

		$("#" + f).find($("input[name=added_param_" + param_name + "]")).remove();
		$("#" + f).append($("#form_param").children().eq(i).clone());
		$("#" + f).find($("input[name=" + param_name + "]")).attr({name:"added_param_" + param_name, id:"added_param_" + param_name});
	}
}

function getCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;

	while(x<=document.cookie.length){
		var y = (x + nameOfCookie.length);

		if(document.cookie.substring(x, y)==nameOfCookie){
			if((endOfCookie=document.cookie.indexOf(";", y))==-1){
				endOfCookie = document.cookie.length;
			}

			return unescape(document.cookie.substring(y, endOfCookie));
		}

		x = document.cookie.indexOf(" ", x) + 1;

		if(x==0){
			break;
		}
	}

	return "";
}

function setCookie(name, value, expiredays){
	var todayDate = new Date(); 
	
	todayDate.setDate(todayDate.getDate() + expiredays); 
	
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
} 

function scroll(id, speed, offset){
	var pos;
	var speed;

	if(id!=""){
		pos = $("#" + id).offset().top + offset;
	}
	else{
		pos = 0;
	}

	$('html, body').animate({
		scrollTop: pos
	}, speed);
}

function ereg(ptrn, string){
	switch(ptrn){
		case "email" :
			ptrn = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
			break;
		case "onlyeng" :
			ptrn = /^[A-Za-z]*$/;
			break;
		case "onlynum" :
			ptrn = /^[0-9]*$/;
			break;
	}

	if(ptrn.test(string)){
		return true;
	}
	else{
		return false; 
	}
}


function mid(str, start, len){
	if(start<0 || len<0){
		return "";
	}

	var iEnd, iLen = String(str).length;
	
	if(start+len > iLen){
		iEnd = iLen;
	}
	else{
		iEnd = start + len;
	}

	return String(str).substring(start, iEnd);
}

function instr(strSearch, charSearchFor){
	for(i=0; i<strSearch.length; i++){
		if(charSearchFor==mid(strSearch, i, String(charSearchFor).length)){
			return i+1;
		}
	}

	return 0;
}

function changeEmail(id){
	if($("#emailList").val()=="manual"){
		$("#" + id).prop("readonly", false);
		$("#" + id).val("");
		$("#" + id).focus();
	}
	else{
		$("#" + id).prop("readonly", true);
		$("#" + id).val($("#emailList").val());
	}
}

function comma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var keep_login = false;
var keep_login_count = 0;

function startKeepLogin(){
	keep_login = setInterval('keepLogin();', 60000);
	
	keepLogin();
}

function keepLogin(){
	$.post(root + '/keepLogin.do',
	{
		count : keep_login_count
	},
	function(data){
		console.log(data);
	});

	keep_login_count ++;

	if(keep_login_count > 300){
		clearInterval(keep_login);
		
		keep_login = false;
	}
}


//처리중 레이어팝업 열기
function openMagnificProgress(){
	$.magnificPopup.open({
		items: {
			src: ".magnific_progress"
			, type: "inline"
		}
		, closeOnBgClick: false
		, showCloseBtn : false
	});

	$('.mfp-bg').css('background-color', '#fff');
}

//레이어팝업 닫기
function closeMagnificPopup(){
	$.magnificPopup.close();
}


function addSuffix(korStr) {
	const finalChrCode = korStr.charCodeAt(korStr.length - 1)
	const finalConsonantCode = (finalChrCode - 44032) % 28
	
	if(finalConsonantCode){
		return korStr + '을';
	}
	else{
		return korStr + '를';
	}
};
