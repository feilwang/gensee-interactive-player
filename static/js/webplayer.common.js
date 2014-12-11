/**
 * webplayer common
 * Author: Feil.Wang
 * Date: 2013.07
 */


$(function(){
	webplayer.init();
	$(window).resize(function(e){
		if(e.target.tagName == undefined){
			webplayer.resizeInit();
			$( ".control-container,.video-container,.ppt-container" ).draggable("enable");
			$( ".control-container,.video-container,.ppt-container" ).resizable("enable");
		}
	});

	//表情操作
	$(".phiz-btn").click(function(e){
		e.stopPropagation();
		var self = $(this);
		var phizList = $("#phizList");
		if(self.hasClass("phiz-open")){
			phizList.hide();
			self.removeClass("phiz-open");
		}else{
			phizList.show();
			self.addClass("phiz-open");
		}
		openChatSubmitArea();
	});
	$("#phizList a").click(function(){
		$("#phizList").hide();
		$(".phiz-btn").removeClass("phiz-open");
	});

	//聚焦展开聊天操作区域
	$(".edit-area").focus(function(){
		openChatSubmitArea();
	});

	//选择聊天对象
	$(".select-box").click(function(){
		if($(".select-option").css("display")=="none"){
			$(".select-option").slideDown(function(){
				$(this).css("overflow","auto")
			});
		}else{
			$(".select-option").slideUp();
		}
	});
	$(".select-option li").click(function(e){
		var name = $(this).text();
		$("#selectedName").text(name);
		$(".select-option").slideUp();
		e.stopPropagation()
	});

	$(document.body).click(function(e){
		var target = $(e.target);
		if(target.closest(".select-box").length == 0){
			$(".select-option").slideUp();
		}
		if(target.closest(".shortcut-1").length == 0){
			$(".quick-layout-tips").animate({
				"width" : "0px"
			},300);
		}
		if(target.closest("#phizList").length == 0){
			$("#phizList").hide();
			$(".phiz-btn").removeClass("phiz-open");
		}
	});

	//窗口拖拽
	$( ".main > div" ).draggable({
		containment: ".web",
		handle: ".comm-title",
		cursor: "move",
		stack: ".main > div"
	});
	//文字直播拖拽
	$( ".text-live-container" ).draggable({
		containment: ".web",
		handle: ".text-live-left",
		cursor: "move",
		stack: ".main > div"
	});
	//控制条拖拽
	$( ".control-container" ).draggable({
		containment: ".web",
		handle: ".drag-handle",
		cursor: "move",
		stack: ".main > div"
	});

	//窗口大小调整

	$( ".ppt-container" ).resizable({
		containment: ".web",
		minWidth: 188,
		minHeight: 188,
		resize: function( event, ui ) {
			webplayer.pptInnerSize();
		}
	});
	$( ".qa-container" ).resizable({
		containment: ".web",
		minWidth: 188,
		minHeight: 188,
		resize: function( event, ui ) {
			webplayer.qaInnerSize();
		}
	});
	$( ".video-container" ).resizable({
		containment: ".web",
		minWidth: 188,
		minHeight: 188,
		resize: function( event, ui ) {
			webplayer.videoInnerSize();
		}
	});
	$( ".chat-container" ).resizable({
		containment: ".web",
		minWidth: 188,
		minHeight: 188,
		resize: function( event, ui ) {
			webplayer.chatInnerSize();
		}
	});
	$( ".outline-container" ).resizable({
		containment: ".web",
		minWidth: 188,
		minHeight: 188,
		resize: function( event, ui ) {
			webplayer.outlineInnerSize();
		}
	});
	$( ".control-container" ).resizable({
		containment: ".web",
		minWidth: 188,
		minHeight:48,
		maxHeight:48,
		resize: function( event, ui ) {
			if(ui.size.width<=315 && ui.size.width >235){
				ui.element.addClass("control-main-mini-lv1");
				ui.element.removeClass("control-main-mini-lv2");
			}else if(ui.size.width<=235){
				ui.element.addClass("control-main-mini-lv2");
				ui.element.removeClass("control-main-mini-lv1");
			}else if(ui.size.width > 315){
				ui.element.removeClass("control-main-mini-lv1");
				ui.element.removeClass("control-main-mini-lv2");
			}
		}
	});

	//模拟播放、暂停
	$("#playBtn").click(function(){
		if($(this).hasClass("btn-play")){
			$(this).attr({
				"class" : "btn-pause",
				"title" : "暂停"
			});
		}else{
			$(this).attr({
				"class" : "btn-play",
				"title" : "播放"
			});
		}
	});

	//模拟关闭、开启视频
	$("#videoCtrlBtn").click(function(){
		if($(this).hasClass("btn-close-video")){
			$(this).attr({
				"class" : "btn-open-video",
				"title" : "打开视频"
			});
		}else{
			$(this).attr({
				"class" : "btn-close-video",
				"title" : "关闭视频"
			});
		}
	});

	//模拟静音
	$("#soundBtn").click(function(){
		if($(this).hasClass("horn-icon")){
			$(this).attr("class","horn-off-icon");
		}else{
			$(this).attr("class","horn-icon");
		}
	});

	//音量滑块
	$( "#volSlider" ).slider({
		value: 50,
		change: function() {
			var val = $( "#volSlider a" ).css("left");
			$( "#volSlider span" ).width(val);
			if(parseInt(val)==0){
				$("#soundBtn").attr("class","horn-off-icon");
			}else{
				$("#soundBtn").attr("class","horn-icon");
			}
		}
	});

	//进度条
	$( "#playerProgressBar").slider({
		value: 30,
		change: function() {
			var style = $( "#playerProgressBar a" ).attr("style").split(":")[1];
			var val = parseInt(style)+"%";
			$( ".progress-bar-elapsed" ).width(val);
		}
	});

	//文字直播选择语言
	$("#selectLang").click(function(){
		var list = $(".lang-list");
		if(list.css("display")=="none"){
			list.slideDown(200);
		}else{
			list.slideUp(200);
		}
	});

	//文字直播区域收缩
	$(".btn-textlive").click(function(){
		var txtLiveBox = $(".text-live-container");
		if(txtLiveBox.hasClass("box-isopen")){
			txtLiveBox.animate({
				width:'25px'
			},200);
			txtLiveBox.removeClass("box-isopen");
		}else{
			txtLiveBox.animate({
				width:'700px'
			},200);
			txtLiveBox.addClass("box-isopen");
		}
	});

	//在线用户
	$("#userList").click(function(){
		var userListDiv = $(".user-list-wrap");
		if(!$(this).hasClass("user-icon-open")){
			userListDiv.show();
			$(this).addClass("user-icon-open");
		}else{
			userListDiv.hide();
			$(this).removeClass("user-icon-open");
		}
	});

	//问答、留言切换
	$(".qa-tabs span").click(function(){
		var index = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".qa-main > div").eq(index).show().siblings().hide();
	});

	//视频文档切换
	$(".btn-switch").bind("click",function(){
		if($(".video-container").hasClass("v-full-screen")||$(".ppt-container").hasClass("ppt-fullscreen")) return;
		switchVideoToPPT(0);
	});

	//窗口最小化及还原
	WidgetMinimize(".ppt-container",".shortcut-2").minimize();
	WidgetMinimize(".video-container",".shortcut-3").minimize();
	WidgetMinimize(".chat-container",".shortcut-4").minimize();
	WidgetMinimize(".qa-container",".shortcut-5").minimize();
	WidgetMinimize(".outline-container",".shortcut-4").minimize();

	//双击全屏
	$("#widget-doc .comm-title").dblclick(function(){
		pptScreenCtrl(1);
	});
	$("#widget-video .comm-title").dblclick(function(){
		videoScreenCtrl();
	});

	//输入框聚焦
	$("#qa-text-area,#leaveMsgText").focus(function(){
		$(this).closest(".ask-input").addClass("focus-border");
	}).blur(function(){
		$(this).closest(".ask-input").removeClass("focus-border");
	});
	$("#chat-area").focus(function(){
		$(this).closest(".chat-input").addClass("focus-border");
	}).blur(function(){
		$(this).closest(".chat-input").removeClass("focus-border");
	});
	$("#leaveMsgEmail").focus(function(){
		$(this).closest(".input-email").addClass("focus-border");
	}).blur(function(){
		$(this).closest(".input-email").removeClass("focus-border");
	});

	$(".user-list li a").click(function(){
		openChatSubmitArea();
	});

	/* 分享、二维码、反馈 */
	$("#sharePopup dt a").click(function(){
		var tab = $(this).parent();
		var otherTab = tab.parent().siblings("dl").children("dt")
		var content = tab.siblings("dd");
		var otherCnt = tab.parent().siblings("dl").children("dd");
		tab.addClass("current");
		otherTab.removeClass("current");
		content.slideDown(300);
		otherCnt.slideUp(300);
	});
	$("#shareSideBtn").click(function(){
		var shareBox = $(this).parent();
		if(shareBox.hasClass("share-show")){
			shareBox.animate({
				"left" : "-215px"
			},300);
			shareBox.removeClass("share-show");
		}else{
			shareBox.animate({
				"left" : 0
			},300);
			shareBox.addClass("share-show");
		}
	});
	$(".fb-textarea,.fb-input").focus(function(){
		var oldValue = $(this).val();
		if(oldValue == this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		var oldValue = $(this).val();
		if(oldValue == ""){
			$(this).val(this.defaultValue);
		}
	});

});

//展开聊天区域
function openChatSubmitArea(){
	var chatSubmitArea = $(".chat-submit");
	chatSubmitArea.slideDown(200,function(){
		webplayer.chatInnerSize();
	});
	$(".chat-operate").addClass("chat-operate-open");
}

//打开快速布局工具条
function openLayoutBar(){
	var $bar = $(".quick-layout-tips");
	var childrenLength = $bar.children().length;
	var barWidth;
	if(childrenLength==2){
		barWidth = "170px";
		$bar.addClass("quick-layout-tips-2");
	}else if(childrenLength==3){
		barWidth = "240px";
		$bar.removeClass("quick-layout-tips-2");
	}
	if($bar.width()==0){
		$bar.animate({
			"width" : barWidth
		},300);
	}else if($bar.width()==240||$bar.width()==170){
		$bar.animate({
			"width" : "0px"
		},300);
	}
}

//遮罩显示
function coverLayerShow(){
	$("#coverLayer").show().css("z-index","990");
}
//遮罩隐藏
function coverLayerHide(){
	$("#coverLayer").hide();
}

//显示点名窗口
function callName(){
	$(".callname-container").show().css("z-index","999");
	coverLayerShow();
}
//隐藏点名窗口
function callNameClose(){
	$(".callname-container").hide();
	coverLayerHide();
}
//显示抽奖窗口
function lotteryShow(){
	$(".lottery-container").show().css("z-index","999");
	lottery();//模拟抽奖
}
//隐藏抽奖窗口
function lotteryClose(){
	$(".lottery-container").hide();
}
//显示附件窗口
function accessoryShow(){
	$(".accessory-container").show().css("z-index","999");
}
//隐藏附件窗口
function accessoryClose(){
	$(".accessory-container").hide();
}
//显示附件窗口
function applyforVioceShow(){
	$(".applyfor-voice-container").show().css("z-index","999");

}
//隐藏附件窗口
function applyforVioceClose(){
	$(".applyfor-voice-container").hide();
}
//显示投票调查窗口
function voteShow(){
	$(".vote-container").show().css("z-index","999");
	coverLayerShow();
}
//隐藏投票调查窗口
function voteClose(){
	$(".vote-container").hide();
	coverLayerHide();
}
//显示投票调结果查窗口
function voteResultShow(){
	$(".vote-result-container").show().css("z-index","999");
	coverLayerShow();
}
//隐藏投票调查结果窗口
function voteResultClose(){
	$(".vote-result-container").hide();
	coverLayerHide();
}
//显示优选网络
function chooseNetShow(){
	$(".choose-net-container").show();
}
//隐藏优选网络
function chooseNetClose(){
	$(".choose-net-container").hide();
}

//模拟抽奖
function lottery(){
	setTimeout(function(){
		$(".lottery-animate").hide();
		$("#lotteryOwner").show();
	},3000)
}

//接受语音，视频窗口居中
function voiceWinPos(){

	var videoBox = $(".video-container");
	if(videoBox.hasClass("v-full-screen")) return;
	var _left = webplayer.winWidth/2 - 200;
	videoBox.find(".player").css("height","100%");
	videoBox.stop(true,true).animate({
		"width" : "400px",
		"height" : "330px",
		"left" : _left,
		"top" : "20%"
	},300,function(){
		webplayer.videoInnerSize();
	}).css({
		"visibility" : "visible",
		"z-index" : "999"
	});
}

//申请互动语音
function applyForVoice(){

	applyforVioceClose();
}


//底部按钮操作
function toggleWidgets(target){
	var $target = $(target);
	if($target.css("visibility") == "hidden"){
		$target.css("visibility","visible");
	}else{
		$target.css("visibility","hidden");
	}
}
//隐藏模块
function hiddenWidgets(target){
	var  $target = $(target);
	$target.css("visibility","hidden");
}

//展开PPT详细信息
function pptInfoShow(){
	var pptInfo = $(".ppt-info");
	if(!pptInfo.hasClass("ppt-info-all")){
		pptInfo.animate({
			"height" : $(".ppt-container").height() - 30
		},300,function(){
			pptInfo.addClass("ppt-info-all");
		});
	}
}
function pptInfoHide(){
	var pptInfo = $(".ppt-info");
	if(pptInfo.hasClass("ppt-info-all")){
		$(".ppt-info-inner").scrollTop(0);
		pptInfo.animate({
			height : 0
		},300,function(){
			pptInfo.removeClass("ppt-info-all");
		});
	}
}

//视频全屏、还原操作
var currentVideoPos = {};//记录视频窗口当前位置
function videoScreenCtrl(){
	var $videoWindow = $(".video-container");
	var $pptWindow = $(".ppt-container");
	if(!$videoWindow.hasClass("v-full-screen")){
		if($pptWindow.hasClass("ppt-fullscreen")){
			pptScreenCtrl(0);//当文档已经是全屏的时候，先退出文档全屏
		}
		$("html").css("overflow","hidden");
		var scrollLeftOffset = $("html").scrollLeft();//获得滚动条左偏移量
		var scrollTopOffset = $("html").scrollTop();//获得滚动条上偏移量
		currentVideoPos._width = $videoWindow.css("width");
		currentVideoPos._height = $videoWindow.css("height");
		currentVideoPos._left = $videoWindow.css("left");
		currentVideoPos._top = $videoWindow.css("top");
		$videoWindow.css({
			"width" : $(window).width(),
			"height" :  $(window).height() + 30,
			"left" : scrollLeftOffset,
			"top" : scrollTopOffset-30,
			"z-index" : 999
		});
		$videoWindow.find("object").css({
			"height" : "100%"
		});
		$videoWindow.addClass("v-full-screen");
		$( ".video-container" ).resizable("disable");
		$(".btn-fullscr").addClass("btn-fullsrc-exit");
		ctrlBarFullPos(1);
		ctrlBarAutoHide();
	}else{
		$("html").css("overflow","auto");
		$videoWindow.css({
			"width" : currentVideoPos._width,
			"height" : currentVideoPos._height,
			"left" : currentVideoPos._left,
			"top" : currentVideoPos._top,
			"z-index" : "auto"
		});

		$videoWindow.removeClass("v-full-screen");
		$( ".video-container" ).resizable("enable");
		$(".btn-fullscr").removeClass("btn-fullsrc-exit");
		ctrlBarFullPos(0);
		ctrlBarAutoHide();
	}
	webplayer.videoInnerSize();
}

//视频文档切换
var currentPptPos = {}; //记录文档窗口当前位置
var changeAnimateStatus = true; //视频文档切换动画完成状态
var lastType = -1; //视频文档为主模式切换的最后一次状态
var currentType = -1; //视频文档为主模式切换的当前状态
function switchVideoToPPT(type){
	/**
	 * type 有0,1,2三种状态
	 * 0为自由切换
	 * 1为文档至主窗口
	 * 2为视频至主窗口
	 */
	lastType = type;
	var $videoWindow = $(".video-container");
	var $pptWindow = $(".ppt-container");
	var pptIsMain = $pptWindow.hasClass("ppt-is-main");

	if(changeAnimateStatus){
		currentType = type;
		changeAnimateStatus = false;
		currentVideoPos._width = $videoWindow.css("width");
		currentVideoPos._height = $videoWindow.css("height");
		currentVideoPos._left = $videoWindow.css("left");
		currentVideoPos._top = $videoWindow.css("top");

		currentPptPos._width = $pptWindow.css("width");
		currentPptPos._height = $pptWindow.css("height");
		currentPptPos._left = $pptWindow.css("left");
		currentPptPos._top = $pptWindow.css("top");

		if(type == 0){
			if(pptIsMain){
				switchFn();
				$pptWindow.removeClass("ppt-is-main");
			}else if(!pptIsMain){
				switchFn();
				$pptWindow.addClass("ppt-is-main");
			}

		}else if(type == 1){
			if(!pptIsMain){
				switchFn();
				$pptWindow.addClass("ppt-is-main");
			}else{
				changeAnimateStatus = true;
			}
		}else if(type == 2){
			if(pptIsMain){
				switchFn();
				$pptWindow.removeClass("ppt-is-main");
			}else{
				changeAnimateStatus = true;
			}
		}

	}else{
		setTimeout(function(){
			if(lastType!=currentType){
				switchVideoToPPT(lastType);
			}
		},150);
	}

	function switchFn(){
		$pptWindow.find(".ppt-main").css("height","100%");
		$videoWindow.find(".player").css("height","100%");
		$pptWindow.animate({
			"width" : currentVideoPos._width,
			"height" : currentVideoPos._height,
			"left" : currentVideoPos._left,
			"top" : currentVideoPos._top

		},300,function(){
			webplayer.pptInnerSize();
			changeAnimateStatus = true;
		});
		//video to main
		$videoWindow.animate({
			"width" : currentPptPos._width,
			"height" : currentPptPos._height,
			"left" : currentPptPos._left,
			"top" : currentPptPos._top

		},300,function(){
			webplayer.videoInnerSize();
			changeAnimateStatus = true;
		});
	}

}


//文档全屏与退出
function pptScreenCtrl(type){
	/**
	 * type == 1 全屏
	 * type == 0 退出全屏
	 */
	var $pptWindow = $(".ppt-container");
	if(type==1){
		$("html").css("overflow","hidden");
		var scrollLeftOffset = $("html").scrollLeft();//获得滚动条左偏移量
		var scrollTopOffset = $("html").scrollTop();//获得滚动条上偏移量
		currentPptPos._width = $pptWindow.css("width");
		currentPptPos._height = $pptWindow.css("height");
		currentPptPos._left = $pptWindow.css("left");
		currentPptPos._top = $pptWindow.css("top");

		$pptWindow.css({
			"width" : $(window).width(),
			"height" :  $(window).height() + 30,
			"left" : scrollLeftOffset,
			"top" : scrollTopOffset-30,
			"z-index" : 999
		});
		$pptWindow.addClass("ppt-fullscreen");
		$pptWindow.resizable("disable");
		ctrlBarFullPos(1);
		ctrlBarAutoHide();
	}else if(type == 0){
		$("html").css("overflow","auto");
		$pptWindow.css({
			"width" : currentPptPos._width,
			"height" : currentPptPos._height,
			"left" : currentPptPos._left,
			"top" : currentPptPos._top,
			"z-index" : "auto"
		});
		$pptWindow.removeClass("ppt-fullscreen");
		$pptWindow.resizable("enable");
		ctrlBarFullPos(0);
		ctrlBarAutoHide();
	}
	webplayer.pptInnerSize();
}

//视频或文档全屏时，控制条位置变动
var curCtrlBarPos = {};
function ctrlBarFullPos(type){
	/**
	 * type == 1 全屏
	 * type == 0 退出全屏
	 */
	var $ctrlBar = $(".control-container");
	if(type == 1){
		curCtrlBarPos._width = $ctrlBar.css("width");
		curCtrlBarPos._left = $ctrlBar.css("left");
		curCtrlBarPos._top = $ctrlBar.css("top");
		curCtrlBarPos._zIndex = $ctrlBar.css("z-index");

		$("html").css("overflow","hidden");
		var scrollLeftOffset = $("html").scrollLeft();//获得滚动条左偏移量
		var scrollTopOffset = $("html").scrollTop();//获得滚动条上偏移量
		$ctrlBar.css({
			"width" : $(window).width(),
			"left" : scrollLeftOffset,
			"top" : scrollTopOffset+$(window).height()-48,
			"z-index" : 9999
		});
		$ctrlBar.addClass("control-fullscreen");
		$ctrlBar.resizable("disable");
		$ctrlBar.draggable("disable");
	}else if( type == 0){
		$("html").css("overflow","auto");
		$ctrlBar.css({
			"width" : curCtrlBarPos._width,
			"left" : curCtrlBarPos._left,
			"top" : curCtrlBarPos._top,
			"z-index" : curCtrlBarPos._zIndex
		});
		$ctrlBar.removeClass("control-fullscreen");
		$ctrlBar.resizable("enable");
		$ctrlBar.draggable("enable");
	}

}

//视频或文档全屏时控制条自动隐藏

function ctrlBarAutoHide(){

	var fullWin = $(".ppt-container,.video-container");
	var ctrlBar = $(".control-container");
	ctrlBar.show();
	if(!ctrlBar.hasClass("control-fullscreen")){ //非全屏状态下
		clearInterval($.time);
	}else{
		fullWin.bind("mousemove",function(){
			if(ctrlBar.hasClass("control-fullscreen")){
				clearInterval($.time);
				ctrlBar.show();
				$.time = setTimeout(function(){
					ctrlBar.hide();
				},3000);
			}
		});
	}
}

/**
 * 窗口最小化及还原动画
 * 参数from为窗口的id或class
 * 参数to为底部快捷按钮的id或class
 */
var WidgetMinimize = function(from,to){
	if(!(this instanceof window.WidgetMinimize)){
		return new window.WidgetMinimize(from,to);
	}
	this.widget = $(from);
	this.cloneDiv = $('<div class="clone-div"></div>');
	this.port = $(to);
	this.minBtn = $(from).find(".close-icon");
	this.restBtn = $(to).children("a");
	this.lastPos = {};
	this.portPos = {};

}
WidgetMinimize.prototype.minimize = function(){
	var that = this;
	var animateFinish = true;
	var getPortPos = function (){
		that.portPos = {
			"left" : that.port.offset().left + 15,
			"top" : that.port.offset().top + 55
		}
	}
	var getLastPos = function (){
		that.lastPos = {
			"width" : that.widget.css("width"),
			"height" : that.widget.css("height"),
			"left" : that.widget.css("left"),
			"top" : that.widget.css("top")
		}
	}
	var miniFn = function(){
		animateFinish = false;
		getLastPos();
		getPortPos();
		that.cloneDiv.css({
			"width" : that.widget.css("width"),
			"height" : that.widget.css("height"),
			"left" : that.widget.css("left"),
			"top" : that.widget.css("top")
		});

		$(".main").append(that.cloneDiv);
		that.widget.css({"visibility" : "hidden"});
		that.cloneDiv.animate({
			"width" : 20,
			"height" : 0,
			"left" : that.portPos.left,
			"top" : that.portPos.top
		},500,function(){
			that.cloneDiv.remove();
			animateFinish = true;
		});
	}
	var restFn = function(){
		animateFinish = false;
		getLastPos();
		getPortPos();
		that.cloneDiv.css({
			"width" : 55,
			"height" : 0,
			"left" : that.portPos.left,
			"top" : that.portPos.top
		});

		$(".main").append(that.cloneDiv);
		that.cloneDiv.animate({
			"width" : that.lastPos.width,
			"height" : that.lastPos.height,
			"left" : that.lastPos.left,
			"top" : that.lastPos.top
		},500,function(){
			that.cloneDiv.remove();
			that.widget.css({"visibility" : "visible"});
			animateFinish = true;
		});
	}

	that.minBtn.bind("click",miniFn);
	that.restBtn.bind("click",function(){
		if($("#shortcutList").hasClass("shortcut-disable")) return;
		if(that.widget.css("visibility") == "hidden" && animateFinish){
			restFn();
		}else if(that.widget.css("visibility") == "visible" && animateFinish ){
			miniFn();
		}

	});
}


/**
 * Cookie plugin
 *
 */
jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

//获取窗口最后的大小和位置等CSS
function getWidgetLastCss(){

	var widgetLastCss = {
		pptCss : {
			"visibility" : $(".ppt-container").css("visibility"),
			"width" : $(".ppt-container").css("width"),
			"height" : $(".ppt-container").css("height"),
			"z-index" : $(".ppt-container").css("z-index")
		},
		pptAnim : {
			"left" : $(".ppt-container").css("left"),
			"top" : $(".ppt-container").css("top")
		},
		pptIsMain : $(".ppt-container").hasClass("ppt-is-main"),
		pptIsFullScreen : $(".ppt-container").hasClass("ppt-fullscreen"),
		qaCss : {
			"visibility" : $(".qa-container").css("visibility"),
			"z-index" : $(".qa-container").css("z-index")
		},
		qaAnim : {
			"width" : $(".qa-container").css("width"),
			"height" : $(".qa-container").css("height"),
			"left" : $(".qa-container").css("left"),
			"top" : $(".qa-container").css("top")
		},
		videoCss : {
			"visibility" : $(".video-container").css("visibility"),
			"width" : $(".video-container").css("width"),
			"height" : $(".video-container").css("height"),
			"z-index" : $(".video-container").css("z-index")
		},
		videoAnim : {
			"left" : $(".video-container").css("left"),
			"top" : $(".video-container").css("top")
		},
		videoIsFullScreen : $(".video-container").hasClass("v-full-screen"),
		chatCss : {
			"visibility" : $(".chat-container").css("visibility"),
			"z-index" : $(".chat-container").css("z-index")
		},
		chatAnim : {
			"width" : $(".chat-container").css("width"),
			"height" : $(".chat-container").css("height"),
			"left" : $(".chat-container").css("left"),
			"top" : $(".chat-container").css("top")
		},
		outlineCss : {
			"visibility" : $(".outline-container").css("visibility"),
			"z-index" : $(".outline-container").css("z-index")
		},
		outlineAnim : {
			"width" : $(".outline-container").css("width"),
			"height" : $(".outline-container").css("height"),
			"left" : $(".outline-container").css("left"),
			"top" : $(".outline-container").css("top")
		},
		textLiveCss : {
			"left" : $(".text-live-container").css("left"),
			"top" : $(".text-live-container").css("top"),
			"z-index" : $(".text-live-container").css("z-index")
		},
		ctrlBarCss : {
			"width" : $(".control-container").css("width")
		},
		ctrlBarAnim : {
			"left" : $(".control-container").css("left"),
			"top" : $(".control-container").css("top")
		}
	}

	//对象转为字符串
	var strWidgetLastCss = JSON.stringify(widgetLastCss);
	return strWidgetLastCss;
}

//关闭浏览器或刷新页面保存cookie
/*if(navigator.userAgent.indexOf("Firefox")>0){
	window.onbeforeunload=function (){
		setCookie();
	}
}else{
	window.onunload=function (){
		setCookie();
	}
}*/

/**
 * 问答聊天时新内容默认自动滚至底部
 */

(function($){
	$.fn.scrollTo = function(options){
		var defaults = {
			to : "bottom"   //"top":滚至顶部,"bottom":滚至底部
		}
		var opts = $.extend({},defaults,options);
		return this.each(function(){
			var self = $(this);
			var parent = self.parent();
			var height = self.outerHeight();
			switch (opts.to){
				case "bottom":
					parent.scrollTop(height);
					break;
				case "top":
					parent.scrollTop(0);
					break;
				default :
					console.log(opts.to);
			}
		});
	}
})(jQuery);

/*WEB 语音*/
$(function(){
	//WEB语音音量滑块
	$( "#webvoiceVolSlider" ).slider({
		value: 50,
		range: "min",
		change: function() {
		}
	});

	$("#webVoiceSettingBtn").click(function(){
		var dialog = $("#webVoiceWorking");
		if(dialog.hasClass("webvoice-widget-show")){
			dialog.removeClass("webvoice-widget-show");
		}else{
			dialog.addClass("webvoice-widget-show");
		}

	});
});

function webVoiceDeviceAccredit(){
	var dialog = $("#webVoiceWorking");
	dialog.addClass("webvoice-step-2").removeClass("webvoice-step-1");
}