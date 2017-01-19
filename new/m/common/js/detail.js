
(function(){

/* ******************************************************************************************
    LOADING
****************************************************************************************** */

    var stage = WindowSize();

    // $(document).ready(function(){
    // });

    contentsOnLoad = function(){
        // init();
        setup();
        addEvent();

        var _title = "technics-50th";

        // if(sessionStorage.getItem(_title) == null){

        // }else{
        //     sessionStorage.removeItem(_title);
        // }

        try {
            if(sessionStorage.getItem(_title) == null){

            }else{
                sessionStorage.removeItem(_title);
            }
        } catch(e) {
            
        }
    };

    contentsReady = function(){
        // $('.cover-img').css(cssTranslateScale(1));
        // console.log('test');
    };


/* ******************************************************************************************
    INITIALIZE    
****************************************************************************************** */

    // var $wrap, $contents;

    var coverH    = 0;
    var coverOldH = 0;

    // function init(){
    //     // $wrap      = $('#wrap');
    //     // $contents  = $('#contents');
    // }


/* ******************************************************************************************
    SETUP    
****************************************************************************************** */

    function setup(){
        coverH    = stage.height * 0.85;
        coverOldH = stage.height * 0.85;
        $('.cover-wrap').css({height: coverH + 'px'});

        if(cookieGet(cookieName)==cookieValue){
            $('#main').css({overflow:'visible'});
        }else{
            // $('#main').css({overflow:'visible'});
        }

        $('.cover-img img').css({display:'none'});
        $('.cover-img').css(cssTranslateScale(1.2));

        setTimeout(function(){
            var _easing = '.35,.69,.7,1';
            // var _easing = '.34,.04,.3,1';
            $('.cover-img').css(cssTransition(6, _easing));
            $('.cover-img').css(cssTranslateScale(1));
        }, 10);


        $('.btn-menu').on('click',function(){
            $('.side-menu-wrap').css(cssTranslateX('-375px'));
            $('.body-overlay').fadeIn(200, 'linear');
            $('body').css({overflow:'hidden'});
            $('.side-menu-cont').scrollTop(0);

            $('.side-menu-txt').css(cssTranslateX(0));
            $('.btn-close').css(cssTranslateScale(1)).css({opacity:1});
            setTimeout(function(){
                $('.side-menu-cont').css({overflow:'auto'});
            }, 1100);
        });

        $('.btn-close, .body-overlay').on('click',function(){
            $('.side-menu-wrap').css(cssTranslateX(0));
            $('.body-overlay').fadeOut(200, 'linear');
            $('body').css({overflow:'auto'});

            if($('.legal-wrap').hasClass('open')){
                $('.legal-wrap').removeClass('open').slideToggle(100,'linear');
            }

            if($('.share-wrap').hasClass('open')){
                $('.share-wrap').removeClass('open').slideToggle(100,'linear');
            }

            $('.side-menu-btn').removeClass('open');

            // motion
            $('.side-menu-txt').css(cssTranslateX('200px'));
            $('.btn-close').css(cssTranslateScale(0)).css({opacity:0});
            // setTimeout(function(){
                $('.side-menu-cont').css({overflow:'hidden'});
            // }, 200);
        });

        $('.side-menu .generations li').each(function(index) {
            $(this).on('click',function(){
                // if(!scenes.scrollPossible || skipFlg) return;
                var _title = "technics-50th";

                // sessionStorage.setItem(_title, index);

                try {
                    sessionStorage.setItem(_title, index);
                } catch(e) {
                    
                }

                location.href = '../';
            });
        });

        $('.goto-beginning').on('click',function(){
            // if(!scenes.scrollPossible || skipFlg) return;
            var _title = "technics-50th";

            try {
                sessionStorage.setItem(_title, 6);
            } catch(e) {
                
            }

            location.href = '../';
        });
    }


/* ******************************************************************************************
    FUNCTION
****************************************************************************************** */



/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */

    function addEvent(){
        $(window).on('resize', onResize);
        $(window).trigger('resize');

        // $(window).on('scroll', $.throttle(1000 / 15, onScroll));
        $(window).on('scroll', $.throttle(1000 / 60, onScroll));
        onScroll();
    }

    function onResize(){
        stage = WindowSize();

        var _stageW = (stage.width > 375)? 375 : stage.width;
        $('.side-menu-wrap').css({width:_stageW-60 +'px'});

        // coverH
        coverH = stage.height * 0.85;
        if(Math.abs(coverH - coverOldH) > 100){
            coverOldH = coverH;
            $('.cover-wrap').css({height: coverH + 'px'});
        }
        
        onScroll();
    }

    function onScroll(){
        // scrTopValue = $('.contents').scrollTop();
        scrTopValue = $('body').scrollTop();

        if(scrTopValue < stage.height*0.8){
            $('.gheader-bg').css({opacity:0.25});
        }else{
            $('.gheader-bg').css({opacity:1});
        }

        if(scrTopValue < stage.height*0.5){
            $('.cover-wrap').css({opacity:1});
        }else{
            $('.cover-wrap').css({opacity:0.5});
        }
    }

    function WindowSize(){
        var size = { width:0, height:0, halfX:0, halfY:0};
        if (document.documentElement.clientHeight) {
            size.width  = document.documentElement.clientWidth;
            size.height = document.documentElement.clientHeight;
            size.halfX  = document.documentElement.clientWidth * 0.5;
            size.halfY  = document.documentElement.clientHeight * 0.5;
        } else if (document.body.clientHeight) {
            size.width  = document.body.clientWidth;
            size.height = document.body.clientHeight;
            size.halfX  = document.body.clientWidth * 0.5;
            size.halfY  = document.body.clientHeight * 0.5;
        } else if (window.innerHeight) {
            size.width  = window.innerWidth;
            size.height = window.innerHeight;
            size.halfX  = window.innerWidth * 0.5;
            size.halfY  = window.innerHeight * 0.5;
        }
        return size;
    }


/* ******************************************************************************************
    UTIL
****************************************************************************************** */

    function cssTransition(duration, easing){
        var css = duration + 's' + ' cubic-bezier(' + easing + ')';
        return {
            '-webkit-transition' : css,
            '-moz-transition'    : css,
            '-o-transition'      : css,
            '-ms-transition'     : css,
            'transition'         : css
        };
    }

    function cssTranslateX(transX){
        var css3 = 'translateX('+transX+')';
        return{
            '-webkit-transform' : css3,
            '-moz-transform'    : css3,
            '-o-transform'      : css3,
            '-ms-transform'     : css3,
            'transform'         : css3
        };
    }

    function cssTranslateScale(scale){
        var css3 = 'scale('+scale+')';
        return {
            '-webkit-transform' : css3,
            '-moz-transform'    : css3,
            '-o-transform'      : css3,
            '-ms-transform'     : css3,
            'transform'         : css3
        };
    }


}).call(this);
