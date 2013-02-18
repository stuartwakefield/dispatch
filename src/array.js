var array = {

	each: function(arr, method) {
		for(var i = 0; i < arr.length; ++i) {
			if(method.call(arr[i], arr[i], i) === false)
				return;
		}
	},

	filter: function(arr, method) {
		var filtered = [];
		array.each(arr, function(item) {
			if(method(item))
				filtered.push(item);
		});
		return filtered;
	},

	map: function(arr, method) {
		var mapped = [];
		array.each(arr, function(item) {
			mapped.push(method(item));
		});
		return mapped;
	},

	contains: function(arr, item) {
		var match = false;
		array.each(arr, function(other) {
			if(item === other)
				match = true;
			return !match;
		});
		return match;
	},

	remove: function(arr, item) {
		return array.filter(arr, function(other) {
			return item !== other;
		});
	}

};