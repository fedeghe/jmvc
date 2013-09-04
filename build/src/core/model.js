/*
                                    _/            _/   
   _/_/_/  _/_/      _/_/      _/_/_/    _/_/    _/    
  _/    _/    _/  _/    _/  _/    _/  _/_/_/_/  _/     
 _/    _/    _/  _/    _/  _/    _/  _/        _/      
_/    _/    _/    _/_/      _/_/_/    _/_/_/  _/
 */
//
//
Model = function () {};
Model.prototype.vars = {};
/**
 * [reset description]
 * @return {[type]} [description]
 */
Model.prototype.reset = function () {
    this.vars = {};
    return this;
};

/**
 * [constructor description]
 * @type {String}
 */
Model.prototype.constructor = 'model';