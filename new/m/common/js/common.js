
contentsOnLoad          = function(){}; //loading complete
contentsReady           = function(){}; //loading complete after stage view
loadingAnimationRemove  = function(){};

preloaderShow           = function(){};
preloaderHide           = function(){};

cookieGet               = function(){};

var cookieName  = 'cookie_opt',
    cookieValue = 'in';

(function (window, $) {

    // $(window).on('load', function() {
    //    new FastClick(document.body);
    // }, false);

    var mod,modCSSAnimations,modCSSTransforms,modCSSTransitions,modTouch,modAnim;
        
    var $window   = $(window),
        $document = $(document);

    var $loadingWrap,
        $loading;

    var isHome       = $('body').hasClass('at-home');

    $document.ready(function(){
        mod                 = window.Modernizr;
        modCSSAnimations    = mod && mod.cssanimations;
        modCSSTransforms    = mod && mod.csstransforms;
        modCSSTransitions   = mod && mod.csstransitions;
        modTouch            = mod && mod.touch;
        modAnim             = modCSSAnimations && modCSSTransitions;

        $loadingWrap        = $('#loading-wrap');
        $loading            = $('#loading');

        imgLoad();

        // var _cookiePageUrl = '/global/cookie.html';
        // // var _cookieTxt     = 'Our website uses cookies to enhance your user experience and by continuing to use this website without changing your settings, you consent to their use. To find out more about the cookies, please see our Cookies Policy.';
        // var _cookieTxt     = 'Our website uses cookies and similar tools to improve its performance and enhance your user experience and by continuing to use this website without changing your settings, you consent to their use. To find out more about the cookies we use or how to change your settings, please <a href="'+_cookiePageUrl+'" target="_blank">see our Cookies Policy</a>.';
        
        // if(cookieGet(cookieName)==cookieValue){
        //     // $('.cookie-wrap').remove();
        // }else{
        //     $('body').append('<div class="cookie-wrap"><div class="cookie-cont"><div class="cookie-cont-inner"><p class="cookie-title">USE OF COOKIES</p><p class="cookie-body">'+_cookieTxt+'</p><div class="btn-cookie-apply">CONTINUE</div></div></div></div>');
        // }
    });


/* ******************************************************************************************
    COOKIE    
****************************************************************************************** */

    cookieGet = function(name){
        var _result     = null,
            _cookieName = name + '=',
            _allCookies = document.cookie,
            _position   = _allCookies.indexOf(_cookieName);

        if(_position != -1){
            var startIndex = _position + _cookieName.length;
            var endIndex = _allCookies.indexOf( ';', startIndex );
            if(endIndex == -1){
                endIndex = _allCookies.length;
            }
            _result = decodeURIComponent(_allCookies.substring(startIndex, endIndex));
        }

        return _result;
    };

    function cookieSetup(){
        var _cookieName  = cookieName,
            _cookieValue = cookieValue;
        var _path = "/";

        _cookieName  = encodeURIComponent(_cookieName);
        _cookieValue = encodeURIComponent(_cookieValue);
        document.cookie = _cookieName + "=" + _cookieValue + "; path="+_path;
        // document.cookie = _cookieName + "=" + _cookieValue;

        // document.cookie = "cookie_opt=" + encodeURIComponent("in") ;
    }

    // function cookieRemove(){

    // }


// jQuery imagesLoaded
// https://github.com/desandro/imagesloaded
/* ******************************************************************************************
    LOADER    
****************************************************************************************** */

    function imgLoad(){
        var imgLoader   = imagesLoaded("body"),
            imgTotal    = imgLoader.images.length,
            _progress   = 0,
            _percent    = 0,
            _imgLoaded  = 0;

        preloaderShow();

        imgLoader.on("progress",function(instance,image){
            var result = image.isLoaded ? 'loaded' : 'broken';
            _imgLoaded++;
            _progress   = (_imgLoaded/imgTotal)*100;

            //image load complete
            if(_progress == 100){

            }
        });

        var progressTimer = setInterval(function(){
            _percent += (_progress-_percent)*0.1;
            // $loading.html(parseInt(_percent) + '%');

            if(_percent >= 100){
                //image Load complete
                clearInterval(progressTimer);
                setTimeout(function(){
                    // ------------------------------
                    $('.preload').css({display:'none'});
                    $('.preload').remove();
                    init();
                    setup();
                    // ------------------------------
                    contentsOnLoad();
                    loadingAnimationRemove();
                },50);
                return;
            }
            if(_percent >= 99.9){
                _percent = 100;
            }
        },1000/60);

        loadingAnimationRemove = function(){
            start();
            function start(){
                // $loadingWrap.animate({ opacity: 0 }, 400, 'linear', function(){
                $loadingWrap.animate({ opacity: 0 }, 500, 'linear', function(){
                    contentsReady();
                    $loadingWrap.remove();
                });
            }
        };
    }

    preloaderShow = function(){
        // $loading.html('0%');
        $loadingWrap.animate({ opacity: 1 }, 300);
    };

    preloaderHide = function(){
        $loadingWrap.animate({ opacity: 0 }, 500, function(){
            $loadingWrap.remove();
        });
    };


/* ******************************************************************************************
    INITIALIZE    
****************************************************************************************** */

    var $contents;
    
    function init(){

    }


/* ******************************************************************************************
    SETUP    
****************************************************************************************** */

    function setup(){
        $('#btn-legal')
            .on("click", function() {
                $('.legal-wrap').toggleClass('open').slideToggle(500,'easeInOutQuart');
                $(this).toggleClass('open');
            });

        $('#btn-share')
            .on("click", function() {
                $('.share-wrap').toggleClass('open').slideToggle(500,'easeInOutQuart');
                $(this).toggleClass('open');
            });

        $('.btn-cookie-apply')
            .on("click", function() {
                $('.cookie-wrap').fadeOut('500', function() {
                    cookieSetup();
                    $(this).remove();
                });

                if(!isHome)$('#main').css({overflow:'visible'});
            });

        // $(window).on('touchmove.noScroll', function(e) {
        // $('.menu-mask').on('touchmove.noScroll', function(e) {
        //     e.preventDefault();
        // });

        $('.side-menu-wrap').css(cssTransition(0.65, '.42,.08,.2,1'));
        $('.btn-close').css(cssTranslateScale(0)).css({opacity:0});
        $('.btn-close').css(cssTransition(0.65, '.42,.08,.2,1'));

        for(var i=0; i<$('.side-menu-txt').length; i++){
            $('.side-menu-txt').eq(i).css(cssTransition(0.6 + 0.05*i, '.2,.04,.24,1'));
        }            
    }


/* ******************************************************************************************
    FUNCTION
****************************************************************************************** */


/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */


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


})(this, jQuery);
