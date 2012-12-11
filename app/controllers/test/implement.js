JMVC.require('test');
		
JMVC.controllers.implement = function() {

	this.index = function(){
				
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			JMVC.test.message('For more info look at <strong>controllers / test / implement.js</strong>');
			
			function Persona(n){
				this.name = n;
			}
			Persona.prototype.parla = function(){
				alert('ciao io sono '+this.name);
			}
			Persona.prototype.wc = function(){
				alert('ciao io sono '+this.name+' e devo andare in bagno');
			}
			Persona.prototype.mangia = function(){
				alert('ciao io sono '+this.name+' e ora vado a mangiare');
			}
			
			JMVC.test.testValue(
				'Persona implement ["parla", "wc, "mangia"]',
				function () {return JMVC.util.implement(Persona, ['parla', 'wc', 'mangia']);},
				true
			);
			JMVC.test.testValue(
				'Persona do not implement ["parlaw", "wc, "mangia"]',
				function () {return JMVC.util.implement(Persona, ['parlaw', 'wc', 'mangia']);},
				false
			);
			
			
			JMVC.test.finishAll();
		});
	};
};
