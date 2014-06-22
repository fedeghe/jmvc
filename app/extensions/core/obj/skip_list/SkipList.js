// 
// 
//------------------------------------------------ 
//  
//    https://gist.github.com/Yaffle/2757614
// 
//------------------------------------------------
//
// 
/*jslint plusplus: true, vars: true, indent: 2 */


(function (exports) {
    "use strict";

    var random = Math.random;
    var Node = function (down, key, value) {
        this.next = null;
        this.down = down;
        this.key = key;
        this.value = value;
    };

    var levels = 8; // Math.floor(Math.log(MAX_SIZE) / Math.log(p))
    var p = 4;

    function SkipList(lessFunction) {
        var head = null;
        var i = levels;
        do {
            head = new Node(head, undefined, undefined);
        } while (--i >= 0);
        this.head = head;
        this.less = lessFunction || function (a, b) {
            return a < b;
        };
    }

    function f(head, less, key, node, k) {
        var x = null;
        while ((head = head.down) !== null) {
            while ((x = head.next) !== null && less(x.key, key)) {
                head = x;
            }
            if (x !== null && !less(key, x.key)) {
                if (node === null && k === 0) {
                    return x.value;
                }
                x = x.next;
                head.next = x;
            }
            if (node !== null) {
                if (--k < 0) {
                    node.next = x;
                    head.next = node;
                    node = node.down;
                }
            }
        }
        return undefined;
    }

    SkipList.prototype = {
        get: function (key) {
            return f(this.head, this.less, key, null, 0);
        },
        set: function (key, value) {
            var node = null;
            var l = levels;
            var z = random();
            do {
                node = new Node(node, key, value);
                z *= p;
            } while (--l > 0 && z < 1);
            f(this.head, this.less, key, node, l);
        },
        "delete": function (key) {
            f(this.head, this.less, key, null, 1);
        }
    };

    exports.SkipList = SkipList;

}(JMVC));