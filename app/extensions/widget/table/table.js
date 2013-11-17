// load base styles
JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/widget/table/table.css', true);

// ensure ns
JMVC.nsCheck('JMVC.widget');

/**
 * [Table description]
 * @param {[type]} config [description]
 */
JMVC.widget.Table = function (config) {
    this.headData = config.head || false;
    this.bodyData = config.body ||false;
    if (!this.headData) {
        throw new Error('Missing parameters');
    }
    this.node = document.createElement('table');
    this.node.className = 'jmvc';    
};




~(function (){

    var PROTO = JMVC.widget.Table.prototype;

    function _createLine(tag, data) {
        var tr = document.createElement('tr'),
            i = 0, t,
            l = data.length;
        for (null; i < l; i++) {
            t = document.createElement(tag);
            t.innerHTML = data[i] + '';
            tr.appendChild(t);
        }
        return tr;
    }

    function _appendLines(node, data, tag) {
        var i = 0,
            l = data.length;
        while (i < l) {
            node.appendChild(_createLine(tag, data[i++]));
        }
    }
    PROTO._bind = false;
    PROTO._unbind = false;

    PROTO.bind = function (cb){this._bind = cb; };
    PROTO.unbind = function (cb){this._unbind = cb; };
    PROTO.render = function (n){
        if (!('nodeType' in n) || n.nodeType !== 1) {
            throw new Error('Invalid target node');
        }
        this.unbind(n);
        this.headData && _appendLines(this.node, [this.headData], 'th');
        this.bodyData && _appendLines(this.node, this.bodyData, 'td');
        n.innerHTML = '';
        n.appendChild(this.node);
        this.bind(n);
    }

    PROTO.sortByColumn = function (col, versus) {
        var index = this.headData.indexOf(col);
        if (index === -1){
            throw new Error(col + ' column not found');
        }
        this.bodyData.sort(function (l1, l2) {
            return parseInt(l1[index], 10) < parseInt(l2[index], 10);
        });
    }

    /**
     * enable order by column when clicking on some choosed columns
     * @param  {[type]} cols [description]
     * @return {[type]}      [description]
     */
    PROTO.enableSortOnColumnClick = function (cols) {

    }


})();


var data = [
        ['Samsung Galaxy S4','Samsung','April 2013',38,'4560'],
        ['Lumia 1020','Nokia','July 2013',2,'1560'],
        ['Surface 2 Pro','Microsoft','September 2013',12,'53782'],
        ['iPhone 5s','Apple','September 2013',53,'134500'],
        ['One X','HTC','March 2012',7,'213068'],
        ['G 2','LG','October 2013',34,'133068'],
        ['Yoga 2 Pro','Lenovo','November 2013',4,'4230']
    ],
    headers = ['Product Name','Product Manufacturer','Release Date','Quantity','Purchase Value'],
    tb = new JMVC.widget.Table({head : headers, body:data});

tb.sortByColumn('Quantity');
tb.render(document.body);


