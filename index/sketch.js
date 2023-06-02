let R; //hair
let G;
let B;
let Rb; //background
let Gb;
let Bb;
let r1x; //robot movement
let r1y;
let r2x;
let r2y;
let r3x;
let r3y;
let r4x;
let r4y;
let r5x;
let r5y;
let e1x;
let e1y;
let e2x;
let e2y;
let e3x;
let e3y;
let e4x;
let e4y;
let c1x;
let c1y;
let eyex;
let eyey;
let t = 0;

let widthStandard = 600,
  heightStandard = 600;
function setup() {
  // canvas = createCanvas(600, 600);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index','-1');
  R = random(0, 255);
  G = random(0, 255);
  B = random(0, 255);
  Rb = random(220, 255);
  Gb = random(220, 255);
  Bb = random(220, 255);
  document.body.style.backgroundColor = 'rgb(' + Rb + ',' + Gb + ',' + Bb + ')';
  document.getElementById("current-year").innerHTML = new Date().getFullYear();
  r1x = (widthStandard /400) * 190;
  r1y = (heightStandard /400) * 130;
  r2x = (widthStandard /400) * 180;
  r2y = (heightStandard /400) * 90;
  r3x = (widthStandard /400) * 280;
  r3y = (heightStandard /400) * 90;
  r4x = (widthStandard /400) * 180;
  r4y = (heightStandard /400) * 180;
  r5x = (widthStandard /400) * 280;
  r5y = (heightStandard /400) * 180;
  e1x = (widthStandard /400) * 220;
  e1y = (heightStandard /400) * 155;
  e2x = (widthStandard /400) * 260;
  e2y = (heightStandard /400) * 155;
  e3x = (widthStandard /400) * 210;
  e3y = (heightStandard /400) * 155;
  e4x = (widthStandard /400) * 250;
  e4y = (heightStandard /400) * 155;
  c1x = (widthStandard /400) * 240;
  c1y = (heightStandard /400) * 135;
  eyex = mouseX;
  eyey = mouseY;
}

function draw() {
  // background(Rb, Gb, Bb);
  clear();
  stroke(237, 71, 255);
  strokeWeight(3);

  push();
  // translate(windowWidth/2-300, windowHeight/2-95);
  translate(windowWidth/2-300, windowHeight/2-160);
  //body
  fill(236, 158, 120);
  beginShape();
  vertex((widthStandard /400) * 161.19, (heightStandard /400) * 239.41);
  vertex((widthStandard /400) * 153.54, (heightStandard /400) * 280.69);
  vertex((widthStandard /400) * 54.14, (heightStandard /400) * 325.61);
  vertex((widthStandard /400) * 19.87, (heightStandard /400) * 403.19);
  vertex((widthStandard /400) * 369.05, (heightStandard /400) * 405.51);
  vertex((widthStandard /400) * 336.39, (heightStandard /400) * 322.06);
  vertex((widthStandard /400) * 238.91, (heightStandard /400) * 280.69);
  vertex((widthStandard /400) * 233.2, (heightStandard /400) * 239.41);
  vertex((widthStandard /400) * 161.19, (heightStandard /400) * 239.41);
  endShape();

  //necklace
  let Rn = random(0, 255);
  let Gn = random(0, 255);
  let Bn = random(0, 255);
  line(
    (widthStandard /400) * 150.5,
    (heightStandard /400) * 296.5,
    (widthStandard /400) * 199.92,
    (heightStandard /400) * 320.34
  );
  line(
    (widthStandard /400) * 199.92,
    (heightStandard /400) * 320.34,
    (widthStandard /400) * 240.48,
    (heightStandard /400) * 296.5
  );
  fill(Rn, Gn, Bn);
  rect(
    (widthStandard /400) * 194,
    (heightStandard /400) * 320.34,
    (widthStandard /400) * 12,
    (heightStandard /400) * 12
  );

  //clothes
  fill(0, 26, 66);
  stroke(237, 71, 255);
  beginShape();
  vertex((widthStandard /400) * 153.54, (heightStandard /400) * 280.69);
  vertex((widthStandard /400) * 54.14, (heightStandard /400) * 325.61);
  vertex((widthStandard /400) * 19.87, (heightStandard /400) * 403.19);
  vertex((widthStandard /400) * 369.05, (heightStandard /400) * 405.51);
  vertex((widthStandard /400) * 336.39, (heightStandard /400) * 322.06);
  vertex((widthStandard /400) * 238.91, (heightStandard /400) * 280.69);
  vertex((widthStandard /400) * 240.06, (heightStandard /400) * 297.1);
  vertex((widthStandard /400) * 206.04, (heightStandard /400) * 384.32);
  vertex((widthStandard /400) * 150.83, (heightStandard /400) * 297.78);
  vertex((widthStandard /400) * 153.54, (heightStandard /400) * 280.69);
  endShape();

  //clothe - collar - left
  fill(9, 61, 140);
  beginShape();
  vertex((widthStandard /400) * 158.05, (heightStandard /400) * 257.93);
  vertex((widthStandard /400) * 126.94, (heightStandard /400) * 286.06);
  vertex((widthStandard /400) * 103.38, (heightStandard /400) * 326.02);
  vertex((widthStandard /400) * 126.94, (heightStandard /400) * 315.51);
  vertex((widthStandard /400) * 206.04, (heightStandard /400) * 384.32);
  vertex((widthStandard /400) * 150.83, (heightStandard /400) * 297.78);
  vertex((widthStandard /400) * 158.05, (heightStandard /400) * 257.93);
  endShape();
  fill(0, 0, 0, 100);
  beginShape();
  vertex((widthStandard /400) * 158.05, (heightStandard /400) * 257.93);
  vertex((widthStandard /400) * 126.94, (heightStandard /400) * 286.06);
  vertex((widthStandard /400) * 103.38, (heightStandard /400) * 326.02);
  vertex((widthStandard /400) * 126.94, (heightStandard /400) * 315.51);
  vertex((widthStandard /400) * 158.05, (heightStandard /400) * 257.93);
  endShape();
  //clothe - collar - right
  fill(9, 61, 140);
  beginShape();
  vertex((widthStandard /400) * 236.35, (heightStandard /400) * 260.04);
  vertex((widthStandard /400) * 266.19, (heightStandard /400) * 286.48);
  vertex((widthStandard /400) * 289.71, (heightStandard /400) * 329.08);
  vertex((widthStandard /400) * 266.19, (heightStandard /400) * 313.77);
  vertex((widthStandard /400) * 191.82, (heightStandard /400) * 414.94);
  vertex((widthStandard /400) * 240.06, (heightStandard /400) * 297.1);
  vertex((widthStandard /400) * 236.35, (heightStandard /400) * 260.04);
  endShape();
  fill(0, 0, 0, 100);
  beginShape();
  vertex((widthStandard /400) * 236.35, (heightStandard /400) * 260.04);
  vertex((widthStandard /400) * 266.19, (heightStandard /400) * 313.77);
  vertex((widthStandard /400) * 191.82, (heightStandard /400) * 414.94);
  vertex((widthStandard /400) * 240.06, (heightStandard /400) * 297.1);
  vertex((widthStandard /400) * 236.35, (heightStandard /400) * 260.04);
  endShape();

  //face
  fill(236, 158, 120);
  beginShape();
  vertex((widthStandard /400) * 196.5, (heightStandard /400) * 103.5); //1
  vertex((widthStandard /400) * 147.23, (heightStandard /400) * 125.2); //2
  vertex((widthStandard /400) * 138.93, (heightStandard /400) * 192.27); //3
  vertex((widthStandard /400) * 151.39, (heightStandard /400) * 244.33); //4
  vertex((widthStandard /400) * 168.31, (heightStandard /400) * 259.02); //5
  vertex((widthStandard /400) * 198.33, (heightStandard /400) * 272.11); //6
  vertex((widthStandard /400) * 226.44, (heightStandard /400) * 259.02); //7
  vertex((widthStandard /400) * 240.49, (heightStandard /400) * 241.77); //8
  vertex((widthStandard /400) * 249.44, (heightStandard /400) * 192.27); //9
  vertex((widthStandard /400) * 242.93, (heightStandard /400) * 125.2); //10
  vertex((widthStandard /400) * 196.5, (heightStandard /400) * 103.5); //close to the start point
  endShape();

  //hair - bottom - left
  beginShape();
  //fill(46,82,0);
  fill(R, G, B);
  vertex((widthStandard /400) * 145.24, (heightStandard /400) * 198.65); //1
  vertex((widthStandard /400) * 113.62, (heightStandard /400) * 210.55); //2..
  vertex((widthStandard /400) * 113.62, (heightStandard /400) * 241.45); //3
  vertex((widthStandard /400) * 169.19, (heightStandard /400) * 264.45); //4
  vertex((widthStandard /400) * 145.24, (heightStandard /400) * 198.65); //close to the start point
  endShape();

  //hair - bottom - right
  beginShape();
  //fill(46,82,0);
  fill(R, G, B);
  vertex((widthStandard /400) * 237.54, (heightStandard /400) * 204.65); //1
  vertex((widthStandard /400) * 234.66, (heightStandard /400) * 260.29); //2
  vertex((widthStandard /400) * 286.4, (heightStandard /400) * 238.26); //3
  vertex((widthStandard /400) * 282.25, (heightStandard /400) * 224.52); //4
  vertex((widthStandard /400) * 237.54, (heightStandard /400) * 204.65); //close to the start point
  endShape();

  //hair - top
  beginShape();
  //fill(46,82,0);
  fill(R, G, B);
  vertex((widthStandard /400) * 197.3, (heightStandard /400) * 92.86); //1
  vertex((widthStandard /400) * 181.01, (heightStandard /400) * 84.88); //2
  vertex((widthStandard /400) * 132.78, (heightStandard /400) * 116.09); //3
  vertex((widthStandard /400) * 109.15, (heightStandard /400) * 216.78); //4
  vertex((widthStandard /400) * 150.99, (heightStandard /400) * 206.8); //5
  vertex((widthStandard /400) * 158.01, (heightStandard /400) * 130.55); //6
  vertex((widthStandard /400) * 181.01, (heightStandard /400) * 116.09); //7
  vertex((widthStandard /400) * 194.1, (heightStandard /400) * 121.92); //8
  vertex((widthStandard /400) * 209.43, (heightStandard /400) * 112.02); //9
  vertex((widthStandard /400) * 232.11, (heightStandard /400) * 133.1); //10
  vertex((widthStandard /400) * 228.6, (heightStandard /400) * 199.53); //11
  vertex((widthStandard /400) * 249.99, (heightStandard /400) * 227.32); //12
  vertex((widthStandard /400) * 294.39, (heightStandard /400) * 236.58); //13
  vertex((widthStandard /400) * 266.6, (heightStandard /400) * 123.52); //14
  vertex((widthStandard /400) * 213.9, (heightStandard /400) * 86.79); //15
  vertex((widthStandard /400) * 197.3, (heightStandard /400) * 92.86); //close to the start point
  endShape();
  //stroke(255,255,255,60);
  stroke(237, 71, 255, 200);
  line(
    (widthStandard /400) * 197.3,
    (heightStandard /400) * 92.86,
    (widthStandard /400) * 194.1,
    (heightStandard /400) * 121.92
  ); //1,8
  line(
    (widthStandard /400) * 181.01,
    (heightStandard /400) * 84.88,
    (widthStandard /400) * 181.01,
    (heightStandard /400) * 116.09
  ); //2,7
  line(
    (widthStandard /400) * 132.78,
    (heightStandard /400) * 116.09,
    (widthStandard /400) * 158.01,
    (heightStandard /400) * 130.55
  ); //3,6
  line(
    (widthStandard /400) * 209.43,
    (heightStandard /400) * 112.02,
    (widthStandard /400) * 213.9,
    (heightStandard /400) * 86.79
  ); //9,15
  line(
    (widthStandard /400) * 232.11,
    (heightStandard /400) * 133.1,
    (widthStandard /400) * 266.6,
    (heightStandard /400) * 123.52
  ); //10,14

  //eyeball left
  noStroke();
  fill(255, 255, 255, 200); //white
  ellipse(
    (widthStandard /400) * 163.5,
    (heightStandard /400) * 178,
    (widthStandard /400) * 27,
    (heightStandard /400) * 10
  );
  fill(80, 80, 80); //grey
  //ellipse(163.5,178,13,13);
  let eyegreyx1 = map(mouseX, 0, windowWidth, 159, 167);
  ellipse(
    (widthStandard /400) * eyegreyx1,
    (heightStandard /400) * 178,
    (widthStandard /400) * 13,
    (heightStandard /400) * 13
  );
  fill(0, 0, 0); //black
  //ellipse(163.5,178,7,7);
  let eyeblackx1 = map(mouseX, 0, windowWidth, 159, 167);
  ellipse(
    (widthStandard /400) * eyeblackx1,
    (heightStandard /400) * 178,
    (widthStandard /400) * 7,
    (heightStandard /400) * 7
  );
  fill(255, 255, 255); //highlight
  //ellipse(161,175,3,3);
  let eyelightx1 = map(mouseX, 0, windowWidth, 157, 168);
  ellipse(
    (widthStandard /400) * eyelightx1,
    (heightStandard /400) * 175,
    (widthStandard /400) * 3,
    (heightStandard /400) * 3
  );
  //eyeball right
  noStroke();
  fill(255, 255, 255, 200); //white
  ellipse(
    (widthStandard /400) * 220.5,
    (heightStandard /400) * 178,
    (widthStandard /400) * 27,
    (heightStandard /400) * 10
  );
  fill(80, 80, 80); //grey
  //ellipse(220.5,178,13,13);
  let eyegreyx2 = map(mouseX, 0, windowWidth, 216, 224);
  ellipse(
    (widthStandard /400) * eyegreyx2,
    (heightStandard /400) * 178,
    (widthStandard /400) * 13,
    (heightStandard /400) * 13
  );
  fill(0, 0, 0); //black
  //ellipse(220.5,178,7,7);
  let eyeblackx2 = map(mouseX, 0, windowWidth, 216, 224);
  ellipse(
    (widthStandard /400) * eyeblackx2,
    (heightStandard /400) * 178,
    (widthStandard /400) * 7,
    (heightStandard /400) * 7
  );
  fill(255, 255, 255, 200); //highlight
  //ellipse(218,175,3,3);
  let eyelightx2 = map(mouseX, 0, windowWidth, 214, 225);
  ellipse(
    (widthStandard /400) * eyelightx2,
    (heightStandard /400) * 175,
    (widthStandard /400) * 3,
    (heightStandard /400) * 3
  );

  //eye - left
  noFill();
  //stroke(105,131,72);
  stroke(0, 0, 0);
  arc(
    (widthStandard /400) * 163,
    (heightStandard /400) * 154,
    (widthStandard /400) * 48,
    (heightStandard /400) * 60,
    radians(90),
    radians(120)
  ); //lower eyelid left
  arc(
    (widthStandard /400) * 163,
    (heightStandard /400) * 200,
    (widthStandard /400) * 53,
    (heightStandard /400) * 58,
    radians(240),
    radians(300)
  ); //higher eyelid
  //eye - right
  arc(
    (widthStandard /400) * 220,
    (heightStandard /400) * 154,
    (widthStandard /400) * 48,
    (heightStandard /400) * 60,
    radians(110),
    radians(120)
  ); //lower eyelid left
  arc(
    (widthStandard /400) * 220,
    (heightStandard /400) * 154,
    (widthStandard /400) * 48,
    (heightStandard /400) * 60,
    radians(60),
    radians(85)
  ); //lower eyelid right
  arc(
    (widthStandard /400) * 220,
    (heightStandard /400) * 200,
    (widthStandard /400) * 53,
    (heightStandard /400) * 58,
    radians(240),
    radians(300)
  ); //higher eyelid

  //eyebrow - left,nose
  stroke(237, 71, 255);
  let p1 = {
    x: (widthStandard /400) * 151,
    y: (heightStandard /400) * 154.07,
  };
  let p2 = {
    x: (widthStandard /400) * 189.59,
    y: (heightStandard /400) * 170.21,
  };
  let p3 = {
    x: (widthStandard /400) * 176.15,
    y: (heightStandard /400) * 203.38,
  };
  let p4 = {
    x: (widthStandard /400) * 189.59,
    y: (heightStandard /400) * 214.58,
  };
  noFill();
  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y);

  //eyebrow - right
  stroke(255, 255, 255, 200);
  curve(
    (widthStandard /400) * 201,
    (heightStandard /400) * 168,
    (widthStandard /400) * 206,
    (heightStandard /400) * 160.73,
    (widthStandard /400) * 236.66,
    (heightStandard /400) * 155.42,
    (widthStandard /400) * 247,
    (heightStandard /400) * 162
  );

  //mouth
  stroke(237, 71, 255);
  fill(255, 255, 255, 190);
  triangle(
    (widthStandard /400) * 173.52,
    (heightStandard /400) * 232.77,
    (widthStandard /400) * 193.03,
    (heightStandard /400) * 246.74,
    (widthStandard /400) * 225.5,
    (heightStandard /400) * 230.5
  );
  line(
    (widthStandard /400) * 186.83,
    (heightStandard /400) * 238.76,
    (widthStandard /400) * 212.5,
    (heightStandard /400) * 234.5
  );
  //dimples
  noStroke();
  fill(237, 71, 255);
  ellipse(
    (widthStandard /400) * 162,
    (heightStandard /400) * 230,
    (widthStandard /400) * 3,
    (heightStandard /400) * 3
  );
  ellipse(
    (widthStandard /400) * 232,
    (heightStandard /400) * 226,
    (widthStandard /400) * 3,
    (heightStandard /400) * 3
  );

  //glasses
  stroke(0, 0, 0);
  strokeWeight(1);
  fill(255, 255, 255, 100);
  ellipse(
    (widthStandard /400) * 163.5,
    (heightStandard /400) * 188,
    (widthStandard /400) * 40,
    (heightStandard /400) * 40
  );
  ellipse(
    (widthStandard /400) * 220.5,
    (heightStandard /400) * 188,
    (widthStandard /400) * 40,
    (heightStandard /400) * 40
  );
  line(
    (widthStandard /400) * 183.5,
    (heightStandard /400) * 188,
    (widthStandard /400) * 198.5,
    (heightStandard /400) * 188
  );
  pop();

  ///////////////////////////////////////robot!
  //body - top
  fill(100, 100, 250);
  stroke(0, 255, 6);
  strokeWeight(3);
  if (mouseX > r1x) {
    //face  r1
    r1x += 1;
  } else {
    r1x += -1;
  }
  if (mouseY > r1y) {
    r1y += 1;
  } else {
    r1y += -1;
  }
  rect(r1x, r1y, 100, 60, 60);
  if (mouseX > r2x) {
    //left-top  r2
    r2x += 1;
  } else {
    r2x += -1;
  }
  if (mouseY > r2y) {
    r2y += 1;
  } else {
    r2y += -1;
  }
  rect(r2x - 10, r2y - 40, 20, 20);
  if (mouseX > r3x) {
    //right-top  r3
    r3x += 1;
  } else {
    r3x += -1;
  }
  if (mouseY > r3y) {
    r3y += 1;
  } else {
    r3y += -1;
  }
  rect(r3x + 90, r3y - 40, 20, 20);
  if (mouseX > r4x) {
    //left-foot  r4
    r4x += 1;
  } else {
    r4x += -1;
  }
  if (mouseY > r4y) {
    r4y += 1;
  } else {
    r4y += -1;
  }
  rect(r4x - 10, r4y + 50, 20, 30);
  if (mouseX > r5x) {
    //right-foot  r5
    r5x += 1;
  } else {
    r5x += -1;
  }
  if (mouseY > r5y) {
    r5y += 1;
  } else {
    r5y += -1;
  }
  rect(r5x + 90, r5y + 50, 20, 30);
  if (mouseX > e1x) {
    //left eye  e1
    e1x += 1;
  } else {
    e1x += -1;
  }
  if (mouseY > e1y) {
    e1y += 1;
  } else {
    e1y += -1;
  }
  ellipse(e1x + 70, e1y + 25, 20, 20);
  if (mouseX > e2x) {
    //right eye  e2
    e2x += 1;
  } else {
    e2x += -1;
  }
  if (mouseY > e2y) {
    e2y += 1;
  } else {
    e2y += -1;
  }
  ellipse(e2x + 30, e2y + 25, 20, 20);
  fill(0, 255, 6);
  if (mouseX > e3x) {
    //left eye ball  e3
    e3x += 1;
  } else {
    e3x += -1;
  }
  if (mouseY > e3y) {
    e3y += 1;
  } else {
    e3y += -1;
  }
  ellipse(e3x + 20, e3y + 25, 10, 10);
  if (mouseX > e4x) {
    //right eye ball  e4
    e4x += 1;
  } else {
    e4x += -1;
  }
  if (mouseY > e4y) {
    e4y += 1;
  } else {
    e4y += -1;
  }
  ellipse(e4x + 60, e4y + 25, 10, 10);

  //mouth - top on the top
  stroke(0, 255, 6);
  strokeWeight(4);
  noFill();
  if (mouseX > c1x) {
    //  c1
    c1x += 1;
  } else {
    c1x += -1;
  }
  if (mouseY > c1y) {
    c1y += 1;
  } else {
    c1y += -1;
  }
  curve(
    c1x + 50,
    c1y + 5,
    c1x + 50 - 20,
    c1y + 5 + 40,
    c1x + 50 + 20,
    c1y + 5 + 40,
    c1x + 50,
    c1y + 5
  );
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
