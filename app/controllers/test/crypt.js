JMVC.controllers.crypt = function() {

	this.index = function(){
		
		
		
		JMVC.require('lib/crypt', 'lib/utf8', 'test');
		
		
		this.render(false,function test(){
			"use strict";
			
			JMVC.events.loadify(1000);
			
			JMVC.test.initialize(true);
			
			JMVC.test.startAll();
			
			var messages = [
					escape('<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('!DOCYPE html><html><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<!DOYPE html><html>ontent-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<!CTYPE html><html><head><meta http-e-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape(' content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" contentcription" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('red;"></div></body></html>'),
					escape('<!DOCYPE html><html><head>nt="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<charset=UTF-8" /><meta name="copyright" content="&copy; 2012 Federico Ghedina" /><meta name="description" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" con2 Federico Ghcription" content="JMVC is a pure javascript mvc framework" /><meta name="keywords" content="jmvc,javascript mvc,pure javascript mvc,pure javascript" /><title>JMVC : pure javascript MVC</title><!--		<script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.pack.js"></script>--><script type="text/javascript" src="http://www.jmvc.dev/app/jmvc.js"></script><!-- <link rel="stylesheet" type="text/css" href="http://www.jmvc.dev/media/css/reset.css" /> --></head><body><div style="margin-top:80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure javascript MVC</div><p style="text-align: center"><img src="http://www.jmvc.dev/media/img/spinner>'),
					escape('<p> the true pure java.gif" /></p><div id="trial" style="background-color: red;"></div>'),
					escape('<!DOCTYPE html><html><head><meta http-equiv="content-type" content="text/html; charset=UTF-8" /><meta name="copyright" content="&copy; 2012 F80px; text-align:center;font-size:14px;display:none"><b>JMVC:</b> the true pure java.gif" /></p><div id="trial" style="background-color: red;"></div></body></html>'),
					escape('<TYPEml><html><head><div id="trial" style="background-color: red;"></div></body></html>')
				],
				pwd = 'rfvsd jbsdjbfskdjhfb skh23y87234y78__!@##%@%$#^23462346!@#$%^&*()/<>:;"[}]{\|`~vaa';

			JMVC.test.describe('Now crypt lib will be testest on '+messages.length+' messages containing escaped html (subparts of what you can see with ctrl+u, I suppose You`re using a good browser)\n\
<br />> the seed is a random number between in [10, 1000]\n\
<br />> the password used is deliberately highly tricky: <b>'+pwd+'</b>');
			
			for (var i = 0, l = messages.length; i < l; i++) {
				JMVC.security.seed = JMVC.util.rand(32000, 33000);
				var m = JMVC.security.crypt(messages[i], pwd),
					n;
					
					
				JMVC.test.message('seed is  : '+ JMVC.security.seed);
				JMVC.test.message('<b>Crypted message</b><br />'+m);
				n = JMVC.security.decrypt(m,pwd);
				JMVC.test.testValue("Test message "+ i, function(){
					return n;
				}, messages[i]);
				//JMVC.test.testValue("Test utf8 on message "+ i, function (i) { return JMVC.utf8.encode_Utf8(m) === JMVC.utf8.encodeUtf8(m);  }, true);
				
			}
			
			
			/*
			JMVC.security.seed = 32000;
			var src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
				csrc = JMVC.security.crypt(src, 'prova');	
			//console.debug(csrc);
			var pwd = prompt('password');
			if(pwd){
				var newsrc = JMVC.security.decrypt(csrc, pwd);
				if(newsrc){
					JMVC.dom.add(JMVC.dom.body(), 'img', {src : newsrc});
				}
			}
			*/
			
			
			
			JMVC.test.finishAll();			
			
		});
	}
	
};
