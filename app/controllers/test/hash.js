JMVC.controllers.hash = function() {

    this.action_index = function(){

function hashcode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function djb2Code(str){
    var hash = 5381;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
    }
    return hash;
}

function sdbmCode(str){
    var hash = 0;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = char + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
}

        this.render(function test(){
            "use strict";
            var JT = JMVC.test,
                times = 1e4,
                d = new Date,
                str = +d + d.getTimezoneOffset() * 6E4 + '_'+ ~~(Math.random()*1E6); //"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis error tempore quasi accusamus a odit expedita recusandae eligendi reprehenderit quisquam, minima quae praesentium? Adipisci officiis nobis incidunt suscipit, facilis totam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa placeat, minus provident aliquam sapiente rem cum animi, quisquam eum sint, assumenda enim cupiditate eaque reprehenderit itaque quae similique molestias doloremque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore id perferendis illo, alias dicta, aperiam ab libero expedita aut reiciendis laboriosam veritatis molestiae nisi eveniet nam vitae. Nam, cumque, illum.";
            console.debug(d, d.getTimezoneOffset(), d.getTimezoneOffset()*6E4)
            JT.initialize(true);
            JT.startAll();
            
            JMVC.events.loadify(1000);
            
            JT.describe('Hash functions time comparison');

            JT.message('hashcode version');
            JT.message('output: ' + hashcode(str));
            JT.code(hashcode.toString());

            JT.message('djb2Code version');
            JT.message('output: ' + djb2Code(str));
            JT.code(djb2Code.toString());

            JT.message('sdbmCode version');
            JT.message('output: ' + sdbmCode(str));
            JT.code(sdbmCode.toString());

            
            JT.describe('<h2>Times comparison</h2>here the 3 functions are executed ' + times + ' times with the same input : "<i>'+ str + '"</i>');

            JT.testTime('hashcode', hashcode, times, [str]);
            JT.testTime('djb2Code', djb2Code, times, [str]);
            JT.testTime('sdbmCode', sdbmCode, times, [str]);

            JT.timeSummary();
            
            JT.finishAll();
        });
    };
};