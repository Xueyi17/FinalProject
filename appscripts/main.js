require(
    [],
    function () {
        
                    
        console.log("yo, I'm alive!");

        var audio = new Audio("resources/Start.wav");
        audio.loop = true;
        audio.play();

        var audioCaught = new Audio("resources/caught.mp3");

        var audioBad= new Audio("resources/bad.wav");

        var audio1 = new Audio("resources/Back.mp3");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var counter = 0;
        var maxCount = 10;
        var starttime;
        var totaltime;

        var diff;
       

        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        var rect2 = paper.rect(200,200,100,100)
            rect2.attr({
            'fill': "url('http://oi65.tinypic.com/seue0g.jpg')",
            'stroke-opacity': 0
             });
        


        var startButton = paper.rect(380, 550, 100, 40);
        startButton.attr({
        	stroke: "black",
            'fill': "url('http://docs.yoyogames.com/source/dadiospice/000_using%20gamemaker/playbutton.png')"
        });

        startButton.hide();

        var numDots=10;
        // assign7: initialize array to empty
        var dot = [];
        var i=0;
        while(i<numDots){
            dot[i]=paper.circle(-100, pHeight/2, 10);

         
            dot[i].attr({"fill": "yellow", "fill-opacity" : 0.7, "stroke-opacity": 0});

            // assign6:5 Add some properties to dot just to keep track of it's "state"
            dot[i].xpos=pWidth/2 + Math.random()*10;
            dot[i].ypos=pHeight/6;
            // assign6.6 Add properties to keep track of the rate the dot is moving
            //assign7: MAPPING of ranges (here, [0,1] -> [-5,5])
            dot[i].xrate= -5+25*Math.random();
            dot[i].yrate= -7+14*Math.random();
            i++;
        };

        var numBadDots=5;
        // assign7: initialize array to empty
        var badDot = [];
        var a=0;
        while(a<numBadDots){
            badDot[a]=paper.circle(-100, pHeight/2, 10);

            badDot[a].attr({"fill": "red", "fill-opacity" : 0.9, "stroke-opacity": 0});

            // assign6:5 Add some properties to dot just to keep track of it's "state"
            badDot[a].xpos=pWidth/2 + Math.random()*10;
            badDot[a].ypos=pHeight/6;
            // assign6.6 Add properties to keep track of the rate the dot is moving
            //assign7: MAPPING of ranges (here, [0,1] -> [-5,5])
            badDot[a].xrate= -5+25*Math.random();
            badDot[a].yrate= -7+14*Math.random();
            a++;
        };





      

        var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        };


       
        var score = paper.text(pWidth - 20, pHeight - 10, counter).attr({fill: 'white', "font-size": 20});    

        
      
        
        
        var dist; // temp variable used inside loop
   
        


        var count=0;


        var gravity=0.1;

        var draw = function(){

            // Count and keep track of the number of times this function is called
            count++;
         

            i=0;
            while(i<numDots){


                dot[i].xpos += dot[i].xrate;
                dot[i].ypos += dot[i].yrate;

                dot[i].yrate += gravity;

                // assign6.8: Now actually move the dot using our 'state' variables
                dot[i].attr({'cx': dot[i].xpos, 'cy': dot[i].ypos});
                if (dot[i].xpos - state.x < 50 && dot[i].xpos - state.x > -50 && dot[i].ypos - state.y < 50 && dot[i].ypos - state.y > -50){
                    dot[i].attr({
                        'cx': -1000,
                        'cy': -1000
                    });
                    counter+=10;

                    audioCaught.play();

                    score.attr({
                        'text': counter,
                        fill: 'white'}); 

                    dot[i].xpos = -1000;
                    dot[i].ypos = -1000;

                } 

                i++;
            };
            
        };


        var drawBad = function(){

            // Count and keep track of the number of times this function is called
            count++;
          

            a=0;
            while(a<numBadDots){


                badDot[a].xpos += badDot[a].xrate;
                badDot[a].ypos += badDot[a].yrate;

                badDot[a].yrate += gravity;

                // assign6.8: Now actually move the dot using our 'state' variables
                badDot[a].attr({'cx': badDot[a].xpos, 'cy': badDot[a].ypos});
                if (badDot[a].xpos - state.x < 50 && badDot[a].xpos - state.x > -50 && badDot[a].ypos - state.y < 50 && badDot[a].ypos - state.y > -50){
                    badDot[a].attr({
                        'cx': -1000,
                        'cy': -1000
                    });
                    audioBad.play();
                    counter -= 5;

                    score.attr({
                        'text': counter,
                        fill: 'white'}); 

                    badDot[a].xpos = -1000;
                    badDot[a].ypos = -1000;

                };

                a++;
            };
            
        };



        var introRect = paper.rect(230, 250, 350, 100);
        introRect.attr({
            fill: 'black',
        })

        var intro = paper.text(pWidth/2, pHeight/2, "Catching Fireflies!");
        intro.attr({
            fill: 'white',
            "font-size": 40,
            "font-family": "Comic Sans MS, cursive, sans-serif"

        });

          // Before the game starts, the start button will show on the webpage.
        var ready = function(){
            startButton.show();
            rect2.hide();

           
        };


        // This defines how the game will be like when the game starts. The start button will dissapear. 
        var clear1;
        var clear2;

        var start = function (){
        	console.log("game is starting");
            var diff = parseInt(prompt("Try to catch all the YELLOW Fireflies and avoid all the RED bees by controlling the catching net with your mouse. Choose a level from 1 to 5!","2"));


        	startButton.hide();
            intro.hide();
            introRect.hide();
        	
           
           clear1 = setInterval(draw, 40*1/diff);


            var j=0;

            setInterval(function(){
           
            dot[j%10].xpos=Math.random()*pWidth;
            dot[j%10].ypos=pHeight/6;

            dot[j%10].xrate= -5+10*Math.random();
            dot[j%10].yrate= -7+14*Math.random();

            j++;
       

            }, 500);

            clear2 = setInterval(drawBad, 50);

            var k=0;

             setInterval(function(){
         //   can also use if (j<40) else (j=0), alternative to mod(%/remainder) method
            badDot[k%5].xpos=Math.random()*pWidth;
            badDot[k%5].ypos=pHeight/6;

            badDot[k%5].xrate= -5+10*Math.random();
            badDot[k%5].yrate= -7+14*Math.random();

            k++;
       

            }, 800);

           

            // The timer will start once the start button is clicked.
        	counter = 0;
        	starttime = Date.now();
        	console.log("time = " + starttime);

                  



            // This is to end the game after 10 seconds.
            setTimeout(endGame, 10000);

            
            audio1.play();
            audio.pause();


             rect2.show();

             score.attr({
                text: "0"
             })
        

        };

        startButton.node.addEventListener('click', start);

        //-----------------------------------------

       

        var state = {x: 0, y:0, isPushed:false};

        var updateCoordinates = function(e) {
            state.x = e.pageX - 100;
            state.y = e.pageY - 100;
            rect2.attr({
                        'x': state.x,
                        'y': state.y - 50
                 }); 
        };

        this.addEventListener("mousemove", updateCoordinates);
       
        


        // The game ends when 30 seconds is over. 
        
        var endGame = function(){

           
            ready();

            
            
            clearInterval(clear1);
            clearInterval(clear2);
            
            var i=0;
            for(i=0;i<10;i++){
               dot[i].attr({
                        'cx': -1000,
                        'cy': -1000
                    });
           };

               var a=0;
               for(a=0;a<5;a++){
               badDot[a].attr({
                        'cx': -1000,
                        'cy': -1000
                    });

            };


            audio1.pause();
            audio.play();

            alert("Yay! Good job! You got a score of " + counter + "! Click on the Play Button to try again!");

        


        };
                

     //   rect1.node.addEventListener('click', addClick);

                      
      

            
        ready(); // Put the start button on the screen 
    });





