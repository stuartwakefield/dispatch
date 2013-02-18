tester.addTest("Router", {
	
	setUp: function() {
		this.dispatcher = new Dispatcher();
		this.handler = {
			handle: function(args) {
				this.called = true;
			}
		};
	},
	
	testBasicRoute: function() {
		var router = this.createRouter([
			"test/route", "test.route"
		]);
		assertion.isTrue(router.find("test/route") != -1);
	},
	
	testVariableRoute: function() {
		var router = this.createRouter([
			"test/route/@id", "test.route"
		]);
		assertion.isTrue(router.find("test/route/something") != -1);
	},
	
	testRouteNormalization: function() {
		var router = this.createRouter([
			"#/test/route/@id/", "test.route"
		]);
		assertion.isTrue(router.find("test/route/something") != -1);
		assertion.isTrue(router.find("#/test/route/something/") != -1);
	},
	
	testRouteResolution: function() {
		var router = this.createRouter([
			"#/test/route/@id/", "test.route"
		]);
		ev = router.resolve("#/test/route/something/");
		assertion.areEqual("test.route", ev.name);
		assertion.areEqual("something", ev.args.id);
	},
	
	testRoute: function() {
		var router = this.createRouter([
			"test/route", "test"
		]);
		this.dispatcher.bind("test", this.handler);
		router.route("#/test/route/");
		assertion.isTrue(this.handler.called);
	},
	
	createRouter: function(routes) {
		return new Router(this.dispatcher, routes);
	}
	
});
