# NEW OPPORTINITIES


---

### Opening on click a new interstitial window

It's almost normal that an ad is inserted at some point of an iframe hierarchy such as  

    <html>
       <head>
       		<title>MAIN CONTAINER</title>
       	</head>
       <body>
       		<div>
       			<iframe href="http://domain1/p1/p2/p3">
       			
       				<!-- BEGINNING LEVEL 2 -->
					<html>
					   <head>
					       	<title>MAIN CONTAINER</title>
					   </head>
					   <body>
					       	<div>
					       		<iframe href="http://domain2/t1/t2/t3">       								
					       		

									<!-- BEGINNING LEVEL n -->
									<html>
									   <head>
									       	<title>MAIN CONTAINER</title>
									   </head>
									   <body>
									   		<div id ="target">
												<!--
												HERE
												THE
												GENERATED
												AD
												-->
									   		</div>
									   	</body>
									<!-- END LEVEL n -->
									



				       			</iframe>
				       		</div>
				       </body>
				    </html>
       				<!-- END LEVEL 2 -->	
       				
       			</iframe>
       		</div>
       </body>
    </html>