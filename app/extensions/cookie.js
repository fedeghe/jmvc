JMVC.extend('cookie',{	
	cookie_nocookiesaround : false,


	set : function( name, value, expires, path, domain, secure ){
		this.cookie_nocookiesaround = false;
		var today = new Date();
		today.setTime( today.getTime() );
		if ( expires ) expires = expires * 1000 * 60 * 60 * 24;
		var expires_date = new Date( today.getTime() + (expires) );
		document.cookie = name +
						  "=" +escape( value ) +
						  ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
						  ( ( path ) ? ";path=" + path : "" ) +
						  ( ( domain ) ? ";domain=" + domain : "" ) +
						  ( ( secure ) ? ";secure" : "" );
	},
	get : function( check_name ) {
		var a_all_cookies = document.cookie.split( ';' );
		var a_temp_cookie = '';
		var cookie_name = '';
		var cookie_value = '';
		var b_cookie_found = false;
		for ( i = 0; i < a_all_cookies.length; i++ ){
			a_temp_cookie = a_all_cookies[i].split( '=' );
			cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
			if ( cookie_name == check_name ){
				b_cookie_found = true;
				if ( a_temp_cookie.length > 1 )
					cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
				return cookie_value;
				break;
			}
			a_temp_cookie = null;
			cookie_name = '';
		}
		if ( !b_cookie_found )
			return null;
		else return true;
	},

	del : function( name, path, domain ) {
		if ( this.get( name ) )
			document.cookie = name + "=" +
							  ( ( path ) ? ";path=" + path : "") +
							  ( ( domain ) ? ";domain=" + domain : "" ) +
							  ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	},

	delall : function(){
		var thecookie = document.cookie.split(";")
		for (var i = 0;i < thecookie.length;i++){
			var nome = thecookie[i].split('=');
			this.del(nome[0],false,false);
		}
		this.cookie_nocookiesaround = true;
	},
	getall : function(){
		var allc = document.cookie.split(';');
		//debug(allc.length);
		if(this.cookie_nocookiesaround)debug('No active cookies around!','info');
		else j.print(allc);
	}
		
});
