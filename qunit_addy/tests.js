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
} )