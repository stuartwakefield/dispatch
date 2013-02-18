tester.addTest("Router", {
	
	setUp: function() {
		this.dispatcher = new Dispatcher();
		this.router = new Router(this.dispatcher);
		this.handler = {
			handle: function(args) {
				this.called = true;
			}
		};
	},
		
	testRoute: function() {
		this.router.bind("test/route", "test");
		this.dispatcher.bind("test", this.handler);
		this.router.route("#/test/route/");
		assertion.isTrue(this.handler.called);
	}
	
});
