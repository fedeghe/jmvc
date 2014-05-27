JMVC.require('core/screen/screen');

JMVC.head.addStyle(JMVC.vars.baseurl + '/app/extensions/widget/tooltip/tooltip.css', true);

JMVC.widget.Tooltip = function (node, html, styled, options) {
    
    var tip = document.createElement("div"), 
        //tipId = JMVC.util.uniqueid,
        hidetipId = JMVC.util.uniqueid,
        stayopen = typeof options != 'undefined' && options.stay == true,
        fadeout = typeof options != 'undefined' && typeof options.fadeout == 'number';

    var priv = {
        showTip : function(e, innerhtml, styled){
            
            e = e || window.event;
            document.body.style.cursor= ' pointer';

            var target = JMVC.events.eventTarget(e),
                content = target.getAttribute("title"),
                scrollingPosition = JMVC.screen.getScreenData(),
                viewportSize = JMVC.screen.getViewportSize()
                cursorPosition = [0, 0];

            target.tooltip = tip;
            target.setAttribute("title", "");
            //tip.setAttribute("id", tipId); 

            tip.className = "tooltip";
            tip.innerHTML = '';

            if(typeof innerhtml !== 'undefined' && innerhtml){
                tip.innerHTML = innerhtml;
            } else {
                tip.appendChild(document.createTextNode(content));
            }

            if (typeof e.pageX != "undefined" && typeof e.x != "undefined"){
                cursorPosition[0] = e.pageX; 
                cursorPosition[1] = e.pageY;
            }else{
                cursorPosition[0] = e.clientX + scrollingPosition.scrollLeft; 
                cursorPosition[1] = e.clientY + scrollingPosition.scrollTop; 
            } 
            
            
            
            JMVC.css.style(tip, {
                'position' : 'absolute',
                'left' : cursorPosition[0] + 10 + "px",
                'top' : cursorPosition[1] + 10 + "px",
                'display' : 'none'
            });
            
            styled = styled || {};
            styled.display = '';

            if (cursorPosition[0] - scrollingPosition.scrollLeft + 10 + tip.offsetWidth > viewportSize[0] - 25) {
                styled.left = scrollingPosition.scrollLeft + viewportSize[0] - 25 - tip.offsetWidth + "px";
            } else {
                styled.left = cursorPosition[0] + 10 + "px"; 
            }
            if (cursorPosition[1] - scrollingPosition.scrollTop + 10 + tip.offsetHeight > viewportSize[1] - 25) {
                if (e.clientX > (viewportSize[0] - 25 - tip.offsetWidth)) {
                    styled.top = cursorPosition[1] - tip.offsetHeight - 10 + "px";
                } else {
                    styled.top = scrollingPosition.scrollTop + viewportSize[1] - 25 - tip.offsetHeight + "px"; 
                } 
            } else {
                styled.top = cursorPosition[1] + 10 + "px"; 
            } 
            
            JMVC.css.style(tip, styled);

            document.getElementsByTagName("body")[0].appendChild(tip); 
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
        },
        
        
        
        hideTip : function (e) {
            e = e || window.event; 

            var target = JMVC.events.eventTarget(e); 

            document.body.style.cursor = 'default';

            if (target.tooltip != null){
                target.setAttribute("title", target.tooltip.childNodes[0].nodeValue); 
                target.tooltip.parentNode.removeChild(target.tooltip); 
            } 
            return false; 
        }
    };

    
    if (stayopen) {
        // add to content header for `close` button
        var more = ''+
        '<div style="position:relative; top:0px; right:0px; width:100%; height:20px; margin-bottom:3px; background-color:gray">'+
                '<div id="' + hidetipId + '" style="position:absolute; top:0px; right:0px; width:10px;height:16px;text-align:center;font-family:verdana; line-height:14px;padding:1px;color:black">X</div>'+
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
                    JMVC.dom.find('#' + hidetipId),
                    'click',
                    function (e2) {
                        priv.hideTip(e2);
                    }
                );
            }
        }
    );
    
    if (typeof options != 'undefined' && options.follow == true) {
        JMVC.events.bind(
            node,
            'mousemove',
            function (e) {
                priv.moveTip(e, html, styled);
            }
        );
    }
};