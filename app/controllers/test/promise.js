function t(){
	var p = JMVC.promise.create();
	window.setTimeout(function () {
		console.debug('uan');
		p.done();
	}, 2000);
	return p;
}
t().then(function(){console.debug('two');})
.then(function(){console.debug('tree');});