JMVC.require('core/screen/screen');

JMVC.head.addstyle(JMVC.vars.baseurl + '/app/extensions/widget/tooltip/tooltip.css', true);

JMVC.widget.Tooltip = function (node, html, styled, options) {
    
    var tip, 
        tipId = JMVC.util.uniqueid,
        stayopen = typeof options != 'undefined' && options.stay == true,
        fadeout = typeof options != 'undefined' && typeof options.fadeout == 'number';

    var priv = {
        showTip : function(e, innerhtml, styled){
            
            document.body.style.cursor= ' pointer';

            //alert(event);
            if (typeof e == "undefined"){
                e = window.event; 
            } 
            var target = JMVC.events.eventTarget(e); 
            
            tip = document.createElement("div");

            var content = target.getAttribute("title"); 

            target.tooltip = tip;
            target.setAttribute("title", "");
            
            

            tip.setAttribute("id", tipId); 
            tip.className = "tooltip";

            if(typeof innerhtml !== 'undefined' && innerhtml){
                tip.innerHTML = innerhtml;
            } else {
                tip.appendChild(document.createTextNode(content));
            }

            var scrollingPosition = JMVC.screen.getScreenData();
            
            var cursorPosition = [0, 0]; 
            if (typeof e.pageX != "undefined" && typeof e.x != "undefined"){
                cursorPosition[0] = e.pageX; 
                cursorPosition[1] = e.pageY;
            }else{
                cursorPosition[0] = e.clientX + scrollingPosition.scrollLeft; 
                cursorPosition[1] = e.clientY + scrollingPosition.scrollTop; 
            } 
            
            document.getElementsByTagName("body")[0].appendChild(tip); 
            
            
            
                
            
            
            
            
            var basestyle = {
                'position' : 'absolute',
                'left' : cursorPosition[0] + 10 + "px",
                'top' : cursorPosition[1] + 10 + "px",
                'display' : 'none'
            };
            JMVC.css.style(tip, basestyle);
            
            
            var viewportSize = JMVC.screen.getViewportSize(); 
            
            
            var styles = {
                'display':''
            };

            
            if(typeof styled !== 'undefined')
                for(var i in styled)
                    styles[i] = styled[i];
            
            if (cursorPosition[0] - scrollingPosition.scrollLeft + 10 + tip.offsetWidth > viewportSize[0] - 25){
                styles.left = scrollingPosition.scrollLeft + viewportSize[0] - 25 - tip.offsetWidth + "px";
                
                //tip.style.left = scrollingPosition[0] + viewportSize[0] - 25 - tip.offsetWidth + "px"; 
            }else{
                styles.left = cursorPosition[0] + 10 + "px"; 
                //tip.style.left = cursorPosition[0] + 10 + "px"; 
            }
            if (cursorPosition[1] - scrollingPosition.scrollTop + 10 + tip.offsetHeight > viewportSize[1] - 25){
                if (e.clientX > (viewportSize[0] - 25 - tip.offsetWidth)){
                    styles.top = cursorPosition[1] - tip.offsetHeight - 10 +"px";
                    //tip.style.top = cursorPosition[1] - tip.offsetHeight - 10 +"px";
                }else{
                    styles.top = scrollingPosition.scrollTop + viewportSize[1] - 25 - tip.offsetHeight + "px"; 
                    //tip.style.top = scrollingPosition[1] + viewportSize[1] - 25 - tip.offsetHeight + "px"; 
                } 
            }else{ 
                styles.top = cursorPosition[1] + 10 + "px"; 
                //tip.style.top = cursorPosition[1] + 10 + "px"; 
            } 
            
            JMVC.css.style(tip, styles);
            
            
             
        },
        
        
        moveTip : function(e){
            var cursorPosition = [0, 0];
            var scrollingPosition = JMVC.screen.getScreenData();
            if (typeof e.pageX != "undefined" && typeof e.x != "undefined"){
                cursorPosition[0] = (parseInt(e.pageX, 10) + 10)+'px'
                //cursorPosition[1] = (this.getNum(e.pageY)+scrollingPosition[1]+10)+'px';
                cursorPosition[1] = (parseInt(e.pageY, 10) + 10)+'px';
            }else{
                cursorPosition[0] = (parseInt(e.clientX, 10)+10)+'px'; 
                cursorPosition[1] = (parseInt(e.clientY, 10) + scrollingPosition.scrollTop + 10)+'px'
                
            }
            JMVC.css.style(tip, {'position':'absolute','left':cursorPosition[0],'top':cursorPosition[1]});
            //JMVC.dom.html(tip, JMVC.dom.attr(tip, 'title'));
        },
        
        
        
        hideTip : function(e){
            document.body.style.cursor = 'default';
            if (typeof e == "undefined"){
                e = window.event; 
            } 
            var target = JMVC.events.eventTarget(e); 
            
            if (target.tooltip != null){
                target.setAttribute("title", target.tooltip.childNodes[0].nodeValue); 
                target.tooltip.parentNode.removeChild(target.tooltip); 
            } 
            return false; 
        }
    };

    
    if(stayopen){
        // add to content header for `close` button
        var more = ''+
        '<div style="position:relative; top:0px; right:0px; width:100%; height:20px; margin-bottom:3px; background-color:gray">'+
                '<div id="hide_my_tip" style="position:absolute; top:0px; right:0px; width:10px;height:16px;text-align:center;font-family:verdana; line-height:14px;padding:1px;color:black">X</div>'+
        '</div>';
        html = more + html;
    } else {
        JMVC.events.bind(node,
            'mouseout',
            function (e) {
                priv.hideTip(e);
            }
        );
    }
    
    
    
    JMVC.events.bind(
        node,
        'mouseover',
        function (e1) {

            priv.showTip(e1, html, styled);
            //            
            //in case add event to the header closer
            if (stayopen) {

                JMVC.events.bind(
                    JMVC.dom.find('#hide_my_tip'),
                    'click',
                    function(e2){
                        priv.hideTip(e2);
                    }
                );
            }
            
        }
    );
    

    if(typeof options != 'undefined' && options.follow == true ){
        JMVC.events.bind(
            node,
            'mousemove',
            function (e) {
                priv.moveTip(e, html, styled);
            }
        );
    }
    
    
};