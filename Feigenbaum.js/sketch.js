function setup() {
    createCanvas(400, 200);
    background(220);
    var startPop = 0.9;
    var populations = [];
    var p;
    var maxP = 0;
    for(var lambda = 0; lambda < 50; lambda += 0.1) {
        p = getPopulations(lambda, startPop);
        populations[lambda] = p;
        plotGraph(lambda, p);
        if(p > maxP) p = maxP;
    }
    console.log(populations);
}

function plotGraph(lambda, populations) {
    fill(0);
    map(lambda, 0, 5, 0, width);
    for(i = 0; i < populations.length; i++) {
        point(lambda*20, populations[i]);
    }
}


function getPopulations(lambda, startPop) {
    var numIterations = 1000;
    var retVals = [];
    var prevPop = startPop;
    for(var i = 0; i < numIterations; i++) {
        prevPop = lambda * prevPop * (1 - prevPop);
        prevPop = round(prevPop * 10000) / 10000;
        if(i > 950) retVals.push(round(prevPop * 100));
    }
    return retVals.unique();
}

Array.prototype.unique = function()
{
    var n = {},r=[];
    for(var i = 0; i < this.length; i++) 
    {
        if (!n[this[i]]) 
        {
            n[this[i]] = true; 
            r.push(this[i]); 
        }
    }
    return r;
}