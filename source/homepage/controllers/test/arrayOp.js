JMVC.controllers.arrayOp = function () {
    this.action_index = function () {
        JMVC.events.loadify(1000);
        function afunc () { alert('hei'); }
        this.render(false, function test () {
            'use strict';
            var arr = [
                [1, [1, [1, [1, 2]]]],
                2,
                true,
                'hei',
                'YOU',
                Infinity,
                {
                    o: 's',
                    d: [1, 2, 3]
                },
                new RegExp(/\s/),
                {},
                function () { alert('hei'); },
                [{ a: 1 }, { b: 2 }, { c: 3 }, { d: { a: { b: { d: 1000 } } } }],
                afunc
            ];

            JMVC.test.initialize(true);

            JMVC.test.startAll();

            JMVC.test.code(afunc.toString() + '\n' +
                'var arr = [\n' +
                '\t[1, [1, [1, [1, 2]]]],\n' +
                '\t2,\n' +
                '\ttrue,\n' +
                '\t\'hei\',\n' +
                '\t\'YOU\',\n' +
                '\tInfinity,\n' +
                '\t{\'o\' : \'s\', \'d\' : [1, 2, 3]},\n' +
                '\tnew RegExp(/\\s/),\n' +
                '\t{},\n' +
                '\tfunction () {alert(\'hei\'); },\n' +
                '\t[{a : 1}, {b : 2}, {c : 3}, {d : {a : {b : {d : 1000}}}}],\n' +
                '\tafunc\n' +
                '];\n' +
                '\n' +
                JMVC.array.findRich.toString());

            JMVC.test.message('these return a valid index');
            JMVC.test.testValue('f(arr, [1,[1,[1,[1,2]]]]) = 0', function () { return JMVC.array.findRich(arr, arr[0]); }, 0);
            JMVC.test.testValue('f(arr, {}) = 8', function () { return JMVC.array.findRich(arr, arr[8]); }, 8);
            JMVC.test.testValue('f(arr, "hei") = 3', function () { return JMVC.array.findRich(arr, arr[3]); }, 3);
            JMVC.test.testValue('f(arr, "YOU") = 4', function () { return JMVC.array.findRich(arr, arr[4]); }, 4);
            JMVC.test.testValue('f(arr, {o : "s", d:[1,2,3]}) = 6', function () { return JMVC.array.findRich(arr, arr[6]); }, 6);
            JMVC.test.testValue('f(arr, [{a:1},{b:2},{c:3},{d:{a:{b:{d:1000}}}}]) = 10', function () { return JMVC.array.findRich(arr, arr[10]); }, 10);
            JMVC.test.testValue('f(arr, function(){alert("hei");}) = 9', function () { return JMVC.array.findRich(arr, arr[9]); }, 9);
            JMVC.test.testValue('f(arr, new RegExp(/\\s/)) = 7', function () { return JMVC.array.findRich(arr, arr[7]); }, 7);
            JMVC.test.testValue('f(arr, afunc) = 11', function () { return JMVC.array.findRich(arr, arr[11]); }, 11);

            JMVC.test.message('these DO NOT return a valid index');
            JMVC.test.testValue('f(arr, [{www:1},{b:2},{c:3},{d:{a:{b:{d:1000}}}}]) = -1', function () { return JMVC.array.findRich(arr, [{ www: 1 }, { b: 2 }, { c: 3 }, { d: { a: { b: { d: 1000 } } } }]); }, -1);
            JMVC.test.testValue('f(arr, function(){alert("hei YOU");}) = -1', function () { return JMVC.array.findRich(arr, function () { alert('hei YOU'); }); }, -1);
            JMVC.test.testValue('f(arr, [1,[1,[1,[1,3]]]]) = -1', function () { return JMVC.array.findRich(arr, [1, [1, [1, [1, 3]]]]); }, -1);
            JMVC.test.testValue('f(arr, "hei YOU") = -1', function () { return JMVC.array.findRich(arr, 'hei YOU'); }, -1);
            JMVC.test.testValue('f(arr, {o : "s", d:[1,2,3,4]}) = -1', function () { return JMVC.array.findRich(arr, { o: 's', d: [1, 2, 3, 4] }); }, -1);

            JMVC.test.testValue('f(arr, {}) = 8', function () { return JMVC.array.findRich(arr, {}); }, 8);

            JMVC.test.finishAll();
        });
    };
};
