JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/slider/slider.css', true);

JMVC.nsCheck('JMVC.widget');

JMVC.widget.Slider = function (node, w) {
	var that = this;
	this.node = node;
	this.node.className = 'bar';
	this.width = w || 200; //node.clientWidth; // 200 ???
	this.cursor_max = false;
    this.cursor_min = false;
	this.step = false;
	this.ticks = [];
    this.cursor_width = 11;
    this.cursor_width_middle = ~~(this.cursor_width >> 1);
	this.virtual_bounds = [];//virt
	this.change = false;
	this.max = 0;
	this.min = 0;
	this._listening = false;
	this.map = {}; // real -> virt
};

JMVC.widget.Slider.prototype.onChange = function (f) {
	this.change = f;
	this.change.call(this, this.getValue());
};
JMVC.widget.Slider.prototype.setStep = function (s) {
	this.step = s;
	this.ticks = [];
	this.map = {};
	// get virtual step array
	var virt = [], n = 0, i = 0, l = 0;
	while (n < this.virtual_bounds[1]) {
		n =  this.virtual_bounds[0] + l * this.step;
		virt.push(n) ;
		l += 1;
	}
	// now translate to real (now i is virt.length)
	// doing that let calls of the inverse real2virt returning exactly wanted values
	for (null; i < l; i += 1) {
		this.ticks.push(this.virt2real(virt[i]));	
		//make map
		this.map[this.ticks[i]] = virt[i];	
	}
};

JMVC.widget.Slider.prototype.reset = function (bounds, top, down, step) {
	var topvirt,
		downvirt;

	this.virtual_bounds = bounds;
	this.virtual_length = bounds[1] - bounds[0];

	topvirt = this.virt2real(top);
	
	this.innerbar.style.right = this.width - topvirt - this.cursor_width_middle + 'px';
	this.cursor_max.style.left = topvirt + 'px';

	if (down) {
		downvirt = this.virt2real(down);
		this.innerbar.style.left = downvirt + this.cursor_width - this.cursor_width_middle + 'px';
		this.cursor_min.style.left = downvirt + 'px';
	}
	if (step) {
		this.setStep(step);
	} else {
		this.step = false;
	}
	this.change && this.change(this.getValue());
}

JMVC.widget.Slider.prototype.nearest = function (v, steps) {
	var len = steps.length,
		lindex = 0,
		hindex = len - 1,
		mindex = lindex + hindex >> 1;
	if (!len) {
		return 0;
	}
	while (lindex < hindex) {
		mindex = lindex + hindex >> 1;
		if (v < steps[mindex]) {
			hindex = mindex;
		} else if (v > steps[mindex]) {
			lindex = mindex;
		} else {
			return steps[mindex];
		}
		if (lindex == hindex - 1) {
			return v - steps[lindex] < steps[hindex] - v ? steps[lindex] : steps[hindex];
		}
	}
}


JMVC.widget.Slider.prototype.init = function (bounds, top, down, step) {
	
	this.virtual_bounds = bounds;
	this.virtual_length = bounds[1] - bounds[0];

	function switchzindex (el) {
		if (el == that.cursor_max) {
			that.cursor_min.style.zIndex =  100;
			that.cursor_max.style.zIndex =  200;			
		} else if (el == that.cursor_min) { 
			that.cursor_min.style.zIndex =  200;
			that.cursor_max.style.zIndex =  100;
		}
	}
	
	var that = this,
		tmp,
		//dnd
		dnd = {
			initElement: function (element) {
				JMVC.events.on(element, 'mousedown', dnd.startDragMouse);
				JMVC.events.on(element, 'touchstart', dnd.startDragTouch);
			},
			unbind : function (element) {
				dnd.removeEventSimple(element,'mousedown',dnd.startDragMouse);
				dnd.removeEventSimple(element,'touchstart',dnd.startDragTouch);
			},
			
			startDragMouse: function (e) {
				var evt = e || window.event;
				dnd.startDrag(this);
				dnd.initialMouseX = evt.clientX;
				dnd.addEventSimple(document,'mousemove',dnd.dragMouse);
				dnd.addEventSimple(document,'mouseup',dnd.releaseElement);
				return false;
			},
			
			startDragTouch: function (e) {
				dnd.killEvent(e);
				var evt = e || window.event,
					el = JMVC.events.eventTarget(evt);
				dnd.startDrag(el);
				var touches = JMVC.events.touch(evt);
				dnd.initialMouseX = touches[0].x;
				JMVC.events.on(el,'touchmove',dnd.dragTouch);
				JMVC.events.on(el,'touchend',dnd.releaseElement);
				return false;
			},

			startDrag: function (obj) {
				if (dnd.draggedObject){
				    dnd.releaseElement();
				}
				dnd.startX = obj.offsetLeft;
				dnd.draggedObject = obj;
				obj.className += ' dragged';
			},

			dragTouch : function(e){
				dnd.dragMouse(e,true);
			},

			dragMouse: function (e, touch) {
				dnd.killEvent(e);
				var evt = e || window.event,
					touches,
					dX;
					
				if (dnd.draggedObject) {
					if(touch) {
						touches = JMVC.events.touch(e);
						dX = touches[0].x - dnd.initialMouseX;
					} else {
						dX = evt.clientX - dnd.initialMouseX;
					}
					var l = dnd.startX + dX,
						scr = that.cursor_width - 1;
						
					if (that.cursor_min && that.cursor_max.style.left == that.cursor_min.style.left) {
				    	if (
				    		(dX < 0 && dnd.draggedObject == that.cursor_max)
				    		||
				    		(dX > 0 && dnd.draggedObject == that.cursor_min)
				    	) {
				    		return false;
				    	}
				    }
				    if (l >= 0 && l + scr < that.width) {
						if (that.step) {
							l = that.nearest(l , that.ticks);
						}		
				        dnd.setPosition(l, dnd.draggedObject);
				    }
				}
				return false;
			},

			setPosition: function (l, obj) {
				if (that.cursor_min) {
					switch (obj) {
					case that.cursor_max:
						if (parseInt(obj.style.left,10) < parseInt(that.cursor_min.style.left, 10)) {
							l = parseInt(that.cursor_min.style.left, 10);
						}
						break;
					case that.cursor_min:
						if (parseInt(obj.style.left, 10) > parseInt(that.cursor_max.style.left, 10)) {
							l = parseInt(that.cursor_max.style.left, 10)
						}
						break;
					default:break; 
					}
				}
				var scr = that.cursor_width + 1;
				
				obj = obj || dnd.draggedObject;
				obj.style.left = l + 'px';
				
				if(obj.className.match(/\sup/)){
				    innerbar.style.right = that.width - l -that.cursor_width_middle + 'px';
				}
				if(obj.className.match(/\sdown/)){
				    innerbar.style.left = l + that.cursor_width -that.cursor_width_middle + 'px';
				}
				that.change && that.change(that.getValue());
				
			},

			releaseElement: function () {
				dnd.removeEventSimple(document, 'mousemove', dnd.dragMouse);
				dnd.removeEventSimple(document, 'mouseup', dnd.releaseElement);
				dnd.removeEventSimple(document, 'touchmove', dnd.dragTouch);
				dnd.draggedObject.className = dnd.draggedObject.className.replace(/\sdragged/, '');
				dnd.draggedObject = null;
			},

			addEventSimple : function (obj, evt, fn) {
				if (obj.addEventListener) {
				    obj.addEventListener(evt,fn,false);
				}else if (obj.attachEvent) {
				    obj.attachEvent('on'+evt,fn);
				} else {
					obj['on' + evt] = function () {fn.call(obj, window.event); };
				}   
			},

			removeEventSimple : function (obj,evt,fn) {
				if (obj.removeEventListener) {
				    obj.removeEventListener(evt, fn, false);
				}else if (obj.detachEvent) {
				    obj.detachEvent('on' + evt, fn);
				} else {
					delete obj['on' + evt];
				}  
			},
			killEvent : function (e) {
				if (!e) {
					e = window.event;
					e.cancelBubble = true;
					e.returnValue = false;
				}
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
				}
				return false;
			}
		};
	
	/* FUNCTIONS BINDED TO EVENTS */
	function manageClick(e) {
		var t = e.target,
			v_real = e.layerX || e.offsetX, //relative to the container, outerbar, innerbar (relative to 1 cur), opera uses offsetX
			v_virt = that.real2virt(v_real),
			vals = that.getValue(),
			rvals = {'down': that.virt2real(vals.down), 'up' : that.virt2real(vals.up)},
			val = false,
			node = false,
			mean = 0;
		
		if (t === that.cursor_min || t === that.cursor_max) {return false; }
		//if the outer bar is hit we are outside the interval
		if (t == that.node) {
			// before the cursor
			if (v_virt < vals.down) {
				node = that.cursor_min;
				//	After Zero : before Zero
				val = v_real > that.min ? v_real - that.cursor_width_middle -2 : 0;
			} else {
				node = that.cursor_max;
				val = v_real > that.max ? that.max - that.cursor_width_middle : v_real - that.cursor_width_middle -1;
			}
		} else { // between the cursors
			//if cursor min exists, find nearest cursor
			if (that.cursor_min) {
				// the mean in this case must be done considering that
				// layerX is a measure relative to first cursor
				mean =  (rvals.up - rvals.down) >> 1;
				val = v_real + rvals.down;// + that.cursor_width_middle;
				node = v_real < mean ? that.cursor_min : that.cursor_max;			
			} else { // only max
 				val = v_real -that.cursor_width_middle -1;
				node = that.cursor_max;
			}
		}
		// here val & node SHOULD exists but ...
		if (val && node) {
			// use nearest if step is set
			if (step != undefined) {
				val = that.nearest(val, that.ticks);
			}
			//min max bound
			if(val > that.max - that.cursor_width) val = that.max - that.cursor_width_middle -1;
			if(val < that.min) val = that.min - that.cursor_width_middle;
			//set  it
			dnd.setPosition(val, node);
		}
	}
	
	//cmin mousemove
	function node_mousemove(e) {
		if (e.target == that.node) {
			if (e.layerX < parseInt(that.cursor_min.style.left)) {
				tmp = that.cursor_min;
			}else if(e.layerX > parseInt(that.cursor_max.style.left)) {
				tmp = that.cursor_max;
			}
		}
	}
	
	//cmin_mouseenter
	function cmin_mouseenter(e){
		dnd.killEvent(e);
		switchzindex(that.cursor_min);
	}
	//cmin_mouseenter
	function cmax_mouseenter(e){
		dnd.killEvent(e);
		switchzindex(that.cursor_max);
	}
	
	/**
	 * SET / UNSET LISTENERS
	 */
	function addListeners() {
		that.node.style.cursor = 'pointer';
		that.node.style.opacity = 1;
		if(that.cursor_min){
			that.cursor_min.style.cursor = 'ew-resize';
		}
		that.cursor_max.style.cursor = 'ew-resize';
	
		that._listening = true;
		//dnd
		dnd.initElement(that.cursor_max);
		if (that.cursor_min) {	
			dnd.initElement(that.cursor_min);
		}
		
		//click
		dnd.addEventSimple(that.node, 'click', manageClick);
		
		//manage isotoph cursors with zindex
		if (that.cursor_min) {
			dnd.addEventSimple(that.node, 'mousemove', node_mousemove);
			dnd.addEventSimple(that.cursor_min, 'mouseenter', cmin_mouseenter);
			dnd.addEventSimple(that.cursor_max, 'mouseenter', cmax_mouseenter);
		}
	}

	function removeListeners() {
		that.node.style.cursor = 'default';
		that.node.style.opacity = 0.5;

		if(that.cursor_min){
			that.cursor_min.style.cursor = 'default';
		}
		that.cursor_max.style.cursor = 'default';
	
		that._listening = false;
		//dnd
		if (that.cursor_min) {
			dnd.unbind(that.cursor_min);
		}
		dnd.unbind(that.cursor_max);
		
		//click
		dnd.removeEventSimple(that.node, 'click', manageClick);
		
		//manage isotoph cursors with zindex
		if (that.cursor_min) {
			dnd.removeEventSimple(that.node, 'mousemove', node_mousemove);
			dnd.removeEventSimple(that.cursor_min, 'mouseenter', cmin_mouseenter);
			dnd.removeEventSimple(that.cursor_max, 'mouseenter', cmax_mouseenter);
		}
	}

	this.setListening =  function (/* boolean */ b) {
        if (b && !this._listening) {
			addListeners();
        } else if (b === false) {
			removeListeners();
        }
    };

	//innerbar
	var innerbar = this.innerbar = document.createElement('div'),
		topvirt,
		downvirt;

	innerbar.className = 'innerbar';

	//clean up
	this.node.innerHTML = '';
	this.node.style.width = this.width + 'px';

	this.node.appendChild(innerbar);

	// max cursor
	this.cursor_max = document.createElement('div');
	this.cursor_max.className = 'arrow up';
	this.node.appendChild(this.cursor_max);

	topvirt = this.virt2real(top);
	this.innerbar.style.right = this.width - topvirt - this.cursor_width_middle + 'px';
	this.cursor_max.style.left = topvirt + 'px';

	this.max = this.width - this.cursor_width_middle;
	this.min  = this.cursor_width_middle;
	
    //min maybe
    if (down != undefined && down !== false) {
		this.cursor_min = document.createElement('div');
		this.cursor_min.className = 'arrow down';
		this.node.appendChild(this.cursor_min);
	
		downvirt = this.virt2real(down);
		this.innerbar.style.left = downvirt + this.cursor_width - this.cursor_width_middle + 'px';
		this.cursor_min.style.left = downvirt + 'px';
    }
	
	//setStep if requested
	if (step != undefined) {
		this.setStep(step);
	}
}

JMVC.widget.Slider.prototype.getValue = function () { 
	return this.step ? 
	{
		'down' : this.cursor_min ? this.map[this.nearest(parseInt(this.cursor_min.style.left, 10) , this.ticks)] : false,
		'up' : this.map[this.nearest(parseInt(this.cursor_max.style.left, 10)  , this.ticks)]
	} : {
		'down' : this.cursor_min ? this.real2virt( parseInt(this.cursor_min.style.left, 10) ) : false,
		'up' : this.real2virt(parseInt(this.cursor_max.style.left, 10)  )
	};
}

JMVC.widget.Slider.prototype.setValue  = function (top, down) {
	if (top < down) {
		return false;
	}
	var	topvirt = this.virt2real(top);
	this.innerbar.style.right = this.width - topvirt - this.cursor_width_middle + 'px';
	this.cursor_max.style.left = topvirt + 'px';
	this.max = this.width - this.cursor_width_middle;
	
    //min maybe
    if (down != undefined && down !== false) {
		this.min  = this.cursor_width_middle;	
		var downvirt = this.virt2real(down);
		this.innerbar.style.left = downvirt + this.cursor_width - this.cursor_width_middle + 'px';
		this.cursor_min.style.left = downvirt + 'px';
    }
    this.change && this.change(this.getValue());
};

JMVC.widget.Slider.prototype.real2virt= function (v) {
	if (v < 0) {
		return this.virtual_bounds[0];
	}
	if (v > this.width) {
		return this.virtual_bounds[1];
	}
	v = v  / (this.width - this.cursor_width);
	return Math.round(this.virtual_bounds[0] + v * this.virtual_length); 
};

JMVC.widget.Slider.prototype.virt2real = function (v) {
	if (v < this.virtual_bounds[0]){
		return 0;
	}
	if (v > this.virtual_bounds[1]) {
		return this.width - this.cursor_width;
	}
	v = (v - this.virtual_bounds[0]) / this.virtual_length;
	return Math.round( v * (this.width - this.cursor_width));
};
