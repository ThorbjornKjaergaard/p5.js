var golSketch = function(p) {
  var w;
  var columns;
  var rows;
  var board;
  var next;
  var generation = [];
  var alive = 0;
  var genDiv;
  var lifesDiv;
  var bg = 90;
  var sound;
  var prevGen = 0;

  p.setup = function() {
    p.colorMode(p.HSB);
    //createCanvas(windowWidth - 50, windowHeight - 100);
    sound = new p5.Oscillator();
    sound.setType('sine');
    sound.amp(1);
    sound.start();

    p.createCanvas(700, 600);
    w = 10;
    p.frameRate(10);
    // Calculate columns and rows
    columns = p.floor(p.width/w);
    rows = p.floor(p.height/w);
    // Wacky way to make a 2D array in JS
    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
      board[i] = new Array(rows);
    } 
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
      next[i] = new Array(rows);
    }
    p.init();
  }
  p.draw = function() {
    p.background(bg);
    p.generate();
    for ( var i = 0; i < columns;i++) {
      for ( var j = 0; j < rows;j++) {
        if ((board[i][j].value > 0)) p.fill(board[i][j].value, 125, 255);
        else p.fill(board[i][j].bg); 
        p.stroke(p.color('red'));
        p.strokeWeight(0);
        p.rect(i*w, j*w, w-1, w-1, p.floor(w/2));
      }
    }

  }

  // reset board when mouse is pressed
  p.mousePressed = function() {
    p.init();
    golSketch.init();
  }

  // Fill board 
  p.init = function() {
    generation = [];
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        // Lining the edges with 0s
        if (i == 0 || j == 0 || i == columns-1 || j == rows-1) {
          board[i][j] = new Cell(p.color(0), bg);
        }
        // Filling the rest randomly
        else board[i][j] = new Cell(p.floor(p.random(2)), bg);
        /*else {
          board[i][j] = new Cell(0, bg);
        }*/
        next[i][j] = new Cell(0, bg);
      }
    }
    graphSketch.init();
  }

  // The process of creating the new generation
  p.generate = function() {
    alive = 0;
    // Loop through every spot in our 2D array and check spots neighbors
    for (var x = 1; x < columns - 1; x++) {
      for (var y = 1; y < rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        var neighbors = 0;
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            neighbors += (board[x+i][y+j].value > 0 ? 1 : 0);
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= (board[x][y].value > 0 ? 1:0);
        alive += next[x][y].setValue(board[x][y].value, neighbors);
      }
    }

    // Swap!
    var temp = board;
    board = next;
    next = temp;
    generation.push(alive);
    graphSketch.alive(generation);
    p.makeSound(alive);
  }
  p.makeSound = function(alive_) {
    sound.freq(440 + (alive_ - prevGen)*4, 0.1);
    prevGen = alive_;
  }
}
/*****************/
var graphSketch = function(p) {
  var maxAlive = 0;
  var max = 0, min = 0;

  p.setup = function() {
    p.colorMode(p.HSB);
    //createCanvas(windowWidth - 50, windowHeight - 100);
    p.createCanvas(700, 200);
  }

  p.init = function() {
    p.maxAlive = 0;
    max = 0;
    min = 0;
  }

  p.alive = function(gen){
    var x, y;
    p.clear();
    p.background(90);
    p.stroke(255, 204, 255);
    p.fill(255, 204, 255);
    var generation = gen.slice(-p.width);  
    var alive = generation[generation.length - 1];

    maxAlive = Math.max(...generation);
    if(alive > max) max = alive;
    if(min === 0) min = max;
    if(alive < min) min = alive;

    // Draw graph    
    var startPoint = generation.length < p.width ? 0: generation.length - p.width;
    var lastX = 0;
    var lastY = 0;
    p.strokeWeight(3);
    for(var i = startPoint; i < generation.length; i++) {
      if(generation[i] > maxAlive) maxAlive = alive;
      alive = p.floor(p.map(generation[i], 0, maxAlive, 0, p.height));
      //p.line(i - startPoint, p.height - alive, i - startPoint, p.height);
      x = i - startPoint;
      y = p.height - alive - 10;
      //p.rect(x, y, 1, 1);
      p.line(x, y, lastX, lastY);
      lastX = x;
      lastY = y;
    }
    p.noStroke();
    p.fill(0);
    p.textSize(16);
    p.text("Generation: " + generation.length, 30, 16);
    p.text("Antal vid liv: " + generation[generation.length - 1] , 30, 32);    
    p.text("Max antal levande: " + max, 240, 16);
    p.text("Min antal levande: " + min , 240, 32);
    
  } 
}

var golSketch = new p5(golSketch, "GolDiv");
var graphSketch = new p5(graphSketch, "GraphDiv");