
let myVideo;
let otherVideo;

let constraints = {
  video: true,
  audio: true
}

function setup() {
  createCanvas(800, 600);
  
  // Web RTC Capture Local "Media Stream" (Webcam Audio and Video)
    myVideo = createCapture(VIDEO, 
      function(stream) {
        let p5l = new p5LiveMedia(this, "CAPTURE", stream, "MY_COOL_ROOM_123");
        p5l.on('stream', gotStream);
      }
    );  
    myVideo.muted = true;     
    myVideo.hide();


}

function draw() {
  background(220);
  
  
  if (myVideo != null) {
    image(myVideo,0,0,320,240);
  }
  
  
  ellipse(mouseX,mouseY,100,100);

  if (otherVideo != null) {
    image(otherVideo,width/2,0,320,240);
  }  
}

// We got a new stream!
function gotStream(stream, id) {
  // This is just like a video/stream from createCapture(VIDEO)
  otherVideo = stream;
  //otherVideo.id and id are the same and unique identifiers
  otherVideo.hide();
}