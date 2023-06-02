/* control reference:https://codepen.io/olchyk98/pen/NLBVoW */

import * as THREE from 'three';
// MainStuff:Setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, .1, 1000);
let renderer = new THREE.WebGLRenderer({alpha: true});

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


// Object:Plane
let PlaneGeometry1 = new THREE.PlaneGeometry(100, 100,100,100);
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
let light2 = new THREE.AmbientLight("white", .15);
light2.position.set(10, 2, 0);
scene.add(light2);

// Controls:Listeners
document.addEventListener('keydown', ({ keyCode }) => { controls[keyCode] = true });
document.addEventListener('keyup', ({ keyCode }) => { controls[keyCode] = false });
document.addEventListener("mousedown", (event) => {controls[87] = true});
document.addEventListener("mouseup", (event) => {controls[87] = false});

let previousX = 0;
document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(event) {
  // 获取鼠标在屏幕中的水平位置
  const currentX = event.clientX;
  // 检查鼠标是否偏左
  if (currentX < previousX) {
    console.log('偏左');
    camera.rotation.y -= player.turnSpeed
  }
  // 检查鼠标是否偏右
  else if (currentX > previousX) {
    console.log('偏右');
    camera.rotation.y += player.turnSpeed
  }
  // 更新previousX为当前位置
  previousX = currentX;
}

// ...
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
    control();
    ixMovementUpdate();
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