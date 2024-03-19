let myVideo;
let otherVideo;
let roomName = "virtualando";
let img1, img2, road;
let windowValue = 240;
let hornSound;
let hornState = 0;
let idX, idY, idWindowS, idHornS;
let x, y, windowS, hornS, horn, dataToSend;

let groundY1 = 570,
  groundY2 = 600;

function vidLoad() {
  vid.loop();
  vid.volume(0.5);
}

function preload() {
  img1 = loadImage("car.png");
  img2 = loadImage("car.png");
  // road = loadImage("road.png");
  road = loadImage("road.gif");

  hornSound = loadSound("carhorn.mp3");
  song = loadSound("O.D.G..mp3");
  pass = loadSound("pass.mp3");

  font = loadFont("myFont.ttf");
}

function stopOverlay() {
  var loadingOverlay = document.getElementById('loading-overlay');
  // loadingOverlay.style.display = 'none';
  // change page's opacity
  loadingOverlay.style.opacity = '0';

  // listen when finishing the transition
  loadingOverlay.addEventListener('transitionend', function () {
    // display none after the transition ends
    loadingOverlay.style.display = 'none';
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  road.resize(2400, 1350);

  stopOverlay();

  song.play();
  song.loop();
  pass.play();
  pass.loop();

  textFont(font, 30);

  myVideo = createCapture(VIDEO, function (stream) {
    let p5l = new p5LiveMedia(this, "CAPTURE", stream, roomName); //sharing this webcam stream (p5LiveMedia establishes this connection)
    p5l.on("stream", gotStream);
  });
  myVideo.hide();
  noCursor();
  p5lm = new p5LiveMedia(this, "DATA", null, "m96O-KNF7");
  p5lm.on("data", gotData);
  p5lm.on("disconnect", gotDisconnect);
}

function draw() {
  background(255); 
  image(road, 0, 0);

  fill("pink");
  textSize(width / 10);
  text("<<< VIRTUALANDO! <<<", 100, 300);
  textSize(20);
  text("This is a 2-player real-time experience, when another user opens this link, you two will be in the same room!", 100, 350);
  // text("Please visit 'zhuodi-cai.com/Virtualando' to learn more.", 100, 380);
  textSize(30);
  text("OPERATIONS:", 100, 450);
  text("1. down key - open window", 100, 500);
  text("2. up key - close window", 100, 550);
  text("3. press touchpad or mouse - car horn", 100, 600);

  noStroke();

  if (otherVideo != null) {
    fill(255, 255, 255, idWindowS);
    // image(otherVideo, idX, idY, 100, 75);//need data from another side！！！
    // rect(idX, idY, 100, 75);
    // image(img1, idX-390, idY-20);
    image(otherVideo, idX, groundY1, 100, 75); //need data from another side！！！
    rect(idX, groundY1, 100, 75);
    image(img1, idX - 390, groundY1 - 20);
  }

  if (myVideo != null) {
    fill(255, 255, 255, windowValue);
    // image(myVideo, mouseX, mouseY, 100, 75);
    // rect(mouseX, mouseY, 100, 75);
    // image(img2, mouseX-390, mouseY-20);
    image(myVideo, mouseX, groundY2, 100, 75);
    rect(mouseX, groundY2, 100, 75);
    image(img2, mouseX - 390, groundY2 - 20);
  }

  if (idHornS == 1) {
    if (hornSound.isPlaying() == false) {
      hornSound.play();
    }
  }
  // console.log(dataToSend);
}

function gotStream(incomingStream, id) {
  otherVideo = incomingStream;
  otherVideo.hide();
}

function gotDisconnect(id) {
  print(id + ": disconnected");
}

function gotData(data, id) {
  print(id + ":" + data);

  // If it is JSON, parse it
  let d = JSON.parse(data);
  pX = d.pX;
  pY = d.pY;
  pWindowS = d.windowS;
  pHornS = d.hornS;
  idX = pX;
  idY = pY;
  idWindowS = pWindowS;
  idHornS = pHornS;
}

function mouseMoved() {
  pX = mouseX;
  pY = mouseY;
  dataToSend = {
    pX: mouseX,
    pY: mouseY,
    windowS: windowValue,
    hornS: hornState,
  };
  p5lm.send(JSON.stringify(dataToSend));
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    windowValue = 240;
  } else if (keyCode === DOWN_ARROW) {
    windowValue = 0;
  }
  windowS = windowValue;
  dataToSend = {
    pX: mouseX,
    pY: mouseY,
    windowS: windowValue,
    hornS: hornState,
  };
  p5lm.send(JSON.stringify(dataToSend));
}

function mousePressed() {
  if (hornSound.isPlaying() == false) {
    hornSound.play();
    hornState = 1;
  }
  hornS = hornState;
  dataToSend = {
    pX: mouseX,
    pY: mouseY,
    windowS: windowValue,
    hornS: hornState,
  };
  p5lm.send(JSON.stringify(dataToSend));
}

function mouseReleased() {
  hornState = 0;
  hornS = hornState;
  dataToSend = {
    pX: mouseX,
    pY: mouseY,
    windowS: windowValue,
    hornS: hornState,
  };
  p5lm.send(JSON.stringify(dataToSend));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}