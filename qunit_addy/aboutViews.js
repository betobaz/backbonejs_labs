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
/*
test( "Shoud be tied to a DOM element when created, based off the property provided", function(){
	expect( 1 );
	equal( this.todoView.el.tagName.toLowerCase(), "li" );
} );

test( "Is backed by a model instance, which provides the data.", function(){
	expect( 2 );
	notEqual( this.todoView.model, undefined );
	equal( this.todoView.model.get( "done" ), false);
});

test( "Can render, after which the DOM representation of the view will be visible", function(){
	this.todoView.render();
	$('ul#todoList').append( this.todoView.el );
	equal($('#todoList').find( "li" ).length, 1);
} );*/

/*test("Can wire view methods to DOM elements.", 2, function(){		
	var viewElt;
	$('#todoList').append( this.todoView.render().el );
	stop()
	setTimeout(function(){
		viewElt = $("#todoList").find('li').find('input.check').filter(":first");
		equal( viewElt.length > 0, true );
		// Make sure that QUnit knows we can continue
		console.log("hola");
		start();
	}, 1000);
	start();
	//$("todoList li input.check").click();
	//expect( this.todoView.model.get("done"), true );
});*/