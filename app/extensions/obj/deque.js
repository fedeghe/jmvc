JMVC.extend('deque', {
	
	
	'create' : function () {
		"use strict";
		var that = this,
		
			Node = function (/** element */el, /** Node */ p, /** Node */ n) {
				this.element = el;
				this.prev = p || null ;
				this.next = n || null;
			};
			
		Node.prototype.setElement = function (el) {this.element = el; };
		Node.prototype.getElement = function () {return this.element; };
		
		Node.prototype.setNext = function (el) {this.next = el; };
		Node.prototype.getNext = function () {return this.next; }
		Node.prototype.setPrev = function (el) {this.prev = el; };
		Node.prototype.getPrev = function () {return this.prev; };
		
		this.size = 0;
		this.header = new Node();
		this.trailer = new Node();
		this.trailer.setPrev(this.header);
		this.header.setNext(this.trailer);
	   
		return {
			'insertFirst' : function(o){
				var oldFirst = that.header.getNext(),
					newFirst = new Node(o, that.header, oldFirst);
				oldFirst.setPrev(newFirst);
				that.header.setNext(newFirst);
				that.size += 1;
			},
			'insertLast' : function(o){
				var oldLast = that.trailer.getPrev(),
					newLast = new Node(o, oldLast, that.trailer);
				oldLast.setNext(newLast);
				that.trailer.setPrev(newLast);
				that.size += 1;
			},
			'removeLast' : function(){
				if(this.isEmpty()){ throw new Error('No elements');}

				var last = that.trailer.getPrev(),
					o = last,
					bilast = last.getPrev(),
					ret = null;
				that.trailer.setPrev(bilast);
				bilast.setNext(that.trailer);
				that.size -= 1;
				ret = o.getElement();
				o = null;
				return ret;
			},
			'removeFirst' : function(){
				if(this.isEmpty()){ throw new Error('No elements');}
				var first = that.header.getNext(),
					o = first,
					bifirst = first.getNext(),
					ret = null;
				that.header.setNext(bifirst);
				bifirst.setPrev(that.header);
				that.size -= 1;
				ret = o.getElement();
				o = null;
				return ret;
			},
			'first' : function(){
				return that.header.getNext().element;
			},
			'last' : function(){
				return that.trailer.getPrev().element;
			},
			'size' : function(){
				return +that.size;
			},
			'isEmpty' : function(){return !that.size;},
			'print' : function(){
				if(this.isEmpty()){
					throw new Error('No elements');
				}
				var n = that.header.getNext();
				while(n.element != undefined){
					n = n.getNext();
				}
				return ;
			}
		};
	}
});



