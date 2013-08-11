JMVC.controllers.checkns = function() {
	this.action_index = function(){
		
		JMVC.events.loadify(500);
		
		this.render(function test(){
			"use strict";
				
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();


			JMVC.test.describe('Create a middle deep object and test the function');

			JMVC.test.code('var ns = {\n'+
			'    extensions : {\n' +
			'        dom : {\n' +
			'            find : function () {\n' +
			'                return "extensions.dom.find"; \n' + 
			'            },\n' +
			'            append : function () {\n' +
			'                return "extensions.dom.append";\n' +  
			'            },\n' +
			'            ...\n' +   
			'        }\n' +  
			'    },\n' +
			'    vars : {\n' +
			'        baseurl : "jmvc.dev",\n' +
			'        name : "jmvc",\n' +
			'        data : {\n' +
			'            cities : {\n' +
			'                names : {\n' +
			'                    properties : "no properties"\n' +
			'                }\n' +   
			'            },\n' +   
			'            calendars : [1, 2, 3]\n' +
			'        }\n' +   
			'    }\n' +   
			'}');
		    var ns = {
					extensions : {
						dom : {
							find : function () {
								return "ns.extensions.dom.find";
							},
							append : function () {
								return "extensions.dom.append";
							}
						}
					},
					vars : {
						baseurl : 'jmvc.dev',
						name  : 'jmvc',
						data : {
							cities : {
								names : {
									properties : 'no properties'
								}
							},
							calendars : [1, 2, 3]
						}
					}
			    };
			
			JMVC.test.testValue("JMVC.ns.check('extensions.dom.find', ns)();", function(){return JMVC.ns.check('extensions.dom.find', ns)();}, 'ns.extensions.dom.find');
			JMVC.test.testValue("JMVC.ns.check('vars.name', ns);", function(){return JMVC.ns.check('vars.name', ns);}, 'jmvc');
			JMVC.test.testValue("JMVC.ns.check('vars.data.calendars', ns).toString();", function(){return JMVC.ns.check('vars.data.calendars', ns).toString();}, '1,2,3');
			JMVC.test.testValue("JSON.stringify(JMVC.ns.check('vars.data', ns));", function(){return JSON.stringify(JMVC.ns.check('vars.data', ns));}, '{"cities":{"names":{"properties":"no properties"}},"calendars":[1,2,3]}');
			JMVC.test.testValue("JMVC.ns.check('vars.data.calendars.1', ns);", function(){return JMVC.ns.check('vars.data.calendars.1', ns);}, 2);
			JMVC.test.message('Now check some unexistent ns');
			JMVC.test.testValue("JMVC.ns.check('vars.foo', ns);", function(){return JMVC.ns.check('vars.foo', ns);}, false);
			JMVC.test.testValue("JMVC.ns.check('vars.data.calendars.10', ns);", function(){return JMVC.ns.check('vars.data.calendars.10', ns);}, false);

			JMVC.test.finishAll();			
			
		});
	}
};