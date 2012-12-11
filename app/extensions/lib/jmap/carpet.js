JMVC.require('css');
JMVC.extend('carpet',{
	'init' : function () {
		JMVC.head.addstyle(JMVC.vars.extensions + 'lib/carpet/css/default.css', true, false);
	},
	'create' : function (container, w, h, s) {
		var tileSize = {
				width : 50, //256
				height : 50 //256
			},
			that = this,
			map = this,
			beforeAdd = false,
			afterAdd = false,
			beforeRemove = false,
			afterRemove = false,
			bounds = {
				vert : false,
				oriz : false
			},
			enabled = {
				vert : true,
				oriz : true
			},
			useSpeed = false,
			dragSpeed = false,
			dragDir = false;
		
		//matrix carpet
		function Carpet(margin) {
			var i = 0,
				j = 0,
				n = 0,
				that = this,
				tmpNode,
				cache = {};
			margin = margin || 3;
			//
			//
			function Tile(left, top) {
				this.position = {
					'left' : left,
					'top' : top,
					//DEV
					'color' : JMVC.color.getRandomColor(true)
				}
			}
			//
			this.xtiles_num = Math.ceil(w / tileSize.width) + margin;
			this.ytiles_num = Math.ceil(h / tileSize.height) + margin;
			this.width = this.xtiles_num * tileSize.width;
			this.height = this.ytiles_num * tileSize.height;
			this.position = {
				"left" : (w - this.width)>>1,
				"top" : (h - this.height)>>1
			}
			this.tiles = [];
			
			cache.left = tileSize.width * (this.xtiles_num - 1);
			cache.top = tileSize.height * (this.ytiles_num - 1);
			
			
			//position for nodes use by adding/removing
			/**
			 *   O--+--+--+-  .  -+--+--+--O--+
			 *   |  |  |  |       |  |  |  |  |
			 *   +--+--+--+-  .  -+--+--+--+--+
			 *   |  |  |  |       |  |  |  |  |
			 *   
			 *   .  .  .  .   .   .  .  .  .  .
			 *   
			 *   |  |  |  |       |  |  |  |  |
			 *   +--+--+--+-  .  -+--+--+--+--+
			 *   |  |  |  |       |  |  |  |  |
			 *   O--+--+--+-  .  -+--+--+--O--+
			 *   |  |  |  |       |  |  |  |  |
			 *   +--+--+--+-  .  -+--+--+--+--+
			 *   
			 *   [topleft, topright, bottomright, bottomleft]
			 */
			this.actualNodes = {
				//[xposition, yposition, xindex, yindex]
				topLeft : [0, 0, 0, 0],
				topRight : [cache.left, 0,  this.xtiles_num - 1, 0],
				bottomLeft : [0, cache.top, 0, this.ytiles_num - 1],
				bottomRight : [cache.left, cache.top, this.xtiles_num - 1, this.ytiles_num - 1]
			};
			//console.debug(this.actualNodes);
			//
			function addTile(c, props){
				tmpNode = JMVC.dom.create(
					'div',
					{
						'class':'tile',
						'id' : props.id,
						'style' : 'background-color:'
							+ props.color
							+ ';left:'//DEV
							//+ ';left:'//PROD
							+ props.left
							+ 'px;top:'
							+ props.top
							+ 'px;width:'
							+ tileSize.width
							+ 'px;height:'
							+ tileSize.height
							+ 'px'
					},
					props.content
				);
				JMVC.dom.append(c, tmpNode);
			}
			
			function addTiles(c) {
				i = j = 0;
				while (n < (this.xtiles_num)*(this.ytiles_num)) {
					that.tiles[i] = new Tile(i * tileSize.width, j * tileSize.height);
					
					
					addTile(c, {
						id : '__tile__' + i + '_' + j,
						color : that.tiles[i].position.color,
						left : that.tiles[i].position.left,
						top : that.tiles[i].position.top,
						content : i + ',' + j
					});
					
					n += 1;
					i = (i + 1) % this.xtiles_num;
					j = ~~(n / this.xtiles_num);	
				}
			}
			
			/**
			 * Checks the current status,
			 * if a row or a line should be added
			 * that returns the section to be added
			 */
			this.checkBorder = function () {
				var done = false,
					left = 0,
					top = 0,
					/**
					*
					*	+---------+
					*	|####|    |	
					*	|####|    |
					*	|----+----|
					*	|	 |    |
					*	|	 |    |
					*	+---------+-------. . . .
					*		      |				    
					*		      |				    
					*		      |				    
					*		      .
					*		      .
					*		      .
					*		      .
					*		      
					*		 
					*
					*
					*/
					securebox = {
						'top' : -tileSize.height << 1,
						'bottom' : -tileSize.height,
						'left' : -tileSize.width << 1,
						'right' : -tileSize.width
					},
					pos = false;
				
				
				left = parseInt(JMVC.css.style(map.innermap, 'left'), 10) + this.actualNodes.topLeft[0];
				top  = parseInt(JMVC.css.style(map.innermap, 'top'), 10) + this.actualNodes.topLeft[1];

				if(top < securebox.top){pos = 'bottom';}
				if(top > securebox.bottom){pos = 'top';}
				if(left < securebox.left){pos = 'right';}
				if(left > securebox.right){pos = 'left';}
				//pos && this.add(pos);

				return pos;
			};
			
			/**
			 * If checkBorder returns something not false
			 * that function is called with the checkBorder
			 * answer
			 */
			this.checkGo = function(pos){
				 this.add(pos)
			}
			
			/**
			 * adds a row/colum and removes the opposite
			 * 
			 */ 
			this.add = function (where/*top,right,bottom,left*/) {
				
				function updateindex(name1, name2, index1, index2, incr1, incr2){
					//update positions
					this.actualNodes[name1][index1] += incr1;
					this.actualNodes[name2][index1] += incr1;
					// and indexes
					this.actualNodes[name1][index2] += incr2;
					this.actualNodes[name2][index2] += incr2;
				}
				
				//add a border row/column
				//and remove opposite
				function updateRC(size, addActualNode, delActualNode, addIon/*2|3*/, versus, sign) {
					for (var i = 0, tmpID; i < this[size]; i += 1) {
						//add
						tmpID = '__tile__' + (this.actualNodes[addActualNode][2]+ (addIon==2 ? i : 0)) +
							'_' +(this.actualNodes[addActualNode][3]+ (addIon==3 ? i : 0));
						if (beforeAdd) {beforeAdd(tmpID); }
						addTile(map.innermap, {
							id : tmpID,
							color : JMVC.color.getRandomColor(true),//'#0f0',
							left : this.actualNodes[addActualNode][0] + (versus=='left' ?  sign*i*tileSize.width : 0),
							top : this.actualNodes[addActualNode][1] + (versus=='top' ?  sign*i*tileSize.height : 0),
							content : (this.actualNodes[addActualNode][2]+ (addIon==2 ? i : 0)) + ',' + (this.actualNodes[addActualNode][3]+ (addIon==3 ? i : 0))
						});
						if (afterAdd) {afterAdd(tmpID); }
						
						
						//remove
						
						tmpID = '#__tile__' + (this.actualNodes[delActualNode][2] + (addIon==2 ? i : 0)) +
								'_' + (this.actualNodes[delActualNode][3] + (addIon==3 ? i : 0));
						if (beforeRemove) {beforeRemove(tmpID); }
						JMVC.dom.remove(JMVC.dom.find(tmpID));
						if (afterRemove) {afterRemove(tmpID); }
					}
					
				}
				
				switch (where) {
				
					case 'top': //add top remove bottom
						updateindex.call(this, 'topLeft', 'topRight', 1, 3, -tileSize.height, -1);
						updateRC.call(this, 'xtiles_num', 'topLeft', 'bottomLeft', 2, 'left', 1);
						updateindex.call(this, 'bottomLeft', 'bottomRight', 1, 3, -tileSize.height, -1);
					break;
					case 'right': //add right remove left
						updateindex.call(this, 'topRight', 'bottomRight', 0, 2, tileSize.width, 1);
						updateRC.call(this, 'ytiles_num', 'topRight', 'topLeft', 3, 'top', 1);
						updateindex.call(this, 'topLeft', 'bottomLeft', 0, 2, tileSize.width, 1);
					break;	
					case 'bottom': //add bottom remove top
						updateindex.call(this, 'bottomLeft', 'bottomRight', 1, 3, tileSize.height, 1);
						updateRC.call(this, 'xtiles_num', 'bottomLeft', 'topLeft', 2, 'left', 1);
						updateindex.call(this, 'topLeft', 'topRight', 1, 3, tileSize.height, 1);
					break;
					case 'left': //add left remove right
						updateindex.call(this, 'topLeft', 'bottomLeft', 0, 2, -tileSize.width, -1);
						updateRC.call(this, 'ytiles_num', 'topLeft', 'topRight', 3, 'top', 1);
						updateindex.call(this, 'topRight', 'bottomRight', 0, 2, -tileSize.width, -1);
					break;
				}
				
			}
			
			//add inital tiles
			this.init = function (container /*innermap*/) {
				addTiles.call(this, container);
			}
			
		}
		//end carpet object
		
		
		// get a brand new Carpet
		this.carpet = new Carpet(s);
		
		// create the innermap 
		this.innermap = JMVC.dom.create('div', {
				'class':'jmaps innerdiv',
				'style':'width:' + this.carpet.width + 'px; height:' + this.carpet.height + 'px; left:' +
						this.carpet.position.left + 'px;' + 'top:' + this.carpet.position.top + 'px'
			}
		);
		
		// append innermap into a new container
		this.map = JMVC.dom.create('div',
			{'class':'jmaps outerdiv', 'style' : 'width:' + w + 'px; height:' + h + 'px'},
			this.innermap
		); 
		
		// append the outer container to the passed container
		JMVC.dom.append(container, this.map);

		// create init Tiles	
		this.carpet.init(this.innermap);

		//
		//
		//
		// EVENTS
		// start
		var dragging = false,
			drgStartLeft = 0,
			drgStartTop = 0,
			left = 0,
			top = 0;
		function startMove(e) {
			drgStartLeft = e.clientX;
			drgStartTop = e.clientY;
			that.innermap.style.cursor = 'move';
			
			top = parseInt(that.innermap.style.top);
			left = parseInt(that.innermap.style.left);
			
			dragging = true;
			return false;
		}
		
		//process
		function processMove(e) {
			//console.debug('>>> process');
			var pos = false,
				hDiff = false,
				wDiff = false;
			if (dragging) {
				hDiff = e.clientY - drgStartTop;
				wDiff = e.clientX - drgStartLeft;
				//move innner map
				if (enabled.vert) {
					that.innermap.style.top = top + hDiff + 'px';
				}
				if (enabled.oriz) {
					that.innermap.style.left = left + wDiff + 'px';
				}
				
				// while checkBorder tell that something
				// must be added call checkGo with the response given
				pos = that.carpet.checkBorder();
				while(pos) {
					that.carpet.checkGo(pos);
					pos = that.carpet.checkBorder();
				}
			}
		}
		
		//stop
		function stopMove(e) {
			var top, left;
			//console.debug('>>> stop');
			that.innermap.style.cursor = '';
			dragging = false;
			/*
			if (useSpeed) {
				while(dragSpeed.h != 0 || dragSpeed.w != 0){
					if (enabled.vert) {
						that.innermap.style.top = top + dragSpeed.h + 'px';
						dragSpeed.h += (dragSpeed.h > 0) ? -1 : 1;
					}
					if (enabled.oriz) {
						that.innermap.style.left = left + dragSpeed.w + 'px';
						dragSpeed.w += (dragSpeed.w > 0) ? -1 : 1;
					}
					
					
					
				}
			}*/
		}
		
		JMVC.events.bind(this.map, 'mouseenter', stopMove);
		JMVC.events.bind(this.map, 'mousedown', startMove);
		JMVC.events.bind(this.map, 'mousemove', processMove);
		JMVC.events.bind(this.map, 'mouseup', stopMove);
		
		
		function startTouch(e){
			JMVC.events.kill(e);
			var touch = e.touches[0],
				posX = touch.pageX,
				posY = touch.pageY;
			drgStartLeft = posX;
			drgStartTop = posY;
			that.innermap.style.cursor = 'move';
			
			top = parseInt(that.innermap.style.top);
			left = parseInt(that.innermap.style.left);
			
			dragging = true;
			return false;
		}
		function processTouch(e) {
			//console.debug('>>> process');
			JMVC.events.kill(e);
			var touch = e.touches[0],
				posX = touch.pageX,
				posY = touch.pageY;
			var pos = false,
				hDiff = false,
				wDiff = false;
			if (dragging) {
				hDiff = posY - drgStartTop;
				wDiff = posX - drgStartLeft;
				//move innner map
				if (enabled.vert) {
					that.innermap.style.top = top + hDiff + 'px';
				}
				if (enabled.oriz) {
					that.innermap.style.left = left + wDiff + 'px';
				}
				
				// while checkBorder tell that something
				// must be added call checkGo with the response given
				pos = that.carpet.checkBorder();
				while(pos) {
					that.carpet.checkGo(pos);
					pos = that.carpet.checkBorder();
				}
			}
		}
		function stopTouch(e) {
			var top, left;
			//console.debug('>>> stop');
			that.innermap.style.cursor = '';
			dragging = false;
			/*
			if (useSpeed) {
				while(dragSpeed.h != 0 || dragSpeed.w != 0){
					if (enabled.vert) {
						that.innermap.style.top = top + dragSpeed.h + 'px';
						dragSpeed.h += (dragSpeed.h > 0) ? -1 : 1;
					}
					if (enabled.oriz) {
						that.innermap.style.left = left + dragSpeed.w + 'px';
						dragSpeed.w += (dragSpeed.w > 0) ? -1 : 1;
					}
					
					
					
				}
			}*/
		}
		JMVC.events.bind(this.map, 'touchstart', startTouch);
		JMVC.events.bind(this.map, 'touchmove', processTouch);
		JMVC.events.bind(this.map, 'touchend', stopTouch);
		
		
		
		
		
		//API
		this.beforeAdd = function(f){
			beforeAdd = function(id){f.call(that.carpet, id);};
		}
		this.afterAdd = function(f){
			afterAdd = function(id){f.call(that.carpet, id);};
		}
		//API
		this.beforeRemove = function(f){
			beforeRemove = function(id){f.call(that.carpet, id);};
		}
		this.afterRemove = function(f){
			afterRemove = function(id){f.call(that.carpet, id);};
		}
		
		this.setBounds = function (dir, bnds) {
			bounds[dir] = bnds
		};
		this.toggleDir = function(dir, nbld){
			enabled[dir] = nbld;
		}
		this.enableSpeed = function(b){
			useSpeed = b;
		}
		
		this.move = function(xn, yn){
			that.innermap.style.left = that.carpet.position.left + (xn*tileSize.width)+'px';
			that.innermap.style.top = that.carpet.position.top + (yn*tileSize.height)+'px';
			
			that.carpet.actualNodes.topLeft = [
				xn*tileSize.width,
				yn*tileSize.height,
				xn,
				yn
			];
			that.carpet.actualNodes.topRight = [
				(xn-1)*tileSize.width + that.carpet.width,
				yn*tileSize.height,
				xn + that.carpet.xtiles_num -1,
				yn
			];
			that.carpet.actualNodes.bottomLeft = [
				xn*tileSize.width,
				(yn-1)*tileSize.height + that.carpet.height,
				xn,
				yn + that.carpet.ytiles_num -1
			];
			that.carpet.actualNodes.bottomRight = [
				(xn-1)*tileSize.width + that.carpet.width,
				(yn-1)*tileSize.height + that.carpet.height,
				xn + that.carpet.xtiles_num -1,
				yn + that.carpet.ytiles_num -1
			];
			
			that.carpet.checkGo(that.carpet.checkBorder());
		}
		//cache.left = tileSize.width * (this.xtiles_num - 1);
		//cache.top = tileSize.height * (this.ytiles_num - 1);
		
		
		
		return this;
	}
	
});

