(function () {
	var p = JMVC.Promise.create();
	window.setTimeout(function () {
		console.debug('one');
		p.done();
	}, 2000);
	return p;
})()
.then(
    function () {
        console.debug('two');
    }
)
.then(
    function () {
        console.debug('tree');
    }
);