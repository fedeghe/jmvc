JMVC.extend('github', {
	vars : {
		image : JMVC.vars.baseurl + '/media/img/forkme_right_gray_6d6d6d.png'
		//image : JMVC.vars.baseurl + '/media/img/github.svg'
	},
	init : function () {
		JMVC.dom.preloadImage(JMVC.github.image);
	},
	forkme : function (ghname) {
		var img = JMVC.dom.create('img', {
				style : 'position: absolute; z-index:200; top: 0; right: 0; border: 0;'
				,src : JMVC.github.vars.image
				//,alt : 'Fork me on GitHub'
			}),
			a = JMVC.dom.create('a',{
				href : 'https://github.com/' + ghname,
				target : '_blank'
			});
		JMVC.dom.append(a, img);
		JMVC.dom.append(JMVC.dom.body(), a);
	}
});