import './style.css'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

renderer.render(scene, camera);

// background scene
// const spaceTexture = new THREE.TextureLoader().load('./img/space.jpg');
// scene.background = spaceTexture;

// create the elements of the scene
const geometry = new THREE.DodecahedronGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x5347,
  wireframe: true
});
const torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, -20);
scene.add(torus) 

// Google cube
// const googleTexture = new THREE.TextureLoader().load('./img/google.jpg');

// const google = new THREE.Mesh(
//   new THREE.BoxGeometry(10, 10, 10),
//   new THREE.MeshBasicMaterial({ map: googleTexture })
// );
// google.position.set(0, 0, 20);
// scene.add(google);

// lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight, pointLight);



// scene helpers
// const lighHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper, lighHelper);

// controls the orbit camera
// const controls = new OrbitControls(camera, renderer.domElement);

// on mouse scroll, zoom in and out
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  camera.position.z = t * -0.001;
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001;
  torus.rotation.y += 0.001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

