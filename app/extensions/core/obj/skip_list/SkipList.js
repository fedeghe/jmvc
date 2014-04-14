JMVC.require('core/obj/skip_list/Node');
JMVC.nsMake('JMVC.obj.SkipList');

JMVC.obj.SkipList = function () {
    this.header = new JMVC.obj.SLNode(-Infinity);
    this.sentinel = new JMVC.obj.SLNode(Infinity);
    this.header.next = this.sentinel;
    this.start = this.header;
    this.headerHeight = 0;
}

/*

6 H
5 h
4 h
3 h
2 h
1 h 
0 






*/





JMVC.obj.SkipList.prototype.add = function (value) {

    // create the node
    // 
    var node = new JMVC.obj.SLNode(value),
        flipCount = 0,
        done = false,
        nH, nS, nI, i = 0;

    // flip
    // 
    while (Math.random() >= .5) {
        ++flipCount;        
    }

    // maybe update the header and sentinel towers
    // 
    while (this.headerHeight < flipCount) {
        nS = new new JMVC.obj.SLNode(Infinity, null, this.sentinel);
        nH = new new JMVC.obj.SLNode(-Infinity, nS, this.header);
        this.start = nH;
        this.headerHeight++;
    }


    // go to the right level for the first insertion
    // 
    while (i < (this.headerHeight - flipCount)) {
        iN = (iN || this.start).bottom; 
        i++;
    }
    
    // insert
    // 
    while (!done) {
        if (iN.next.value <= value) {
            iN = iN.next;
        } else {
            while (i >= 0) {
                var tmpN = iN.next,
                    tmpB = iN.bottom;
                node
                i--;
            }
            done = true;
        }
    }

};














