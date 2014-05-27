// type : LIB
// 
// all static methods
JMVC.extend('core/lib/myobj', {
    m1 : function () {},
    m2 : function () {},
    m3 : function () {},
    ...
});

// OR
JMVC.extend('core/lib/myobj', function () { 

    // private stuff here

    return {
        m1 : function () {},
        m2 : function () {},
        m3 : function () {},
        ...
    }
})

// OR
JMVC.makeNS('core/lib/myobj');
JMVC.core.lib.myobj = {
    m1 : function () {},
    m2 : function () {},
    m3 : function () {},
    ...
}

// ============================================================

// type : FACTORY_METHOD
// 
JMVC.extend('core/lib/myobj', {
    create : function (params) {

        var privateObj = function () {
            ...
        }
        privateObj.prototype.foo = function () {

        };

        return new privateObj(params);
    }
});
JMVC.extend('core/lib/myobj', {
    create : function (params) {

        var privateObj = function () {
                ...
            },
            privateVars = ...;
        privateObj.prototype.foo = function () {

        };

        return {
            foo1 : ...,
            ...
        };
    }
});

// ============================================================

// type : CONSTRUCTOR
// 
JMVC.makeNS('core/lib');
JMVC.core.lib.Myobj = function () {
    ...
};
JMVC.core.lib.Myobj.prototype.foofoo =  function () {
    ...
};

// ============================================================

// type : CONSTRUCTORS
// 
JMVC.extend('core/lib', {
    Foo : function () {},
    FooFoo : function () {},
    ...
});
JMVC.core.lib.FooFoo.prototype.render =  function () {
    ...
};



