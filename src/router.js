function Router(dispatcher) {

	var routes = [];

	function Route(pattern, eventName) {

		pattern = Router.normalizePattern(pattern);
		var params = [];
		var regexp = new RegExp("^" + pattern.replace(/\@(\w+)/g, function(match, param) {
			params.push(param);
			return "(.+)";
		}) + "$", "i");

		this.is = function(otherPattern, otherEventName) {
			otherPattern = Router.normalizePattern(otherPattern);
			return (pattern === otherPattern && eventName === otherEventName);
		}

		this.match = function(pattern) {
			return regexp.test(pattern);
		};

		this.resolve = function(pattern) {
			if(regexp.test(pattern)) {
				var args = {};
				pattern.replace(regexp, function() {
					var values = Array.prototype.slice.call(arguments, 1);
					array.each(params, function(key) {
						args[key] = values.shift();
					});
				});
				return [eventName, args];
			}
		};

	}

	this.route = function(route, args) {
		var ev = Router.resolveRoute(routes, route);
		var dispatched = false;
		if(ev !== undefined) {
			dispatched = dispatcher.dispatch(ev[0], ev[1]);
		}
		return dispatched;
	};

	this.bind = function(pattern, eventName) {
		if(!this.contains(pattern, eventName)) {
			routes.push(new Route(pattern, eventName));
		}
	};

	this.unbind = function(pattern, eventName) {
		routes = array.filter(routes, function(route) {
			return route.is(pattern, eventName);
		});
	};

	this.contains = function(pattern, eventName) {
		return array.filter(routes, function(route) {
			return route.is(pattern, eventName);
		}).length > 0;
	}

}

Router.normalizePattern = function(pattern) {
	return pattern.replace(/(^\#?\/?|\/?$)/g, "");
};

Router.resolveRoute = function(routes, route) {
	var normalized = Router.normalizePattern(route);
	var matchingEvents = array.filter(array.map(routes, function(other) {
		return other.resolve(normalized);
	}), function(result) {
		return result !== undefined;
	})
	if(matchingEvents.length) {
		return matchingEvents[0];
	}
};