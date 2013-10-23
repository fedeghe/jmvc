/*
ERRORS
specific classes that will extend the built-in Error Onject
*/
Errors = {
    'Network' : function (msg) {
        this.name = 'Network';
        this.msg = msg || this.name + ' error';
    },
    'BadParams' : function (msg) {
        this.name = 'BadParams';
        this.msg = msg || this.name + ' error';
    },
    'BadName' : function (msg) {
        this.name = 'BadName';
        this.msg = msg || this.name + ' error';
    },
    'BadImplement' : function (msg) {
        this.name = 'BadImplement';
        this.msg = msg || this.name + ' error';
    },
    'ControllerNotFound' : function (msg) {
        this.name = 'ControllerNotFound';
        this.msg = msg ||  this.name + ' error';
    },
    'ActionNotFound' : function (msg) {
        this.name = 'ActionNotFound';
        this.msg = msg ||  this.name + ' error';
    }
};

jmvc.multi_inherit(Errors, Error);
