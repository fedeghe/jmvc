/* 
 * Container for all object in to be rendered
 */
JMVC.extend('ddd.scene', {
	'init' : function(){
		//this.t = 'asda';
		alert('hello 3d');
	},
	'el' : function(){
		this.t = 'd';
	}
});
//JMVC.debug(JMVC['3d'].scene);
JMVC.prototipize(JMVC.ddd.scene.el, {hello : function (name){alert('hello '+name);} });

