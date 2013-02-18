tester.addTest("Dispatcher", {
	
	setUp: function() {
		this.dispatcher = new Dispatcher();
	},
	
	testBindHandler: function() {
		var handler = this.createHandler();
		assertion.isTrue(true);
		
		this.dispatcher.bind("event", handler);
		// Bind the handler
		
		assertion.isTrue(this.dispatcher.contains("event", handler));
	},
	
	testBindArrayOfEventsAndHandlers: function() {
		var handlerOne = this.createHandler();
		var handlerTwo = this.createHandler();
		var events = [
			"event.one", handlerOne,
			"event.two", handlerTwo
		];
		
		this.dispatcher.bind(events);
		
		assertion.isTrue(this.dispatcher.contains("event.one", handlerOne));
		assertion.isTrue(this.dispatcher.contains("event.two", handlerTwo));
	},
	
	testBindInvalidHandler: function() {
		var handler = {};
		// Invalid handler as handle event does not exist
		
		var thrown = false;
		
		try {
			this.dispatcher.bind("event", handler);
		} catch(ex) {
			thrown = true;
		}
		
		if(!thrown) {
			throw new Error("Should have thrown an error!");
		}
	},
	
	testUnbindHandler: function() {
		var handler = this.createHandler();
		
		// Add the handler
		this.dispatcher.bind("event", handler);
		assertion.isTrue(this.dispatcher.contains("event", handler));
		
		// Remove the handler
		this.dispatcher.unbind("event", handler);
		assertion.isFalse(this.dispatcher.contains("event", handler));
	},
	
	testDispatch: function() {
		var handler = this.createHandler();
		
		this.dispatcher.bind("event", handler);
		// Bind the handler
		
		this.dispatcher.dispatch("event", {});
		// Handle the event
		
		assertion.isNotNull(handler.args);
		// Test that the handler was called and was passed the args
		
	},
	
	testBindMultipleHandlers: function() {
		var handler1 = this.createHandler();
		var handler2 = this.createHandler();
		
		this.dispatcher.bind("event", [handler1, handler2]);
		
		assertion.isTrue(this.dispatcher.contains("event", handler1))
		assertion.isTrue(this.dispatcher.contains("event", handler2));
	},
	
	testBindMultipleHandlersToMultipleEvents: function() {
		var handler1 = this.createHandler();
		var handler2 = this.createHandler();
		
		this.dispatcher.bind([
			"event1", handler1, 
			"event2", handler2
		]);
		
		assertion.isTrue(this.dispatcher.contains("event1", handler1))
		assertion.isTrue(this.dispatcher.contains("event2", handler2));
	},
	
	createHandler: function() {
		return {handle: function(args) {this.args = args;}};
	}
	
});
