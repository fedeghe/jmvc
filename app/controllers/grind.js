JMVC.require('lib/border/border', 'widget/snow');
JMVC.controllers.grind = function () {
	this.index = function () {
		JMVC.events.loadify(50);
		JMVC.require('lib/grind/grind','dim');
		JMVC.head.meta("generator", "jmvc resident in your machine");
		var v = JMVC.getView('vacuum'),
			that = this;

		v.set({'style' : 'font-family:verdana;', 'content' : '&nbsp;', 'id' : 'extralogo'});
		
		var config  = [
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "head"},
				"class" : "p100"
			},
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova1"},
				"float" : "left",
				"class" : "g250"
			},
			{
			"target" : '#extralogo',
			"attrs" : {"id" : "prova2"},
			"float" : "left",
			"class" : "g450",
			"inner" : [
				{
					"attrs" : {"id" : "prova3"},
					"float" : "left",
					"class" : "p30",
					"inner" : [
						{"class":"blocco", "style":{"marginBottom": "50px"}},
						{"class":"blocco", "style":{"marginBottom": "50px"}},
						{"class":"blocco"}
					]
				},
				{
					"attrs" : {"id" : "prova4"},
					"float" : "left",
					"class" : "p50",
					"inner" : [
						{"class":"blocco"},
						{"class":"blocco"},
						{"class":"blocco",
							"inner" : [
								{"class":"p30", "style":{"marginRight":"5%"}, "float":"left"},
								{"class":"p30", "style":{"marginRight":"5%"}, "float":"left"},
								{"class":"p30",	"float":"left"},
								"clear"
							]
						}
					]
				},
				{"class" : "p20", "float" : "left"},
				"clear"
			]
			},
			"clear",
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova5"},
				"class" : "g700",
				"inner" : [
					{"attrs" : {"id" : "brd1"}, "class":"p25", "float":"right"},
					{"attrs" : {"id" : "brd2"},"class":"p25", "float":"left", "style":{"backgroundColor":"none"}},
					{"attrs" : {"id" : "brd3"},"class":"p25", "float":"right"},
					//{"attrs" : {"id" : "brd4"}, "class":"p25", "float":"right"},
					"clear"
				]
			},
			"clear",
			{
				"target" : '#extralogo',
				"attrs" : {"id" : "prova6"},
				"style":{'position':'relative'},
				"class" : "g700"
			}
		];
		var t = JMVC.getView('test/tbl');
		//console.debug(t.content)
		v.render({cback : function(){
				
			
				
			JMVC.grind.render(config);
//			JMVC.dom.html(JMVC.dom.find('#brd1'), JMVC.border.left('#090', '#888', 100,20));
			JMVC.dom.html(JMVC.dom.find('#brd1'), JMVC.border.vert(25, 100, -20, 40, 'left', '#070', '#888'));

			//JMVC.dom.html(JMVC.dom.find('#brd2'), JMVC.border.right('white', '#888', 50,10));
			JMVC.dom.html(JMVC.dom.find('#brd2'), JMVC.border.vert(15, 100, -10, -50, 'right', 'white', '#888'));
			
			
			JMVC.dom.html(JMVC.dom.find('#brd3'), JMVC.border.vert(15, 200, 50, 10, 'left', '#070', '#888'));
			
			
			var d1 = JMVC.dom.create('div',{'style':'height:200px;width:200px;top:0px;position:absolute;background-color:#200'}),
				d2 = JMVC.dom.create('div',{'style':'height:200px;width:200px;top:0px;position:absolute;background-color:blue'});
			
			JMVC.dom.append(JMVC.dom.find('#prova6'), [d1]);
			
			//JMVC.dom.append(d2, JMVC.border.xbottom(30,200, 10,-80,'red'));
			JMVC.dom.append(d1, JMVC.border.xtop(30,200, 90,50,'#533'));
			//JMVC.dom.append(d2, JMVC.border.xleft(200,30, -10,-40,'#0dd'));
			JMVC.dom.append(d1, JMVC.border.xright(200,50, -30,-50,'#422'));
			
			
			//console.debug( JMVC.border.xleft(200,30, 70,-30,'#0dd') );
				
				
				
				
		}});
		
		
		
		
	}
};

