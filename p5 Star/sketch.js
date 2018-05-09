function setup() {
    createCanvas (windowWidth,windowHeight);
}

function starObject (x,y)
{
    this.x = x;
    this.y = y;
    this.sWeight = random(1,3);
    this.opa = random(0,255);
    this.arrayCon = [];
    this.drawPoint = function()
    {
        push();
        stroke(255,this.opa);
        strokeWeight(this.sWeight);
        point(x,y);
        pop();
    }
    this.drawLine = function()
    {
        if(this.arrayCon.length!=0)
        {
            for (j =0; j<this.arrayCon.length; j++)
            {
                push();
                stroke(255,this.arrayCon[j].opa);
                strokeWeight(0.7);
                line(this.arrayCon[j].x2,this.arrayCon[j].y2,this.x,this.y);
                pop();
            }
        }
    }
}
function connectionObject(x2,y2,opa)
{
    this.x2 = x2;
    this.y2 = y2;
    this.opa  = opa;
}
var arrayStar = [];
var mouseIsClicked = false;
function mouseClicked()
{
    if(mouseIsClicked)
        mouseIsClicked = false;
    else
        mouseIsClicked = true;
}
function draw()
{
    //maximiser l'opacité des ligneq
    //faire des autres objects connections au lieu de tout recalculé
    background(0,3,17);
    if(arrayStar.length<1000)
    {
        newStar = new starObject(random(0,width),random(0,height));
        for(i =0 ; i<arrayStar.length; i++)
        {
            starDist = sqrt(pow(arrayStar[i].x - newStar.x,2)+ pow(arrayStar[i].y - newStar.y,2));
            if(starDist <= 80)
            {
                if(arrayStar[i].opa <= newStar.opa)
                    smallerOpa = arrayStar[i].opa;
                else
                    smallerOpa = newStar.opa;
                newStar.arrayCon.push(new connectionObject(arrayStar[i].x,arrayStar[i].y,map(smallerOpa,0,255,0,65)));
            }
        }
        arrayStar.push(newStar);

    }
    for(i=0; i<arrayStar.length; i++)
    {
        arrayStar[i].drawPoint();
        if(mouseIsClicked)
            arrayStar[i].drawLine();
    }
}
