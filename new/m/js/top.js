
(function(){

/* ******************************************************************************************
    LOADING
****************************************************************************************** */

    var stage           = WindowSize();
    var timelineAry     = [0,1,2,3,4,5,6,7,7,8,9,10,10,11,12,13],
        futureTxtDeltaY = 15,
        menuOpFlg       = false,
        _isIOS;

    var txtScrLand0     = 'SCROLL',
        txtScrLand1     = 'GO BACK TO BEGINNING';

    $(document).ready(function(){
        browser3D = Modernizr.csstransforms3d?1:0;
        if(browser3D)css3Init();

        _isIOS = UA.isIOS;
    });

    contentsOnLoad = function(){
        init();
        setup();
        addEvent();
    };

    contentsReady = function(){
        var _title = "technics-50th";

        // if(sessionStorage.getItem(_title) == null){
        //     scenes.gotoScene(1,{duration:1000, ease:'easeInOutQuint'});
        // }else{
        //     var _id = Number(sessionStorage.getItem(_title));
        //     skipMotion(_id);
        //     sessionStorage.removeItem(_title);
        // }

        try {
            if(sessionStorage.getItem(_title) == null){
                scenes.gotoScene(1,{duration:1000, ease:'easeInOutQuint'});
            }else{
                var _id = Number(sessionStorage.getItem(_title));
                skipMotion(_id);
                sessionStorage.removeItem(_title);
            }
        } catch(e) {
            scenes.gotoScene(1,{duration:1000, ease:'easeInOutQuint'});
        }
    };


/* ******************************************************************************************
    INITIALIZE    
****************************************************************************************** */

    var $wrap, $contents,
        $scene,
        $scene1, $scene2, $scene3, $scene4, $scene5, $scene6, $scene7, $scene8, $scene9,
        $scene10, $scene11, $scene12, $scene13, $scene14, $scene15, $scene16, $scene17, $scene18, $scene19,
        $scene20, $scene21, $scene22,
        $scene_future,
        $scrollui, $land_scrollui,
        $timeline, $timeline_year,
        $side_menu_wrap, $side_menu_cont, $side_menu_txt,
        $body_overlay,
        $btn_close,
        $btn_menu,
        $scene1_title, $scene1_btn_play,
        $scene2_lead, $scene2_btn_rediscover,
        $scene18_text_wrap,
        $scene19_text_wrap,
        $scene20_text_wrap,
        $scene21_text_wrap,
        $scene22_text_wrap,
        $history_cont,
        $history_img;


    var scroll, scenes, scenesTotal,
        sceneAry = [],
        menuAry  = [];

    var sceneStartID  = 2;
    var skipFlg       = false;


    function init(){
        $wrap           = $('#wrap');
        $contents       = $('#contents');
        $scene          = $('.scene');
        $scene1         = $('#scene1');
        $scene2         = $('#scene2');
        $scene3         = $('#scene3');
        $scene4         = $('#scene4');
        $scene5         = $('#scene5');
        $scene6         = $('#scene6');
        $scene7         = $('#scene7');
        $scene8         = $('#scene8');
        $scene9         = $('#scene9');
        $scene10        = $('#scene10');
        $scene11        = $('#scene11');
        $scene12        = $('#scene12');
        $scene13        = $('#scene13');
        $scene14        = $('#scene14');
        $scene15        = $('#scene15');
        $scene16        = $('#scene16');
        $scene17        = $('#scene17');
        $scene18        = $('#scene18');
        $scene19        = $('#scene19');
        $scene20        = $('#scene20');
        $scene21        = $('#scene21');
        $scene22        = $('#scene22');
        $scene_future   = $('.scene-future');

        $scrollui       = $('.scrollui');
        $land_scrollui  = $('.land-scrollui');
        $timeline       = $('.timeline');
        $timeline_year  = $('.timeline .year');

        $side_menu_wrap = $('.side-menu-wrap');
        $side_menu_cont = $('.side-menu-cont');
        $side_menu_txt  = $('.side-menu-txt');
        $body_overlay   = $('.body-overlay');
        $btn_close      = $('.btn-close');
        $btn_menu       = $('.btn-menu');

        $scene1_title          = $('#scene1 .title');
        $scene1_btn_play       = $('#scene1 .btn-play');

        $scene2_lead           =  $('#scene2 .lead');
        $scene2_btn_rediscover = $('#scene2 .btn-rediscover');

        $scene18_text_wrap     = $('#scene18 .text-wrap');
        $scene19_text_wrap     = $('#scene19 .text-wrap');
        $scene20_text_wrap     = $('#scene20 .text-wrap');
        $scene21_text_wrap     = $('#scene21 .text-wrap');
        $scene22_text_wrap     = $('#scene22 .text-wrap');

        $history_cont          = $('.history-cont');
        $history_img           = $('.history-img');


        scenesTotal = $scene.length;

        $scene.each(function(index){
            var scene       = $(this),
                menuLink    = scene.hasClass('menu-link');
            if(menuLink)menuAry.push(index+1);
            sceneAry[index] = { section:scene};
        });
    }


/* ******************************************************************************************
    SETUP    
****************************************************************************************** */

    function css3Init(){
        $('#scenes').css(css3DSet(1000,'50%','50%'));
    }

    function setTransitionEasingDR(time){
        var _time = time;

        // default
        var _easing0 = '.25,.1,.25,1';
        // base
        var _easing1 = '.42,.08,.2,1';

        $scene1.css(cssTransition(0.9*_time, _easing1));
        $scene2.css(cssTransition(0.8*_time, _easing1));
        $scene3.css(cssTransition(0.8*_time, _easing1));
        $scene4.css(cssTransition(0.8*_time, _easing1));
        $scene5.css(cssTransition(0.8*_time, _easing1));
        $scene6.css(cssTransition(0.8*_time, _easing1));
        $scene7.css(cssTransition(0.8*_time, _easing1));
        $scene8.css(cssTransition(0.8*_time, _easing1));
        $scene9.css(cssTransition(0.8*_time, _easing1));
        $scene10.css(cssTransition(0.8*_time, _easing1));
        $scene11.css(cssTransition(0.8*_time, _easing1));
        $scene12.css(cssTransition(0.8*_time, _easing1));
        $scene13.css(cssTransition(0.8*_time, _easing1));
        $scene14.css(cssTransition(0.8*_time, _easing1));
        $scene15.css(cssTransition(0.8*_time, _easing1));
        $scene16.css(cssTransition(0.8*_time, _easing1));
        $scene17.css(cssTransition(0.8*_time, _easing1));

        $('.lead').css(cssTransition(1.1*_time, _easing1));
        $('.btn-rediscover').css(cssTransition(1.1*_time, _easing1));
        $scene1_title.css(cssTransition(1.2*_time, _easing1));
        $scene1_btn_play.css(cssTransition(1.2*_time, _easing1));

        $scene18_text_wrap.css(cssTransition(0.8*_time, _easing0));
        $scene19_text_wrap.css(cssTransition(0.8*_time, _easing0));
        $scene20_text_wrap.css(cssTransition(0.8*_time, _easing0));
        $scene21_text_wrap.css(cssTransition(0.8*_time, _easing0));
        $scene22_text_wrap.css(cssTransition(0.8*_time, _easing0));

        $timeline.css(cssTransition(0.8*_time, _easing0));
        $timeline_year.css(cssTransition(0.8*_time, _easing0));
        $('.timeline svg text').css(cssTransition(0.8*_time, _easing0));

        $scrollui.css(cssTransition(0.8*_time, _easing0));
    }

    function setup(){
        scroll = new Scroll({
            target      : '#wrap',
            speed       : 1,
            friction    : 0.5,
            touchSpeed  : 5,
            scrollLimit : 30,
            type        : 'wheel',
            scrollType  : 'y',
            screenFix   : true,
            stats       : false,
            step        : onScroll
        });

        $btn_menu.on('click',function(){
            if(menuOpFlg || !scenes.scrollPossible || skipFlg) return;
            menuOpFlg = true;
            $side_menu_wrap.css(cssTranslateX('-375px'));
            $body_overlay.fadeIn(200, 'linear');
            $side_menu_cont.scrollTop(0);

            $side_menu_txt.css(cssTranslateX(0));
            $btn_close.css(cssTranslateScale(1)).css({opacity:1});
            setTimeout(function(){
                $side_menu_cont.css({overflow:'auto'});
            }, 1100);
        });

        $('.btn-close, .body-overlay').on('click',function(){
            if(!menuOpFlg) return;
            menuOpFlg = false;

            $side_menu_wrap.css(cssTranslateX(0));
            $body_overlay.fadeOut(200, 'linear');

            if($('.legal-wrap').hasClass('open')){
                $('.legal-wrap').removeClass('open').slideToggle(100,'linear');
            }
            if($('.share-wrap').hasClass('open')){
                $('.share-wrap').removeClass('open').slideToggle(100,'linear');
            }

            $('.side-menu-btn').removeClass('open');

            // motion
            $side_menu_txt.css(cssTranslateX('200px'));
            $btn_close.css(cssTranslateScale(0)).css({opacity:0});
            // setTimeout(function(){
                $side_menu_cont.css({overflow:'hidden'});
            // }, 200);
        });

        $('.side-menu .generations li').each(function(index) {
            $(this).on('click',function(){
                if(!scenes.scrollPossible || skipFlg) return;
                skipMotion(index);
            });
        });

        $('.scrollui-hit').on('click',function(){
            if(!scenes.scrollPossible || skipFlg) return;
            if(scenes.scene.current == scenes.scene.total){
                skipMotion(-1);
            }else{
                scenes.nextScene();
            }
        });

        defSetup();
        $scene1.css(cssTranslateRYZ(35,'150%','1500px')).css({opacity:0});
        $scene1_title.css(cssTranslateY('200px'));
        $scene1_btn_play.css(cssTranslateY('400px'));

        setTimeout(function(){
            setTransitionEasingDR(1);
        }, 10);

        sceneSetup();
    }

    function defSetup(){
        $scene.css(cssTranslateRYZ(40,'200%','2000px')).css({opacity:0});
        
        $('.scene .lead').css(cssTranslateY('300px'));
        $('.scene .btn-rediscover').css(cssTranslateY('600px'));

        $scene18.css(cssTranslateY(0)).css({opacity:1});
        $scene18_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));

        $scene19.css(cssTranslateY(0)).css({opacity:1});
        $scene19_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));

        $scene20.css(cssTranslateY(0)).css({opacity:1});
        $scene20_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));

        $scene21.css(cssTranslateY(0)).css({opacity:1});
        $scene21_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));

        $scene22.css(cssTranslateY(0)).css({opacity:1});
        $scene22_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));

        $scene3.css({visibility:'hidden'});
        $scene4.css({visibility:'hidden'});
        $scene5.css({visibility:'hidden'});
        $scene6.css({visibility:'hidden'});
        $scene7.css({visibility:'hidden'});
        $scene8.css({visibility:'hidden'});
        $scene9.css({visibility:'hidden'});
        $scene10.css({visibility:'hidden'});
        $scene11.css({visibility:'hidden'});
        $scene12.css({visibility:'hidden'});
        $scene13.css({visibility:'hidden'});
        $scene14.css({visibility:'hidden'});
        $scene15.css({visibility:'hidden'});
        $scene16.css({visibility:'hidden'});
        $scene17.css({visibility:'hidden'});

        $scene_future.css({display:'none'});

        $timeline.css(cssTranslateY(76-46+'px'));
        $timeline_year.css(cssTranslateScale(0.5));
        $timeline.eq(0).css({opacity:0});
        $timeline.addClass('sm');

        $scrollui.css(cssTranslateY(0));
    }

    function sceneSetup(){
        var _duration = 800;
        scenes = new Scenes({stats:false});
        $(scenes).bind(scenes.EVENT_DELETE_SCROLL, onScrollDelete);

        scenes.addScene( 0, 1000, 'quick', {ease:'linear', duration: _duration,jump:{prev:1}});
        scenes.addScene( 1, 1000, 'quick', {ease:'linear', duration: _duration});

        // --------------------------------------------------

        scenes.addSceneFrameStartActor(0,function(direct){
            if(direct){
                $scene1.css(cssTranslateRYZ(0,0,0)).css({opacity:1});
                $scene1_title.css(cssTranslateY(0));
                $scene1_btn_play.css(cssTranslateY(0));
            }
        });

        scenes.addSceneFrameEndActor(0,function(direct){
            if(!direct){
                // $scene1.css(cssTranslateRYZ(40,'200%','2000px')).css({opacity:0});
                $scene1.css(cssTranslateRYZ(35,'200%','2000px')).css({opacity:0});
                $scene1_title.css(cssTranslateY('200px'));
                $scene1_btn_play.css(cssTranslateY('400px'));

                $land_scrollui.css({opacity:0});
            }else{
                $land_scrollui.css({opacity:1});
            }
        });

        // --------------------------------------------------

        scenes.addSceneFrameStartActor(1, function(direct){
            if(direct){
                $scene1.css(cssTranslateRYZ(-20,'-100%','-8000px')).css({opacity:0});
                $scene1_title.css(cssTranslateY('-50px'));
                $scene1_btn_play.css(cssTranslateY('-100px'));

                $scene2.css(cssTranslateRYZ(0,0,0)).css({opacity:1});
                $scene2_lead.css(cssTranslateY(0)).css({opacity:1});
                $scene2_btn_rediscover.css(cssTranslateY(0)).css({opacity:1});

                var _sceneID = 1  - 1;
                $timeline.eq(_sceneID+0).css(cssTranslateY(-76 * 1 - 46 + 'px')).css({opacity:1}).removeClass('sm');
                $timeline.eq(_sceneID+0).find('.year').css(cssTranslateScale(1));
                $timeline.eq(_sceneID+1).css(cssTranslateY(-76 * 0 - 46 + 'px'));
            }
        });

        scenes.addSceneFrameEndActor(1, function(direct){
            if(!direct){
                $scene1.css(cssTranslateRYZ(0,0,0)).css({opacity:1});
                $scene1_title.css(cssTranslateY(0));
                $scene1_btn_play.css(cssTranslateY(0));

                $scene2.css(cssTranslateRYZ(40,'200%','2000px')).css({opacity:0});
                $scene2_lead.css(cssTranslateY('300px')).css({opacity:0});
                $scene2_btn_rediscover.css(cssTranslateY('600px'));

                var _sceneID = 1  - 1;
                $timeline.eq(_sceneID+0).css(cssTranslateY(-76 *  0 - 46 + 'px')).css({opacity:0}).addClass('sm');
                $timeline.eq(_sceneID+0).find('.year').css(cssTranslateScale(0.5));
                $timeline.eq(_sceneID+1).css(cssTranslateY(-76 *(-1)- 46 + 'px'));
            }
        });

        // --------------------------------------------------

        for(var i=sceneStartID; i<scenesTotal-4; i++){
            var _sceneID = i;
            scenes.addScene( _sceneID, 1000, 'quick', {ease:'linear', duration: _duration});
            standardSceneSetup(_sceneID);
        }

        // --------------------------------------------------

        function standardSceneSetup(sceneID){
            var _sceneID  = sceneID,
                _oldScene = sceneAry[_sceneID-2].section,
                _crtScene = sceneAry[_sceneID-1].section,
                _nxtScene = sceneAry[_sceneID].section;

            scenes.addSceneFrameStartActor(_sceneID, function(direct){
                if(direct){
                    if(!skipFlg){
                        _oldScene.css({visibility:'hidden'});
                        _nxtScene.css({visibility:'visible'});
                    }

                    _crtScene.css(cssTranslateRYZ(-20,'-100%','-8000px')).css({opacity:0});
                    _crtScene.find('.lead').css(cssTranslateY('-100px')).css({opacity:0});
                    _crtScene.find('.btn-rediscover').css(cssTranslateY('-200px')).css({opacity:0});

                    _nxtScene.css(cssTranslateY(0));
                    _nxtScene.css(cssTranslateRYZ(0,0,0)).css({opacity:1});

                    _nxtScene.find('.lead').css(cssTranslateY(0)).css({opacity:1});
                    _nxtScene.find('.btn-rediscover').css(cssTranslateY(0)).css({opacity:1});

                    var _deltaY = 0;
                    if(timelineAry[_sceneID]+1 == 15)_deltaY=51;
                    $timeline.eq(timelineAry[_sceneID  -1 ]-1).css(cssTranslateY(-76 * 2 - 46 + 'px')).css({opacity:0});
                    $timeline.eq(timelineAry[_sceneID  -1 ]+0).css(cssTranslateY(-76 * 1 - 46 + 'px')).removeClass('sm');
                    $timeline.eq(timelineAry[_sceneID  -1 ]+0).find('.year').css(cssTranslateScale(1));
                    $timeline.eq(timelineAry[_sceneID  -1 ]+1).css(cssTranslateY(-76 * 0 - 46 + _deltaY + 'px'));
                }else{
                    if(!skipFlg){
                        _oldScene.css({visibility:'visible'});
                        _nxtScene.css({visibility:'hidden'});
                    }
                }
            });

            scenes.addSceneFrameEndActor(_sceneID, function(direct){
                if(!direct){
                    _crtScene.css(cssTranslateRYZ(0,0,0)).css({opacity:1});
                    _crtScene.find('.lead').css(cssTranslateY(0)).css({opacity:1});
                    _crtScene.find('.btn-rediscover').css(cssTranslateY(0)).css({opacity:1});

                    if(_sceneID != 17){
                        _nxtScene.css(cssTranslateRYZ(40,'200%','2000px')).css({opacity:0});
                        _nxtScene.find('.lead').css(cssTranslateY('300px')).css({opacity:0});
                        _nxtScene.find('.btn-rediscover').css(cssTranslateY('600px'));
                    }

                    $timeline.eq(timelineAry[_sceneID-1  -1 ]+1  -1).css(cssTranslateY(-76 *  1 - 46 + 'px')).css({opacity:1});
                    $timeline.eq(timelineAry[_sceneID-1  -1 ]+1  +0).css(cssTranslateY(-76 *  0 - 46 + 'px')).addClass('sm');
                    $timeline.eq(timelineAry[_sceneID-1  -1 ]+1  +0).find('.year').css(cssTranslateScale(0.5));
                    $timeline.eq(timelineAry[_sceneID-1  -1 ]+1  +1).css(cssTranslateY(-76 *(-1)- 46 + 'px'));
                }
            });
        }

        // --------------------------------------------------

        scenes.addScene( 17, 1000, 'quick', {ease:'linear', duration: _duration});
        scenes.addScene( 18, 1000, 'quick', {ease:'linear', duration: _duration});
        scenes.addScene( 19, 1000, 'quick', {ease:'linear', duration: _duration});
        scenes.addScene( 20, 1000, 'quick', {ease:'linear', duration: _duration});
        scenes.addScene( 21, 1000, 'quick', {ease:'linear', duration: _duration});

        scenes.addSceneFrameStartActor(17, function(direct){
            if(direct){
                $scene17.css(cssTranslateRYZ(-20,'-100%','-8000px')).css({opacity:0});
                $scene17.find('.lead').css(cssTranslateY('-100px')).css({opacity:0});
                $scene17.find('.btn-rediscover').css(cssTranslateY('-200px')).css({opacity:1});

                var _duration = (skipFlg)?0:1000;
                $scene_future.fadeIn(_duration);
                $scene18_text_wrap.css(cssTranslateY(0));

                $('.logo-svg use').css({fill:'#4D4D4D'});
                $('.icon-menu-svg use').css({fill:'#4D4D4D'});
                $btn_menu.css({color:'#4D4D4D'});

                $land_scrollui.css({color:'#333333'});
            }
        });

        scenes.addSceneFrameEndActor(17, function(direct){
            if(!direct){
                $scene17.css(cssTranslateRYZ(0,0,0)).css({opacity:1});
                $scene17.find('.lead').css(cssTranslateY(0)).css({opacity:1});
                $scene17.find('.btn-rediscover').css(cssTranslateY(0)).css({opacity:1});

                var _duration = (skipFlg)?0:800;
                $scene18_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene_future.fadeOut(_duration);

                $('.logo-svg use').css({fill:'#FFFFFF'});
                $('.icon-menu-svg use').css({fill:'#DDDDDD'});
                $btn_menu.css({color:'#ffffff'});

                $land_scrollui.css({color:'#ffffff'});
            }
        });

        // --------------------------------------------------

        scenes.addSceneFrameStartActor(18, function(direct){
            if(direct){
                var _duration = (skipFlg)?0:1000;
                $scene18_text_wrap.css(cssTranslateY(-futureTxtDeltaY + 'px'));
                $scene18.fadeOut(_duration);
                
                $scene19.fadeIn(_duration);
                $scene19_text_wrap.css(cssTranslateY(0));
            }
        });

        scenes.addSceneFrameEndActor(18, function(direct){
            if(!direct){
                var _duration = (skipFlg)?0:800;
                $scene18.fadeIn(_duration);
                $scene18_text_wrap.css(cssTranslateY(0));

                $scene19_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene19.fadeOut(_duration);
            }
        });

        // --------------------------------------------------

        scenes.addSceneFrameStartActor(19, function(direct){
            if(direct){
                var _duration = (skipFlg)?0:1000;
                $scene19_text_wrap.css(cssTranslateY(-futureTxtDeltaY + 'px'));
                $scene19.fadeOut(_duration);
                
                $scene20.fadeIn(_duration);
                $scene20_text_wrap.css(cssTranslateY(0));
            }
        });

        scenes.addSceneFrameEndActor(19, function(direct){
            if(!direct){
                var _duration = (skipFlg)?0:800;
                $scene19.fadeIn(_duration);
                $scene19_text_wrap.css(cssTranslateY(0));

                $scene20_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene20.fadeOut(_duration);
            }
        });

        // --------------------------------------------------

        scenes.addSceneFrameStartActor(20, function(direct){
            if(direct){
                var _duration = (skipFlg)?0:1000;
                $scene20_text_wrap.css(cssTranslateY(-futureTxtDeltaY + 'px'));
                $scene20.fadeOut(_duration);

                $scene21.fadeIn(_duration);
                $scene21_text_wrap.css(cssTranslateY(0));
            }
        });

        scenes.addSceneFrameEndActor(20, function(direct){
            if(!direct){
                var _duration = (skipFlg)?0:800;
                $scene20.fadeIn(_duration);
                $scene20_text_wrap.css(cssTranslateY(0));

                $scene21_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene21.fadeOut(_duration);
            }
        });

        // --------------------------------------------------

        scenes.addSceneFrameStartActor(21, function(direct){
            if(direct){
                var _duration = (skipFlg)?0:1000;
                $scene21_text_wrap.css(cssTranslateY(-futureTxtDeltaY + 'px'));
                $scene21.fadeOut(_duration);

                $scene22.fadeIn(_duration);
                $scene22_text_wrap.css(cssTranslateY(0));

                $scrollui.css(cssTranslateY('-76px'));
                $scrollui.eq(0).css({opacity:0});
                $land_scrollui.html(txtScrLand1);
            }
        });

        scenes.addSceneFrameEndActor(21, function(direct){
            if(!direct){
                var _duration = (skipFlg)?0:800;
                $scene21.fadeIn(_duration);
                $scene21_text_wrap.css(cssTranslateY(0));

                $scene22_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene22.fadeOut(_duration);
                
                $scrollui.css(cssTranslateY(0));
                $scrollui.eq(0).css({opacity:1});
                $land_scrollui.html(txtScrLand0);
            }
        });

        // --------------------------------------------------

        scenes.addScene(22, 1,'normal');

        scenes.addSceneFrameActor(22, 1, 0, function(direction){
            if(direction){
                skipMotion(-1);
                $land_scrollui.css({opacity:0});
            }
        });
    }


/* ******************************************************************************************
    FUNCTION
****************************************************************************************** */

    function skipMotion(id){
        if(!scenes.scrollPossible || skipFlg) return;
        skipFlg = true;
        var _id = (id == -1)? 0 : menuAry[id];
        setTransitionEasingDR(0);
        $contents.css({opacity:0});
        $btn_close.trigger('click');

        var _obj0 = {x: 0};
        $(_obj0).animate({x: 1}, {duration: 600, easing: 'linear',
            complete: function(){
                if(_isIOS){
                    $scene1.css({visibility:'hidden'});
                    $scene2.css({visibility:'hidden'});
                    $scene3.css({visibility:'hidden'});
                    $scene4.css({visibility:'hidden'});
                    $scene5.css({visibility:'hidden'});
                    $scene6.css({visibility:'hidden'});
                    $scene7.css({visibility:'hidden'});
                    $scene8.css({visibility:'hidden'});
                    $scene9.css({visibility:'hidden'});
                    $scene10.css({visibility:'hidden'});
                    $scene11.css({visibility:'hidden'});
                    $scene12.css({visibility:'hidden'});
                    $scene13.css({visibility:'hidden'});
                    $scene14.css({visibility:'hidden'});
                    $scene15.css({visibility:'hidden'});
                    $scene16.css({visibility:'hidden'});
                    $scene17.css({visibility:'hidden'});
                }

                scenes.gotoScene(_id,{duration: 900, ease:'linear'});
            }
        });

        var _obj1     = {x: 0};
        var _duration = (_isIOS)?1600:2000;
        $(_obj1).animate({x: 1}, {duration: _duration, easing: 'linear',
            complete: function(){

                if(_id>1){
                    sceneAry[_id-2].section.css({visibility:'visible'});
                    sceneAry[_id-1].section.css({visibility:'visible'});
                }

                $scene1.css({visibility:'visible'});
                $scene2.css({visibility:'visible'});

                // $scene18_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene19_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene20_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene21_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));
                $scene22_text_wrap.css(cssTranslateY(futureTxtDeltaY + 'px'));

                $scene19.css({display:'none'});
                $scene20.css({display:'none'});
                $scene21.css({display:'none'});
                $scene22.css({display:'none'});

                if(id == -1){
                    defSetup();

                    $scene1.css(cssTranslateRYZ(0,0,0)).css({opacity:1});
                    $scene1_title.css(cssTranslateY(0));
                    $scene1_btn_play.css(cssTranslateY(0));
                }

                $contents.css({opacity:1});

                setTransitionEasingDR(1);
                skipFlg = false;
            }
        });
    }


/* ******************************************************************************************
    EVENT & EVENT HANDLER    
****************************************************************************************** */

    function onScroll(p){
        if(!scenes.scrollPossible || skipFlg) return;
        scenes.update(scroll.offset,'');
    }

    function onScrollDelete(){
        if(scroll) scroll.stopRender();
    }

    function addEvent(){
        $(window).on('keydown', onKeydown);
        $(window).on('resize', onResize);
        $(window).trigger('resize');
    }

    function onResize(){
        stage = WindowSize();
        $history_cont.css({height: $history_img.height() + 'px', marginLeft: -$history_cont.width()*0.5 + 'px', marginTop: -$history_cont.height()*0.5 + 'px'});

        var _stageW = (stage.width > 375)? 375 : stage.width;
        $side_menu_wrap.css({width:_stageW-60 +'px'});
    }

    function onKeydown(e){
        if(menuOpFlg)return;
        switch(e.keyCode){
            case 38 : onKeyScrollControl(1); break;
            case 40 : onKeyScrollControl(-1); break;
        }
    }

    var keybordValue = UA.isMac?10:1;
    function onKeyScrollControl(delta){
        for(var i=0; i<10; i++){
            var del = delta*keybordValue;
            if(scroll)scroll.onWheel({},del, del, del);
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

    function css3DSet(perspective,originX,originY){
        var perspective = perspective+'px',
            style       = 'preserve-3d',
            orign       = originX+' '+originY,
            css         = { '-webkit-perspective'   : perspective,
                            '-moz-perspective'      : perspective,
                            '-o-perspective'        : perspective,
                            '-ms-perspective'       : perspective,
                            'perspective'           : perspective,

                            '-webkit-transform-style'   : style,
                            '-moz-transform-style'      : style,
                            '-o-transform-style'        : style,
                            '-ms-transform-style'       : style,
                            'transform-style'           : style,

                            '-webkit-perspective-origin'    : orign,
                            '-moz-perspective-origin'       : orign,
                            '-o-perspective-origin'         : orign,
                            '-ms-perspective-origin'        : orign,
                            '-transform-perspective-origin' : orign
                            };
        return css;
    }

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

    function cssTranslateY(transY){
        var css3 = 'translateY('+transY+')';
        return{
            '-webkit-transform' : css3,
            '-moz-transform'    : css3,
            '-o-transform'      : css3,
            '-ms-transform'     : css3,
            'transform'         : css3
        };
    }

    function cssTranslateRYZ(rotX, transY, transZ){
        var css3 = 'rotateX('+rotX+'deg) translateY('+transY+') translateZ('+transZ+')';
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
