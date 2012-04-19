module( "About Backbone.View", {
	setup: function(){
		$("body").append('<ul id="todoList"></ul>');
		this.todoView = new TodoView( { model: new Todo() } );
	},
	teardown: function(){
		this.todoView.remove();
		$("#todoList").remove();
	}
});

test( "Shoud be tied to a DOM element when created, based off the property provided", function(){
	expect( 1 );
	equal( this.todoView.el.tagName.toLowerCase(), "li" );
} );
