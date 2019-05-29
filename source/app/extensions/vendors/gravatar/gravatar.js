JMVC.require('core/extendedUtils');
JMVC.extend('vendors/gravatar', {
    baseUrl: 'http://www.gravatar.com',
    getInfo: function (email) {
        var md5 = JMVC.utils.md5(email);
        return JMVC.string.replaceAll(
            '%baseurl%/%md5%.json', {
                baseurl: JMVC.vendors.gravatar.baseUrl,
                md5: md5
            }
        );
    },
    getGravatar: function (email, size) {
        size = ~~size || 100;
        var md5 = JMVC.utils.md5(email);
        return JMVC.string.replaceAll(
            '%baseurl%/avatar/%md5%.jpg?s=%size%',
            {
                baseurl: JMVC.vendors.gravatar.baseUrl,
                md5: md5,
                size: size
            }
        );
    }
});

// http://en.gravatar.com/avatar/d3a4c55b1dd4dc0f9728b19a1e537b52.jpg?s=200
