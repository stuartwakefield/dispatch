var type = {
	
	isArray: function(obj) {
		return (typeof obj === "object" && obj.length);
	},

	isFunction: function(obj) {
		return typeof obj === "function";
	},

	isImplementor: function(obj, methods) {
		return (typeof obj === "object" && array.filter(methods, function(method) {
			return type.isFunction(obj[method]);
		}).length === methods.length)
	}

};