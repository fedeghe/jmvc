/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
JMVC.extend('webgl', {
	
	'create' : function (canvas) {
		var gl;
		console.debug(canvas);
		try {
			gl = canvas.getContext("webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
			console.debug(gl)
		} catch (e) {
			var msg = "Error creating WebGL Context!: " + e.toString();
			alert(msg);
			throw Error(msg);
		}
		
		// viewport
		// gl.viewport(0, 0, canvas.width, canvas.height);
		
		//matrixs
		// The transform matrix for the square - translate back in Z
		// for the camera
		this.modelViewMatrix = new Float32Array(
			[1, 0, 0, 0,
			 0, 1, 0, 0,
			 0, 0, 1, 0,
			 0, 0, -3.333, 1]);
		// The projection matrix (for a 45 degree field of view)
		this.projectionMatrix = new Float32Array(
			[2.41421, 0, 0, 0,
			 0, 2.41421, 0, 0,
			 0, 0, -1.002002, -1,
			 0, 0, -0.2002002, 0]);
		 this.canvas = canvas;
		 this.gl = gl;
		
	}
	
	
});