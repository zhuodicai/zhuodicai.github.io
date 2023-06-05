/* controller ref: https://codepen.io/olchyk98/pen/NLBVoW */

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
// import { Reflector } from 'three/addons/objects/Reflector.js';

//// MainStuff:Setup ////
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true });

let controls = {};
let player = {
    height: .5,
    turnSpeed: .1,
    speed: .1,
    jumpHeight: .2,
    gravity: .01,
    velocity: 0,

    playerJumps: false
};

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// scene.background = new THREE.Color("black");
document.body.appendChild(renderer.domElement);

// BrowserWindow->Renderer:ResizeRe-Render
window.addEventListener('resize', () => {
    let w = window.innerWidth,
        h = window.innerHeight;

    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
});

// Camera:Setup
camera.position.set(0, player.height, -5);
camera.lookAt(new THREE.Vector3(0, player.height, 0));

//// Add Skybox ////
// 创建渐变背景的着色器
const gradientShader = {
    uniforms: {
        topColor: { value: new THREE.Color(0x574785) }, // 默认顶部颜色
        bottomColor: { value: new THREE.Color(0xCA8680) }, // 默认底部颜色
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(0.0, h)), 1.0);
      }
    `,
};

let x;
let weightCurr = 0, weightPrev = 1;
function updateSkyColor() {
    const time = new Date(); // 获取当前时间
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    // console.log(time, hours, minutes, seconds);
    document.getElementById("dateText").innerText = time;
    let topColorCurr, bottomColorCurr, topColorPrev, bottomColorPrev;

    x = Math.floor(hours) + minutes / 60;

    switch (true) {
        case (x < 4):
            // alert("night");
            topColorCurr = 0x091224;
            bottomColorCurr = 0x144277;
            topColorPrev = 0x091224;
            bottomColorPrev = 0x144277;
            weightCurr = (x - 0) / (4 - 0);
            weightPrev = (4 - x) / (4 - 0);
            break;
        case (x < 5):
            // alert("dawn");
            topColorCurr = 0x574785;
            bottomColorCurr = 0xCA8680;
            topColorPrev = 0x091224;
            bottomColorPrev = 0x144277;
            weightCurr = (x - 4) / (5 - 4);
            weightPrev = (5 - x) / (5 - 4);
            break;
        case (x < 6):
            // alert("sunrise");
            topColorCurr = 0x5291DF;
            bottomColorCurr = 0xECD977;
            topColorPrev = 0x574785;
            bottomColorPrev = 0xCA8680;
            weightPrev = (6 - x) / (6 - 5);
            weightCurr = (x - 5) / (6 - 5);
            break;
        case (x < 11):
            // alert("morning");
            topColorCurr = 0x4AA4F8;
            bottomColorCurr = 0x84CDFF;
            topColorPrev = 0x5291DF;
            bottomColorPrev = 0xECD977;
            weightCurr = (x - 6) / (11 - 6);
            weightPrev = (11 - x) / (11 - 6);
            break;
        case (x < 13):
            // alert("morning");
            topColorCurr = 0xA5D2F7;
            bottomColorCurr = 0xF1F6F7;
            topColorPrev = 0x4AA4F8;
            bottomColorPrev = 0x84CDFF;
            weightCurr = (x - 11) / (13 - 11);
            weightPrev = (13 - x) / (13 - 11);
            break;
        case (x < 18):
            // alert("afternoon");
            topColorCurr = 0x1D81D4;
            bottomColorCurr = 0x6BBEF0;
            topColorPrev = 0xA5D2F7;
            bottomColorPrev = 0xF1F6F7;
            weightCurr = (x - 13) / (18 - 13);
            weightPrev = (18 - x) / (18 - 13);
            break;
        case (x < 19):
            // alert("sunset");
            topColorCurr = 0x85527A;
            bottomColorCurr = 0xFEAA00;
            topColorPrev = 0x1D81D4;
            bottomColorPrev = 0x6BBEF0;
            weightCurr = (x - 18) / (19 - 18);
            weightPrev = (19 - x) / (19 - 18);
            break;
        case (x < 20):
            // alert("dusk");
            topColorCurr = 0x37408A;
            bottomColorCurr = 0xBF6E38;
            topColorPrev = 0x85527A;
            bottomColorPrev = 0xFEAA00;
            weightCurr = (x - 19) / (20 - 19);
            weightPrev = (20 - x) / (20 - 19);
            break;
        case (x < 24):
            // alert("night");
            topColorCurr = 0x091224;
            bottomColorCurr = 0x144277;
            topColorPrev = 0x37408A;
            bottomColorPrev = 0xBF6E38;
            weightCurr = (x - 20) / (24 - 20);
            weightPrev = (24 - x) / (24 - 20);
            break;
        default:
            topColorCurr = 0x091224;
            bottomColorCurr = 0x144277;
    }
    // 计算Hex颜色中间值的函数
    function interpolateColors(color1, color2, color1Weight, color2Weight, t) {
        var r1 = (color1 >> 16) & 255;
        var g1 = (color1 >> 8) & 255;
        var b1 = color1 & 255;

        var r2 = (color2 >> 16) & 255;
        var g2 = (color2 >> 8) & 255;
        var b2 = color2 & 255;

        var g = Math.round(color1Weight * g1 + color2Weight * g2);
        var r = Math.round(color1Weight * r1 + color2Weight * r2);
        var b = Math.round(color1Weight * b1 + color2Weight * b2);

        return (r << 16) | (g << 8) | b;
    }

    var topInterpolatedColor = interpolateColors(topColorCurr, topColorPrev, weightCurr, weightPrev);
    // console.log(topInterpolatedColor.toString(16)); // 输出中间颜色的十六进制代码
    var bottomInterpolatedColor = interpolateColors(bottomColorCurr, bottomColorPrev, weightCurr, weightPrev);
    // console.log(bottomInterpolatedColor.toString(16)); // 输出中间颜色的十六进制代码

    // 设置颜色
    const topInterpolatedColorChange = new THREE.Color();
    topInterpolatedColorChange.setHex(topInterpolatedColor);
    const bottomInterpolatedColorChange = new THREE.Color();
    bottomInterpolatedColorChange.setHex(bottomInterpolatedColor);

    // 更新渐变背景的颜色
    gradientMaterial.uniforms.topColor.value = topInterpolatedColorChange;
    gradientMaterial.uniforms.bottomColor.value = bottomInterpolatedColorChange;
}
// 创建渐变背景的材质
const gradientMaterial = new THREE.ShaderMaterial({
    uniforms: gradientShader.uniforms,
    vertexShader: gradientShader.vertexShader,
    fragmentShader: gradientShader.fragmentShader,
    side: THREE.BackSide, // 将背面渲染
});

// 创建渐变背景的立方体
const gradientGeometry = new THREE.BoxGeometry(100, 100, 100);
const gradientCube = new THREE.Mesh(gradientGeometry, gradientMaterial);

// 将渐变背景添加到场景中
scene.add(gradientCube);

//// Change BGM ////
var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");
var playBtn = document.getElementById("play-btn");
var pauseBtn = document.getElementById("pause-btn");
const progressBar = document.getElementById('progress-bar'); // 获取进度条元素
var audio1State = 0, audio2State = 0; // 0暂停，1播放

audio1.loop = true;
audio2.loop = true;

function playBGM() {
    if (x < 4 || (21 < x && x < 24)) {
        audio2.play().then(function () {
            audio2State = 1;
        });
    } else if (x >= 4 && x <= 21) {
        audio1.play().then(function () {
            audio1State = 1;
        });
    }
}
document.addEventListener("click", playBGM);
document.addEventListener("keydown", playBGM);

// playBtn.addEventListener("click", function () {
//     if (x < 4 || (21 < x && x < 24)) {
//         audio2.play().then(function () {
//             audio2State = 1;
//         });
//     } else if (x >= 4 && x <= 21) {
//         audio1.play().then(function () {
//             audio1State = 1;
//         });
//     }
// });

// pauseBtn.addEventListener("click", function () {
//     if (audio2State === 1) {
//         audio2.pause();
//         audio2State = 0;
//     } else if (audio1State === 1) {
//         audio1.pause();
//         audio1State = 0;
//     }
// });

// function progressBarUpdate() {
//     // console.log("audio1State:", audio1State, "audio2State:", audio2State);
//     if (audio2State === 1) {
//         audio2.addEventListener('timeupdate', () => { // 监听音频的timeupdate事件
//             const progress = (audio2.currentTime / audio2.duration) * 100; // 计算当前播放进度的百分比
//             // console.log(audio2.currentTime, progress);
//             progressBar.value = progress; // 设置进度条的值
//         });
//     } else if (audio1State === 1) {
//         audio1.addEventListener('timeupdate', () => { // 监听音频的timeupdate事件
//             const progress = (audio1.currentTime / audio1.duration) * 100; // 计算当前播放进度的百分比
//             // console.log(audio1.currentTime, progress);
//             progressBar.value = progress; // 设置进度条的值
//         });
//     }
// }


//// Add Objects ////
// Object:Plane
let PlaneGeometry1 = new THREE.PlaneGeometry(100, 100, 100, 100);
let PlaneMaterial1 = new THREE.MeshPhongMaterial({ color: "white", wireframe: true });
let Plane1 = new THREE.Mesh(PlaneGeometry1, PlaneMaterial1);

Plane1.rotation.x -= Math.PI / 2;
Plane1.scale.x = 3;
Plane1.scale.y = 3;
Plane1.receiveShadow = true;
scene.add(Plane1);

// Object:Light:1
let light1 = new THREE.PointLight("white", .8);
light1.position.set(0, 3, 0);
light1.castShadow = true;
light1.shadow.camera.near = 2.5;
scene.add(light1);

// Object:Light:2
// let light2 = new THREE.AmbientLight("white", .15);
// light2.position.set(10, 2, 0);
// scene.add(light2);

//// Add Fog ////
// scene.fog = new THREE.Fog(0xffffff, 0, 20);

//// Add Avatar with Animations ////
const loaderMe = new GLTFLoader();
const loaderMeWave = new GLTFLoader();
let modelMe, modelMeWave;

let me = ['me.glb', 'me_wave.glb'];
let randomMe = 0;

function generateRandomMe() {
    if (Math.random() < 0.8) {
        randomMe = 0; // 80%的概率为0
        console.log(randomMe + ": idle");
    } else {
        randomMe = 1; // 20%的概率为1
        console.log(randomMe + ": wave");
    }
}
setInterval(generateRandomMe, 4000); // 每4秒生成一次随机数

loaderMe.load(
    me[0],
    function (gltf) {
        modelMe = gltf.scene.children[0];
        scene.add(modelMe);

        const animations = gltf.animations;
        console.log(gltf.animations);
        const mixer = new THREE.AnimationMixer(modelMe);

        animations.forEach(function (animation) {
            const action = mixer.clipAction(animation);
            action.play();
        });

        const clock = new THREE.Clock();

        function update() {
            // Update the animation mixer
            const delta = clock.getDelta();
            mixer.update(delta);
            modelMe.visible = randomMe === 0;
        }

        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        }

        animate();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);

loaderMeWave.load(
    me[1],
    function (gltf) {
        modelMeWave = gltf.scene.children[0];
        scene.add(modelMeWave);

        const animations = gltf.animations;
        console.log(gltf.animations);
        const mixer = new THREE.AnimationMixer(modelMeWave);

        animations.forEach(function (animation) {
            const action = mixer.clipAction(animation);
            action.play();
        });

        const clock = new THREE.Clock();

        function update() {
            // Update the animation mixer
            const delta = clock.getDelta();
            mixer.update(delta);
            modelMeWave.visible = randomMe === 1;
        }

        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(scene, camera);
        }

        animate();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);

//// Add Text ////
let allContent, randomContent;
function generateRandomContent() {
    allContent = ["Welcome to my rabbit hole!", "Move around and jump with w,a,s,d / ⬅⬆⬇➡ / spacebar!", "Each broken piece is a prism of my soul.", "Together we'll journey!", "Why can't I stop asking why?", "Technology, a servant and master, entwined.", "Possibilities enchant me like a symphony.", "I enable the sky to change according to the current time!", "The music during the day and night is not the same ;p", "Yes, I look just like this avatar!"];
    randomContent = allContent[Math.floor(Math.random() * allContent.length)];
    console.log("now the random content is :", randomContent);
}
generateRandomContent();
setInterval(generateRandomContent, 4000); // 每4秒生成一次随机数
// Create sprite text
let scale = 10; //larger scale, smaller text 
const textSpriteTriangle = createTextSprite("▼", "rgba(255,255,255,1)", "rgba(255,255,255,0)", 50);
textSpriteTriangle.position.set(0, 2, 0);
scene.add(textSpriteTriangle);
const textSprite = createTextSprite(randomContent, "rgba(0,0,0,1)", "rgba(255,255,255,1)", 50);
textSprite.position.set(0, 2.1, 0);
scene.add(textSprite);

function createTextSprite(text, color, backgroundColor, fontSize) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = `${fontSize}px Helvetica`;

    const textWidth = context.measureText(text).width;
    const textHeight = fontSize * 1; // Adjust the height based on the font size

    canvas.width = textWidth * scale;
    canvas.height = textHeight * scale;

    context.fillStyle = backgroundColor;
    context.fillRect(canvas.width / 2 - textWidth / 2, canvas.height / 2 - textHeight / 2 + textHeight * 0.3, textWidth, textHeight * 0.8);

    context.font = `${fontSize}px Helvetica`;
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2 - textHeight / 2 + fontSize);


    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;

    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(textWidth / textHeight, 1, 1);
    sprite.material.map.needsUpdate = true;

    return sprite;
}

function updateTextSprite(sprite, newText, color, backgroundColor, fontSize) {
    const canvas = sprite.material.map.image;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = `${fontSize}px Helvetica`;
    context.fillStyle = color;
    const textWidth = context.measureText(newText).width;
    const textHeight = fontSize * 1;

    context.fillStyle = backgroundColor;
    context.fillRect(canvas.width / 2 - textWidth / 2, canvas.height / 2 - textHeight / 2 + textHeight * 0.3, textWidth, textHeight * 0.8);

    context.fillStyle = color;  // Set the fill style back to text color
    context.fillText(newText, canvas.width / 2 - textWidth / 2, canvas.height / 2 - textHeight / 2 + fontSize);

    sprite.material.map.needsUpdate = true;
}
//// Add Mirror ////
// let geometry, material;

// geometry = new THREE.CircleGeometry(40, 64);
// material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0x8d8d8d } );
// groundMirror = new Reflector(geometry, {
//     clipBias: 0.003,
//     textureWidth: window.innerWidth * window.devicePixelRatio,
//     textureHeight: window.innerHeight * window.devicePixelRatio,
//     color: 0xb5b5b5
// });
// groundMirror.position.y = 0.5;
// groundMirror.rotateX(- Math.PI / 2);
// scene.add(groundMirror);

// geometry = new THREE.PlaneGeometry(100, 100);
// verticalMirror = new Reflector(geometry, {
//     clipBias: 0.003,
//     textureWidth: window.innerWidth * window.devicePixelRatio,
//     textureHeight: window.innerHeight * window.devicePixelRatio,
//     color: 0xc1cbcb
// });
// verticalMirror.position.y = 50;
// verticalMirror.position.z = - 50;
// scene.add(verticalMirror);


//// Add Control ////
// Controls:Listeners
document.addEventListener('keydown', ({ keyCode }) => { controls[keyCode] = true });
document.addEventListener('keyup', ({ keyCode }) => { controls[keyCode] = false });
document.addEventListener("mousedown", (event) => { controls[87] = true });
document.addEventListener("mouseup", (event) => { controls[87] = false });

// let previousX = 0;
// document.addEventListener('mousemove', handleMouseMove);

// function handleMouseMove(event) {
//     // 获取鼠标在屏幕中的水平位置
//     const currentX = event.clientX;
//     // 检查鼠标是否偏左
//     if (currentX < previousX) {
//         // console.log('偏左');
//         camera.rotation.y -= player.turnSpeed
//     }
//     // 检查鼠标是否偏右
//     else if (currentX > previousX) {
//         // console.log('偏右');
//         camera.rotation.y += player.turnSpeed
//     }
//     // 更新previousX为当前位置
//     previousX = currentX;
// }

//// Other Update Functions ////
function control() {
    // Controls:Engine 
    if (controls[87]) { // w
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if (controls[83]) { // s
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if (controls[65]) { // a
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    }
    if (controls[68]) { // d
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }
    if (controls[37]) { // la
        camera.rotation.y -= player.turnSpeed;
    }
    if (controls[39]) { // ra
        camera.rotation.y += player.turnSpeed;
    }
    if (controls[32]) { // space
        if (player.jumps) return false;
        player.jumps = true;
        player.velocity = -player.jumpHeight;
    }
}

function ixMovementUpdate() {
    player.velocity += player.gravity;
    camera.position.y -= player.velocity;

    if (camera.position.y < player.height) {
        camera.position.y = player.height;
        player.jumps = false;
    }
}

function update() {
    updateSkyColor();
    control();
    ixMovementUpdate();
    // if (x < 24) x = x + 0.01;
    // else x = 0;
    updateTextSprite(textSprite, randomContent, "rgba(0,0,0,1)", "rgba(255,255,255,1)", 50);
    // progressBarUpdate();
}

function render() {
    renderer.render(scene, camera);
}

function loop() {
    requestAnimationFrame(loop);
    update();
    render();
}

loop();