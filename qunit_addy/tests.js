var myString = "Hello Backbone.js";

test("Our first QUnit test - asserting results", function(){
	ok(true, "the test succeeds");
	ok(false, "the test fails");

	equal(myString, "Hello Backbone.js", "The value expected is Hello Backbone.js!");

});

function reverseString( str ){
	return str.split("").reverse().join("");
}

test( "reverseString()", function(){
	expect(5);
	equal( reverseString("hello"), "olleh", "The value expected was olleh");
	equal( reverseString("foobar"), "raboof", "The value expected was raboof");
	equal( reverseString("world"), "dlrow", "The value expected was dlroo");
	notEqual( reverseString("world"), "dlroo", "The value was expected to not bee dlroo");
	equal( reverseString("bubble"), "double", "The value expected was elbbub");
});

module( "Module One" );
test( "first test", function(){} );
test( "anohter test", function(){} );

module( "Module Two" );
test( "secund test", function(){} );
test( "anohter test", function(){} );

module( "Module Three" );
test( "third test", function(){} );
test( "anohter test", function(){} );

// Define a simple model and collection modeling a store and 
// list of stores
var Store = Backbone.Model.extend({});
var StoreList = Backbone.Collection.extend({
	model: Store,
	comparator: function( store ){ return store.get("name") }
});

//Define a group for our tests
module( "StoreList sanity check", {
	setup: function(){
		this.list = new StoreList;
		this.list.add(new Store({ name: "Costcutter" }));
		this.list.add(new Store({ name: "Target" }));
		this.list.add(new Store({ name: "Walmart" }));
		this.list.add(new Store({ name: "Barnes & Noble" }));
	},
	teardown: function(){
		window.errors = null;
	}
} );

// Test the order of items added
test( "test ordering", function(){
	expect(1);
	var expected = ["Barnes & Noble", "Costcutter", "Target", "Walmart"];
	var actual = this.list.pluck("name")
	deepEqual( actual, expected, "is maintained by comparator");
})

test( "equal", 2, function(){
	var actual = 6 - 5;
	equal( actual, true, "passes as 1 == true");
	equal( actual, 1, "passes as 1 == 1");
});

test( "notEqual", 2, function(){
	var actual = 6 - 5;
	strictEqual( actual, true, "fails as 1 !== true");
	strictEqual( actual, 1, "passes as 1 === 1");
});

test( "notStrictEqual", 2, function(){
	var actual = 6 - 5;
	notStrictEqual( actual, true, "passes as 1 !== true");
	notStrictEqual( actual, 1, "fails as 1 === 1");
});

test( "deepEqual", 2, function(){
	var actual = {q: "foo", t: "bar"},
		el = $("div"),
		children = $("div").children();
	equal( actual, {q: "foo", t: "bar"}, "fails - objects are not equal using equal()");
	deepEqual( actual, {q: "foo", t: "bar"}, "passes - objects are equal");
	//equal( el, children, "fails - jQuery objects are not the same");
	//deepEqual( el, children, "fails - objects not equivalent");
});

test( "noDeepEqual", 2, function(){
	var actual = {q: "foo", t: "bar"};
		
	notEqual( actual, {q: "foo", t: "bar"}, "passes - objects are not equal");
	notDeepEqual( actual, {q: "foo", t: "bar"}, "fails - objects are equivalent");	
});

test( "raises", 1, function(){
	raises(function(){
		throw new Error( "Oh no! It's an error!" );		
	}, "passes - an error was throw indise our callback");
});

module( "jQuery#enumerate" );

test( "No arguments passed", 5, function(){
	var items = $('#qunit-fixture').find('li').enumerate();
	equal( items.eq(0).text(), "1. hello", "first item should has index 1" );
	equal( items.eq(1).text(), "2. world", "second item should has index 2" );
	equal( items.eq(2).text(), "3. i", "third item should has index 3" );
	equal( items.eq(3).text(), "4. am", "fourth item should has index 4" );
	equal( items.eq(4).text(), "5. foo", "fifth item should has index 5" );
});

test( "0 passed as an argument", 5, function(){
	var items = $('#qunit-fixture').find('li').enumerate( 0 );
	equal( items.eq(0).text(), "1. hello", "first item should has index 1" );
	equal( items.eq(1).text(), "2. world", "second item should has index 2" );
	equal( items.eq(2).text(), "3. i", "third item should has index 3" );
	equal( items.eq(3).text(), "4. am", "fourth item should has index 4" );
	equal( items.eq(4).text(), "5. foo", "fifth item should has index 5" );
});

test( "1 passed as an argument", 3, function(){
	var items = $('#qunit-fixture').find('li').enumerate( 1 );
	equal( items.eq(0).text(), "1. hello", "first item should has index 1" );
	equal( items.eq(1).text(), "2. world", "second item should has index 2" );
	equal( items.eq(2).text(), "3. i", "third item should has index 3" );
	equal( items.eq(3).text(), "4. am", "fourth item should has index 4" );
	equal( items.eq(4).text(), "5. foo", "fifth item should has index 5" );
});

module( "Test async" );
test( "An async test", function(){
	stop();
	expect( 1 );
	$.ajax({
		url: "/backbone_dev/qunit_addy/test.json",
		dataType: "json",
		success: function( data ){
			deepEqual( data, {
				topic: "hello",
				message: "hi there!"
			} );
			start();			
		}
	});
	
} );

module( "Test with spies by SinonJS" );
test( "should call all subscribers for a message exactly once", function(){
	var message = "bla bal bla bla",
		spy = this.spy();

	PubSub.subscribe( message, spy );
	PubSub.publishSync( message, "Hello" );

	ok( spy.calledOnce, "The subscriber was called once" );
} );

test( "Should inspect jQuery.getJSON's usage of jQuery.ajax", function(){
	this.spy( jQuery, "ajax");
	jQuery.getJSON( "/backbone_dev/qunit_addy/test.json" );
	ok( jQuery.ajax.calledOnce );
	equals( jQuery.ajax.getCall(0).args[0].url, "/backbone_dev/qunit_addy/test.json");
	equals( jQuery.ajax.getCall(0).args[0].dataType, "json");
	
} );

test( "Should call a subscriber with standar marching", function(){
	var spy = sinon.spy();
	PubSub.subscribe( "message", spy );
	PubSub.publishSync( "message", { id: 45 } );
	ok( spy.calledOnce );
	ok( spy.calledWithExactly( "message", { id: 45 } ) );

} );

test( "Should call a subscriber with strict matching", function(){
	var spy = sinon.spy();
	PubSub.subscribe( "message", spy );
	PubSub.publishSync( "message", "many", "arguments" );
	PubSub.publishSync( "message", 12, 34 );

	// This passes
	ok( spy.calledWith( "many" ));

	// This however, fails
	ok( spy.calledWithExactly( "many" ));
});

test( "Shoud call a subscribe and mantain call order", function(){
	var a = sinon.spy(),
		b = sinon.spy();

	// This would fail as b was called after a
	PubSub.subscribe( "message", a);
	PubSub.subscribe( "message", b);
	PubSub.publishSync( "message", {id: 45} );
	PubSub.publishSync( "event", [1,2,3] );
	ok( a.calledBefore(b) );
	ok( a.calledAfter(a) );

} );

test( "Should call a subscribe and check call counts", function(){
	var message = "hola20120419",
		spy = this.spy();
		PubSub.subscribe( message, spy );
		PubSub.publishSync( message, "some payload" );
		// Passes if spy was called  once and only once.
		ok( spy.calledOnce ); // calledTwice and CalledThrice are also soppoted
		// The number of recorded calls
		equal( spy.callCount, 1 );
		// Directly checking the arguments of the call
		equals( spy.getCall(0).args[0], message);

} );

var Todo = Backbone.Model.extend({
		id: null,
		title: null
	}),
	TodoList = Backbone.Collection.extend({  
	    model: Todo  
	});  
// Let's assume our instance of this collection is  
//this.todoList; */
module( "Shoud function when instantiated wit model literals" ,{
	setup: function(){
		this.todoStub = sinon.stub( window, "Todo" );
		this.model = new Backbone.Model({
			id: 2,
			title: "Hello world"
		});

		this.todoStub.return( this.model );
		this.todos = new TodoList();

		// Let's reset the relationship to use a stub
		this.todos.model = Todo;
		this.todos.add({
			id: 2,
			title: "Hello world"
		})
	},
	teardown: function(){
		this.todoStub.restore();
	}
});

test( "should add a model", function(){
	equal( this.todos.length, 1);
} );
test( "should find a model by id", function(){
	equal( this.todos.get(5).get("id"), 5);
});

module( "Mocks" );
test( "should call all subscribers when exception", function(){
	var myAPI = { clearTodo: function(){} },
		spy = this.spy(),
		mock = this.mock( myAPI );
	mock.expects( "clearTodo" ).once().throws();
	PubSub.subscribe( "message", myAPI.clearTodo );
	PubSub.subscribe( "message", spy );
	PubSub.publishSync( "message", undefined );
	mock.verify();
	ok( spy.calledOnce );


});