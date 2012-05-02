module( "About Backbone.Events",{
	setup: function(){
		this.obj = {};
		_.extend( this.obj, Backbone.Events );
		this.obj.unbind(); // remove all custom events before each espec is run.
	}
} );

test( "Can extend JavaScript objects to support custom events.", function(){
	expect( 3 );
	var basicObject = {};
	// How would you give basicObject these functions?
	// Hint: http://documentcloud.github.com/backbone/#Events
	_.extend( basicObject, Backbone.Events );
	equal( typeof basicObject.bind, "function" );
	equal( typeof basicObject.unbind, "function" );
	equal( typeof basicObject.trigger, "function" );
} );

test( "Allows us to bind and trigger custom named events on an object.", function(){
	expect( 1 );
	var callback = this.spy();
	this.obj.bind( "basic event", callback );
	this.obj.trigger( "basic event" );
	// How would you cause the callback for this custom event to be called?
	ok( callback.called );
} );

test( "Also passes along any arguments to the callback when an event is triggered.", function(){
	expect( 1 );
	var passedArgs = [];
	this.obj.bind( "some_event", function(){
		console.log(passedArgs, arguments);
		[].push.apply( passedArgs, arguments)
	} );
	this.obj.trigger( "some_event", "arg1", "arg2" );
	deepEqual( passedArgs, ["arg1", "arg2"] );
} );

test( "Can also bind the passed context to the event callback", function(){
	expect( 1 );
	var foo = { color: "blue" },
		changeColor = function(){
			console.log("hola");
			this.color = "red";
		};
	// How woud you get "this.color" to refer to "foo" in the changeColor function?
	this.obj.bind("an_event", changeColor, foo);
	this.obj.trigger( "an_event" );
	equal( foo.color, "red" );
} );

test( "Uses 'all' as a special event name to capture all events bound to the object.", function(){
	expect( 2 );
	var callback = this.spy();
	this.obj.bind( "all", callback );
	this.obj.trigger( "custom_event_1" );
	this.obj.trigger( "custom_event_2" );
	equal( callback.callCount, 2 );
	equal( callback.getCall(0).args[0], "custom_event_1");
} );
test( "Also can remove custom events from objects.", function(){
	expect(5);
	var spy1 = this.spy(),
		spy2 = this.spy(),
		spy3 = this.spy();
	this.obj.bind( "foo", spy1 );
	this.obj.bind( "bar", spy1 );
	this.obj.bind( "foo", spy2 );
	this.obj.bind( "foo", spy3 );
	// How do you unbind junt a single callback for the event?
	this.obj.unbind( "foo", spy1 );
	this.obj.trigger( "foo" );
	ok( spy2.called );
	// How do you un bind all callbacks tied to the event with a single method
	this.obj.unbind( "foo" );
	this.obj.trigger( "foo" );
	ok( spy2.callCount, 1);
	ok( spy2.calledOnce, "Spy 2 called once");
	ok( spy3.calledOnce, "Spy 3 called onche");
	// How do you unbind all callbacks an events tied to the object with a single method?
	this.obj.unbind( "bar" );
	this.obj.trigger( "bar" );
	equal( spy1.callCount, 0 );

})