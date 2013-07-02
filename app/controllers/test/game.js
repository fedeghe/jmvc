JMVC.controllers.game = function() {

	this.index = function(){

		JMVC.require('lib/game');
		
		JMVC.getModel('game/Rect');
		
		



		
		
		
		
		

		this.render(false,function test(){
			"use strict";

			JMVC.test.initialize(true);

			JMVC.test.startAll();
			
			
			JMVC.test.describe('<canvas id="viewport" height="480" width="640"></canvas>');
			
			
			JMVC.test.finishAll();
		});
		
		
		var Game = JMVC.game.create(
			function() {
				this.entities = [];
				this.context = document.getElementById("viewport").getContext("2d");
				var i = 40;
				while(i--){
					this.entities.push(new JMVC.models.Rect());
				}
			},
			function () {
				this.context.clearRect(0, 0, 640, 480);

				for (var i=0; i < this.entities.length; i++) {
					this.entities[i].draw(this.context);
				}
			},
			function () {
				for (var i=0; i < this.entities.length; i++) {
					this.entities[i].update();
				}
			}
		);		
		
		
	}
};
