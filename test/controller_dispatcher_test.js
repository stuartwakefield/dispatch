tester.addTest("ControllerDispatcher", {
	
	setUp: function() {
		var dispatcher = new Dispatcher();
		this.controllerDispatcher = new ControllerDispatcher(dispatcher);
	},
	
	createController: function() {
		return {
			
			called: null,
			
			one: function() {
				this.called = "one";
			},
			
			two: function() {
				this.called = "two";
			}
			
		};
	},
	
	testBindController: function() {
		
		var controller = this.createController(); 
		
		this.controllerDispatcher.bind(controller, [
			"event.one", "one",
			"event.two", "two"
		]);
		
		// The controller should be present in the dispatcher
		assertion.isTrue(this.controllerDispatcher.contains("event.one", controller, "one"));
		assertion.isTrue(this.controllerDispatcher.contains("event.two", controller, "two"));
		
		// Check that the controller is called for event.one
		this.controllerDispatcher.dispatch("event.one", {});
		assertion.areEqual(controller.called, "one");
		
		// Check that the controller is also called for event.two
		this.controllerDispatcher.dispatch("event.two", {});
		assertion.areEqual(controller.called, "two");
	},
	
	testBindAndUnbindController: function() {
		
		var controller = this.createController(); 
		
		this.controllerDispatcher.bind(controller, [
			"event.one", "one",
			"event.two", "two"
		]);
		
		this.controllerDispatcher.unbind(controller);
		
		// The dispatcher should not contain the controller
		assertion.isFalse(this.controllerDispatcher.contains("event.one", controller, "one"));
		assertion.isFalse(this.controllerDispatcher.contains("event.two", controller, "two"));
		
		// The controller should not be called for either event
		this.controllerDispatcher.dispatch("event.one", {});
		this.controllerDispatcher.dispatch("event.two", {});
		assertion.isNull(controller.called);
	},
	
	testBindAndUnbindControllerEvent: function() {
		
		var controller = this.createController(); 
		
		this.controllerDispatcher.bind(controller, [
			"event.one", "one",
			"event.two", "two"
		]);
				
		this.controllerDispatcher.unbind(controller, [
			"event.one", "one"
		]);
		
		// The controller should not be present in the dispatcher for event.one
		assertion.isFalse(this.controllerDispatcher.contains("event.one", controller, "one"));
		
		// The controller should be present in the dispatcher for event two
		assertion.isTrue(this.controllerDispatcher.contains("event.two", controller, "two"));
		
		// The controller should not be called for event.one
		this.controllerDispatcher.dispatch("event.one", {});
		assertion.isNull(controller.called);
		
		// The controller should be called for event.two
		this.controllerDispatcher.dispatch("event.two", {});
		assertion.areEqual(controller.called, "two");

	}
	
});
