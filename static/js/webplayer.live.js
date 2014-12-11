/**
 * webplayer for live
 * Author: Feil.Wang
 * Modified Date: 2014.09.11
 */

;(function(window,undefined){

	window.webplayer = {
		winWidth : "",
		winHeight : "",
		config : {
			top : 20,				//距离顶部的高度
			bottom : 120,			//距离底部的高度
			gap : 15,				//模块之间的间隙
			ctrlHeight : 47, 		//控制条高度 (改动不影响控制条高度，只作为布局参数使用，与CSS里的数值一致)
			ctrlGap : 10,			//控制条与文档之间的间隙
			WH_subVal : 75,			//文档的宽高差值
			textLiveHeight : 60,	//文字直播高度 (改动不影响文字直播高度，只作为布局参数使用，与CSS里的数值一致)
			textLiveLeft : 5,		//文字直播left值
			textLiveBottom : 0,		//文字直播bottm值
			chatIsMain : false,     //是否聊天为主
			pptIsMain : true        //是否文档为主
		},

		init : function(){
			this.winSizeLimit();
			this.bgReSize();
			this.defaultLayout();
			setTimeout(function(){
				$(webplayer).trigger("inited");
			},500);
		},
		resizeInit : function(){
			this.winSizeLimit();
			this.bgReSize();
			this.defaultLayout();
		},
		winSizeLimit : function(){
			var _w = $(window).width(),
				_h = $(window).height();
			if(_w <= 880 && _h <= 550){
				this.winWidth = 880;
				this.winHeight = 550;
				$(document.body).css({
					"width" : 880,
					"height" : 550
				});
			}else if(_w > 880 && _h <= 550){
				this.winWidth = _w;
				this.winHeight = 550;
				$(document.body).css({
					"width" : _w,
					"height" : 550
				});
			}else if(_w <= 880 && _h > 550){
				this.winWidth = 880;
				this.winHeight = 550;
				$(document.body).css({
					"width" : 880,
					"height" : _h
				});
			}else if(_w > 880 && _h > 550){
				this.winWidth = _w;
				if((_w+200)/2-_h>=0){
					this.winHeight = _h;
				}else{
					this.winHeight = (_w+200)/2;
				}
				$(document.body).css({
					"width" : _w,
					"height" : _h

				});
			}


			window.widgetCssOpts = {
				pptCss : {
					"visibility" : "visible",
					"width" : this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal,
					"height" : this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight
				},
				pptAnim : {
					"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal)/2,
					"top" : this.config.top
				},
				pptIsMain : this.config.pptIsMain,
				qaCss : {
					"visibility" : "visible"
				},
				qaAnim : {
					"width" : (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2,
					"height" : this.winHeight- this.config.top - this.config.bottom,
					/** qa的left=（doc的left)-(qa的width)- 模块间隙 **/
					"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal)/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2 - this.config.gap,
					"top" : this.config.top
				},
				videoCss : {
					"visibility" : "visible",
					"width" : (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2,
					"height" : (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2
				},
				videoAnim : {
					/** video的left=（doc的left)+(doc的width)+ 模块间隙 **/
					"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal)/2 + this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal + this.config.gap,
					"top" : this.config.top
				},
				chatCss : {
					"visibility" : "visible"
				},
				chatAnim : {
					"width" : (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2,
					"height" :(this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2,
					"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal)/2 + this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal + this.config.gap,
					"top" : this.config.top + (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2 + this.config.gap
				},
				textLiveCss : {
					"left" : this.config.textLiveLeft,
					"top" : _h - this.config.textLiveBottom - this.config.textLiveHeight
				},
				ctrlBarCss : {
					"visibility" : "visible",
					"width" : this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal,
					"z-index" : "auto"
				},
				ctrlBarAnim : {
					"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal)/2,
					"top" : this.config.top + this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.ctrlGap
				}
			}
		},
		bgReSize : function(){
			$("#bgImg").css({
				"width" : $("body").width(),
				"height" : $("body").height()
			});
			$(".web").css({
				"width" : $("body").width(),
				"height" : $("body").height()
			});
		},
		pptSize : function(){
			$(".ppt-container").css(widgetCssOpts.pptCss);
			$(".ppt-container").stop(true,true).animate(widgetCssOpts.pptAnim,500);
			this.pptInnerSize();
		},
		pptMiniSize : function(){
			$(".ppt-container").css(widgetCssOpts.videoCss);
			$(".ppt-container").stop(true,true).animate(widgetCssOpts.videoAnim,500);
			this.pptInnerSize();
		},
		qaSize : function(){
			$(".qa-container").css(widgetCssOpts.qaCss);
			$(".qa-container").stop(true,true).animate(widgetCssOpts.qaAnim,500,function(){
				webplayer.qaInnerSize();
			});
		},
		videoSize : function(){
			$(".video-container").css(widgetCssOpts.videoCss);
			$(".video-container").stop(true,true).stop(true,true).animate(widgetCssOpts.videoAnim,500);
			this.videoInnerSize();
		},
		videoMainSize : function(){
			$(".video-container").css(widgetCssOpts.pptCss);
			$(".video-container").stop(true,true).stop(true,true).animate(widgetCssOpts.pptAnim,500);
			this.videoInnerSize();
		},
		chatSize : function(){
			$(".chat-container").css(widgetCssOpts.chatCss);
			$(".chat-container").stop(true,true).animate(widgetCssOpts.chatAnim,500,function(){
				webplayer.chatInnerSize();
			});
		},
		textLivePos : function(){
			$(".text-live-container").css(widgetCssOpts.textLiveCss);
		},
		ctrlBarPos : function(){
			$(".control-container").css(widgetCssOpts.ctrlBarCss);
			$(".control-container").stop(true,true).animate(widgetCssOpts.ctrlBarAnim,500);
		},
		//问答切换到右边
		qaRightSize : function(noAnimate){
			$(".qa-container").css({"visibility" : "visible"});
			if(noAnimate){
				$(".qa-container").css(widgetCssOpts.chatAnim);
				webplayer.qaInnerSize();
			}else{
				$(".qa-container").stop(true,true).animate(widgetCssOpts.chatAnim,500,function(){
					webplayer.qaInnerSize();
				});
			}
		},
		//聊天切换到左边
		chatLeftSize : function(noAnimate){
			$(".chat-container").css({"visibility" : "visible"});
			if(noAnimate){
				$(".chat-container").css(widgetCssOpts.qaAnim);
				webplayer.chatInnerSize();
			}else{
				$(".chat-container").stop(true,true).animate(widgetCssOpts.qaAnim,500,function(){
					webplayer.chatInnerSize();
				});
			}
		},

		//模块内部尺寸调整（这些动态值由该模块自身高度减去一些内部固定的元素高度的总和得到）
		pptInnerSize : function(){
			$(".ppt-main").height(0);
			$(".ppt-main,.ppt-info-all").css({
				"height" : $(".ppt-container").height() - 30
			});
			$(".ppt-info-inner").css({
				"height" : $(".ppt-container").height() - 76
			});
		},
		qaInnerSize : function(){
			$("#qa-list").height(0);
			$("#qa-list").css({
				"height" : $(".qa-container").height() -128
			});
		},
		videoInnerSize : function(){
			$(".player").height(0);
			$(".player").css({
				"height" : $(".video-container").height() - 30
			});
		},
		chatInnerSize : function(){
			$(".chat-cnt").height(0);
			if($(".chat-operate").hasClass("chat-operate-open")){
				$(".chat-cnt").css({
					"height" : $(".chat-container").height() -135
				});
			}else{
				$(".chat-cnt").css({
					"height" : $(".chat-container").height() -106
				});
			}
		},

		//默认布局
		defaultLayout : function(){
			$("#shortcutList").removeClass("shortcut-disable");
			if(widgetCssOpts.pptIsFullScreen || widgetCssOpts.videoIsFullScreen){
				webplayer.resizeInit();
			}else{
				if(this.config.pptIsMain){
					this.pptSize();
					this.videoSize();
				}else{
					this.pptMiniSize();
					this.videoMainSize();
				}
				this.textLivePos();
				this.ctrlBarPos();
				if(this.config.chatIsMain){
					this.qaRightSize();
					this.chatLeftSize();
				}else{
					this.qaSize();
					this.chatSize();
				}
				$(".chat-container").removeClass("left-right-changed");

				$(".ppt-container")
					.addClass(widgetCssOpts.pptIsMain ? "ppt-is-main" :"")
					.removeClass("ppt-fullscreen")
					.css("z-index","auto");
				$(".video-container")
					.removeClass("v-full-screen")
					.css("z-index","auto");
				$(".control-container").removeClass("control-fullscreen");
				ctrlBarAutoHide();//视频或文档全屏时resize浏览器，重新执行控制条自动隐藏方法，以便退出全屏时，不再自动隐藏
			}
		},

		//左右互换
		leftRightChange : function(noAnimate){
			$("#shortcutList").removeClass("shortcut-disable");
			var chatPosLeft = $(".chat-container").offset().left;
			var qaPosLeft = $(".qa-container").offset().left;
			if((chatPosLeft==0&&qaPosLeft<$(window).width()/2)||chatPosLeft>qaPosLeft){
				this.qaRightSize(noAnimate);
				this.chatLeftSize(noAnimate);
			}else{
				this.qaSize();
				this.chatSize();
			}
			if(this.config.pptIsMain){
				this.pptSize();
				this.videoSize();
				$(".ppt-container").addClass("ppt-is-main");
			}else{
				this.pptMiniSize();
				this.videoMainSize();
				$(".ppt-container").removeClass("ppt-is-main");
			}
			this.ctrlBarPos();
			this.config.chatIsMain = !this.config.chatIsMain;
		},

		//简易布局
		easyLayout : function(){
			$("#shortcutList").addClass("shortcut-disable");
			$(".qa-container,.chat-container").css({"visibility" : "hidden"});
			$(this.config.pptIsMain?".ppt-container":".video-container").css(widgetCssOpts.pptCss);
			$(this.config.pptIsMain?".ppt-container":".video-container").stop(true,true).animate({
				"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal + this.config.gap + (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2)/2,
				"top" : this.config.top
			},500);
			if(this.config.pptIsMain){
				$(".ppt-container").addClass("ppt-is-main");
			}else{
				$(".ppt-container").removeClass("ppt-is-main");
			}
			$(this.config.pptIsMain?".video-container":".ppt-container").css(widgetCssOpts.videoCss);
			$(this.config.pptIsMain?".video-container":".ppt-container").stop(true,true).animate({
				"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal + this.config.gap + (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2)/2 + widgetCssOpts.pptCss.width + this.config.gap ,
				"top" : this.config.top
			},500);
			$(".control-container").css({
				"width" : widgetCssOpts.chatAnim.width
			});
			$(".control-container").stop(true,true).animate({
				"left" : this.winWidth/2 - (this.winHeight- this.config.top - this.config.bottom - this.config.ctrlGap - this.config.ctrlHeight + this.config.WH_subVal + this.config.gap + (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2)/2 + widgetCssOpts.pptCss.width + this.config.gap,
				"top" : this.config.top + (this.winHeight- this.config.top - this.config.bottom - this.config.gap)/2 + this.config.gap
			},500);
			this.pptInnerSize();
			this.videoInnerSize();
		}
	}
})(window);
