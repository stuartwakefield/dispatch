function Dispatcher() {

	var map = {};

	this.dispatch = function(eventName, eventArgs) {
		var dispatched = false;
		if(map[eventName] !== undefined) {
			array.each(map[eventName], function(handler) {
				handler.handle(eventArgs);
				dispatched = true;
			});
		}
		return dispatched;
	}

	this.bind = function(eventName, handler) {

		var handlers = [];

		// eventName is an array of events and handlers
		if(type.isArray(eventName)) {
			for(var i = 0; i < eventName.length; i += 2) {
				this.bind(eventName[i], eventName[i + 1]);
			}

		// Handler is an array of handlers
		} else if(type.isArray(handler)) {
			for(var i = 0; i < handler.length; ++i) {
				this.bind(eventName, handler[i]);
			}

		// The arguments are as advertised
		} else {
			if(!type.isImplementor(handler, ["handle"])) {
				throw new Error("Must contain a handle function!");
			}
			if(map[eventName] == null) {
				map[eventName] = [];
			}
			if(!this.contains(eventName, handler)) {
				map[eventName].push(handler);
			}
		}

	};

	this.unbind = function(eventName, handler) {
		if(map[eventName] !== undefined) {
			map[eventName] = array.remove(map[eventName], handler);
		}
	};

	this.contains = function(eventName, handler) {
		if(map[eventName] !== undefined) {
			return array.contains(map[eventName], handler);
		}
		return false;
	};

}