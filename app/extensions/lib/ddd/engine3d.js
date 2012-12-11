JMVC.extend('e3d', {
	'DisplayObject3D' : function(){ return this;},
	'Camera3D' : function(){},
	'Object3D' : function(container){this.container = JMVC.dom.find(container); },
	'Scene3D' : function(){}
});



JMVC.prototipize(
	JMVC.e3d.DisplayObject3D,
	{
		'_x' : 0,
		'_y' : 0,
		'container' : undefined, 
		'pointsArray' : [],
		'init' : function (container){
			this.container = JMVC.dom.find(container);
			this.containerId = JMVC.css.attr(this.container, "id");

			if (jQuery(container+":has(ul)").length === 0){
				for (var i=0; i < this.pointsArray.length; i++){
					this.container.append('<b id="item'+i+'">+</b>');
				}
			}
		},
		'make2DPoint' : function(x,y, depth, scaleFactor){
			return {'x':x,'y':y, 'depth':depth, 'scaleFactor':scaleFactor};
		},
		'make3DPoint' : function(x,y,z) {
			return {'x':x,'y':y, 'z':z};
		}
		
	}
);
JMVC.prototipize(
	JMVC.engine3d.Camera3D,
	{
		'x' : 0,
		'y' : 0,
		'z' : 500,
		'focalLength':1000,
		'scaleRatio' : function(item){
			return this.focalLength/(this.focalLength + item.z - this.z);
		},
		'init'  : function (x,y,z,focalLength){
			this.x = x;
			this.y = y;
			this.z = z;
			this.focalLength = focalLength;
		}
	}
);
JMVC.prototipize(
	JMVC.engine3d.Object3D,
	{
		'objects' : [],
		'addChild' : function (object3D){

			this.objects.push(object3D);

			object3D.init(this.container);

			return object3D;
		}
	}
);


JMVC.prototipize(
	JMVC.engine3d.Scene3D,
	{
		'sceneItems' : [],
		'addToScene' : function (object){
			this.sceneItems.push(object);
		},
		'Transform3DPointsTo2DPoints' : function(points, axisRotations, camera){
			var TransformedPointsArray = [],
				sx = Math.sin(axisRotations.x),
				cx = Math.cos(axisRotations.x),
				sy = Math.sin(axisRotations.y),
				cy = Math.cos(axisRotations.y),
				sz = Math.sin(axisRotations.z),
				cz = Math.cos(axisRotations.z),
				x, y ,z,
				xy, xz,
				yx, yz,
				zx, zy,
				scaleFactor;

			var i = points.length;

			while (i--){
				x = points[i].x;
				y = points[i].y;
				z = points[i].z;

				// rotation around x
				xy = cx*y - sx*z;
				xz = sx*y + cx*z;
				// rotation around y
				yz = cy*xz - sy*x;
				yx = sy*xz + cy*x;
				// rotation around z
				zx = cz*yx - sz*xy;
				zy = sz*yx + cz*xy;

				scaleFactor = camera.focalLength/(camera.focalLength + yz);
				x = zx*scaleFactor;
				y = zy*scaleFactor;
				z = yz;

				var displayObject = new JMVC.engine3d.DisplayObject3D();
				TransformedPointsArray[i] = displayObject.make2DPoint(x, y, -z, scaleFactor);
			}

			return TransformedPointsArray;
		},
		
		
		'renderCamera' : function (camera){

			// Loop through all objects in the scene.
			for(var i = 0 ; i< this.sceneItems.length; i++){

				var obj = this.sceneItems[i].objects[0];

				//transform the points in the object to 2d points.
				var screenPoints = this.Transform3DPointsTo2DPoints(obj.pointsArray, axisRotation, camera);


				//does the container have a ul inside of it.
				var hasList = (JMVC.dom.find(obj.containerId).getElementsByTagName("ul").length > 0);


				//Cycle through each point in the object.
				for (var k=0; k < obj.pointsArray.length; k++){
					var currItem = null;

					//if the container has a list then select the lis
					if (hasList){
						currItem = JMVC.dom.find(obj.containerId).getElementsByTagName("ul")[0].getElementsByTagName("li")[k];
					}else{

						//otherwise select whatever is there.
						currItem = JMVC.dom.find(obj.containerId).getElementsByTagName("*")[k];
					}

					//If there are items to render then...
					if(currItem){
						currItem._x = screenPoints[k].x;
						currItem._y = screenPoints[k].y;
						currItem.scale = screenPoints[k].scaleFactor;


						//Render the CSS.
						currItem.style.position = "absolute";
						currItem.style.top = currItem._y+'px';
						currItem.style.left = currItem._x+'px';
						if(! jQuery(currItem).hasClass('center'))
							currItem.style.fontSize = 100*currItem.scale+'%';
						$(currItem).css({opacity:(currItem.scale-.5)});
					}
				}
				
			}
		}		
	}
);




//Center for rotation
var axisRotation = new JMVC.engine3d.DisplayObject3D().make3DPoint(0,0,0);





