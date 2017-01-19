(function () {

    var _url   = document.location.pathname;
    // var _pcDir = '/technics/html/50th-global/';
    var _pcDir = '/global/50th-anniversary/';
    // var _spDir = '/m/';
    var _ua    = (function(u){
        return {
            Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
              || u.indexOf("ipad") != -1
              || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
              || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
              || u.indexOf("kindle") != -1
              || u.indexOf("silk") != -1
              || u.indexOf("playbook") != -1,
            Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
              || u.indexOf("iphone") != -1
              || u.indexOf("ipod") != -1
              || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
              || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
              || u.indexOf("blackberry") != -1
        }
    })(window.navigator.userAgent.toLowerCase());


    if(_ua.Mobile || _ua.Tablet){
        // isSP();
    }else{
        // isPC();
        // location.href = '../';
        location.href = _pcDir;
    }

 
    // function isSP(){
    //     if(_url.match(_spDir)){
    //         return false;
    //     }else{
    //         location.href = _spDir;
    //     }
    // }
 
    // function isPC(){
    //     if(!_url.match(_spDir)){
    //         return false;
    //     }else{
    //         location.href = '/';
    //     }
    // }


})();
