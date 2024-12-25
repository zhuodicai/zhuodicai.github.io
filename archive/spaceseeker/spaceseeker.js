const canvas = document.getElementById('spaceseekercanvas');
const ctx = canvas.getContext('2d');

// Dot properties
const dotRadius = 5;
// const dotColor = 'blue';
// const clickDotColor = 'red'; // Color for the clicked dots
const dotColor = "rgba(0, 0, 255, 0)"
const clickDotColor = "rgba(255, 0, 0, 0)"; // Color for the clicked dots

// Initial position for blue dots (all start from 0, 0)
let blueDots = []; // Array to store all blue dots

// Speed of movement (controls how fast the dot moves)
// const speed = 20;
// const speed = (window.innerWidth < 768) ? 50 : 50;
const speed = (window.innerWidth < 768) ? 100000 : 50;

// Variable to store the clicked red dot's position
let clickDot = null; // Initially no red dot

// Variable to track whether the blue dots have stopped moving
let isBlueDotStopped = false;


// Resize the canvas on window resize
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.99;
    canvas.height = window.innerHeight * 0.99;
    redrawDot(); // Redraw everything after resizing
}

// Function to redraw the moving dots at their current positions
function redrawDot() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

    
    // 绘制热力图
    // drawHeatmap();
    drawLowestHeatPoint(); // 最后绘制最低点

    // 绘制所有蓝点
    blueDots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
        ctx.closePath();

        if (!dot.emoji) {
            const emojis = ['🧍', '🧍🏻', '🧍🏼', '🧍🏽', '🧍🏾', '🧍🏿'];
            dot.emoji = emojis[Math.floor(Math.random() * emojis.length)]; 
        }
        // 保存当前文本样式然后再恢复否则会影响后续文本
        ctx.save();
        ctx.globalAlpha = 0.5; 
        ctx.font = '80px Arial';
        ctx.textAlign = 'center'; // 文字在蓝点上居中
        ctx.textBaseline = 'middle'; // 垂直居中
        ctx.fillStyle = 'black';
        ctx.fillText(dot.emoji, dot.x, dot.y);
        ctx.globalAlpha = 1; 
        ctx.restore();
    });

    // 如果有红点，绘制红点
    if (clickDot) {
        ctx.beginPath();
        ctx.arc(clickDot.x, clickDot.y, dotRadius / 2, 0, Math.PI * 2);
        ctx.fillStyle = clickDotColor;
        ctx.fill();
        ctx.closePath();
    }
    // // 🚪
    // ctx.globalAlpha = 0.7;
    // ctx.font = "100px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText("🚪", -30, 80);
    // ctx.globalAlpha = 1;
    // // 🧧
    // ctx.globalAlpha = 0.2;
    // ctx.font = "100px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText("🧧", -35, 80);
    // ctx.globalAlpha = 1;
}



// Function to move each blue dot towards its target position
function moveDots() {
    // Move each blue dot
    blueDots.forEach(dot => {
        if (dot.isStopped) return; // Skip if this dot has already stopped

        // Calculate the difference in position
        const dx = dot.target.x - dot.x;
        const dy = dot.target.y - dot.y;

        // Calculate distance to the target
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the distance is small enough, stop moving
        if (distance < speed) {
            dot.x = dot.target.x;
            dot.y = dot.target.y;
            dot.isStopped = true; // Mark this dot as stopped
            reportBlueDotPos();
            return; // Stop the animation for this dot
        }

        // Move the dot towards the target position
        const angle = Math.atan2(dy, dx);
        dot.x += Math.cos(angle) * speed;
        dot.y += Math.sin(angle) * speed;
    });

    redrawDot(); // Redraw all dots

    requestAnimationFrame(moveDots); // Keep moving all the dots
}

// Function to add a new blue dot
function addBlueDot() {
    // const fixedPosition = { x: 0, y: 0 }; // 蓝点初始固定位置
    // const newBlueDot = {
    //     x: fixedPosition.x, // 固定初始位置
    //     y: fixedPosition.y,
    //     target: {
    //         x: Math.random() * canvas.width,
    //         y: Math.random() * canvas.height
    //     },
    //     isStopped: false
    // };
    // blueDots.push(newBlueDot);

    const fixedPosition = { x: 0, y: 0 }; // 蓝点初始固定位置

    // 确保目标位置距离 (0, 0) 至少 30px
    let targetX, targetY;
    do {
        targetX = Math.random() * canvas.width;
        targetY = Math.random() * canvas.height;
    } while (Math.sqrt(targetX * targetX + targetY * targetY) < 30); // 确保目标距离 (0, 0) 至少 30px

    const newBlueDot = {
        x: fixedPosition.x, // 固定初始位置
        y: fixedPosition.y,
        target: {
            x: targetX,
            y: targetY
        },
        isStopped: false
    };

    blueDots.push(newBlueDot);
}


function reportBlueDotPos() {
    // Log the positions of all blue dots
    console.log('🔵Blue dot positions:');
    blueDots.forEach(dot => {
        console.log(`x: ${dot.x}, y: ${dot.y}`);
    });
}

// Function to calculate the average distance between the red dot and all blue dots
function calculateAverageDistance() {
    if (!clickDot || blueDots.length === 0) return 0; // If there's no red dot or no blue dots, return 0

    let totalDistance = 0;

    // Loop through each blue dot and calculate the distance to the red dot
    blueDots.forEach(dot => {
        const dx = clickDot.x - dot.x;
        const dy = clickDot.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        totalDistance += distance;
    });

    // Calculate the average distance
    const averageDistance = totalDistance / blueDots.length;
    return averageDistance;
}

// Start by resizing the canvas and creating the first blue dot
resizeCanvas();
addBlueDot();
moveDots();

// Redraw everything after resizing
window.addEventListener('resize', resizeCanvas);


// Click event to confirm the red dot position
canvas.addEventListener('click', function (event) {
    // Only allow moving the red dot if the blue dots have stopped
    if (blueDots.some(dot => !dot.isStopped)) return;

    const x = event.offsetX;
    const y = event.offsetY;

    // If there's no red dot, create one at the clicked position
    if (!clickDot) {
        clickDot = { x, y };
        // Log the position of red dot
        console.log('🔴Red dot positions:');
        console.log(`x: ${x}, y: ${y}`);
        console.log('--------------------');
    } else {
        clickDot.x = x;
        clickDot.y = y;
        // Log the position of red dot
        console.log('🔴Red dot positions:');
        console.log(`x: ${x}, y: ${y}`);
        console.log('--------------------');
    }

    redrawDot(); // Redraw everything

    // After clicking, add a new blue dot and start moving it
    addBlueDot(); // Add new blue dot

    // Calculate the average distance and update the distance in the DOM
    const averageDistance = calculateAverageDistance();
    // document.getElementById('distance').textContent = averageDistance.toFixed(2);
});


// heatmap?
function drawHeatmap() {
    const gridSize = 10; // 网格大小（像素）
    const sigma = 30; // 热力影响范围

    // 创建一个像素缓冲区
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // 遍历画布的每个网格点
    for (let y = 0; y < canvas.height; y += gridSize) {
        for (let x = 0; x < canvas.width; x += gridSize) {
            let heatValue = 0;

            // 计算当前点的热力值
            blueDots.forEach(dot => {
                const dx = x - dot.x;
                const dy = y - dot.y;
                const distanceSquared = dx * dx + dy * dy;
                heatValue += Math.exp(-distanceSquared / (2 * sigma * sigma));
            });

            // 映射热力值到颜色
            const color = mapHeatToGradient(heatValue);

            // 填充网格点颜色
            for (let dy = 0; dy < gridSize; dy++) {
                for (let dx = 0; dx < gridSize; dx++) {
                    // 确保不会越界，否则pixel会溢出至canvas最左侧
                    const targetX = x + dx;
                    const targetY = y + dy;

                    // 检查是否在画布范围内
                    if (targetX < canvas.width && targetY < canvas.height) {
                        const pixelIndex = (targetY * canvas.width + targetX) * 4;

                        data[pixelIndex] = color.r;     // Red
                        data[pixelIndex + 1] = color.g; // Green
                        data[pixelIndex + 2] = color.b; // Blue
                        data[pixelIndex + 3] = color.a; // Alpha
                    }
                }
            }

        }
    }


    // 将缓冲区渲染到画布
    ctx.putImageData(imageData, 0, 0);
}

// 映射热力值渐变
function mapHeatToGradient(heatValue) {
    // 归一化热力值到 0-1
    const normalized = Math.min(1, heatValue);

    // 渐变颜色梯度：透明 → 浅红 → 橙色 → 黄色 → 深红色
    const gradient = [
        // { stop: 0.0, r: 255, g: 255, b: 255, a: 0 },    // 透明
        // { stop: 0.2, r: 255, g: 200, b: 200, a: 50 },   // 浅红
        // { stop: 0.5, r: 255, g: 150, b: 50, a: 100 },   // 橙色
        // { stop: 0.8, r: 255, g: 255, b: 0, a: 150 },    // 黄色
        // { stop: 1.0, r: 255, g: 0, b: 0, a: 200 }       // 深红
        { stop: 0.0, r: 255, g: 255, b: 255, a: 0 },    // 透明
        { stop: 0.2, r: 255, g: 200, b: 200, a: 10 },   // 浅红
        { stop: 0.5, r: 255, g: 150, b: 50, a: 30 },   // 橙色
        { stop: 0.9, r: 255, g: 255, b: 0, a: 50 },    // 黄色
        { stop: 1.0, r: 0, g: 0, b: 255, a: 60 }       // 深蓝色
    ];


    // 在梯度中查找对应区间并插值
    for (let i = 1; i < gradient.length; i++) {
        const prev = gradient[i - 1];
        const curr = gradient[i];

        if (normalized <= curr.stop) {
            const ratio = (normalized - prev.stop) / (curr.stop - prev.stop);
            return {
                r: Math.round(prev.r + ratio * (curr.r - prev.r)),
                g: Math.round(prev.g + ratio * (curr.g - prev.g)),
                b: Math.round(prev.b + ratio * (curr.b - prev.b)),
                a: Math.round(prev.a + ratio * (curr.a - prev.a))
            };
        }
    }

    // 默认返回透明（防止错误）
    return { r: 0, g: 0, b: 0, a: 0 };
}



function moveDots() {
    blueDots.forEach(dot => {
        if (dot.isStopped) return;

        const dx = dot.target.x - dot.x;
        const dy = dot.target.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < speed) {
            dot.x = dot.target.x;
            dot.y = dot.target.y;
            dot.isStopped = true;
            reportBlueDotPos();
            return;
        }

        const angle = Math.atan2(dy, dx);
        dot.x += Math.cos(angle) * speed;
        dot.y += Math.sin(angle) * speed;
    });

    redrawDot(); // 在重绘过程中调用热力图绘制

    requestAnimationFrame(moveDots);
}

// find the lowesr heat area
function findLowestHeatPoint() {
    const gridSize = 5; // 调大网格尺寸以提升性能
    const sigma = 30; // 热力影响范围

    let minHeatValue = Infinity;
    let minPoint = null;

    const heatCache = []; // 缓存热力值
    for (let y = 0; y < canvas.height; y += gridSize) {
        for (let x = 0; x < canvas.width; x += gridSize) {
            let heatValue = 0;

            // 遍历所有蓝点计算当前点热力值
            blueDots.forEach(dot => {
                const dx = x - dot.x;
                const dy = y - dot.y;
                const distanceSquared = dx * dx + dy * dy;
                heatValue += Math.exp(-distanceSquared / (2 * sigma * sigma));
            });

            // 缓存当前热力值
            heatCache.push({ x, y, heatValue });

            // 寻找最低热力点
            if (heatValue < minHeatValue) {
                minHeatValue = heatValue;
                minPoint = { x, y };
            }
        }
    }

    return { minHeatValue, minPoint, heatCache };
}

// function drawLowestHeatPoint() {
//     const { minPoint } = findLowestHeatPoint();
//     if (!minPoint) return;

//     // 绘制最低点标记
//     ctx.beginPath();
//     ctx.arc(minPoint.x, minPoint.y, 10, 0, 2 * Math.PI); // 放大标记点
//     ctx.fillStyle = 'black';
//     ctx.fill();
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "black";
//     ctx.fillText("哈哈", minPoint.x + 10, minPoint.y - 10); // 标注文字
// }

function drawLowestHeatPoint() {
    const { minPoint } = findLowestHeatPoint();
    if (!minPoint) return;

    const radius = 0; // 圆形半径
    const textOffsetX = 0; // 文字水平偏移，减少值使文字更贴近圆形
    const textOffsetY = 0;  // 文字垂直偏移，减少值使文字更贴近圆形
    const fontSize = 80; // 字体大小

    // 检查圆形是否超出画布边界
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // 计算圆心位置
    let circleX = minPoint.x;
    let circleY = minPoint.y;

    // 调整圆形位置，确保它不会超出画布边界
    if (circleX - radius < 0) {
        circleX = radius; // 左边界
    } else if (circleX + radius > canvasWidth) {
        circleX = canvasWidth - radius; // 右边界
    }

    if (circleY - radius < 0) {
        circleY = radius; // 上边界
    } else if (circleY + radius > canvasHeight) {
        circleY = canvasHeight - radius; // 下边界
    }

    // 绘制圆形
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    // 计算文字位置，避免文字超出边界
    let textX = circleX + textOffsetX;
    let textY = circleY + textOffsetY;


    // 调整文字位置，确保文字不超出画布右边界
    const textWidth = ctx.measureText("🧍🏻").width; // 获取文本的宽度
    if (textX + textWidth > canvasWidth) {
        textX = circleX - textWidth + 45; // 向左调整文字,数字越大离右边越近
    }
    // 文字靠左时，调整文字不让它离左侧边界太远
    if (textX - textWidth < 0) {
        textX = circleX + textWidth - 120; // 向右调整文字
    }

    // 如果文字接近画布顶部或底部，则调整垂直位置
    if (textY - fontSize < 0) {
        textY = circleY + fontSize - 10; // 向下移动文字
    } else if (textY + fontSize > canvasHeight) {
        textY = circleY - 5; // 向上移动文字
    }

    // 绘制文字
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';
    ctx.fillText("🧍🏻", textX, textY);
}
