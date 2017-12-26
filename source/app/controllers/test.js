JMVC.controllers.test = function() {

	'use strict';

	var self = this;

	JMVC.require('core/lib/widgzard/widgzard');
	this.action_upload = function () {
		this.action_index();
	};
	this.action_index = function () {

		

		JMVC.core.widgzard.render({
			content : [{
				style : {margin:'10px'},
				wid : 'form',
				content : [{
					tag : 'input',
					attrs: {type:'file', name : 'fileToUpload'},
					wid : 'myfile'
				}],
				cb : function () {
					var self = this,
						file = self.getNode('myfile').node;

					JMVC.events.on(file, 'change', function (e) {

						JMVC.events.preventDefault(e);

						JMVC.io.post('/srv/form.php',function (res) {

							var f = file.files[0],
								response = res.isImage ? {
									tag : 'img',
									attrs : {
										src : JMVC.vars.baseurl + JMVC.US + 'srv' + JMVC.US + res.content
									}
								} : {
									tag : 'textarea',
									style : {width:'100%', height:'300px',margin:'10px'},
									html : res.content
								};

							JMVC.core.widgzard.render({
								style : {
									fontFamily:'Verdana, sans',
									marginTop:'10px'
								},
								target : self.getNode('debug').node,
								content : [{
									html : 'File ' + f.name + ' uploaded<br>size: ' + f.size + 'b<br>type: ' + f.type
								},{
									html : '<br/><strong>Content :</strong>'
								},response]
							}, true);
						}, false, {
							fileToUpload : file.files[0],
							name : 'xxxxxx'
						}, false, true);
					});
					this.done();
				}
			},{
				wid:'debug'
			}]
		});	
	};
};