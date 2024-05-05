/* controller ref: https://codepen.io/olchyk98/pen/NLBVoW */

import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { RGBADepthPacking } from 'three';

//// MainStuff:Setup ////
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 2000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
let skyColorForMirror = 0x574785;
let cameraPos, mirror1Pos;

let controls = {};
let player = {
    height: 1.5,
    turnSpeed: .1,
    speed: .1,
    jumpHeight: .15,
    gravity: .01,
    velocity: 0,

    playerJumps: false
};

const clock = new THREE.Clock(true); // 全局时钟实例；保持不同设备的动画速度一致，否则mobile速度非常缓慢

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
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
    // document.getElementById("dateText").innerText = time;
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
            // alert("noon");
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
        let r1 = (color1 >> 16) & 255;
        let g1 = (color1 >> 8) & 255;
        let b1 = color1 & 255;

        let r2 = (color2 >> 16) & 255;
        let g2 = (color2 >> 8) & 255;
        let b2 = color2 & 255;

        let r = Math.round(color1Weight * r1 + color2Weight * r2);
        let g = Math.round(color1Weight * g1 + color2Weight * g2);
        let b = Math.round(color1Weight * b1 + color2Weight * b2);

        return (r << 16) | (g << 8) | b;
    }

    let topInterpolatedColor = interpolateColors(topColorCurr, topColorPrev, weightCurr, weightPrev);
    // console.log(topInterpolatedColor.toString(16)); // 输出中间颜色的十六进制代码
    let bottomInterpolatedColor = interpolateColors(bottomColorCurr, bottomColorPrev, weightCurr, weightPrev);
    // console.log(bottomInterpolatedColor.toString(16)); // 输出中间颜色的十六进制代码

    skyColorForMirror = interpolateColors(topInterpolatedColor, bottomInterpolatedColor, weightCurr, weightPrev);

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

//// Add Grass ////


//// Change BGM ////
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio1");
let playBtn = document.getElementById("play-btn");
let pauseBtn = document.getElementById("pause-btn");
const progressBar = document.getElementById('progress-bar'); // 获取进度条元素
let audio1State = 0, audio2State = 0; // 0暂停，1播放

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

// Object:Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

//// Add Fog ////
scene.fog = new THREE.Fog(0xffffff, 0, 30);

//// Add Tree ////
const loaderTree = new GLTFLoader();
loaderTree.load(
    // resource URL
    'regularplumtree.glb',
    // called when the resource is loaded
    function (gltf) {
        gltf.scene.position.set(-0.8, 0, -1); // 设置模型的位置
        gltf.scene.scale.set(0.5, 0.5, 0.5); // 设置模型的缩放
        scene.add(gltf.scene);
    },
    function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded' + ': this is plum blossom tree'); },
    function (error) { console.log('An error happened'); }
);

//// Add Magpie ////
const loaderMagpie = new GLTFLoader();
let magpie;
let magpieRotateRandom = 5;

loaderMagpie.load(
    // resource URL
    'magpiestanding.glb',
    // called when the resource is loaded
    function (gltf) {
        magpie = gltf.scene;
        magpie.position.set(-0.7, 1.58, -0.9); // 设置模型的位置
        magpie.scale.set(1.5, 1.5, 1.5); // 设置模型的缩放
        magpie.rotation.set(0, -Math.PI / 2, 0); // 设置模型的缩放
        scene.add(magpie);
        startJumping();
    },
    function (xhr) { console.log((xhr.loaded / xhr.total * 100) + '% loaded' + ': this is plum blossom tree'); },
    function (error) { console.log('An error happened'); }
);

function startJumping() {
    let down = false;
    let i = 0;

    const delta = clock.getDelta();  //和clock配合使用，计算从上一帧以来过去的时间（秒）

    console.log("delta",delta);

    const jumpInterval = setInterval(() => {

        if (!down && i < 0.02) {
            magpie.position.y = 1.58 + i;
            magpie.rotation.y += magpieRotateRandom;
            i += 0.7 * 0.01;
        } else {
            clearInterval(jumpInterval);
            down = true;
            setTimeout(() => {
                decreasePosition();
            }, 10);
        }
    }, 20); // 每10毫秒逐步增加

    function decreasePosition() {
        if (magpie.position.y > 1.58) {
            magpie.position.y -= 0.003;
            requestAnimationFrame(decreasePosition);
        } else {
            down = false;
            setTimeout(() => {
                startJumping();
                magpieRotateRandom = (Math.random() * (-2) + 1) * Math.PI * 2 * 0.01;
            }, 2000 * Math.random() + 2000 * Math.random());
        }
    }
}

//// Add Falling Petal ////
const petalMaterial = new THREE.MeshBasicMaterial({ color: 0xff494a });

const petals = [];
function createPetal() {
    const petalGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.01, 6);
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    let randomScale = Math.random();
    petal.scale.set(randomScale, randomScale, randomScale);
    petal.position.set(Math.random() * 8 - 4, Math.random() * 3, Math.random() * 2 - 2);
    petal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    setTimeout(() => {
        scene.add(petal);
        petals.push(petal);
    }, Math.random() * 3000);
}

for (let i = 0; i < 30; i++) { createPetal(); }

const velocity = new THREE.Vector3(0, -0.001, 0);
function updatePetal() {
    const delta = clock.getDelta();  //和clock配合使用，计算从上一帧以来过去的时间（秒）

    for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        if (petal.position.y > 0) {
            petal.position.x += 0.1 * delta;
            petal.position.y -= 0.1 * delta;
            petal.position.z += 0.1 * delta;

            petal.rotation.x += 0.1 * delta;
            petal.rotation.y += 0.1 * delta;
            petal.rotation.z += 0.1 * delta;

            petal.position.add(velocity);
        }

        // 花瓣落地，移除花瓣并创建新花瓣
        const targetRotation = new THREE.Vector3(Math.PI, 0, Math.PI); // 目标旋转角度
        const rotationSpeed = 1 * delta; // 旋转速度

        if (petal.position.y <= 0) {
            petal.position.y = 0;

            if (Number(petal.rotation.x).toFixed(1) !== 3.1 && Number(petal.rotation.z).toFixed(1) !== 3.1) {
                if (Math.floor(petal.rotation.x) !== 3 || Math.floor(petal.rotation.y) !== 0 || Math.floor(petal.rotation.z) !== 3) {
                    // 计算当前旋转角度与目标旋转角度之间的插值
                    petal.rotation.x = THREE.MathUtils.lerp(petal.rotation.x, targetRotation.x, rotationSpeed);
                    // petal.rotation.y = THREE.MathUtils.lerp(petal.rotation.y, targetRotation.y, rotationSpeed);
                    petal.rotation.z = THREE.MathUtils.lerp(petal.rotation.z, targetRotation.z, rotationSpeed);

                    // console.log(petal.rotation);

                    // console.log(Number(petal.rotation.x).toFixed(2)); //3.14时花瓣基本躺平
                    // console.log(Number(petal.rotation.z).toFixed(2)); //3.14时花瓣基本躺平

                    if (Number(petal.rotation.x).toFixed(1) == 3.1 && Number(petal.rotation.z).toFixed(1) == 3.1) {
                        setTimeout(() => {
                            scene.remove(petal);
                        }, 100);
                        petals.splice(i, 1);
                        createPetal();
                    }
                } 
            }
        }
    }
}


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
        // randomMe = 1; // 20%的概率为1
        randomMe = 0; // 暂时改成0了，不然手机端超级卡
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

        onCanvasLoadComplete(); // remove loading overlay!
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded' + ': this is me');
    },
    function (error) {
        console.log('An error happened');
    }
);

// 暂时不load了，不然手机端超级卡
// loaderMeWave.load(
//     me[1],
//     function (gltf) {
//         modelMeWave = gltf.scene.children[0];
//         scene.add(modelMeWave);

//         const animations = gltf.animations;
//         console.log(gltf.animations);
//         const mixer = new THREE.AnimationMixer(modelMeWave);

//         animations.forEach(function (animation) {
//             const action = mixer.clipAction(animation);
//             action.play();
//         });

//         const clock = new THREE.Clock();

//         function update() {
//             // Update the animation mixer
//             const delta = clock.getDelta();
//             mixer.update(delta);
//             modelMeWave.visible = randomMe === 1;
//         }

//         function animate() {
//             requestAnimationFrame(animate);
//             update();
//             renderer.render(scene, camera);
//         }

//         animate();
//     },
//     function (xhr) {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded' + ': this is me waving hand');
//     },
//     function (error) {
//         console.log('An error happened');
//     }
// );

//// Add Prism/Mirror ////
// let geometry1, geometry2, geometry3, geometry4, geometry5, geometry6;
// let mirror1, mirror2, mirror3, mirror4, mirror5, mirror6;
// let material;
// const shape1 = new THREE.Shape().moveTo(1, 0).lineTo(1, 0).lineTo(1, 1.2).lineTo(0, .2).lineTo(0, 0);
// const shape2 = new THREE.Shape().moveTo(0, 0).lineTo(0.2, 0.1).lineTo(0.6, 0.3).lineTo(0.8, 0).lineTo(1, 0.8).lineTo(0.8, 1).lineTo(0.6, 0.9).lineTo(0, 0);
// const shape3 = new THREE.Shape().moveTo(0, 0).lineTo(0.2, 0.2).lineTo(0.6, 0).lineTo(0.8, 0.4).lineTo(1, 0).lineTo(1, 0.6).lineTo(0.6, 1).lineTo(0, 1).lineTo(0, 0);
// const shape4 = new THREE.Shape().moveTo(0, 0).lineTo(0.4, 0.2).lineTo(0.8, 0).lineTo(1, 0.4).lineTo(0.8, 0.6).lineTo(0.4, 0.6).lineTo(0, 1).lineTo(0, 0);
// const shape5 = new THREE.Shape().moveTo(0, 0).lineTo(0.3, 0.1).lineTo(0.7, 0.3).lineTo(1, 0).lineTo(1, 0.5).lineTo(0.7, 0.7).lineTo(0.3, 0.9).lineTo(0, 1).lineTo(0, 0);
// const shape6 = new THREE.Shape().moveTo(0, 0).lineTo(0.5, 0.1).lineTo(1, 0).lineTo(1, 0.8).lineTo(0.6, 1).lineTo(0.3, 0.8).lineTo(0, 0.6).lineTo(0, 0);

// const extrusionSettings = { depth: 0.06, bevelEnabled: false };

// geometry1 = new THREE.ExtrudeGeometry(shape1, extrusionSettings);
// geometry2 = new THREE.ExtrudeGeometry(shape2, extrusionSettings);
// geometry3 = new THREE.ExtrudeGeometry(shape3, extrusionSettings);
// geometry4 = new THREE.ExtrudeGeometry(shape4, extrusionSettings);
// geometry5 = new THREE.ExtrudeGeometry(shape5, extrusionSettings);
// geometry6 = new THREE.ExtrudeGeometry(shape6, extrusionSettings);

// let wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 });

// mirror1 = new Reflector(geometry1, { clipBias: 0.003, textureWidth: window.innerWidth * window.devicePixelRatio / 1, textureHeight: window.innerHeight * window.devicePixelRatio / 3, color: 0x7d7d7d });
// // mirror1 = new THREE.Mesh(geometry1, material = new THREE.MeshBasicMaterial({ color: skyColorForMirror }));
// mirror1.rotation.set(0, -Math.PI / 5, 0);
// mirror1.position.set(0.6, 0.6, 1);
// scene.add(mirror1);
// let mirror1Clone = mirror1.clone();
// let edgesGeometry1 = new THREE.EdgesGeometry(mirror1Clone.geometry);
// let wireframe1 = new THREE.LineSegments(edgesGeometry1, wireframeMaterial);
// wireframe1.material.transparent = true;
// wireframe1.material.opacity = 0.15;
// wireframe1.rotation.set(0, -Math.PI / 5, 0);
// wireframe1.position.set(0.6, 0.6, 1);
// scene.add(wireframe1);
// console.log("mirror1.position:",mirror1.position);
// mirror1Pos = mirror1.position;

// mirror2 = new Reflector(geometry2, { clipBias: 0.003, textureWidth: window.innerWidth * window.devicePixelRatio / 1, textureHeight: window.innerHeight * window.devicePixelRatio / 3, color: 0x7d7d7d });
// mirror2.rotation.set(0, Math.PI / 2, 0);
// mirror2.position.set(-5.2, 0.3, 7);
// scene.add(mirror2);
// let mirror2Clone = mirror2.clone();
// let edgesGeometry2 = new THREE.EdgesGeometry(mirror2Clone.geometry);
// let wireframe2 = new THREE.LineSegments(edgesGeometry2, wireframeMaterial);
// wireframe2.material.transparent = true;
// wireframe2.material.opacity = 0.15;
// wireframe2.rotation.set(0, Math.PI / 2, 0);
// wireframe2.position.set(-5.2, 0.3, 7);
// scene.add(wireframe2);

// mirror3 = new Reflector(geometry3, { clipBias: 0.003, textureWidth: window.innerWidth * window.devicePixelRatio / 1, textureHeight: window.innerHeight * window.devicePixelRatio / 3, color: 0x7d7d7d });
// mirror3.rotation.set(0, -Math.PI / 6, 0);
// mirror3.position.set(6, 0, 0);
// scene.add(mirror3);
// let mirror3Clone = mirror3.clone();
// let edgesGeometry3 = new THREE.EdgesGeometry(mirror3Clone.geometry);
// let wireframe3 = new THREE.LineSegments(edgesGeometry3, wireframeMaterial);
// wireframe3.material.transparent = true;
// wireframe3.material.opacity = 0.15;
// wireframe3.rotation.set(0, -Math.PI / 6, 0);
// wireframe3.position.set(6, 0, 0);
// scene.add(wireframe3);

// mirror4 = new Reflector(geometry4, { clipBias: 0.003, textureWidth: window.innerWidth * window.devicePixelRatio / 1, textureHeight: window.innerHeight * window.devicePixelRatio / 3, color: 0x7d7d7d });
// mirror4.rotation.set(0, -Math.PI / 2, 0);
// mirror4.position.set(10, 0.1, -10);
// scene.add(mirror4);
// let mirror4Clone = mirror4.clone();
// let edgesGeometry4 = new THREE.EdgesGeometry(mirror4Clone.geometry);
// let wireframe4 = new THREE.LineSegments(edgesGeometry4, wireframeMaterial);
// wireframe4.material.transparent = true;
// wireframe4.material.opacity = 0.15;
// wireframe4.rotation.set(0, -Math.PI / 2, 0);
// wireframe4.position.set(10, 0.1, -10);
// scene.add(wireframe4);

// mirror5 = new Reflector(geometry5, { clipBias: 0.003, textureWidth: window.innerWidth * window.devicePixelRatio / 1, textureHeight: window.innerHeight * window.devicePixelRatio / 3, color: 0x7d7d7d });
// mirror5.rotation.set(0, Math.PI / 3, 0);
// mirror5.position.set(-18, 0.1, -16);
// scene.add(mirror5);
// let mirror5Clone = mirror5.clone();
// let edgesGeometry5 = new THREE.EdgesGeometry(mirror5Clone.geometry);
// let wireframe5 = new THREE.LineSegments(edgesGeometry5, wireframeMaterial);
// wireframe5.material.transparent = true;
// wireframe5.material.opacity = 0.15;
// wireframe5.rotation.set(0, Math.PI / 3, 0);
// wireframe5.position.set(-18, 0.1, -16);
// scene.add(wireframe5);

// mirror6 = new Reflector(geometry6, { clipBias: 0.003, textureWidth: window.innerWidth * window.devicePixelRatio / 1, textureHeight: window.innerHeight * window.devicePixelRatio / 3, color: 0x7d7d7d });
// mirror6.rotation.set(Math.PI, Math.PI / 5, 0);
// mirror6.position.set(1.2, 1, 0);
// scene.add(mirror6);

//// Add Cloud ////
// let clouds = [];
// const textureCloud = new THREE.TextureLoader().load('./images/cloud.png');
// const materialCloud = new THREE.SpriteMaterial({ map: textureCloud });

// const cloudCount = 300; // 云的数量

// for (let i = 0; i < cloudCount; i++) {
//     for (let xpos = -30; xpos < 30; xpos++) {
//         const spriteCloud = new THREE.Sprite(materialCloud);
//         spriteCloud.position.set(xpos, Math.random() * 5, Math.sqrt(Math.pow(30) - Math.pow(xpos)));
//         spriteCloud.rotation.z = Math.random() * Math.PI * 2;
//         scene.add(spriteCloud);
//         clouds.push(spriteCloud);
//     }
// }

let clouds = [];
const textureCloud = new THREE.TextureLoader().load('./images/cloud.png');

const cloudCount = 120; // 云的数量
const radiusThickness = 40; // 有云的圆环区域的半径
const radiusFromCenter = 5;

for (let i = 0; i < cloudCount; i++) {
    const angle = Math.random() * Math.PI * 2; // 随机角度
    const distance = Math.sqrt(Math.random()) * radiusThickness + radiusFromCenter;

    const xPos = Math.cos(angle) * distance; // X轴位置
    const yPos = Math.random() * 5; // Y轴位置
    const zPos = Math.sin(angle) * distance; // Z轴位置

    const materialCloud = new THREE.SpriteMaterial({ map: textureCloud });
    const spriteCloud = new THREE.Sprite(materialCloud);
    spriteCloud.position.set(xPos, yPos, zPos);
    spriteCloud.material.rotation = Math.PI * 2 * Math.random();
    let randomScale = Math.random() * 20;
    spriteCloud.scale.set(randomScale, randomScale, randomScale);
    scene.add(spriteCloud);
    clouds.push(spriteCloud);
}

// console.log("clouds",clouds.forEach(element => console.log(element.position)));


// remove loading overlay!
function onCanvasLoadComplete() {
    var event = new Event('canvasLoaded');
    document.dispatchEvent(event);
}


//// Add Text ////
let allContent, randomContent;
function generateRandomContent() {
    allContent = ["Welcome to my rabbit hole!", "Move around and jump with w,a,s,d / ⬅️ ➡️  / spacebar!", "Together we'll journey!", "Why can't I stop asking why?", "Technology, a servant and master, entwined.", "Possibilities enchant me like a symphony.", "The sky color changes according to the current time!", "The music during the day and night is not the same ;p"];
    randomContent = allContent[Math.floor(Math.random() * allContent.length)];
    console.log("now the random content is :", randomContent);
}
generateRandomContent();
setInterval(generateRandomContent, 4000); // 每4秒生成一次随机数
// Create sprite text
let scale = 12; //larger scale, smaller text 
const textSpriteTriangle = createTextSprite("▼", "rgba(255,255,255,0.5)", "rgba(255,255,255,0)", 50);
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
    cameraPos = camera.position;
    // console.log("camera.position:", camera.position);
    // Controls:Engine 
    if ((-45 <= cameraPos.x && cameraPos.x <= 45) && (-45 <= cameraPos.z && cameraPos.z <= 45)) {
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
    if ((Math.abs(cameraPos.x) - 45) >= 0) {
        camera.position.x = Math.sign(cameraPos.x) * 45;
    }
    if ((Math.abs(cameraPos.z) - 45) >= 0) {
        camera.position.z = Math.sign(cameraPos.z) * 45;
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

function updateClouds() {
    const delta = clock.getDelta();  //和clock配合使用，计算从上一帧以来过去的时间（秒）

    clouds.forEach(function (element) {
        const angle = 0.5 * delta; // 旋转角度

        const x = element.position.x;
        const z = element.position.z;

        // 计算绕原点旋转后的新坐标
        const newX = x * Math.cos(angle) - z * Math.sin(angle);
        const newZ = x * Math.sin(angle) + z * Math.cos(angle);

        element.position.x = newX;
        element.position.z = newZ;
    });
    // clouds.forEach(element => console.log(element.position));
}
// function updateMagpie() {
//     console.log("magpie.position", magpie.position.y);
// }


function update() {
    updateSkyColor();
    updatePetal();
    control();
    ixMovementUpdate();
    // if (x < 24) x = x + 0.01;
    // else x = 0;
    updateTextSprite(textSprite, randomContent, "rgba(0,0,0,1)", "rgba(255,255,255,0.5)", 50);
    // progressBarUpdate();
    // mirror1.material.color.setHex(skyColorForMirror);
    updateClouds();
    // if (magpie) updateMagpie();
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