/**
 * Basic Twitter buttons
 */
JMVC.extend('vendors/twitter', function () {
    var injectTwitterScript = function () {
            (function (d, s, id) {
                var js,
                    fjs = d.getElementsByTagName('head')[0],
                    p = /^http:/.test(d.location) ? 'http' : 'https';
                if (!d.getElementById(id)) {
                    js = d.createElement(s);
                    js.id = id;
                    js.src = p + '://platform.twitter.com/widgets.js';
                    fjs.appendChild(js);
                }
            })(document, 'script', 'twitter-wjs');
        },

        inject = function (type, target, options, qstring) {
            var node,
                attrs;
            if (!(type in tpls)) {
                return false;
            }
            attrs = getAttrs(options, qstring || {});
            node = JMVC.dom.create('div', {}, JMVC.string.replaceAll(tpls[type], attrs, { clean: true })).firstChild;
            JMVC.dom.append(target, node);
        },

        getAttrs = function (attrs, qstring) {
            var out = {}, a;

            attrs.lang = attrs.lang || JMVC.vars.currentlang;
            for (a in attrs) {
                out[a] = 'data-' + a + '="' + attrs[a] + '"';
            }
            out.qs = qstring;
            return out;
        },

        tpls = {
            linkShare: '<a href="https://twitter.com/share" class="twitter-share-button" %lang% %url% %title% %text% %via% %size% %related% %hashtags%></a>',
            follow: '<a href="https://twitter.com/%qs%" class="twitter-follow-button" %show-count% %lang% %size% %show-screen-name%></a>',
            // <a href="https://twitter.com/purejmvc" class="twitter-follow-button" data-show-count="false">Follow @purejmvc</a>
            // <a href="https://twitter.com/purejmvc" class="twitter-follow-button" data-show-count="false" data-lang="ja" data-size="large" data-dnt="true">@purejmvcさんをフォロー</a>
            hashTag: '<a href="https://twitter.com/intent/tweet%qs%" class="twitter-hashtag-button" %lang% %size% %related% %url%></a>',
            mention: '<a href="https://twitter.com/intent/tweet%qs%" class="twitter-mention-button" %lang% %size% %related%></a>'
        };

    return {
        init: function () {
            // end hook
            JMVC.events.end(injectTwitterScript);
        },

        linkShare: function (node, options) {
            JMVC.events.end(function () {
                inject('linkShare', node, JMVC.object.extend({}, options, true));
            });
        },

        follow: function (node, options) {
            JMVC.events.end(function () {
                var opts = {},
                    name = '',
                    i;
                for (i in options) {
                    if (i.match(/name/)) {
                        name = options[i];
                    } else {
                        opts[i] = options[i];
                    }
                }
                inject('follow', node, JMVC.object.extend({}, opts, true), name);
            });
        },

        hashTag: function (node, options) {
            JMVC.events.end(function () {
                var opts = {},
                    qs = {},
                    i;
                for (i in options) {
                    if (i.match(/button_hashtag|text/)) {
                        qs[i] = options[i];
                    } else {
                        opts[i] = options[i];
                    }
                }
                inject('hashTag', node, JMVC.object.extend({}, opts, true), JMVC.object.toQs(qs));
            });
        },

        mention: function (node, options) {
            JMVC.events.end(function () {
                var opts = {},
                    qs = {},
                    i;
                for (i in options) {
                    if (i.match(/screen_name|text/)) {
                        qs[i] = options[i];
                    } else {
                        opts[i] = options[i];
                    }
                }
                inject('mention', node, JMVC.object.extend({}, opts, true), JMVC.object.toQs(qs));
            });
        }
    };
});
