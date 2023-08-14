img = "";
object = [];
modelStatus = "";

function preload(){
    img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status: detectando objeto"
}
function modelLoaded(){
    console.log("modelo carregado");
    modelStatus = true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    object = results;
}
function draw(){
    image(img,0 ,0 ,640 , 420);
    if(modelStatus != ""){
        for(i=0; i<object.length;i++){
            document.getElementById("status").imnnerHTML = "status: objeto detectado";
            fill(5, 5, 5);
            percent = floor(object[i].confidence*100)
            text(object[i].label+" " + percent + "%", object[i].x+15, object[i].y+15);
            noFill();
            stroke(3,3,4);
            rect(object[i].x, object[i].y,object[i].width,object[i].height);

        }
    }
}