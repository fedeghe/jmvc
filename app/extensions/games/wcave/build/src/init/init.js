//the main Wcave object, private
var Wcave = function () {},
    instance = false,

    // the function that will be published in Window, and called with configuration
    wcave = function (conf) {
        if (!instance) {
            instance = new Wcave().init(conf);
        } else {
            W.console.error('A Wcave instance exists yet!!! ' + vars.version );
        }
    },
    self,
    //just cache document, and short it
    WD = W.document,

    /**
     * vars are modified during the game
     */
    vars = {

        urlE : encodeURIComponent(document.location.href), 

        // score for the game
        score : 0,

        // bonus obtained
        bonus : 0,

        // the worm 
        wormQueue : [],

        // the container for the canvas
        cnt : null,

        // that will be the canvas element
        canvas : null,

        // canvas sizes
        canvasHeight : 0,
        canvasWidth : 0,

        // the 2d context for the canvas
        ctx : null,

        // a flag for game activation
        active : false,

        // is the game over
        gameover : false,

        // here will steo in&out bounds for the tunnel
        bound_pairs : [],

        // offset to move background up and down
        Yoffset : 0,

        // offset to move background forward
        Xoffset : 0,

        // velocity
        //velocity : 0,

        // initial force direction (downward) 
        versus : -1,

        // function increment resetted each up and down, 
        // is the actual param of the force function 
        cursor : 0,

        // initial vertical position relative to the starting point
        xB : 0,

        // initial velocity, a bit upwarp
        vB : 15,

        //delta : 0,

        // this saves the last steep factor used,
        // is recalculated ensuring maxStepVariation(cnv.height%)
        // to the new value
        lastSteep : 0,

        // this will be the array for all the obstacles
        // is dynamic, so will not explode but will remain tiny, tipically 2 or 3 sized
        // if setting are given it becomes false
        obstacles : [],

        // as for obstacles, given option ill contain dynamic array of point pills
        ppills : [],

        // number of hit point pills, used as factor to increase score bonus

        //not used at the moment
        //hpills : false,

        // the audio element, sibling next to canvas
        audio : null,

        //messagePanel div, used for start/end game, sibling prev to canvas
        messagePanel : null,

        // the index of the collision lines to be checked (tipically 0 or 1)
        tunnelCollisionIndex : 0,

        //pause
        paused : false,

        //mid background index
        freezeBgIndex : 0,

        //cache length
        freezeBgLength : 0,

        feverMode : false,
        feverCount : 0,
        feverIndexes : [],

        // for final extra bonus (score 10%), if all ppills have been caught
        missedPpills : 0,

        //cbackz
        cbacks : {
            gameover : function () {},
            gamestart : function () {},
            scoreupdate : function () {},
        }
    },
    /**
     * conf is a set of constants to calibrate various aspects of the game,
     * many of that values are given in percentage, relative to canvas height or width
     */
    conf = {

        gameName : 'Wcave',

        // the worm size, perc @ cnv.height
        wormSize : 0.015,

        // position from left of the worm head, perc @ cnv.width
        wormHead : 0.16,

        //number of point that built the worm queue
        wormLenght : 8,

        // minimum width of a tunnel branch, perc @ cnv.width
        minStep : 0.5,

        // maximum width of a tunnel branch, perc @ cnv.width
        maxStep : 1.5,

        // speep of the worm, perc @ cnv.width
        //speed : 0.023,
        speed : 0.018,

        // animation timeout (ms)
        freq : 25,

        // initial tunnel height, perc @ cnv.height
        initHeight : 0.95,

        // tunnel decay at each branch, perc @ self.height
        stepDecay : 0.98,

        // just a dev flag to enable disable any collision
        collision : true,

        // obstable size perc @ cnv.height, this is height, halved in width
        obstacleSize : 0.1,

        // minimum & maximim steep (1 corresponds to PI/4)
        minSteep : -0.7,// perc min and max speet variation
        maxSteep : 0.7,

        //maximum variation between steep-i and steep-(i+1)
        maxSteepVariation : 0.5,

        // audio file
        audiointro : JMVC.vars.baseurl + '/media/audio/revolve.ogg',

        // id attribute for the audio tag
        audioid : 'au',

        // radius for point pills, perc @ cnv.width
        ppillsSize : 0.015,

        theme : 'matrix',

        // the tunnel height will shrink until it satisfies
        // tunnel_height >= stopHeightDecay * obstacleSize
        stopHeightDecay : 3,



        doomObstacles : 3,

        //as far as the cave stop shrinking, freezeDecay becomes true
        freezeDecay : false,

        /**
         * used for storing real px values for all elements
         * set in width or height percentage
         */
        real : {},

        /**
         * id attribute for high score list container
         * @type {String}
         */
        hsContainerId : 'hscontainer',

        // reload the page at restart or make it gently?
        // this setting has something to do with tracking because
        // as far as a hard restart is used, each single game can be tracked
        hardRestart : false,

        // frequency used in any blinking element
        blinkrate : 2,

        // if false it is possible to doom as far as the missed pill is visible
        // if true it is possible to doom only before missing a pill
        ppillsStrictCatch : false,

        // colors used
        colors : {
            matrix : {
                worm : ['#00ff00', '#003300'],
                //the background, the gradient is created with all the colors specified
                bg : ['#000000', '#00ff00', '#000000'],
                freezebg : ['#555555', '#333333'],
                //freezebg : ['#FF0000', '#00FF00', '#0000FF'],
                tunnel : '#000000',
                obstacles : '#ffffff',
                //ppills : '#ff0000',
                hpills : '#00ff00',
                feverHead : ['#FF0000', '#00FF00', '#0000FF'],
                feverBonus : ['#FF0000', '#00FF00', '#0000FF'],
                ppills : ['#FF0000', '#00FF00', '#0000FF']
            },
            matrix2 : {
                worm : ['#ffff00', '#330000'],
                //the background, the gradient is created with all the colors specified
                bg : ['#0000ff', '#ffff00',  '#fede76'],
                freezebg : ['#555555', '#333333'],
                //freezebg : ['#FF0000', '#00FF00', '#0000FF'],
                tunnel : '#555555',
                obstacles : '#ffffff',
                //ppills : '#ff0000',
                hpills : '#00ff00',
                feverHead : ['#FFFF00', '#0fFFf0', '#ff00FF'],
                feverBonus : ['#FF0000', '#00FF00', '#0000FF'],
                ppills : ['#0000', '#ffFF00', '#ffffFF']
            }
        },

        // gravity factor
        g : 1.4,

        // template for start & end
        tpl : {
            start : '<h1>%gameName%</h1>' +
                '<div id="intro">' +
                    '<div id="introtext">' +
                        '<ul>' +
                            '<li>Hold mouse to move up, release to move down</li>' +
                            '<li>stay away from <span class="white">big white</span> rounded blocks</li>' +
                            '<li>catch <span class="rgb1">r</span><span class="rgb2">g</span><span class="rgb3">b</span> rounded pills for points</li>' +
                            '<li>%wormLength% consecutive pills enable <span class="ks" id="fmode">fever mode</span></li>' +
                            //'<li>&DoubleUpDownArrow;</li>' +
                            '<li>clean the cave hitting <span class="ks">d</span> (%doomObstacles% available); pause/resume with <span class="ks">p</span></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<input id="start" type="button" value="START"/>',

            gameover : '<h1>%gameName%</h1>' +
                '<div id="outro">' +
                    '<p>You scored <span>%score%</span> points</p>' +
                    '<div id="%hscontainerid%"></div>' +
                '</div>' +
                '<input id="restart" type="button" value="PLAY AGAIN" />'
        }
    },
    cache = {
        //some lengths
        fever_colors_length : 0,
        fever_bonus_length : 0,
        feverGradients : [],

        //just to clone orignal object for soft restart
        origVars : 0,
        origConf : 0,

        //for unbindings at soft reloat
        bindings : [],

        //grows up
        time : 0
    };
