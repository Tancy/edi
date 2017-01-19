(function() {
    if (this.console == null) {this.console = { log : function() {}}}
    if(this.UA)return;
    this.UA = function() {
        var e, t, n, r;
        r   = navigator.userAgent.toLowerCase(),
        nv  = window.navigator,
        t = {
            isIE : false,
            isIE6 : false,
            isIE7 : false,
            isIE8 : false,
            isIE9 : false,
            isLtIE9 : false,
            isIE11 : false,
            isIOS : false,
            isIPhone : false,
            isIPad : false,
            isIPhone4 : false,
            isIPad3 : false,
            isAndroid : false,
            isAndroidMobile : false,
            isChrome : false,
            isSafari : false,
            isMozilla : false,

            isFirefox : false,

            isWebkit : false,
            isOpera : false,
            isPC : false,
            isTablet : false,
            isSmartPhone : false,
            browser : r,
            isMac : /mac/i.test(nv['platform']),
            isWin : /win/i.test(nv['platform'])
        };
        
        if (t.isIE = /msie\s(\d+)/.test(r)) {
            n = RegExp.$1;
            n *= 1;
            t.isIE6 = n === 6;
            t.isIE7 = n === 7;
            t.isIE8 = n === 8;
            t.isIE9 = n === 9;
            t.isLtIE9 = n < 9;
        }
        if (t.isIE7 && r.indexOf("trident/4.0") !== -1) {
            t.isIE7 = false;
            t.isIE8 = true;
        }
        if (r.indexOf("trident/7.0") !== -1) {
            t.isIE = true;
            t.isIE11 = true;
        }
        if (t.isIPhone = /i(phone|pod)/.test(r)) {
            t.isIPhone4 = window.devicePixelRatio === 2;
        }
        if (t.isIPad = /ipad/.test(r)) {
            e = window.devicePixelRatio === 2;
        }
        t.isIOS = t.isIPhone || t.isIPad;
        t.isAndroid = /android/.test(r);
        t.isAndroidMobile = /android(.+)?mobile/.test(r);
        t.isPC = !t.isIOS && !t.isAndroid;
        t.isTablet = t.isIPad || t.isAndroid && t.isAndroidMobile;
        t.isSmartPhone = t.isIPhone || t.isAndroidMobile;
        t.isChrome = /chrome/.test(r);
        t.isWebkit = /webkit/.test(r);
        t.isOpera = /opera/.test(r);
        t.isMozilla = r.indexOf("compatible") < 0 && /mozilla/.test(r);

        t.isFirefox = /firefox/.test(r);
        
        t.isSafari = !t.isChrome && t.isWebkit;
        return t;
    }();

}).call(this);
