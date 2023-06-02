  let R;//hair
  let G;
  let B;
  let Rb;//background
  let Gb;
  let Bb;
  let r1x;//robot movement
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
  let t=0;
function setup() {
  // createCanvas(600, 600);
  createCanvas(windowWidth, windowHeight);
  R=random(0,255);
  G=random(0,255);
  B=random(0,255);
  Rb=random(0,255);
  Gb=random(0,255);
  Bb=random(0,255);
  r1x=width/400*190;
  r1y=height/400*130;
  r2x=width/400*180;
  r2y=height/400*90;
  r3x=width/400*280;
  r3y=height/400*90;
  r4x=width/400*180;
  r4y=height/400*180;
  r5x=width/400*280
  r5y=height/400*180
  e1x=width/400*220;
  e1y=height/400*155;
  e2x=width/400*260;
  e2y=height/400*155;
  e3x=width/400*210;
  e3y=height/400*155;
  e4x=width/400*250;
  e4y=height/400*155;
  c1x=width/400*240;
  c1y=height/400*135;
  eyex=mouseX;
  eyey=mouseY;
}

function draw() {
  background(Rb,Gb,Bb);
  stroke(237,71,255);
  strokeWeight(3);
  
  //body
  fill(236,158,120);
  beginShape();
  vertex(width/400*161.19,height/400*239.41);
  vertex(width/400*153.54,height/400*280.69);
  vertex(width/400*54.14,height/400*325.61);
  vertex(width/400*19.87,height/400*403.19);
  vertex(width/400*369.05,height/400*405.51);
  vertex(width/400*336.39,height/400*322.06);
  vertex(width/400*238.91,height/400*280.69);
  vertex(width/400*233.2,height/400*239.41);
  vertex(width/400*161.19,height/400*239.41);
  endShape();
  
  //necklace
  let Rn=random(0,255);
  let Gn=random(0,255);
  let Bn=random(0,255);
  line(width/400*150.5,height/400*296.5,width/400*199.92,height/400*320.34);
  line(width/400*199.92,height/400*320.34,width/400*240.48,height/400*296.5);
  fill(Rn,Gn,Bn);
  rect(width/400*194,height/400*320.34,width/400*12,height/400*12);
  
  //clothes
  fill(0,26,66);
  stroke(237,71,255);
  beginShape();
  vertex(width/400*153.54,height/400*280.69);
  vertex(width/400*54.14,height/400*325.61);
  vertex(width/400*19.87,height/400*403.19);
  vertex(width/400*369.05,height/400*405.51);
  vertex(width/400*336.39,height/400*322.06);
  vertex(width/400*238.91,height/400*280.69);
  vertex(width/400*240.06,height/400*297.1);
  vertex(width/400*206.04,height/400*384.32);
  vertex(width/400*150.83,height/400*297.78);
  vertex(width/400*153.54,height/400*280.69);
  endShape();
  
  //clothe - collar - left
  fill(9,61,140);
  beginShape();
  vertex(width/400*158.05,height/400*257.93);
  vertex(width/400*126.94,height/400*286.06);
  vertex(width/400*103.38,height/400*326.02);
  vertex(width/400*126.94,height/400*315.51);
  vertex(width/400*206.04,height/400*384.32);
  vertex(width/400*150.83,height/400*297.78);
  vertex(width/400*158.05,height/400*257.93);
  endShape();
  fill(0,0,0,100);
  beginShape();
  vertex(width/400*158.05,height/400*257.93);
  vertex(width/400*126.94,height/400*286.06);
  vertex(width/400*103.38,height/400*326.02);
  vertex(width/400*126.94,height/400*315.51);
  vertex(width/400*158.05,height/400*257.93);
  endShape();
  //clothe - collar - right
  fill(9,61,140);
  beginShape();
  vertex(width/400*236.35,height/400*260.04);
  vertex(width/400*266.19,height/400*286.48);
  vertex(width/400*289.71,height/400*329.08);
  vertex(width/400*266.19,height/400*313.77);
  vertex(width/400*191.82,height/400*414.94);
  vertex(width/400*240.06,height/400*297.1);
  vertex(width/400*236.35,height/400*260.04);
  endShape();
  fill(0,0,0,100);
  beginShape();
  vertex(width/400*236.35,height/400*260.04);
  vertex(width/400*266.19,height/400*313.77);
  vertex(width/400*191.82,height/400*414.94);
  vertex(width/400*240.06,height/400*297.1);
  vertex(width/400*236.35,height/400*260.04);
  endShape();
  
  
  //face
  fill(236,158,120);
  beginShape();
  vertex(width/400*196.5,height/400*103.5);//1
  vertex(width/400*147.23,height/400*125.2);//2
  vertex(width/400*138.93,height/400*192.27);//3
  vertex(width/400*151.39,height/400*244.33);//4
  vertex(width/400*168.31,height/400*259.02);//5
  vertex(width/400*198.33,height/400*272.11);//6
  vertex(width/400*226.44,height/400*259.02);//7
  vertex(width/400*240.49,height/400*241.77);//8
  vertex(width/400*249.44,height/400*192.27);//9
  vertex(width/400*242.93,height/400*125.2);//10
  vertex(width/400*196.5,height/400*103.5);//close to the start point
  endShape();
  
  //hair - bottom - left
  beginShape();
  //fill(46,82,0);
  fill(R,G,B);
  vertex(width/400*145.24,height/400*198.65);//1
  vertex(width/400*113.62,height/400*210.55);//2..
  vertex(width/400*113.62,height/400*241.45);//3
  vertex(width/400*169.19,height/400*264.45);//4
  vertex(width/400*145.24,height/400*198.65);//close to the start point
  endShape();
  
  //hair - bottom - right
  beginShape();
  //fill(46,82,0);
  fill(R,G,B);
  vertex(width/400*237.54,height/400*204.65);//1
  vertex(width/400*234.66,height/400*260.29);//2
  vertex(width/400*286.4,height/400*238.26);//3
  vertex(width/400*282.25,height/400*224.52);//4
  vertex(width/400*237.54,height/400*204.65);//close to the start point
  endShape();
  
  //hair - top
  beginShape();
  //fill(46,82,0);
  fill(R,G,B);
  vertex(width/400*197.3, height/400*92.86);//1
  vertex(width/400*181.01, height/400*84.88);//2
  vertex(width/400*132.78, height/400*116.09);//3
  vertex(width/400*109.15, height/400*216.78);//4
  vertex(width/400*150.99, height/400*206.8);//5
  vertex(width/400*158.01, height/400*130.55);//6
  vertex(width/400*181.01, height/400*116.09);//7
  vertex(width/400*194.1,height/400*121.92);//8
  vertex(width/400*209.43,height/400*112.02);//9
  vertex(width/400*232.11,height/400*133.1);//10
  vertex(width/400*228.6,height/400*199.53);//11
  vertex(width/400*249.99,height/400*227.32);//12
  vertex(width/400*294.39,height/400*236.58);//13
  vertex(width/400*266.6,height/400*123.52);//14
  vertex(width/400*213.9,height/400*86.79);//15
  vertex(width/400*197.3,height/400*92.86);//close to the start point
  endShape();
  //stroke(255,255,255,60);
  stroke(237,71,255,200);
  line(width/400*197.3, height/400*92.86,width/400*194.1,height/400*121.92);//1,8
  line(width/400*181.01, height/400*84.88,width/400*181.01, height/400*116.09);//2,7
  line(width/400*132.78, height/400*116.09,width/400*158.01, height/400*130.55);//3,6
  line(width/400*209.43,height/400*112.02,width/400*213.9,height/400*86.79);//9,15
  line(width/400*232.11,height/400*133.1,width/400*266.6,height/400*123.52);//10,14
  
  //eyeball left
  noStroke();
  fill(255,255,255,200);//white
  ellipse(width/400*163.5,height/400*178,width/400*27,height/400*10);
  fill(80,80,80);//grey
  //ellipse(163.5,178,13,13);
  let eyegreyx1=map(mouseX,0,width,159,167);
  ellipse(width/400*eyegreyx1,height/400*178,width/400*13,height/400*13);
  fill(0,0,0);//black
  //ellipse(163.5,178,7,7);
  let eyeblackx1=map(mouseX,0,width,159,167);
  ellipse(width/400*eyeblackx1,height/400*178,width/400*7,height/400*7);
  fill(255,255,255);//highlight
  //ellipse(161,175,3,3);
  let eyelightx1=map(mouseX,0,width,157,168);
  ellipse(width/400*eyelightx1,height/400*175,width/400*3,height/400*3);
  //eyeball right
  noStroke();
  fill(255,255,255,200);//white
  ellipse(width/400*220.5,height/400*178,width/400*27,height/400*10);
  fill(80,80,80);//grey
  //ellipse(220.5,178,13,13);
  let eyegreyx2=map(mouseX,0,width,216,224);
  ellipse(width/400*eyegreyx2,height/400*178,width/400*13,height/400*13);
  fill(0,0,0);//black
  //ellipse(220.5,178,7,7);
  let eyeblackx2=map(mouseX,0,width,216,224);
  ellipse(width/400*eyeblackx2,height/400*178,width/400*7,height/400*7);
  fill(255,255,255,200);//highlight
  //ellipse(218,175,3,3);
  let eyelightx2=map(mouseX,0,width,214,225);
  ellipse(width/400*eyelightx2,height/400*175,width/400*3,height/400*3);
  
  //eye - left
  noFill();
  //stroke(105,131,72);
  stroke(0,0,0);
  arc(width/400*163, height/400*154, width/400*48, height/400*60, radians(90),radians(120));//lower eyelid left
  arc(width/400*163, height/400*200,width/400* 53, height/400*58, radians(240),radians(300));//higher eyelid
  //eye - right
  arc(width/400*220, height/400*154, width/400*48, height/400*60, radians(110),radians(120));//lower eyelid left
  arc(width/400*220, height/400*154, width/400*48, height/400*60, radians(60),radians(85));//lower eyelid right
  arc(width/400*220, height/400*200, width/400*53, height/400*58, radians(240),radians(300));//higher eyelid
  
  //eyebrow - left,nose
  stroke(237,71,255);
  let p1 = { x: width/400*151, y: height/400*154.07 };
  let p2 = { x: width/400*189.59, y: height/400*170.21 };
  let p3 = { x: width/400*176.15, y: height/400*203.38 };
  let p4 = { x: width/400*189.59, y: height/400*214.58 };
  noFill();
  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y);
  
  //eyebrow - right
  stroke(255,255,255,200);
  curve(width/400*201,height/400*168,width/400*206,height/400*160.73,width/400*236.66,height/400*155.42,width/400*247,height/400*162);
  
  //mouth, fossette
  stroke(237,71,255);
  fill(255,255,255,190);
  triangle(width/400*173.52,height/400*232.77,width/400*193.03 , height/400*246.74, width/400*225.5, height/400*230.5);
  line(width/400*186.83,height/400*238.76,width/400*212.5,height/400*234.5);
  noStroke();
  fill(88,82,169);
  ellipse(width/400*162,height/400*230,width/400*3,height/400*3);  
  ellipse(width/400*232,height/400*226,width/400*3,height/400*3);  
  
  //glasses
  stroke(0,0,0);
  strokeWeight(1);
  fill(255,255,255,100);
  ellipse(width/400*163.5,height/400*188,width/400*40,height/400*40);
  ellipse(width/400*220.5,height/400*188,width/400*40,height/400*40);
  line(width/400*183.5,height/400*188,width/400*198.5,height/400*188);
  
  ///////////////////////////////////////robot!
  //body - top
  fill(100,100,250);
  stroke(0,255,6);
  strokeWeight(3);
  if(mouseX>r1x){                  //face  r1
    r1x+=1;} else {r1x+=-1;}
  if(mouseY>r1y){
    r1y+=1;} else {r1y+=-1;}
  rect(r1x,r1y,100,60,60); 
  if(mouseX>r2x){                  //left-top  r2
    r2x+=1;} else {r2x+=-1;}
  if(mouseY>r2y){
    r2y+=1;} else {r2y+=-1;}
  rect(r2x-10,r2y-40,20,20);
  if(mouseX>r3x){                  //right-top  r3
    r3x+=1;} else {r3x+=-1;}
  if(mouseY>r3y){
    r3y+=1;} else {r3y+=-1;}
  rect(r3x+90,r3y-40,20,20);
  if(mouseX>r4x){                  //left-foot  r4
    r4x+=1;} else {r4x+=-1;}
  if(mouseY>r4y){
    r4y+=1;} else {r4y+=-1;}
  rect(r4x-10,r4y+50,20,30);
  if(mouseX>r5x){                  //right-foot  r5
    r5x+=1;} else {r5x+=-1;}
  if(mouseY>r5y){
    r5y+=1;} else {r5y+=-1;}
  rect(r5x+90,r5y+50,20,30);
    if(mouseX>e1x){                  //left eye  e1
    e1x+=1;} else {e1x+=-1;}
  if(mouseY>e1y){
    e1y+=1;} else {e1y+=-1;}
  ellipse(e1x+70,e1y+25,20,20);
  if(mouseX>e2x){                  //right eye  e2
    e2x+=1;} else {e2x+=-1;}
  if(mouseY>e2y){
    e2y+=1;} else {e2y+=-1;}
  ellipse(e2x+30,e2y+25,20,20);
  fill(0,255,6);
  if(mouseX>e3x){                  //left eye ball  e3
    e3x+=1;} else {e3x+=-1;}
  if(mouseY>e3y){
    e3y+=1;} else {e3y+=-1;}
  ellipse(e3x+20,e3y+25,10,10);  
  if(mouseX>e4x){                  //right eye ball  e4
    e4x+=1;} else {e4x+=-1;}
  if(mouseY>e4y){
    e4y+=1;} else {e4y+=-1;}
  ellipse(e4x+60,e4y+25,10,10);
  
  //mouth - top on the top
  stroke(0,255,6);
  strokeWeight(4);
  noFill();
  if(mouseX>c1x){                  //  c1
    c1x+=1;} else {c1x+=-1;}
  if(mouseY>c1y){
    c1y+=1;} else {c1y+=-1;}
  curve(c1x+50,c1y+5,c1x+50-20,c1y+5+40,c1x+50+20,c1y+5+40,c1x+50,c1y+5);
  
}