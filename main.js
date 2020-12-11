sound= "";
objects= [];
function preload(){
   sound= loadSound("alarm_tone.mp3");
}


function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380)
    video.hide();
    objectDetector= ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status:Detecting objects";
}

function draw(){
    image(video, 0,0, 380, 380);
    r= random(255);
    g= random(255);
    b= random(255);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i= 0; i< objects.length; i++){
            document.getElementById("status").innerHTML= "Status : Object Detected";
            document.getElementById("number_of_objects_detected").innerHTML= "Number of objects detected are:"+ objects.length;
            fill(r,g,b);
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+ ""+ percent + "%", objects[i].x+15, objects[i].y+15);
            if(objects[i].label== "person"){
                document.getElementById("status").innerHTML= "Baby Detected";
    
            }else{
                sound.play();
                document.getElementById("status").innerHTML= "BABY NOT FOUND";
              
            }
            noFill();
                strokeWeight(2);
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}

function modelLoaded(){
    console.log("modelLoaded!!!! ");
    status= true;
}

function gotResult(error, results){
    if(error){
        console.log("error");
    }
    console.log(results);
    objects= results;
}