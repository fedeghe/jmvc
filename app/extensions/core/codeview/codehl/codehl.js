JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/core/codeview/codehl.css');

JMVC.hook({'onBeforeRender' : function(cnt){	
	
	var hl = function (c) {
			var f = {
				lines : [],
				markup : false,
				linetpl : '<li class="%lineclass%"><span class="ln">%ln%</span>%linecode%<li>',
				linesplit : function (s) {
					//s = s.replace(/(\/\*[\s\S]*?\*\/)/gm, '<span class="comm">$1</span>');
					this.lines = s.split(/\n/);
					return this;
				},
				parselines : function () {
					var self = this;
					self.lines = JMVC.each(self.lines, function (el, i) {
						return el
							.replace(/(\/\/.*)/g, '<span class="comm">$1</span>')
					});
					return self;
				},
				compose : function () {
					var code = '',
					  self = this;
					JMVC.each(self.lines, function (el, i) {
					    var y = JMVC.string.replaceall(self.linetpl, {
							'lineclass' : 'line',
							'ln' : i + '',
							'linecode' : el
						}, '%', '%', ' ');
						code += y;
					});
					this.markup  = '<pre><ul class="code">' + code + '</ul></pre>';
					return this;
				}
			};
			return f.linesplit(c).parselines().compose().markup;
		},
		RX = {
			'html' : "<\\[H\\[([\\S\\s]*?)\\]H\\]>"
		},
		html = true,
		tmp,
		limit = 1000,
		mode = 'easy',
		strat = {
			easy : function () {
				while (limit && html) {
					html = new RegExp(RX.html, 'gm').exec(cnt);
					tmp = '';
					if (html) {
						tmp = hl(JMVC.htmlchars(html[1]));
						cnt = cnt.replace(html[0], tmp);
					} else {
						html = false;
					}
					limit -= 1;
				}
				return cnt;
			},
			rainbow : function () {
				return cnt;
			}
		};
	return strat[mode]();
}});
