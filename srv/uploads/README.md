# FACTS
Some numbers about the current engine:
			current		new
vendor  	37.1 		-
engine		13.1 		9.5
css 		2.4 		3.2
LAZY 		-			carousel 	15
						article 	 0.475
						contact 	 2
						contactBasic 1
						fb			 1
						image-link	 0.652
						modal		 0.889
						poll		 4
						storeLocator 4
						videoText	 1
						video 		 3
						------------------
									 33
-----------------------------------------
			52.2 		45.7






# WIDGZARD

Widgzard is a simple module, which comes directly from [jmvc project][1] that allows to build a DOM section while resolving a tree callback using implicit promises. 

---

The **problem** that originally led me to that solution was to: 

**1**) build up an arbitrary dom tree from json (with attributes) and attach it somewhere (preorder, the only possibility) 

**2**) having the possibility to specify a function for every Node 

**3**) in case of a leaf node execute the callback immediately after node creation 

**4**) all other nodes callback had to be executed only when all node childs having a callback declared claim they got their work done (postorder) 

---

The _Widgzard_ aims to solve the problem in a clear way, receiving a json containing all is needed to build up and to manage the callbacks executions.  
Every node has basically the following structure  

	{
		// OPTIONAL, div is the default
		tag : 'span', 	
		
		// OPTIONAL
		attrs : {
			id : 'myid'
		},
		
		// OPTIONAL, can be set inside attrs
		style : {
			color : '#f60'
		},
		
		// OPTIONAL
		// The callback executed:
		// at node creation if is a leaf
		// or when all childs has claimed they`ve
		// finished their work
		//
		// inside that function the scope is the node itself
		// and to declare the work has been done, the user must 
		// explicitly call the `done` function from the callback`s
		// scope.
		cb : function () {
			var self = this;
			...
				...
					async func body here {
						
			  			// use data and then explicitly declare that as
			  			// far as concerns that node, work is finished.
			  			
			  			self.done();   		 
			      	}
			..
		},
		
		// SEMI-MANDATORY (at least this or the next, or even both)
		html : '<h1>hello world</h1>',
		

		// SEMI-MADATORY (at least this or the previous, or even both)
		content : [one or more elements like this]
		
		// HINT: `html` and `content` can coexist, the `html` will be appended
		// before appending childs in `content`
		
	}  

---


#Api  

###render  

	Widgzard.render(cnf, clean)
	
Where  
1) **cnf** : the object literal discussed above, mandatory  
2) **clean** : a boolean value that allows to specify whether or not the target Node must be emptied before creation, the default value is `true`.

###load  

	Widgzard.load(scriptUrl)
	
Where the only parameter is a script Url that is requested and eveluated via script injection (and removal after evaluation).  
This function allows to easily get SPA using it to load scripts that uses the Widgzard to create/substitute part of the page or its whole content.

###htmlspecialchars

	Widgzard.htmlspecialchars(str)
	
This is a dummy function that through some RegExps substitute &, <, >, " and ' with their html code, useful if You need unfortunately to inject whole html code using the `html` Node parameter seen above.

###Something more to say  
The Widgzard is shipped with a _minimal_ stylesheet that allows to easily create **responsive layouts**. [Here][2] is a complete responsive sample, try to dig a bit at what happens when You click 'LOAD SOME SAMPLES'.

---  



[1]: https://github.com/fedeghe/jmvc
[2]: http://www.jmvc.org/widgzard/sample/