/* ************************************************************
 title  : Scroll ver 0.10
 date   : 2014.05
 author : Heowongeun
************************************************************ */
//scroll = new Scroll({speed:1.7, friction:0.89, touchSpeed:10, step:scrolling});

(function () {
    var _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    var getPagePos = function(e){
        var pos, touch;
        pos = {x:0, y:0};
        if("ontouchstart" in window) {
            if (e.touches != null) {
                touch = e.touches[0];
            } else {
                touch = e.originalEvent.touches[0];
            }
            pos.x = touch.clientX;
            pos.y = touch.clientY;
        } else {
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
        return pos;
    };

    var nv  = window.navigator,
        ua  = nv.userAgent.toLowerCase(),
        uas = {
            mac : /mac/i.test(nv['platform']),
            win : /win/i.test(nv['platform']),
            isLtIE9 : /msie\s(\d+)/.test(ua)?RegExp.$1 * 1 < 9:false
        };
    /* *********************************************************
    *  Constructor 
    ********************************************************** */

    function Scroll(option){
        this.config     = {
            target      : document,
            speed       : 1,
            friction    : 0.94,
            touchSpeed  : 5,
            type        : "wheel",
            scrollType  : "y",
            screenFix   : false,
            scrollLimit : 30,
            step        : function(){},
            start       : function(){},
            stop        : function(){},
            touchStart  : function(){},
            touchMove   : function(){},
            touchEnd    : function(){}
        };

        $.extend(this.config,option);
        // this.config.speed = Math.max(0,this.config.speed/1)

        this.offset         = 0;
        this.offsetMax      = 0;
        this.offsetMin      = 0;
        this.isRender       = false;
        this.renderingID;
        this.onRender       = _bind(this.onRender,this);
        
        //wheelEvent
        this.onWheel = _bind(this.onWheel,this);
        // $(this.config.target).bind("mousewheel", this.onWheel);
        $(this.config.target).bind("mousewheel", $.throttle( 10, this.onWheel ) );
        //touchEvent
        this.onTouchStart   = _bind(this.onTouchStart,this);
        this.onTouchMove    = _bind(this.onTouchMove,this);
        this.onTouchEnd     = _bind(this.onTouchEnd,this);

        $(this.config.target).bind("touchstart", this.onTouchStart);
        $(this.config.target).bind("touchmove", this.onTouchMove);
        $(this.config.target).bind("touchend", this.onTouchEnd);
    }

    Scroll.prototype.constructor = Scroll;
    Scroll.prototype.init = function(){

    };

    Scroll.prototype.optionChange = function(option){
        $.extend(this.config,option);
    };

    /* *********************************************************
    *  SCROLL EVENT 
    ********************************************************** */
    // Scroll.prototype.EVENT_TOUCHSTART       = "touch_start";
    // Scroll.prototype.EVENT_TOUCHEND         = "touch_end";

    // Scroll.prototype.EVENT_SCROLLSTART      = "scroll_start";
    // Scroll.prototype.EVENT_SCROLLAFTER      = "scroll_after";

    // Scroll.prototype.event_dispatch = function(event){
        // $(this).trigger(event);
    // }
    /* *********************************************************
    *  Event Handler
    ********************************************************** */
    
    Scroll.prototype.onTouchStart = function(e){
        // $(this).trigger(this.EVENT_TOUCHSTART);
        // e.preventDefault();
        this.touchMoveOffset    = 0;
        this.isTouch            = true;
        this.t_startP           = this.getTouchInfo(e);
        this.startRender();
        this.config.touchStart();
    };

    Scroll.prototype.onTouchMove = function(e){
        if(this.config.screenFix)e.preventDefault();
        this.offset     = 0;
        this.t_moveP    = this.getTouchInfo(e);
        this.touchMoveOffset = this.t_startP.y - this.t_moveP.y;
        this.config.touchMove(this.touchMoveOffset);
    };

    Scroll.prototype.onTouchEnd = function(e){
        this.isTouch = false;
        this.t_moveP.time = new Date().getTime();

        var speed = (this.touchMoveOffset)/(this.t_startP.time - this.t_moveP.time);
        this.offset = -this.config.touchSpeed*speed;
        this.startRender();
        this.config.touchEnd();
    };


    Scroll.prototype.getTouchInfo = function(e){
        if(!this.time)this.time = new Date();
        var info = { x : 0 , y : 0 , time: new Date().getTime()};
        $.extend(info,getPagePos(e));
        return info;
    }

    // console.log(uas);

    Scroll.prototype.onWheel = function(event, delta, deltaX, deltaY){
        var del = 0;
        // console.log("del");
        if(uas.isLtIE9){
            del = delta;
        }else{
            switch(this.config.scrollType){
                case "x" : del = deltaX; break;
                case "y" : del = deltaY; break;
            }
        }

        if(uas.win)del*=3;
        else del*=0.05;

        // del *= 0.1;

        if(this.config.friction == 0){
            this.config.step(-del);      
        }else{
            if(Math.abs(this.offset)<=this.config.scrollLimit){
                if(del > 0){
                    this.offset -= del*this.config.speed;
                }else if(del < 0){
                    this.offset += -del*this.config.speed;
                }
            }

            this.startRender();
        }
    }

    /* *********************************************************
    *  Rendering
    ********************************************************** */
    Scroll.prototype.startRender = function(){
        if(typeof this.renderingID == 'undefined'){
            // this.event_dispatch(this.EVENT_SCROLLSTART);
            this.config.start();
            this.renderingID = requestAnimationFrame(this.onRender);
        }
    }

    Scroll.prototype.stopRender = function(){
        this.config.stop();
        cancelAnimationFrame(this.renderingID);
        this.renderingID = undefined;
        this.offset = 0;
    }

    Scroll.prototype.onRender = function(){
        if(Math.abs(this.offset) < 0.001){
            this.stopRender();
            this.config.step(this.offset);
            // this.event_dispatch(this.EVENT_SCROLLAFTER);
            return;
        }

        this.offset *= this.config.friction;
        this.config.step(this.offset);
        this.renderingID = requestAnimationFrame(this.onRender);
        if(this.config.stats && !uas.isLtIE9)this.stats();
    }


    /* ************************************************************
        stats
    ************************************************************ */
    Scroll.prototype.stats = function(){
        if(typeof this.scrollStatus == 'undefined'){
            this.scrollStatus = $("<div id='scrollStatus'></div>").prependTo($('body'));
            this.scrollStatus.css({
                'position' : 'absolute',
                'z-index': 1000000,
                'padding': 10,
                'font-size' : 10,
                'font-weight' : 300,
                'text-transform' : 'uppercase',
                'background-color' : 'rgba(255,0,0,.9)',
                'color' : '#fff',
                'width' : 200,
                'letter-spacing' : '0.02em',
                'line-height' : '1.7em',
                'font-family' : 'Helvetica'
            })
        }

        this.scrollStatus.html(
            "scroll type = " + this.config.scrollType + "<br>" +
            "scroll speed = " + this.config.speed + "<br>" +
            "scroll offset = " + this.offset.toFixed(2)
        )
        // console.log(this.scrollStatus.html());
    }
    this.Scroll = Scroll;
}).call(this);



/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});


// requestAnimationFrame polyfill by Erik Möller
// https://gist.github.com/paulirish/1579671
(function(){for(var d=0,a=["ms","moz","webkit","o"],b=0;b<a.length&&!window.requestAnimationFrame;++b)window.requestAnimationFrame=window[a[b]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[a[b]+"CancelAnimationFrame"]||window[a[b]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(b){var a=(new Date).getTime(),c=Math.max(0,16-(a-d)),e=window.setTimeout(function(){b(a+c)},c);d=a+c;return e});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)})})();



