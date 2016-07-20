/*----
ERRORS
------ 
specific classes that will extend the built-in Error Onject
*/

Errors = {
    Network : function (msg) {
        this.name = 'Network';
        this.message = msg ||  (this.name + ' error');
    },
    BadParams : function (msg) {
        this.name = 'BadParams';
        this.message = msg ||  (this.name + ' error');
    },
    BadName : function (msg) {
        this.name = 'BadName';
        this.message = msg ||  (this.name + ' error');
    },
    BadImplement : function (msg) {
        this.name = 'BadImplement';
        this.message = msg ||  (this.name + ' error');
    },
    ControllerNotFound : function (msg) {
        this.name = 'ControllerNotFound';
        this.message = msg ||  (this.name + ' error');
    },
    ActionNotFound : function (msg) {
        this.name = 'ActionNotFound';
        this.message = msg ||  (this.name + ' error');
    },
    BadSetting : function (msg) {
        this.name = 'SettingMismash';
        this.message = msg ||  (this.name + ' error');
    }
};

jmvc.multi_inherit(Errors, W.Error);

Errors.notify = function (err) {
    var msg = '[ERROR ' + err.name + ' : ' + err.message;
    JMVC.debug(msg) && alert(msg);
    return false;
};
//-----------------------------------------------------------------------------