/*
    _/              _/                              _/_/                               
       _/_/_/    _/_/_/_/    _/_/    _/  _/_/    _/        _/_/_/    _/_/_/    _/_/    
  _/  _/    _/    _/      _/_/_/_/  _/_/      _/_/_/_/  _/    _/  _/        _/_/_/_/   
 _/  _/    _/    _/      _/        _/          _/      _/    _/  _/        _/          
_/  _/    _/      _/_/    _/_/_/  _/          _/        _/_/_/    _/_/_/    _/_/_/     
                                                                                      
 */

Interface = function (/** Array */ f) {
    this.mthds = f;
};
Interface.prototype.addMethod = function (/** String */ mthd) {
    this.mthds[mthd.name] || (this.mthds[mthd.name] = mthd);
};
Interface.prototype.removeMethod = function (/** String */ mthd) {
    this.mthds[mthd] && (delete this.mthds[mthd]);
};
Interface.prototype.check = function (/** ObjLiteral */ o) {
    var m,
        i = 0,
        l = this.mthds.length,
        obj = new o();
    for (m in this.mthds) {
        if (typeof obj[this.mthds[m]] !== 'function') {
            return false;
        }
    }
    obj = null;
    return true;
};