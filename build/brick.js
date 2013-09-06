/**
 * Script name : build.js
 * Author : Federico Ghedina
 * 
 * 
 * requires uglify-js (https://github.com/mishoo/UglifyJS2)
 *
 * USAGE:
 * > node brick jmvc true
 * 
 */



//check uglify-js
try {
    require.resolve("uglify-js");
} catch(e) {
    console.error("required package  uglify-js  NOT FOUND");
    console.log("run : npm install uglify-js");
    process.exit(e.code);
}


var arg = process.argv.slice(2),
	fs = require('fs'),
	util = require('util'),
	ugly = require("uglify-js"),
	vars = fs.existsSync('vars.json') ? JSON.parse(fs.readFileSync('vars.json')) : {},
	templateh,
	outFileName,
	out,
	errs = 0,
	level = 10,
	reg = {
		files : new RegExp('(.*)\\\$\\\$([A-z0-9-_/.]*)\\\$\\\$', 'g'),
		vars : new RegExp('\\\$([A-z0-9-_/.]*)\\\$', 'g')
	},
	replace,
	pack = false,
	date = new Date();


if (!arg.length) {
	console.log('No template file specified');
	process.exit();	
}
templateh = arg[0] + '.tpl';
if (!fs.existsSync(templateh)) {
	console.log('Template `' + templateh + '` NOT FOUND!');
	process.exit();	
}
if (arg.length === 2) {
	pack = !!arg[1];
}


outFileName = 'out/' + templateh.replace('.tpl', '.js');

out = fs.readFileSync(templateh).toString();

replace = {
	all : function (tpl) {
		var str;
		console.log('replacing chunks: ');
		return tpl.replace(reg.files, function (str, $1, $2) {
			var tmp = (fs.existsSync($2)) ? fs.readFileSync($2) : false;
			if (!tmp) {
				console.log('[ERROR]: file ' + $2 + ' NOT FOUND');
				errs++;
				return $2;
			} else {
				console.log("\t" + $2);
			} 
			return $1 + tmp.toString().replace(/\n/g, "\n" + $1);// give back spaces to CODE
		});
	},
	vars : function (tpl) {
		var str;
		console.log('replacing vars: ');
		return tpl.replace(reg.vars, function (str, $1) {
			if($1 in vars) {
				console.log("\t" + $1);
				return vars[$1];
			} else {
				return $1;
			}
		});
	}
}

while (level-- && out.match(reg.files)) {
	out = replace.all(out);
}

out = replace.vars(out)
	.replace('__DATE__', date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear())
	.replace('__YEAR__', date.getFullYear());

if (errs) {
	console.log('File not built');
	process.exit();
}



fs.writeFile(outFileName, out, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(">>> " + outFileName + " DONE");
        pack && fs.writeFile(outFileName.replace('.js', '.min.js'), ugly.minify(outFileName).code, function(err) {
        	!err && console.log(">>> " + outFileName.replace('.js', '.min.js') + " DONE")
        });
    }
});




