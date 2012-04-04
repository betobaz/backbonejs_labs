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
