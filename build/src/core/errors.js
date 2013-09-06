/*

    _/_/_/_/                                                    
   _/        _/  _/_/  _/  _/_/    _/_/    _/  _/_/    _/_/_/   
  _/_/_/    _/_/      _/_/      _/    _/  _/_/      _/_/        
 _/        _/        _/        _/    _/  _/            _/_/     
_/_/_/_/  _/        _/          _/_/    _/        _/_/_/ 

*/

Errors = {
    'Network' : function (msg) {
        this.name = 'Network';
        this.msg = msg || "";
    },
    'BadParams' : function (msg) {
        this.name = 'BadParams';
        this.msg = msg || "";
    },
    'BadName' : function (msg) {
        this.name = 'BadName';
        this.msg = msg || "";
    },
    'BadImplement' : function (msg) {
        this.name = 'BadImplement';
        this.msg = msg || "";  
    },
    'ControllerNotFound' : function (msg) {
        this.name = 'ControllerNotFound';
        this.msg = msg || "";  
    },
    'ActionNotFound' : function (msg) {
        this.name = 'ActionNotFound';
        this.msg = msg || "";  
    }

};
jmvc.multi_inherit(Errors, Error);