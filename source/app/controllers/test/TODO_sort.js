
var a = [],
    size = 200000;
for(var i = 0; i < size; i++){
    a.push(String.fromCharCode( (48 + ~~(Math.random() * (2560-48) ) ) ) ) ;
}

var t1 = +new Date,
    t2, t3;

var r1 = a.sort(function (a1, a2){
    //a1 = a1.toUpperCase();
    //a2 = a2.toUpperCase();
    return a1 > a2 ? 1 : a1 < a2 ? -1 : 0; 
});
t2 = +new Date;
var r2 = a.sort(function (a1, a2){
    //a1 = a1.toUpperCase();
    //a2 = a2.toUpperCase();
    return a1.localeCompare(a2);
});
t3 = +new Date;

if (r1 != r2){alert('diff'); }
console.debug('1: ' + (t2-t1));
console.debug('2: ' + (t3-t2));
//console.debug(r1);


    