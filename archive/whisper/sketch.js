let buttonRecord, buttonUpload;
let buttonEncode, buttonDecode;
let buttonDownload;
let buttonQuestion;
let inp;
let pswdLength = 20;
let ampLevel = 0;
let centersMin = [
  [-290, -80],
  [-310, -100],
  [200,100],
  [300,-60],
  [240,30],
  [-200,40],
  [-500,-80],
  [170,-200],
  [-10,240],
  [130,-400],
  [-130,-300],
  [-300,-400]
];
let centersCurr = [
  [-290, -80],
  [-310, -100],
  [200,100],
  [300,-60],
  [240,30],
  [-200,40],
  [-500,-80],
  [170,-200],
  [-10,240],
  [130,-400],
  [-130,-300],
  [-300,-400]
];
let speed = 0,
  acc = 0;

let mic, recorder, soundFile, buffer, amp;
let state = 0; // 0 record, 1 stop, 2 play, 3 save
let sound;

function preload() {
  imgBW = loadImage("whisper-bw.jpeg");
  imgC = loadImage("whisper-c.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  createButtons();

  // 初始化麦克风和声音文件，✅reference > https://p5js.org/reference/#/p5.SoundRecorder
  mic = new p5.AudioIn(); //get audio from an input,i.e. computer's microphone
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();
  amp = new p5.Amplitude(); //amplitude measures volume between 0.0 and 1.0
  amp.setInput(soundFile);
}

// must add this or there will be a BUG. a resolution provided by stranger:)
function touchStarted() {
  getAudioContext().resume();
}

function draw() {
  background(255);
  ampLevel = max(amp.getLevel(), mic.getLevel()); //amp-音频，mic-录音
  let opacity = map(ampLevel, 0, 1, 0, 255) * 10;
  tint(255, 255);
  image(imgBW, 1000, 300);
  if (opacity > 100) {
    tint(255, opacity);
    image(imgC, 1000, 300);
  }

  let border = map(ampLevel, 0, 1, 0, 255) * 10;
  // console.log(ampLevel);
  let x0 = 1250,
    y0 = 500;
  strokeWeight(5);
  stroke(80, 95, 255);
  noFill();
  // circle(1250, 500, 30); //图片center，别删
  let points = [
    //vertex的点与图片center的距离
    [-274, -75],
    [-65, -186],
    [65, -150],
    [150, -167],
    [250, -75],
    [165, 80],
    [200, 140],
    [65, 190],
    [-70, 110],
    [-210, 150],
    [-200, 20],
    [-274, -75],
  ];

  let scale = (ampLevel + 0.4) * 2;

  for (let s = 1; s < 5; s += 0.5)
    if (scale > s) {
      beginShape();
      for (let i = 0; i < points.length; i++)
        vertex(x0 + points[i][0] * s, y0 + points[i][1] * s);
      endShape();
    }

  for (let i = 0; i < centersMin.length; i++) {
    let currx = centersMin[i][0] * scale,
      curry = centersMin[i][1] * scale;
    if (abs(currx) > abs(centersCurr[i][0])) {
      // centersCurr[i] = [currx, curry];
      centersCurr[i][0] *= 1.3;
      centersCurr[i][1] *= 1.3;
    } else {
      if (abs(centersCurr[i][0]) > abs(centersMin[i][0])) {
        centersCurr[i][0] *= 0.99;
        centersCurr[i][1] *= 0.99;
      }
    }

    console.log(centersCurr[i]);
    // fill(80,95,255);
    // circle(x0 + centersCurr[i][0], y0 + centersCurr[i][1], 20);
    textSize(50);
    text('ear',x0 + centersCurr[i][0], y0 + centersCurr[i][1]);
    
  }
  noStroke();

  textSize(30);
  fill(0);
  text("/", 240, windowHeight / 3 + 25);

  textSize(20);
  fill(0);
  text("/  w  h  i  s  p  e  r  /", windowWidth - 500, windowHeight - 250);
}

function createButtons() {
  let col = color(0, 0, 255); //use color instead of fill
  buttonRecord = createButton("r e c o r d");
  buttonRecord.addClass("button"); //the ".button" in style.css is connected with this "button" in sketch.js
  buttonRecord.position(100, windowHeight / 3);

  buttonUpload = createElement("label");
  buttonUpload.html(
    '<input type="file" onchange="upload()" id="fileUpload"/> <text class="button" >&nbsp;u p l o a d&nbsp;</text>'
  );
  buttonUpload.position(300, windowHeight / 3);

  fill(255);
  inp = createElement("textarea");
  inp.position(100, windowHeight / 3 + 80);
  // inp.input(myInputEvent);
  // inp.html("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
  randPswd();

  buttonEncode = createButton("e n c o d e");
  buttonEncode.addClass("button");
  buttonEncode.position(300, windowHeight / 3 + 80);

  buttonDecode = createButton("d e c o d e");
  buttonDecode.addClass("button");
  buttonDecode.position(300, windowHeight / 3 + 120);

  buttonRandom = createButton("r a n d o m");
  buttonRandom.addClass("button");
  buttonRandom.position(300, windowHeight / 3 + 160);

  buttonDownload = createButton("d o w n l o a d");
  buttonDownload.addClass("button");
  buttonDownload.position(100, windowHeight / 3 + 240);

  buttonQuestion = createButton("?");
  buttonQuestion.addClass("button");
  buttonQuestion.style("color", "black");
  buttonQuestion.style("background-color", "white");
  buttonQuestion.position(380, windowHeight / 3 + 240);
  buttonQuestion.addClass("popup");
  buttonQuestion.html(
    '? <span class="popuptext" id="popup_prompt">&nbsp The ciphers are ' +
      pswdLength +
      " different characters: <br>&nbsp number, uppercase character, lowercase character<br><br>&nbsp —— built by Zhuodi(Zoe) Cai & Lin Han, 12/12/2021</span>"
  );

  buttonRecord.mousePressed(record);
  buttonEncode.mousePressed(encode);
  buttonDecode.mousePressed(decode);
  buttonDownload.mousePressed(download);
  buttonQuestion.mousePressed(question);
  buttonRandom.mousePressed(randPswd);
}

function record() {
  if (state === 0 && mic.enabled) {
    // 0 record
    recorder.record(soundFile);
    buttonRecord.style("background-color", "red");
    buttonRecord.html("r e c o r d i n g");
    state++;
  } else if (state === 1) {
    // 1 stop
    recorder.stop();
    buttonRecord.style("background-color", "green");
    buttonRecord.html("r e c o r d e d");
    state = 0;
    // 不建议这块后面接处理，好像有异步
  }
}

function upload() {
  var audio_url = URL.createObjectURL(
    document.getElementById("fileUpload").files[0]
  );
  soundFile = new p5.SoundFile(audio_url);
  amp.setInput(soundFile);
}

// 🌟❗️ this is a serial task not parallel, so using asynchronize here to await the soundFile to be cut and shuffle, and then render, so that to avoid the soundFile is too large and takes too long time to cut and shuffle. otherwise the render step will report an error.
async function encode() {
  // if (state == 1) return;

  let codeArray = getPswd();

  // 注意这里是异步，不加await后面的代码会在括号里代码执行完成前执行
  await Ciseaux.from(soundFile.buffer).then(function (tape) {
    let parts = [];
    for (let start = 0; start < tape.duration; start++) {
      //trim sound per second
      let end = min(tape.duration, start + 1);
      let segment = (end - start) / pswdLength; //segment 20 parts
      for (let i = 0; i < pswdLength; i++) {
        parts[codeArray[i] + start * pswdLength] = tape.slice(
          start + i * segment,
          segment
        );
      }
    }
    sound = Ciseaux.concat(parts);
  });

  // render and play the trimmed sound
  await sound.render().then(function (audioBuffer) {
    buffer = audioBuffer;
  });
  play();
}

async function decode() {
  let codeArray = getPswd();

  // 注意这里是异步，不加await后面的代码会在括号里代码执行完成前执行
  await Ciseaux.from(soundFile.buffer).then(function (tape) {
    let parts = [];
    for (let start = 0; start < tape.duration; start++) {
      let end = min(tape.duration, start + 1);
      let segment = (end - start) / pswdLength;
      for (let i = 0; i < pswdLength; i++) {
        parts[start * pswdLength + i] = tape.slice(
          start + codeArray[i] * segment,
          segment
        );
      }
    }
    sound = Ciseaux.concat(parts);
  });

  // 切好的声音进行渲染，播放
  await sound.render().then(function (audioBuffer) {
    buffer = audioBuffer;
  });
  play();
}

function play() {
  soundFile.setBuffer([buffer.getChannelData(0), buffer.getChannelData(1)]);
  soundFile.play();
}

function download() {
  // text('Saving', 20, 20);
  console.log(buffer);
  // 把声音从buffer弄回p5 soundFile
  soundFile.setBuffer([buffer.getChannelData(0), buffer.getChannelData(1)]);
  // 保存原声音
  saveSound(soundFile, "a_whisper.wav");
}

function question() {
  var popup = document.getElementById("popup_prompt");
  popup.classList.toggle("show");
}

function randPswd() {
  // pswd = getPswd();
  pswd = []; //相当于是把0-9，A-Z，a-z在ASCII中对应的数字Decimal放进pswd数组里，可以手动写进去但是麻烦
  for (let i = 48; i < 58; i++) pswd.push(i);
  for (let i = 65; i < 91; i++) pswd.push(i);
  for (let i = 97; i < 123; i++) pswd.push(i);
  pswd = pswd.slice(0, pswdLength); //.slice(0,n), 不包括n，string字符串截取，用于数组、字符串或其他序列， ✅reference: https://www.w3schools.com/jsref/jsref_slice_string.asp
  pswd = shuffle(pswd); //shuffle(), 打乱，✅reference: https://p5js.org/reference/#/p5/shuffle
  s = ""; //空字符串
  for (let i = 0; i < pswd.length; i++) {
    s += String.fromCharCode(pswd[i]); //String.fromCharCode(pswd[i])数字转字符（在这里也可以叫字符串，长度为1的字符串，第0位）,做加法把字符前后拼接，从而把pswd的数字数组转化成字符串
  }
  inp.html(s);
}

//对照ASCII表把字符Char转换成数字int Decimal(十进制)，然后通过减去0，A，a字符Char的数字Decimal，让0，A，a互相连接
// 1. 将字符转成ASCII码表中对应的数字 0~9 -> 48~57， A~Z -> 65~90，a~z -> 97~122
// 2. 分别减掉区间开始的数字 0~9 -> 0~9， A~Z -> 0~25，a~z -> 0~25
// 3. 分别加上前面已经有的数字格式 0~9 -> 0~9， A~Z -> 10~35，a~z -> 36~61
function getPswd() {
  var nums = inp.value();
  let codeArray = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= "0" && nums[i] <= "9")
      codeArray[i] = nums[i].charCodeAt(0) - "0".charCodeAt(0); //0到9对应的ASCII码Decimal减去0对应的Decimal,让0对应0，9对应9。.charCodeAt() reference:https://www.w3schools.com/jsref/jsref_charcodeat.asp
    if (nums[i] >= "A" && nums[i] <= "Z")
      codeArray[i] = nums[i].charCodeAt(0) - "A".charCodeAt(0) + 10; //10 is because 0-9 have 10 characters
    if (nums[i] >= "a" && nums[i] <= "z")
      codeArray[i] = nums[i].charCodeAt(0) - "a".charCodeAt(0) + 36;
  }
  return codeArray;
}

/*
参数：
- 1s切n段
- n段n个数，每个数代表加密后音频中这一段正确的位置

加密前：0 1 2 3 4
加密后：3 2 1 0 4（密码）

*/
