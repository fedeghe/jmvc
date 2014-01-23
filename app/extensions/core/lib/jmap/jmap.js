JMVC.extend('jmap',{
	init : function () {
		JMVC.head.addstyle(JMVC.vars.extensions + 'lib/jmap/css/default.css', true, false);
	},
	create : function (container, w, h, s) {
		var tileSize = {
				width : 50, //256
				height : 50 //256
			},
			that = this,
			map = this;
		
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
					'color' : JMVC.core.color.getRandomColor(true)
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
			//check border
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
			this.checkGo = function(pos){
				 this.add(pos)
			}
			
			//adds a row/colum and removes the opposite
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
					for (i = 0; i < this[size]; i += 1) {
						//add
						addTile(map.innermap, {
							id : '__tile__' + (this.actualNodes[addActualNode][2]+ (addIon==2 ? i : 0)) + '_' +(this.actualNodes[addActualNode][3]+ (addIon==3 ? i : 0)),
							color : JMVC.core.color.getRandomColor(true),//'#0f0',
							left : this.actualNodes[addActualNode][0] + (versus=='left' ?  sign*i*tileSize.width : 0),
							top : this.actualNodes[addActualNode][1] + (versus=='top' ?  sign*i*tileSize.height : 0),
							content : (this.actualNodes[addActualNode][2]+ (addIon==2 ? i : 0)) + ',' + (this.actualNodes[addActualNode][3]+ (addIon==3 ? i : 0))
						});
						//remove
						JMVC.dom.remove(
							JMVC.dom.find('#__tile__' +
								(this.actualNodes[delActualNode][2] + (addIon==2 ? i : 0)) +
								'_' +
								(this.actualNodes[delActualNode][3] + (addIon==3 ? i : 0)))
						);
						
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
			//this.remove = function (where/*top,right,bottom,left*/) {}
			
			this.init = function (container /*innermap*/) {
				addTiles.call(this, container);
			}
			
		}
		
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
			var pos = false;
			if (dragging) {
				that.innermap.style.top = top + (e.clientY - drgStartTop) + 'px';
				that.innermap.style.left = left + (e.clientX - drgStartLeft) + 'px';
				pos = that.carpet.checkBorder();
				while(pos) {
					that.carpet.checkGo(pos);
					pos = that.carpet.checkBorder();
				}
			}
		}
		
		this.move = function(xn, yn){
			that.innermap.style.left = (xn*tileSize.width)+'px';
			that.innermap.style.top = (yn*tileSize.height)+'px';
			
			that.carpet.actualNodes.topLeft = [
				xn*tileSize.width,
				yn*tileSize.height,
				xn,
				yn
			];
			that.carpet.actualNodes.topRight = [
				xn*tileSize.width + that.carpet.width,
				yn*tileSize.height,
				xn + that.carpet.xtiles_num -1,
				yn
			];
			that.carpet.actualNodes.bottomLeft = [
				xn*tileSize.width,
				yn*tileSize.height + that.carpet.height,
				xn,
				yn + that.carpet.ytiles_num -1
			];
			that.carpet.actualNodes.bottomRight = [
				xn*tileSize.width + that.carpet.width,
				yn*tileSize.height + that.carpet.height,
				xn + that.carpet.xtiles_num -1,
				yn + that.carpet.ytiles_num -1
			];
			
			that.carpet.checkGo(that.carpet.checkBorder());
		}
		//cache.left = tileSize.width * (this.xtiles_num - 1);
		//cache.top = tileSize.height * (this.ytiles_num - 1);
		
		
		//stop
		function stopMove(e) {
			//console.debug('>>> stop');
			that.innermap.style.cursor = '';
			dragging = false;
		}
		
		JMVC.events.bind(this.map, 'mouseenter', stopMove);
		JMVC.events.bind(this.map, 'mousedown', startMove);
		JMVC.events.bind(this.map, 'mousemove', processMove);
		JMVC.events.bind(this.map, 'mouseup', stopMove);
		
		return this;
	}
	
});

