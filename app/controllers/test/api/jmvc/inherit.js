JMVC.controllers.inherit = function () {
	this.action_index = function (){
		this.render(false,function test(){
			"use strict";
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			
			function Person(n){
				this.name = n || 'unknown';
			}
			Person.prototype.talk = function(){
				alert(this.name + ' says `foo`');
			}
			Person.prototype.wc = function(){
				alert('my name is ' + this.name.length + ' char long');
			}
			Person.prototype.eat = function(){
				alert(this.name + ' eats `foo`');
			}

			function Developer() {}
			JMVC.inherit(Developer, Person);
			Developer.prototype.code = function () {
				console.debug(this.name + ' is coding hard');
			}


			JMVC.test.code('function Person(n) {\n'+
				'	this.name = n || \'unknown\';\n' + 
				'};\n'+
				'Person.prototype.talk = function () {\n'+
				'	alert(this.name + \' says `foo`\');\n'+
				'};\n'+
				'Person.prototype.wc = function () {\n'+
				'	alert(\'my name is \' + this.name.length + \' char long\');\n'+
				'};\n'+
				'Person.prototype.eat = function () {\n'+
				'	alert(this.name + \' eats `foo`\');\n'+
				'};\n\n'+
				'function Developer() {};\n' +
				'JMVC.inherit(Developer, Person);\n' +
				'Developer.prototype.code = function () {\n' +
				'	console.debug(this.name + \' is coding hard\');\n' +
				'}'
			);

			
			
			JMVC.test.testValue(
				'Developer extends Person, implements `code` and `eat`',
				function () {return JMVC.implement(Developer, ['code', 'eat']);},
				true
			);
			
			
			JMVC.test.finishAll();
		});
	}
}