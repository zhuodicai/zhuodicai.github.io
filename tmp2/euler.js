import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import Papa from 'https://cdn.skypack.dev/papaparse';

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Add light
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Create the cube
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.8);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
let cube;
const loader = new OBJLoader();
loader.load(
    'hand.obj', // obj path
    (loadedModel) => {
        cube = loadedModel;
        scene.add(cube);
        cube.position.set(0, 0, 0); //position
        cube.scale.set(0.1, 0.1, 0.1); // scale
        // Make the model semi-transparent
        cube.traverse(child => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0.8; // Set opacity (0 is fully transparent, 1 is fully opaque)
            }
        });
    },
    (xhr) => { // load progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => { // error
        console.error('An error happened', error);
    }
);

// Add a grid to the scene for better spatial visualization
const gridHelper = new THREE.GridHelper(50, 50);
scene.add(gridHelper);

camera.position.set(0, 0, -1);

// Create trajectory line
let trajectoryPoints = []; // 要确保这个数组至少有两个点以上
let trajectoryMesh;

// 在有足够的轨迹点后创建 TubeGeometry
function updateTrajectory() {
    // 如果已有轨迹Mesh，先移除旧的
    if (trajectoryMesh) {
        scene.remove(trajectoryMesh);
    }

    if (trajectoryPoints.length > 1) {
        // 创建轨迹线材质
        const trajectoryMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        // 创建轨迹线的路径 (使用 CatmullRomCurve3 创建平滑路径)
        const trajectoryCurve = new THREE.CatmullRomCurve3(trajectoryPoints);
        const tubeGeometry = new THREE.TubeGeometry(trajectoryCurve, 64, 0.03, 8, false); // 调整0.05来改变粗细
        trajectoryMesh = new THREE.Mesh(tubeGeometry, trajectoryMaterial);

        // 将轨迹添加到场景中
        scene.add(trajectoryMesh);
    }
}

// Create the slider
const slider = document.createElement('input');
slider.type = 'range';
slider.min = 0;
slider.max = 100; // Will be set dynamically
slider.value = 0;
slider.step = 1;
slider.style.position = 'absolute';
slider.style.top = '10px';
slider.style.left = '10px';
document.body.appendChild(slider);

// Create the clear button
const clearButton = document.createElement('button');
clearButton.innerText = 'Clear Trajectory';
clearButton.style.position = 'absolute';
clearButton.style.top = '40px';
clearButton.style.left = '10px';
document.body.appendChild(clearButton);



let positionData = [];
let currentFrame = 0;

// Load CSV data
Papa.parse('processed_data_euler_acc_only_sampled-2.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (results) {
        positionData = results.data.map(row => ({
            time: row["Time (s)"],
            roll: row["Euler Roll (degrees)"],
            pitch: row["Euler Pitch (degrees)"],
            yaw: row["Euler Yaw (degrees)"],
            x: row["EKF Position X"],
            y: row["EKF Position Y"],
            z: row["EKF Position Z"]
        }));

        // console.log(positionData);
        // Update slider max value
        slider.max = positionData.length - 2;

        animate();  // Start animation after data is loaded
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Update position based on slider value
    currentFrame = parseInt(slider.value);

    if (currentFrame < positionData.length) {
        const { x, y, z, roll, pitch, yaw } = positionData[currentFrame];

        // Update cube position
        if (cube) {
            cube.position.set(x, y, z);

            // Convert Euler angles from degrees to radians
            const rollRad = THREE.MathUtils.degToRad(roll);
            const pitchRad = THREE.MathUtils.degToRad(pitch);
            const yawRad = THREE.MathUtils.degToRad(yaw);

            // Update cube rotation
            cube.rotation.set(rollRad, pitchRad, yawRad); // Order: roll, pitch, yaw
        }

        // Update trajectory points
        if (trajectoryPoints.length === 0 || !trajectoryPoints[trajectoryPoints.length - 1].equals(new THREE.Vector3(x, y, z))) {
            trajectoryPoints.push(new THREE.Vector3(x, y, z));
            updateTrajectory();
        }
    }

    // Update controls
    controls.update();

    renderer.render(scene, camera);
}


// Function to handle resizing
function onWindowResize() {
    // Update the camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize, false);

// Call once to set initial size
onWindowResize();

// Function to clear the trajectory
clearButton.addEventListener('click', () => {
    trajectoryPoints.length = 0; // Clear trajectory points array
    trajectoryGeometry.setFromPoints(trajectoryPoints); // Update geometry
});