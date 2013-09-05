/**
 * [arg description]
 * @type {[type]}
 */
var arg = process.argv.slice(2),
	fs = require('fs'),
	//ug = require('uglify-js'),
	vars = fs.existsSync('vars.json') ? JSON.parse(fs.readFileSync('vars.json')) : {},
	templateh,
	template,
	out,
	errs = 0,
	level = 10,
	reg = {
		files : new RegExp('(.*)%%([A-z0-9-_/.]*)%%', 'g'),
		vars : new RegExp('\\\$([A-z0-9-_/.]*)\\\$', 'g')
	},
	replace,
	uglify = false;

if (!arg.length) {
	console.log('No template file specified');
	process.exit();	
}
if (!fs.existsSync(arg[0])) {
	console.log('Template `' + arg[0] + '` NOT FOUND!');
	process.exit();	
}
if (arg.length === 2) {
	uglify = !!arg[1];
}

templateh = arg[0];

template = fs.readFileSync(templateh).toString();

replace = {
	all : function (tpl) {
		var str;
		return tpl.replace(reg.files, function (str, $1, $2) {
			var tmp = (fs.existsSync($2)) ? fs.readFileSync($2) : false;
			if (!tmp) {
				console.log('[ERROR]: file ' + $2 + ' NOT FOUND');
				errs++;
				return $2;
			} else {
				console.log('[DEBUG]: replacing tpl ' + $2);
			} 
			return $1 + tmp.toString().replace(/\n/g, "\n" + $1);// give back spaces to CODE
		});
	},
	vars : function (tpl) {
		var str;
		return tpl.replace(reg.vars, function (str, $1) {
			if($1 in vars) {
				console.log('[DEBUG]: replacing var ' + $1);
				return vars[$1];
			} else {
				return $1;
			}
		});
	}
}


out = template;

while (level-- && out.match(reg.files)) out = replace.all(out);

out = replace.vars(out);

if (errs) {
	console.log('File not built');
	process.exit();
}
/*
if (uglify) {
	out = ug.minify(out, {fromString : true});
}
*/


fs.writeFile(templateh + ".js", out, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file " + templateh + ".built.js was built successfully!");
    }
});