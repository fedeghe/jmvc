JMVC.extend('graf',{
	
	
	
	letter : function(letter, left, top, character){
		this.arr = [];
		this['char'] = character || '&bull;';
		this.left = left;
		this.top = top;
		this.arc = function(cx, cy, rx, ry, rstep, rfrom, hm){JMVC.graf.addarc(this.arr, this.left+cx, this.top+cy, rx, ry, rstep, rfrom, hm);};
		this.line = function(x1,y1, x2,y2,p){JMVC.graf.addline(this.arr, this.left+x1, this.top+y1, this.left+x2, this.top+y2, p);};
		this.plot = function(node){JMVC.graf.plotarr(node, this.arr, letter, this['char']);};
	},
	addarc : function(arr, centerx, centery, radiusx, radiusy, radstep, radfrom, howmany){
		var i = 0;
		while(howmany--){
			var x = centerx + radiusx*Math.cos(radfrom + i*radstep);
			var y = centery + radiusy*Math.sin(radfrom + i*radstep);
			i++;
			arr.push([~~y,~~x]);
		}
	},

	addline : function(arr, x1,y1, x2,y2, howmany){
		var hm = howmany+1,
			distance = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)),
			tx = (x2-x1)/hm,
			ty = (y2-y1)/hm;
		arr.push([y1,x1]);
		var i = 1;
		while(howmany--){
			arr.push([~~(y1 + ty*i), ~~(x1 + tx*i)]);
			i++;
		}
		arr.push([~~y2,~~x2]);
	},
	plot : function(node, positions, character){

		for(var letter in positions){
			JMVC.graf.plotarr(node, positions[letter], letter,character);
		}
	},
	plotarr : function(node, positions, letter, character){
		for(var i=0, l=positions.length; i<l; i++){
			var tmp = JMVC.dom.create('span',{'class':'point '+letter, 'style':JMVC.util.replaceall('top:%top%px;left:%left%px', {top:positions[i][0], left:positions[i][1]})}, character);
			JMVC.dom.append(node, tmp);
		}
	}
	
});
