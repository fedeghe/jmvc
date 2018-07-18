JMVC.head.addStyle(JMVC.vars.baseurl+"/app/extensions/games/wcave/wcave.css"),JMVC.head.addStyle(JMVC.vars.baseurl+"/app/extensions/games/wcave/freckle.css",!0),function(e){"use strict";var t,o=function(){},n=!1,s=function(t){n?e.console.error("A Wcave instance exists yet!!! "+r.version):n=(new o).init(t)},a=e.document,r={urlE:encodeURIComponent(document.location.href),score:0,bonus:0,wormQueue:[],cnt:null,canvas:null,canvasHeight:0,canvasWidth:0,ctx:null,active:!1,gameover:!1,bound_pairs:[],Yoffset:0,Xoffset:0,versus:-1,cursor:0,xB:0,vB:15,lastSteep:0,obstacles:[],ppills:[],audio:null,messagePanel:null,tunnelCollisionIndex:0,paused:!1,freezeBgIndex:0,freezeBgLength:0,feverMode:!1,feverCount:0,feverIndexes:[],missedPpills:0,cbacks:{gameover:function(){},gamestart:function(){},scoreupdate:function(){}}},i={gameName:"Wcave",wormSize:.015,wormHead:.16,wormLenght:8,minStep:.5,maxStep:1.5,speed:.018,freq:25,initHeight:.95,stepDecay:.98,collision:!0,obstacleSize:.1,minSteep:-.7,maxSteep:.7,maxSteepVariation:.5,audiointro:{file:JMVC.vars.baseurl+"/app/extensions/games/wcave/audio/revolve",formats:{mp3:"audio/mpeg",ogg:"audio/ogg"}},audioid:"au",ppillsSize:.015,theme:"matrix",stopHeightDecay:3,doomObstacles:3,freezeDecay:!1,real:{},hsContainerId:"hscontainer",hardRestart:!1,blinkrate:2,ppillsStrictCatch:!1,colors:{matrix:{worm:["#00ff00","#003300"],bg:["#000000","#00ff00","#000000"],freezebg:["#555555","#333333"],tunnel:"#000000",obstacles:"#ffffff",hpills:"#00ff00",feverHead:["#FF0000","#00FF00","#0000FF"],feverBonus:["#FF0000","#00FF00","#0000FF"],ppills:["#FF0000","#00FF00","#0000FF"]},matrix2:{worm:["#ffff00","#330000"],bg:["#0000ff","#ffff00","#fede76"],freezebg:["#555555","#333333"],tunnel:"#555555",obstacles:"#ffffff",hpills:"#00ff00",feverHead:["#FFFF00","#0fFFf0","#ff00FF"],feverBonus:["#FF0000","#00FF00","#0000FF"],ppills:["#0000","#ffFF00","#ffffFF"]}},g:1.4,tpl:{start:'<h1>%gameName%</h1><div id="intro"><div id="introtext"><ul><li>Hold mouse to move up, release to move down</li><li>stay away from <span class="white">big white</span> rounded blocks</li><li>catch <span class="rgb1">r</span><span class="rgb2">g</span><span class="rgb3">b</span> rounded pills for points</li><li>%wormLength% consecutive pills enable <span class="ks" id="fmode">fever mode</span></li><li>clean the cave hitting <span class="ks">d</span> (%doomObstacles% available); pause/resume with <span class="ks">p</span></li></ul></div></div><input id="start" type="button" value="START"/>',gameover:'<h1>%gameName%</h1><div id="outro"><p>You scored <span>%score%</span> points</p><div id="%hscontainerid%"></div></div><input id="restart" type="button" value="PLAY AGAIN" />'}},l={fever_colors_length:0,fever_bonus_length:0,feverGradients:[],origVars:0,origConf:0,bindings:[],time:0};e.onerror=function(t,o,n){e.console.error("JavaScript error: '"+t+"' on "+o+"@"+n)},o.prototype.restart=function(){e._gaq&&_gaq.push(["_trackEvent","Game","Restat","another game"]),i.hardRestart?e.document.location.reload():(e.clearInterval(l.panelBlink),e.document.getElementById(l.opts.id).innerHTML="",r=l.origVars,i=l.origConf,this.unbindall(),n=null,s(l.opts))},o.prototype.error=function(e){var t=a.createElement("div");t.className="err",t.innerHTML=e,a.body.appendChild(t)},o.prototype.ppillsScore=function(){r.feverMode=r.feverCount>=i.wormLenght,r.score+=r.feverMode?2:1},o.prototype.init=function(){t=this;var o=null,n=null,s=null,c=null,p=null,u=0;for(l.opts=Array.prototype.pop.call(arguments),l.origVars=t.utils.clone(r),l.origConf=t.utils.clone(i),l.fever_colors_length=i.colors[i.theme].feverHead.length,l.fever_bonus_length=i.colors[i.theme].feverBonus.length,i.ppillsStrictCatch?(t.checkFeverAlive=function(){r.ppills.length&&r.ppills[0].left+r.Xoffset<r.real.wormHead&&(r.feverCount=0,r.missedPpills+=1)},t.clearPpills=function(){r.ppills.length&&r.ppills[0].left+r.Xoffset<0&&r.ppills.splice(0,1)}):(t.checkFeverAlive=function(){r.ppills.length&&r.ppills[0].left+r.Xoffset<0&&(r.feverCount=0,r.missedPpills+=1,r.ppills.splice(0,1))},t.clearPpills=function(){}),r.wormColors=t.utils.getGradientArray(i.colors[i.theme].worm[0],i.colors[i.theme].worm[1],i.wormLenght-2),null;u<l.fever_colors_length;u+=1)l.feverGradients[u]=t.utils.getGradientArray(i.colors[i.theme].feverHead[u],"#111111",i.wormLenght-2);return r.freezeBgLength=i.colors[i.theme].freezebg.length,l.opts?void 0===l.opts.id?(t.error("No id passed!"),!1):void 0===l.opts.size&&"number"!=typeof(l.opts.w*l.opts.h)?(t.error("No size info passed!"),!1):(l.opts.cbacks&&l.opts.cbacks.gameover&&"function"==typeof l.opts.cbacks.gameover&&(r.cbacks.gameover=l.opts.cbacks.gameover),l.opts.cbacks&&l.opts.cbacks.gamestart&&"function"==typeof l.opts.cbacks.gamestart&&(r.cbacks.gamestart=l.opts.cbacks.gamestart),l.opts.cbacks&&l.opts.cbacks.scoreupdate&&"function"==typeof l.opts.cbacks.scoreupdate&&(r.cbacks.scoreupdate=l.opts.cbacks.scoreupdate),n=l.opts.id,s=l.opts.w,c=l.opts.h,p=l.opts.size,t.cnt=a.getElementById(n),t.cnt?(void 0===l.opts.obstacles||l.opts.obstacles||(r.obstacles=!1),void 0===l.opts.ppills||l.opts.ppills||(r.ppills=!1),i.doomObstacles=!(void 0!==l.opts.doom&&!l.opts.doom)&&(l.opts.doom||i.doomObstacles),l.opts.hpills&&(r.hpills=[]),p&&"auto"===p&&(o=t.utils.getScreenSize(),s=parseInt(o.w,10),c=parseInt(o.h,10)),t.utils.stilize(t.cnt,{width:s+"px",height:c+"px"}),r.canvasWidth=s,r.canvasHeight=c,t.cnt.className="cnt",t.container=a.createElement("div"),t.cnt.appendChild(t.container),t.utils.stilize(t.container,{position:"relative",width:s+"px",height:c+"px",overflow:"hidden"}),t.canvas=e.document.createElement("canvas"),t.canvas.setAttribute("width",s),t.canvas.setAttribute("height",c),t.utils.stilize(t.canvas,{position:"absolute",width:s+"px",height:c+"px",left:"0px",top:"0px",zIndex:100}),t.container.appendChild(t.canvas),t.ctx=t.canvas.getContext("2d"),t.messagePanel=a.createElement("div"),t.messagePanel.setAttribute("id","panel"),t.utils.stilize(t.messagePanel,{position:"relative",width:s/2+"px",left:s/4+"px"}),t.utils.attr(t.messagePanel,{class:"panel"}),t.messagePanel.innerHTML=t.utils.replaceAll(i.tpl.start,{gameName:i.gameName,wormLength:i.wormLenght,doomObstacles:i.doomObstacles}),t.container.appendChild(t.messagePanel),t.utils.stilize(t.messagePanel,{top:(r.canvasHeight-t.messagePanel.clientHeight)/2+"px"}),u=e.document.getElementById("fmode"),l.panelBlink=e.setInterval(function(){u.style.color=i.colors[i.theme].feverHead[+new Date%l.fever_colors_length]},20),r.real={wormSize:t.canvas.height*i.wormSize,wormHead:t.canvas.width*i.wormHead,initHeight:t.canvas.height*i.initHeight,obstacleSize:t.canvas.height*i.obstacleSize,speed:t.canvas.width*i.speed,ppillsSize:t.canvas.height*i.ppillsSize},t.initTunnel(),(void 0===l.opts.sound||!!l.opts.sound)&&t.initAudio(),void 0!==l.opts.collision&&!l.opts.collision&&(i.collision=!1),t.panelBind(),t.drawBg(),t.drawTunnel(),t):(t.error("no container #"+n+" found."),!1)):(t.error("No options passed!"),!1)},o.prototype.initTunnel=function(){var e,o,n,s,a=r.canvasWidth/2,l=r.canvasHeight,c=r.canvasWidth,p=r.real.initHeight,u=!1,f=0;for(r.bound_pairs.push({left:0,t1:(l-p)/2,t2:(l+p)/2}),r.bound_pairs.push({left:c/2,t1:(l-p)/2,t2:(l+p)/2}),f=r.bound_pairs.length;!u;)n=r.bound_pairs[f-1],a+=c*t.utils.rand(i.minStep,i.maxStep),s=n.t1+l*t.utils.rand(i.minSteep,i.maxSteep),e=s,o=s+(n.t2-n.t1)*i.stepDecay,r.bound_pairs.push({left:a,t1:e,t2:o}),f+=1,u=r.bound_pairs[f-2].left>Math.abs(r.Xoffset)+c},o.prototype.initAudio=function(){var e;if(i.audiointro){r.audio=a.createElement("audio"),r.audio.addEventListener("canplaythrough",function(){this.play()}),t.utils.attr(r.audio,{id:i.audioid,loop:""});for(e in i.audiointro.formats)r.audio.appendChild(t.utils.attr(a.createElement("source"),{type:i.audiointro.formats[e],src:i.audiointro.file+"."+e}));t.container.appendChild(r.audio)}},o.prototype.panelBind=function(){var e=(a.getElementById("toggleHs"),a.getElementById("start")),o=function(e){t.canvas.style.cursor="none",t.utils.killEvent(e),t.messagePanel.style.display="none",r.active=!0,t.gameBind(),r.cbacks.gamestart.call(t),t.run()};t.utils.bind(e,"click",o),l.bindings.push([e,"click",o])},o.prototype.resume=function(){t.run()},o.prototype.gameBind=function(){var e=function(e){return t.cnt.blur(),!r.gameover&&(r.active?(t.g_reinit(),r.versus=1,void(r.cursor=0)):void(r.active=!0))},o=function(e){if(t.cnt.blur(),r.gameover)return!1;t.g_reinit(),r.versus=-1,r.cursor=0},n=function(e){return 68!==e.keyCode&&100!==e.charCode&&112!==e.keyCode&&112!==e.charCode},s=function(t){n(t)&&e()},c=function(e){n(e)&&o()},p=function(e){if(!r.gameover)switch(e.keyCode){case 80:r.paused=!r.paused,!r.paused&&t.resume(),e.stopPropagation();break;case 68:i.doomObstacles&&(i.doomObstacles-=1,t.ctx.fillStyle="#FFFFFF",t.ctx.fillRect(0,0,t.canvas.width,t.canvas.height),r.obstacles=[],r.ppills=[],e.stopPropagation())}};t.utils.bind(t.cnt,"mousedown",e),t.utils.bind(t.cnt,"mouseup",o),t.utils.bind(t.cnt,"touchstart",e),t.utils.bind(t.cnt,"touchend",o),t.utils.bind(a,"keypress",s),t.utils.bind(a,"keyup",c),t.utils.bind(a,"keydown",p),l.bindings.push([t.cnt,"mousedown",e]),l.bindings.push([t.cnt,"mouseup",o]),l.bindings.push([t.cnt,"touchstart",e]),l.bindings.push([t.cnt,"touchend",o]),l.bindings.push([a,"keypress",s]),l.bindings.push([a,"keyup",c]),l.bindings.push([a,"keydown",p])},o.prototype.unbindall=function(){var e=l.bindings,o=0,n=e.length;for(null;o<n;o+=1)t.utils.unbind(e[o][0],e[o][1],e[o][2])},o.prototype.g_reinit=function(){r.xB=r.xB+r.vB*r.cursor+.5*r.versus*i.g*r.cursor*r.cursor,r.vB=r.vB+r.versus*i.g*r.cursor},o.prototype.ypos=function(){return r.Yoffset=r.xB+r.vB*r.cursor+.5*r.versus*i.g*r.cursor*r.cursor,t},o.prototype.xpos=function(){return r.Xoffset-=r.real.speed,t},o.prototype.xypos=function(){return t.xpos().ypos()},o.prototype.updateCursor=function(){r.cursor+=1},o.prototype.update=function(){e.setTimeout(function(e){e.run()},i.freq,t)},o.prototype.run=function(){l.time+=1,t.utils.queueCall.apply(t,["updateCursor","xypos","drawBg","drawTunnel","drawScore","drawObstacles","drawWorm","drawPills","drawDoomObstacles",[i.collision,"checkCollisions"],[r.active&&!r.paused,"update"],[!r.active,"gameOver"]])},o.prototype.drawScore=function(){var e=t.ctx.strokeStyle;t.ctx.strokeStyle="#ffffff",t.ctx.fillStyle="#000000",t.ctx.lineWidth=2,t.ctx.font="bold 50px 'Freckle Face',Verdana",t.ctx.textBaseline="top",t.ctx.strokeText(t.utils.formatScore(r.score),5,5),t.ctx.strokeStyle=e,r.cbacks.scoreupdate.call(t,r.score)},o.prototype.checkCollisions=function(){var e,o,n,s=t.ctx.getImageData(r.real.wormHead+r.real.wormSize+1,t.canvas.height/2,1,1),a=s.data,l=t.ctx.getImageData(r.real.wormHead+r.real.wormSize+2,t.canvas.height/2,1,1),c=l.data,p=t.utils.rgb2hex(a[0],a[1],a[2]),u=t.utils.rgb2hex(c[0],c[1],c[2]),f=function(){r.active=!1,r.gameover=!0};if(r.obstacles&&r.obstacles.length&&(e=r.obstacles[0],n=t.canvas.height/2,r.real.wormHead-e[0]+r.Xoffset<r.real.speed/2&&r.real.wormHead-e[0]+r.Xoffset>0&&e[1]+r.Yoffset-r.real.obstacleSize/2<n&&n<e[1]+r.Yoffset+r.real.obstacleSize/2&&f()),r.ppills&&r.ppills.length&&(o=r.ppills[0],t.utils.pdistance(r.real.wormHead,t.canvas.height/2,o.left+r.Xoffset,o.top+r.Yoffset)<4*r.real.wormSize))return r.feverCount+=1,t.ppillsScore(),void t.removePpills();p!==i.colors[i.theme].tunnel&&p&&u!==i.colors[i.theme].tunnel&&u&&f()},o.prototype.drawDoomObstacles=function(){var e=t.ctx.strokeStyle,o="",n=0;for(null;n<i.doomObstacles;n+=1)o+="* ";t.ctx.strokeStyle="#ffffff",t.ctx.fillStyle="#000000",t.ctx.lineWidth=1,t.ctx.font="20px 'Freckle Face',Verdana",t.ctx.textBaseline="top",t.ctx.strokeText(o,5,60),t.ctx.strokeStyle=e},o.prototype.drawBg=function(){var e=t.ctx.createLinearGradient(0,0,t.canvas.width,0),o=1/(i.colors[i.theme].bg.length-1);e.addColorStop(0,i.colors[i.theme].bg[0]),e.addColorStop(o,r.freezeDecay?i.colors[i.theme].freezebg[~~(l.time/i.blinkrate)%r.freezeBgLength]:i.colors[i.theme].bg[1]),e.addColorStop(2*o,i.colors[i.theme].bg[2]),r.freezeBgIndex+=1,r.freezeBgIndex%=r.freezeBgLength,t.ctx.fillStyle=e,t.ctx.fillRect(0,0,t.canvas.width,t.canvas.height)},o.prototype.drawWorm=function(){var e,o,n=r.feverCount;for(e=0,o=i.wormLenght;e<o;e+=1)t.ctx.beginPath(r.real.wormHead-e*r.real.speed,r.Yoffset+t.canvas.height/2-r.wormQueue[e]),t.ctx.arc(r.real.wormHead-e*r.real.speed,r.Yoffset+t.canvas.height/2-r.wormQueue[e],r.real.wormSize,0,2*Math.PI,!0),t.ctx.fillStyle=n?l.feverGradients[(~~(l.time/i.blinkrate)+e)%l.fever_colors_length][e]:r.wormColors[e],n&&(n-=1),t.ctx.lineWidth=1,t.ctx.closePath(),t.ctx.fill();t.checkWorm()},o.prototype.checkWorm=function(){r.wormQueue.splice(0,0,r.Yoffset),r.wormQueue.length>i.wormLenght&&r.wormQueue.pop()},o.prototype.drawTunnel=function(){var e=0,o=r.bound_pairs,n=o.length;for(t.ctx.fillStyle=i.colors[i.theme].tunnel,t.ctx.strokeStyle=i.colors[i.theme].tunnel,t.ctx.lineWidth=0,null;e<n-1;e+=1)t.ctx.beginPath(),t.ctx.moveTo(t.canvas.width/2,30),t.ctx.lineTo(o[e].left+r.Xoffset,o[e].t1+r.Yoffset),t.ctx.stroke(),t.ctx.closePath(),t.ctx.beginPath(),t.ctx.moveTo(t.canvas.width/2,t.canvas.height-30),t.ctx.lineTo(o[e].left+r.Xoffset,o[e].t2+r.Yoffset),t.ctx.stroke(),t.ctx.closePath(),t.ctx.beginPath(),t.ctx.moveTo(o[e].left-1+r.Xoffset,o[e].t1+r.Yoffset),t.ctx.lineTo(o[e+1].left+r.Xoffset,o[e+1].t1+r.Yoffset),t.ctx.lineTo(o[e+1].left+r.Xoffset,o[e+1].t2+r.Yoffset),t.ctx.lineTo(o[e].left-1+r.Xoffset,o[e].t2+r.Yoffset),t.ctx.stroke(),t.ctx.closePath(),t.ctx.fill(),o[e].left-1+r.Xoffset<r.real.wormHead&&r.real.wormHead<=o[e+1].left+r.Xoffset&&(r.collisionTunnelIndex=e);this.checkTunnel()},o.prototype.checkTunnel=function(){var e=r.bound_pairs.length,o=r.bound_pairs[1],n=r.bound_pairs[e-2];o.left+r.Xoffset<0&&function(){r.bound_pairs.splice(0,1)}(),n.left+r.Xoffset<r.canvasWidth&&function(){var e,o,n,s,a=r.bound_pairs.length,l=r.bound_pairs[a-1],c=t.utils.rand(i.minSteep,i.maxSteep);Math.abs(r.lastSteep-c)>i.maxSteepVariation&&(c=t.utils.randSign()*t.utils.rand(r.lastSteep,i.maxSteepVariation),r.lastSteep=c),e=l.t1+r.canvasHeight*c,o=l.left+r.canvasWidth*t.utils.rand(i.minStep,i.maxStep),n=e,s=e+l.t2-l.t1,!r.freezeDecay&&(r.obstacles&&l.t2-l.t1>r.real.obstacleSize*i.stopHeightDecay||!r.obstacles&&l.t2-l.t1>r.real.obstacleSize)?s=e+(l.t2-l.t1)*i.stepDecay:r.freezeDecay=!0,r.bound_pairs.push({left:o,t1:n,t2:s}),t.onAddedBound()}()},o.prototype.onAddedBound=function(){var e,o,n,s=r.bound_pairs.length,a=r.bound_pairs[s-1],l=r.bound_pairs[s-2];r.obstacles&&r.obstacles.push([a.left,t.utils.rand(a.t1+r.real.obstacleSize/2,a.t2-r.real.obstacleSize/2)]),r.ppills&&(e=(a.left+l.left)/2,o=(a.t1+l.t2)/2+.8*t.utils.randSign()*t.utils.rand(0,a.t2-a.t1)/2,n={left:e,top:o,getRandomColor:function(){var e=0,t=i.colors[i.theme].ppills;return n.getRandomColor=function(){return e+=1,t[~~(e/i.blinkrate)%t.length]},t[e]}},r.ppills.push(n))},o.prototype.drawObstacles=function(){var e,o;for(r.obstacles.length&&r.obstacles[0][0]+r.Xoffset<0&&r.obstacles.splice(0,1),t.ctx.fillStyle=i.colors[i.theme].obstacles,e=0,o=r.obstacles.length;e<o;e+=1)t.roundRect(r.obstacles[e][0]+r.Xoffset-r.real.obstacleSize/2,r.obstacles[e][1]+r.Yoffset-r.real.obstacleSize/2,r.real.obstacleSize/2,r.real.obstacleSize)},o.prototype.roundRect=function(e,o,n,s,a){a=a||20,t.ctx.beginPath(),t.ctx.moveTo(e+a,o),t.ctx.lineTo(e+n-a,o),t.ctx.quadraticCurveTo(e+n,o,e+n,o+a),t.ctx.lineTo(e+n,o+s-a),t.ctx.quadraticCurveTo(e+n,o+s,e+n-a,o+s),t.ctx.lineTo(e+a,o+s),t.ctx.quadraticCurveTo(e,o+s,e,o+s-a),t.ctx.lineTo(e,o+a),t.ctx.quadraticCurveTo(e,o,e+a,o),t.ctx.closePath(),t.ctx.stroke(),t.ctx.fill()},o.prototype.removePpills=function(){r.ppills.splice(0,1)},o.prototype.drawPills=function(){var e,o;for(t.checkFeverAlive(),t.clearPpills(),t.ctx.fillStyle=i.colors[i.theme].ppills,e=0,o=r.ppills.length;e<o;e+=1)!function(e,o,n){t.ctx.beginPath(e,o),t.ctx.arc(e,o,r.real.ppillsSize,0,2*Math.PI,!0),t.ctx.fillStyle=n.getRandomColor(),t.ctx.lineWidth=1,t.ctx.closePath(),t.ctx.fill()}(r.ppills[e].left+r.Xoffset-r.real.ppillsSize/2,r.ppills[e].top+r.Yoffset-r.real.ppillsSize/2,r.ppills[e])},o.prototype.gameOver=function(){return t.messagePanel.innerHTML=t.utils.replaceAll(i.tpl.gameover,{gameName:i.gameName,score:t.utils.formatScore(r.score)}),t.utils.fadeIn(t.messagePanel),t.utils.bind(a.getElementById("restart"),"click",function(){t.restart()}),t.utils.stilize(t.canvas,{cursor:"default"}),r.cbacks.gameover.call(t,r.score),!1},o.prototype.utils={queueCall:function(){var e=0,t=arguments,o=t.length;for(null;e<o;e+=1)t[e]instanceof Array?t[e][0]&&this[t[e][1]].call(this):this[t[e]].call(this)},clone:function(e){var t,o;if(null===e||"object"!=typeof e)return e;t=e.constructor();for(o in e)e.hasOwnProperty(o)&&(t[o]=this.clone(e[o]));return t},fadeIn:function(t){var o,n=.02;t.style.opacity=.02,t.style.display="block",o=e.setInterval(function(){n+=.02,t.style.opacity=n,n>=1&&(t.style.opacity=1,e.clearInterval(o))},10)},formatScore:function(e){e=String(e);for(var t=[],o=e.length-1,n=0;o>=0;)n%3==0&&n&&t.splice(0,0,"."),t.splice(0,0,e[o]),n+=1,o-=1;return t.join("")},orderJsonBy:function(e,t){},stilize:function(e,t){var o;for(o in t)t.hasOwnProperty(o)&&(e.style[o]=t[o]);return e},attr:function(e,t){var o;for(o in t)t.hasOwnProperty(o)&&e.setAttribute(o,t[o]);return e},makeNS:function(t,o,n){var s,a=this,r=t.split("."),i="undefined";return typeof n===i&&(n=e),typeof o===i&&(o={}),n[r[0]]||(n[r[0]]=1===r.length?o:{}),s=n[r[0]],r.length>1?a.makeNS(r.slice(1).join("."),o,n[r[0]]):s},bind:function(t,o,n){if(e.addEventListener)t.addEventListener(o,n,!1);else if(e.attachEvent){var s=function(){n.call(t,e.event)};t.attachEvent("on"+o,s)}else t["on"+o]=function(){n.call(t,e.event)}},unbind:function(e,t,o){null!==e&&(e.removeEventListener?e.removeEventListener(t,o,!1):e.detachEvent&&e.detachEvent("on"+t,o),o=null)},rand:function(e,t){return e+Math.random()*(t-e)},randSign:function(){return Math.random()>.5?-1:1},getScreenSize:function(){var t=function(e,t,o){var n=e||0;return t&&(!n||n>t)&&(n=t),o&&(!n||n>o)?o:n};return{w:t(e.innerWidth||0,a.documentElement?a.documentElement.clientWidth:0,a.body?a.body.clientWidth:0),h:t(e.innerHeight||0,a.documentElement?a.documentElement.clientHeight:0,a.body?a.body.clientHeight:0)}},replaceAll:function(e,t,o,n){var s=new RegExp((o||"%")+"([A-z0-9-_]*)"+(n||"%"),"g");return e.replace(s,function(e,o){return t[o]||""})},checkpound:function(e){return"#"===e.charAt(0)?e.substr(1):e},getRandomColor:function(){return"#"+(16777215*Math.random()<<0).toString(16)},getGradientArray:function(e,t,o){var n,s,a,r,i,l,c,p,u,f,d,h=[];o+=1,e=this.checkpound(e),t=this.checkpound(t),n=this.hex2int(e),s=this.hex2int(t),o=Math.min(Math.abs(n-s),o),a={},f={},d={"+":function(e,t){return e===t?e:e+t},"-":function(e,t){return e===t?e:e-t}},r=this.hex2rgb(e),i=this.hex2rgb(t),l={r:0,g:0,b:0};for(c in l)l.hasOwnProperty(c)&&(a[c]=Math.abs(parseInt(r[c],10)-parseInt(i[c],10)),f[c]=a[c]/o);for(c=0;c<o;c+=1){for(p in l)l.hasOwnProperty(p)&&(u=parseInt(r[p],10)<parseInt(i[p],10)?"+":"-",l[p]=this.padme(this.int2hex(d[u](parseInt(r[p],10),f[p]*c)),0,"pre"));h[c]="#"+l.r+l.g+l.b}return h[o]="#"+t,h},padme:function(e,t,o,n){for(var s=n||2;String(e).length<s;)switch(o){case"pre":e=String(t+e);break;case"post":e=String(e+t)}return e},hex2int:function(e){return parseInt(e,16)},int2hex:function(e){return parseInt(e,10).toString(16)},rgb2hex:function(e,t,o){return e=parseInt(e,10).toString(16),t=parseInt(t,10).toString(16),o=parseInt(o,10).toString(16),e.length>1||(e="0"+e),t.length>1||(t="0"+t),o.length>1||(o="0"+o),"#"+e+t+o},hex2rgb:function(e){var t=String(e),o="#"===t.charAt(0)?1:0;return{r:parseInt(t.substr(o,2),16),g:parseInt(t.substr(o+2,2),16),b:parseInt(t.substr(o+4,2),16)}},killEvent:function(t){return t||(t=e.event,t.cancelBubble=!0,t.returnValue=!1),t.stopPropagation&&(t.stopPropagation(),t.preventDefault()),!1},pdistance:function(e,t,o,n){return Math.max(Math.abs(o-e),Math.abs(n-t))},out:function(t,o){e.console.debug(t,o)}},e.Wcave=s}(window);