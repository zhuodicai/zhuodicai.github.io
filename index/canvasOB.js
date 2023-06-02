import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const texture = new THREE.TextureLoader().load('8k_jupiter.jpg');
// immediately use the texture for material creation 

const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

const geometry = new THREE.SphereGeometry(60, 32, 16);
// const material = new THREE.MeshBasicMaterial({
//     color: 0xffff00
// });
const sphere = new THREE.Mesh(geometry, material);
// sphere.position.y =-12;
scene.add(sphere);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // sphere.rotation.x += 0.001;
    // sphere.rotation.y += 0.0001;

    renderer.render(scene, camera);
};

animate();