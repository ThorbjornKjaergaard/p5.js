var sequence = [];
var index = 0;
var nextCorner = 0;

function setup() {
    createCanvas(800, 800);
    background(220);
    frameRate(10);

    sequence[index++] = 0;
    sequence[index++] = 1;
    sequence[index++] = 1;

    for(var i = 0; i < 300; i++) {
        sequence[index] = sequence[index-1] + sequence[index -2];
        index++;
    } 
    console.log(sequence);


}


function draw() {  
    var x = 0;
    var y = 0;
    var w = 0;
    
    strokeWeight(1);
    textAlign(CENTER);
    translate(width/2, height/2)
    //scale(0.0001);
    for(var j = 0; j < sequence.length; j++) {
        w = floor(sequence[j]/(10^10000));
        fill(255);
        noStroke();
        switch(nextCorner % 4) {
            case 0:
                //rect(x, y, sequence[j], sequence[j]);
                line(x, y, x + w, y);
                line(x + w, y, x + w, y + w);
                line(x + w, y + w , x, y + w);
                line(x, y + w, x, y);
                arc(x, y + w, w * 2, w * 2, PI + HALF_PI, 0, PIE);
                x = x + w;
                y = y + w;
                break;
            case 1:
                //rect(x, y, sequence[j], sequence[j]);
                line(x, y, x, y + w);
                line(x, y + w, x - w, y + w);
                line(x - w, y + w, x - w, y);
                line(x - w, y, x, y);
                arc(x - w, y, w * 2, w * 2, 0, HALF_PI, PIE);
                x = x - w;
                y = y + w;
                break; 
            case 2:
                line(x, y, x - w, y);
                line(x - w, y, x - w, y - w);
                line(x - w, y - w, x, y - w);
                line(x, y - w, x, y);
                arc(x, y - w, w * 2, w * 2, HALF_PI, PI, PIE);
                x = x - w;
                y = y - w;
                break;
            case 3:
                line(x, y, x, y - w);
                line(x, y - w, x + w, y - w);
                line(x + w, y - w, x + w, y);
                line(x + w, y, x, y);
        noStroke();
                arc(x + w, y, w * 2, w * 2, PI, PI + HALF_PI, PIE);
                x = x + w;
                y = y - w;
                break;
        }
        textSize(floor(w/10));
        fill(0);
        text(w, floor(x/2), floor(y/2));
        nextCorner++;
     }
}