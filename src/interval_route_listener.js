function IntervalRouteListener(router, ms) {

	var interval;
	var current;
	var me = this;

	this.start = function() {
		if(interval === undefined) {
			setInterval(function() {
				var hash = window.location.hash;
				if(current !== hash) {
					current = hash;
					me.stop();
					router.route(hash);
					me.start();
				}
			}, ms);
		}
	};

	this.stop = function() {
		if(interval !== undefined) {
			clearInterval(interval);
			interval = undefined;
		}
	};

}