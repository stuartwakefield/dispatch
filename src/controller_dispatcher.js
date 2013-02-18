function ControllerDispatcher(dispatcher) {

	// Map the controllers to the events
	var map = {};

	function ControllerHandler(controller, methodName) {

		this.match = function(controller, methodName) {
			return (controller === controller 
				&& (methodName === undefined || methodName === methodName));
		};

		this.handle = function() {
			controller[methodName].apply(controller, arguments);
		};

	}

	this.dispatch = function(eventName, eventArgs) {
		return dispatcher.dispatch(eventName, eventArgs);
	};

	this.bind = function(controller, eventMethods) {

		if(eventMethods.length % 2 !== 0)
			throw new Error("The eventMethods parameter" +
				"should be an array of even length!");

		for(var i = 0; i < eventMethods.length; i += 2) {
			var eventName = eventMethods[i];
			var methodName = eventMethods[i + 1];

			if(map[eventName] === undefined)
				map[eventName] = [];

			if(!this.contains(eventName, controller, methodName)) {
				var handler = new ControllerHandler(controller, methodName);
				map[eventName].push(handler);
				dispatcher.bind(eventName, handler);
			}

		}


	};

	this.unbind = function(controller, eventMethods) {

		// Unbind the controller from all events
		if(eventMethods === undefined) {
			for(var eventName in map) {
				map[eventName] = array.filter(map[eventName], function(handler) {
					var match = handler.match(controller);
					if(match)
						dispatcher.unbind(eventName, handler);
					return !match;
				});
			}

		// Unbind the controller from specific events
		} else {
			for(var i = 0; i < eventMethods.length; i += 2) {
				var eventName = eventMethods[i];
				var methodName = eventMethods[i + 1];

				if(map[eventName] !== undefined) {
					var handlers = map[eventName];

					map[eventName] = array.filter(map[eventName], function(handler) {
						var match = handler.match(controller, methodName);
						if(match)
							dispatcher.unbind(eventName, handler);
						return !match;
					});
				}
			}
		}

	};

	this.contains = function(eventName, controller, methodName) {
		if(map[eventName]) {
			var handlers = map[eventName];
			for(var i = 0; i < handlers.length; ++i) {
				if(handlers[i].match(controller, methodName)) {

					// Check that the mapping is current
					if(dispatcher.contains(eventName, handlers[i])) {
						return true;

					// Remove stale entries
					} else {
						handlers.splice(i, 1);
						return false;
					}
				}
			}
		}
		return false;
	};

}