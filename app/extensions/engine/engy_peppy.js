//use peppy in j
j.extend({
	find: function(selector, context){
		
		//j.log(selector);
		//reset results
		j.elements = [];
		
		//fit context
		context = context || document;	
		
		//if is j return 
		if(selector == j)return selector;
		//no arg or window return
		if(arguments.length === 0 || selector === window){  j.elements.push(window); return j; }
		//node return
		if(selector.nodeType === 1){ j.elements.push(selector); return j; }
		
		
		
		
		j.elements = peppy.query.apply(window, arguments);
		return j;
	}
});