/* eslint-disable no-undef */
/**
 The MIT License

 Copyright (c) 2013 Studio Sóton ( http://studiosoton.com  )
 by: Daniel Furini - dna.furini[at]gmail.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 **/
(function ($) {
    var config = {
            app_id: '',
            secret: '',
            host: '',
            scope: 'publish_stream',
            onLogin: '',
            onLogout: ''
        },
        facebookGraph = 'https://graph.facebook.com',
        facebookToken = '',
        ref,
        refLogout,
        _hasLogin = false,
        _result = {
            status: '',
            data: '',
            token: '',
            message: ''
        },
        methods = {
            init: function (settings) {
                if (settings) {
                    $.extend(config, settings);
                }
                var authorizeUrl = facebookGraph +
                    '/oauth/authorize' +
                    '?type=user_agent' +
                    '&client_id=' + config.app_id +
                    '&redirect_uri=' + config.host + '/connect/login_success.html' +
                    '&display=touch' +
                    '&scope=' + config.scope;
                ref = window.open(
                    authorizeUrl,
                    '_blank',
                    'location=no'
                );
                ref.addEventListener('loadstart', function (event) {
                    methods.changeLogin(event.url);
                });
                ref.addEventListener('loadstop', function (event) {
                    methods.parseStop(event.url);
                });
                ref.addEventListener('loaderror', function (event) {
                    ref.close();
                    if (methods._isFunction(config.onLogin)) {
                        _result.status = 0;
                        _result.data = null;
                        _result.message = event.message;
                        _result.token = '';
                        config.onLogin(_result);
                    }
                });
                ref.addEventListener('exit', function (event) { });
            },
            changeLogout: function (_url) {
                var returnUrl = _url;
                if (returnUrl === config.host + '/connect/logout_success.html') {
                    refLogout.close();
                    if (methods._isFunction(config.onLogout)) {
                        _result.status = 1;
                        _result.message = 'Success';
                        config.onLogout(_result);
                    }
                } else {
                    refLogout.close();
                    if (methods._isFunction(config.onLogout)) {
                        _result.status = 0;
                        _result.message = 'unknown error';
                        config.onLogout(_result);
                    }
                }
            },
            changeLogin: function (_url) {
                var returnUrl = _url,
                    arrData = returnUrl.split('access_token=');
                if (arrData.length > 0) {
                    facebookToken = arrData[1].split('&')[0];
                    methods.getMe(facebookToken);
                }
            },
            parseStop: function (_url) {
                var returnUrl = _url;
                $.ajax({
                    url: returnUrl,
                    dataType: 'jsonp',
                    async: false,
                    cache: false,
                    success: function (data, status) {
                        if (data.error.code > 0) {
                            ref.close();
                            if (methods._isFunction(config.onLogin)) {
                                _result.status = 0;
                                _result.data = null;
                                _result.message = 'code: ' + data.error.code + ' message: ' + data.error.message;
                                _result.token = '';
                                config.onLogin(_result);
                            }
                        }
                    }
                });
            },
            getMe: function (_t) {
                if (!_hasLogin) {
                    var urlMe = 'https://graph.facebook.com/me?access_token=' + _t;
                    $.ajax({
                        url: urlMe,
                        dataType: 'jsonp',
                        async: false,
                        cache: false,
                        success: function (data, status) {
                            ref.close();
                            _hasLogin = true;
                            if (methods._isFunction(config.onLogin)) {
                                _result.status = 1;
                                _result.data = data;
                                _result.message = 'Success';
                                _result.token = _t;
                                config.onLogin(_result);
                            }
                        },
                        error: function () {
                            ref.close();
                            if (methods._isFunction(config.onLogin)) {
                                _result.status = 0;
                                _result.data = null;
                                _result.message = 'Error get info user';
                                _result.token = '';
                                config.onLogin(_result);
                            }
                        }
                    });
                } else {
                    if (methods._isFunction(config.onLogin)) {
                        _result.status = 0;
                        _result.data = null;
                        _result.message = 'unknown error';
                        _result.token = '';
                        config.onLogin(_result);
                    }
                }
            },
            logout: function () {
                if (facebookToken !== '') {
                    var urlLogout = facebookGraph +
                        '/logout.php' +
                        '?access_token=' + facebookToken +
                        '&confirm=1' +
                        '&next=' + config.host + '/connect/logout_success.html';
                    refLogout = window.open(urlLogout, '_blank', 'location=no');
                    refLogout.addEventListener('loadstart',
                        function (event) {
                            methods.changeLogout(event.url);
                        }
                    );
                } else {
                    if (methods._isFunction(config.onLogout)) {
                        _result.status = 0;
                        _result.message = 'No user in session';
                        config.onLogout(_result);
                    }
                }
            },
            fb_api: function (_config) {
                if (facebookToken !== '') {
                    var urlMe = facebookGraph + '' + _config.path + '?access_token=' + facebookToken;
                    $.ajax({
                        url: urlMe,
                        dataType: 'jsonp',
                        data: _config.params,
                        async: false,
                        cache: false,
                        success: function (response, status) {
                            if (methods._isFunction(_config.cb)) {
                                _result.status = 1;
                                _result.message = 'success';
                                _result.data = response;
                                _config.cb(_result);
                            }
                        },
                        error: function () {
                            if (methods._isFunction(_config.cb)) {
                                _result.status = 0;
                                _result.message = 'unknown error';
                                _result.data = null;
                                _config.cb(_result);
                            }
                        }
                    });
                } else {
                    if (methods._isFunction(_config.cb)) {
                        _result.status = 0;
                        _result.message = 'No user in session';
                        _result.data = null;
                        _config.cb(_result);
                    }
                }
            },
            _getParameter: function (name, _url) {
                name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
                var regexS = '[\\?&]' + name + '=([^&#]*)',
                    regex = new RegExp(regexS),
                    results = regex.exec(_url);
                return results == null
                    ? ''
                    : results[1];
            },
            _isFunction: function (functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            }
        };

    $.fn.FaceGap = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.FaceGap');
            }
        }
    };
})(jQuery);
