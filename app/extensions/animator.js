/*
 * Author: Federico Ghedina
 **/
JMVC.extend('animator',{

	//follow implicit path
	follow_ipath : function( that, func, prange, options){
		
		var _ani = {};
		
		
		_ani.timeout = JMVC.util.in_object(options, 'timeout') ? options.timeout : 25;
		_ani.mode = JMVC.util.in_object(options, 'mode') ? options.mode : 'repeat';
		_ani.step = JMVC.util.in_object(options, 'step') ? JMVC.getFloat(options.step) : 1;
		_ani.range = JMVC.util.defined(prange) ? prange : {from:0, to:300};
		_ani.next = function(){};
		_ani.operators ={
				'+':function(a){return a+_ani.step;},
				'-':function(a){return a-_ani.step;}
			};
		_ani.op = _ani.operators['+'];
		
		JMVC.css.style(that, 'position', 'absolute');
		
		var parent = JMVC.dom.parent(that);
		
		JMVC.debug(_ani);
		
		JMVC.css.style(parent, 'position', 'relative');
		
		
		switch(_ani.mode){
			case 'repeat':
				_ani.next = function(that, x ,f){
					if(x<_ani.range.to){
						window.setTimeout(
							function(){ move(that, x+_ani.step, f); },
							_ani.timeout
						);
					}else{ move(that, _ani.range.from, f);}
				};
			break;
			case 'back':
				_ani.next = function(that, x ,f){
					if(_ani.range.from<=x && x<=_ani.range.to){
//						JMVC.debug(x)
//						JMVC.debug(_ani.range.to)
						if(x <= _ani.range.from){x=_ani.range.from; _ani.op = _ani.operators['+']; }
						if(x >= _ani.range.to){x=_ani.range.to; _ani.op = _ani.operators['-']; }
						window.setTimeout(
							function(){
								//
								move(that, _ani.op(x), f); },
							_ani.timeout
						);
					}
				};
			break;
			case 'stop':
				_ani.next = function(that, x ,f){
					if(_ani.range.from<=x && x<=_ani.range.to){
						window.setTimeout(
							function(){ move(that, _ani.op(x), f); },
							_ani.timeout
						);
					}
					else{ return false;}
				};
			break;
			default : break;
		}
		
		var move = function(that, x, f){

			JMVC.css.style(that, {'left':x+'px','top':f(x)+'px'});
			_ani.next(that, x ,f);
			
		};
		move(that, _ani.range.from, func);
		
	},
	
	/*
	follow_ppath : function( funcx, funcy, prange, options){
		
		j._ani = {};
		var that = this.elements[0];
		
		j._ani.timeout = j.in_object(options, 'timeout') ? options.timeout : 25;
		j._ani.mode = j.in_object(options, 'mode') ? options.mode : 'repeat';
		j._ani.range = j.defined(prange) ? prange : {from:0, to:10000};
		j._ani.next = function(){};
		j._ani.operators ={
				'+':function(a){return a+1;},
				'-':function(a){return a-1}
			};
		j._ani.op = j._ani.operators['+'];
		
		
		
		j(that).css({'position':'absolute'});
		
		var parent = j(that).parent();
		//j.log(parent == j);
		
		j(parent).css({'position':'relative'});
		
		switch(j._ani.mode){
			case 'repeat':
				j._ani.next = function(that, t ,fx, fy){
					if(t<j._ani.range.to){
						window.setTimeout(
							function(){ move(that, t+1, fx, fy); },
							j._ani.timeout
						);
					}else{
						move(that, j._ani.range.from, fx, fy);
					}
				};
			break;
			case 'back':
				j._ani.next = function(that, t ,fx, fy){
					if(j._ani.range.from<=t && t<=j._ani.range.to){
						if(t===j._ani.range.from){ j._ani.op = j._ani.operators['+']; }
						if(t===j._ani.range.to){ j._ani.op = j._ani.operators['-']; }
						window.setTimeout(
							function(){ move(that, j._ani.op(t), fx, fy); },
							j._ani.timeout
						);
					}
				};
			break;
			case 'stop':
				j._ani.next = function(that, t ,fx, fy){
					if(j._ani.range.from<=t && t<=j._ani.range.to){
						window.setTimeout(
							function(){ move(that, j._ani.op(t), fx, fy); },
							j._ani.timeout
						);
					}
					else{ return false;}
				};
			break;
			default : break;
		}
		
		var move = function(that, t, fx, fy){

			j(that).css({'left':fx(t)+'px','top':fy(t)+'px'});
			j._ani.next(that, t ,fx, fy);
			
		};
		move(that, j._ani.range.from, funcx, funcy);
		
	}		
	*/
	
	
	//	
	
	
	/*
	 sample
	j('#anibull').follow_ppath(
		function(i){return 40-50*Math.cos(i/10);},
		function(i){return 40-70*Math.sin(i/10);},
		{from:0, to:3600},
		{mode:'back',threeD:function(i){return Math.cos(i/10)}}
	);
	 **/
	
	//parametric version
	follow_ppath : function(that, funcx, funcy, prange, options){
		
		var _ani = {};
		
		_ani.timeout = JMVC.util.in_object(options, 'timeout') ? options.timeout : 25;
		_ani.mode = JMVC.util.in_object(options, 'mode') ? options.mode : 'repeat';
		_ani.threeD = JMVC.util.in_object(options, 'threeD') ? options.threeD : false;
		_ani.range = (JMVC.util.defined(prange) && JMVC.util.in_object(prange, 'from') && JMVC.util.in_object(prange, 'to')  ) ? prange : {from:0, to:10000};
		_ani.next = function(){};
		_ani.operators ={
				'+':function(a){return a+1;},
				'-':function(a){return a-1}
			};
		_ani.op = _ani.operators['+'];
		
		
		if(_ani.threeD){
			_ani.nextOpacity = function(){};
		}
		
		
		JMVC.css.style(that, 'position', 'absolute');
		
		var parent = JMVC.dom.parent(that);
		//j.log(parent == j);
		
		JMVC.css.style(parent, 'position', 'relative');
		
		switch(_ani.mode){
			case 'repeat':
				_ani.next = function(that, t ,fx, fy){
					if(t<_ani.range.to){
						window.setTimeout(
							function(){ move(that, t+1, fx, fy); },
							_ani.timeout
						);
					}else{
						move(that, _ani.range.from, fx, fy);
					}
				};
				
			break;
			case 'back':
				_ani.next = function(that, t ,fx, fy){
					if(_ani.range.from<=t && t<=_ani.range.to){
						if(t===_ani.range.from){ _ani.op = _ani.operators['+']; }
						if(t===_ani.range.to){ _ani.op = _ani.operators['-']; }
						window.setTimeout(
							function(){ move(that, _ani.op(t), fx, fy); },
							_ani.timeout
						);
					}
				};
			break;
			case 'stop':
				_ani.next = function(that, t ,fx, fy){
					if(_ani.range.from<=t && t<=_ani.range.to){
						window.setTimeout(
							function(){ move(that, _ani.op(t), fx, fy); },
							_ani.timeout
						);
					}
					else{ return false;}
				};
			break;
			default : break;
		}
		
		//save initial font-size
		
		var fsize = JMVC.getNum(JMVC.css.getComputedStyle('font-size'));
		
		var move = function(that, t, fx, fy){

			JMVC.css.stylej(that, {'left':fx(t)+'px','top':fy(t)+'px'});
			if(_ani.threeD){
				
				var more = _ani.threeD(t);
								
				var n = JMVC.getNum(fsize+(fsize*(1-more)))+'px';
				
				JMVC.css.style(that, {
					'opacity':more,
					'font-size':n
				});
			}
			_ani.next(that, t ,fx, fy);
			
		};
		move(that, _ani.range.from, funcx, funcy);
		
	}	
	
	
	
	
	
	
	
	
});
