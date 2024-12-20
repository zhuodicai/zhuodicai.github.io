const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.pointerEvents = 'none'; // 初始态：禁用画布交互

let isDrawing = false; // 初始态：没有在画
let isKeyPressed = false; // 初始态：没按D键
let lastPosition = null; // 初始态：上一个鼠标位置
let currentColor = getRandomColor(); // 初始态：初始化颜色

// 随机笔刷色
function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);  // 随机生成色调（0到360之间）
  const saturation = 100;  // 饱和度设为100%
  const lightness = 60;    // 亮度设为50%（正常亮度）
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// Web Audio API 播放钢琴音符
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 钢琴音符频率（一个八度内的频率）
const pianoNotes = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25
};

// 播放音符
function playPianoNote() {
  const note = getRandomPianoNote(); // 随机选择一个音符
  const oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';  // 正弦波形
  oscillator.frequency.setValueAtTime(note, audioContext.currentTime); // 设置频率

  // 创建增益节点来控制音量
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // 设置音量（0到1）

  // 连接音频节点并播放
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
   // 渐变音量的效果：音量逐渐从 0.1 衰减到 0
   gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1); // 2秒内音量逐渐降低
  oscillator.stop(audioContext.currentTime + 1);  // 停止音符播放，持续时间为2秒
}

// 获取一个随机钢琴音符
function getRandomPianoNote() {
  const notes = Object.values(pianoNotes);
  const randomIndex = Math.floor(Math.random() * notes.length);
  return notes[randomIndex];
}

// 监听键盘：按D键时启用画布交互
document.addEventListener('keydown', (e) => {
  if (e.key === 'd' || e.key === 'D') {
    isKeyPressed = true;
    canvas.style.pointerEvents = 'auto'; // 启用画布交互
  }

  // 监听按C键时清除画布
  if (e.key === 'c' || e.key === 'C') {
    clearCanvas(); // 清理画布
  }
});

// 监听键盘：松开D键时停止绘画
document.addEventListener('keyup', (e) => {
  if (e.key === 'd' || e.key === 'D') {
    isKeyPressed = false;
    isDrawing = false; // 停止画图
    lastPosition = null; // 重置最后位置
    canvas.style.pointerEvents = 'none'; // 禁用画布交互
    currentColor = getRandomColor(); // 更新笔刷颜色
  }
});

// 开始绘图
canvas.addEventListener('mousedown', (e) => {
  if (isKeyPressed) {
    isDrawing = true;
    lastPosition = { x: e.clientX, y: e.clientY };
    playPianoNote(); // 每次点击时播放一个随机钢琴音符
  }
});

// 绘图过程
canvas.addEventListener('mousemove', (e) => {
  if (isDrawing && isKeyPressed) {
    const currentPosition = { x: e.clientX, y: e.clientY };
    drawLine(lastPosition, currentPosition);
    lastPosition = currentPosition; // 更新最后位置
  }
});

// 停止绘图
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  lastPosition = null; // 重置最后位置
});

// 绘制线条
function drawLine(start, end) {
  if (!start || !end) return;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 2;
  ctx.stroke();
}

// 清空画布
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布上的所有内容
}

// 窗口大小改变时调整画布，跟着长宽一起缩放
window.addEventListener('resize', () => {
  const oldWidth = canvas.width;
  const oldHeight = canvas.height;
  const imageData = ctx.getImageData(0, 0, oldWidth, oldHeight);

  // 设置新画布尺寸
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 计算宽高比例
  const scaleX = canvas.width / oldWidth;
  const scaleY = canvas.height / oldHeight;

  // 创建一个临时画布进行缩放
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = oldWidth;
  tempCanvas.height = oldHeight;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.putImageData(imageData, 0, 0);

  // 将临时画布绘制到新的画布上，按比例缩放
  ctx.scale(scaleX, scaleY);
  ctx.drawImage(tempCanvas, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0); // 重置变换矩阵
});
