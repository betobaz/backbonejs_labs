module( "About Backbone Applications", {
	setup: function(){
		Backbone.localStorageDB = new Store("testTodo");
		$("#qunit-fixture").append('<div id="app"></div>');
		this.App = new TodoApp( { appendTo: $("#app") } );
	},
	teardown: function(){
		$("#app").remove();
	}
});

test( "Should bind collection events to View creation.", function(){
	$("#new-todo").val( "Foo" );
	$("#new-todo").trigger( new $.Event( "keypress", { keyCode: 13 } ));
	equal( this.App.todos.length, 1 );
} );

test( "Should bootstrap the application by initializing the collection.", function(){
	expect( 2 );
	notEqual( this.App.todos, undefined );
	equal( this.App.todos.length, 0 );
} );

