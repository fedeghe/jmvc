JMVC.extend('html5', {
	init : function () {
		this._ = {
			mimemap : {
				ogv : 'ogg' 
			}
		}
	},
	
	video : function (options) {
		if (!('src' in options)) throw new Error('No src passed for video');

		var video,
			attrs = {
				video : {},
				source : {}
			};
		
		//'type' in options && (attrs.source.type = 'video/' + (JMVC.html5._.mimemap[options.type] || options.type));

		attrs.source.type = 'video/' + ('type' in options ? (JMVC.html5._.mimemap[options.type] || options.type) : 'ogg');

		attrs.source.src = options.src;

		attrs.video.controls = options.controls ? 'controls' :'';
		attrs.video.autoplay = options.autoplay ? 'autoplay' :'';
		attrs.video.width = options.width || 800;
		attrs.video.height = options.height || 600;

		video = JMVC.dom.create('video', attrs.video);

		//append inner source tag
		JMVC.dom.add(video, 'source', attrs.source);

		JMVC.dom.attr(video, attrs.video);		
		return video;
	},


	/*video : function (o) {
		o.mime = o.mime || o.uri.split('.').pop();
		o.mime = JMVC.html5.mimemap[o.mime] || o.mime;
		o.controls = o.controls ? ' controls="controls"' :'';
		o.autoplay = o.autoplay ? ' autoplay="autoplay"' :'';
		var tpl = '<video width="%w%" height="%h%"%controls%%autoplay%><source src="%uri%" type="video/%mime%" /></video>';
		return JMVC.string.replaceall(tpl, o);
	},*/
	audio : function () {},
	progress : function(progress, attr){
		attr = attr || {};
		if (!('max' in attr)){attr.max = 100;}
		return '<progress '+JMVC.object.obj2attr(attr)+' value="'+progress+'"></progress>';
	}
});