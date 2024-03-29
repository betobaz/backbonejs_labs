$.fn.enumerate = function( start ){
	if( typeof start !== "undefined" ){
		// Since 'start' value was provided, enumerate and return 
		// the initial jQuery object to allow chaining
		return this.each(function( i ){
			$(this).prepend('<b>'+ ( i + start ) + '.</b> ');
		});
	} else {
		// Since no 'start' value was provide, function as a
		// getter, returning the appropiate value from the first
		// selected element
		var val = this.eq( 0 ).children( "b" ).eq( 0 ).text();
		return Number( val );
	}
};
