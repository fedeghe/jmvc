
var a = [],
    size = 200000,
    i = 0,
    t1 = +new Date(),
    t2, t3,
    r1 = a.sort(function (a1, a2) {
        return a1 > a2 ? 1 : a1 < a2 ? -1 : 0;
    }),
    r2 = a.sort(function (a1, a2) {
        return a1.localeCompare(a2);
    });
for (null; i < size; i++) {
    a.push(String.fromCharCode((48 + ~~(Math.random() * (2560 - 48)))));
}
t2 = +new Date();
t3 = +new Date();

if (r1 !== r2) { alert('diff'); }
console.debug('1: ' + (t2 - t1));
console.debug('2: ' + (t3 - t2));
// console.debug(r1);
