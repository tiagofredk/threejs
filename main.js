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

// create the elements of the scene
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  // wireframe: true
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus) 

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight, pointLight);

// background scene
// const spaceTexture = new THREE.TextureLoader().load('./img/space.jpg');
// scene.background = spaceTexture;

const googleTexture = new THREE.TextureLoader().load('./img/google.jpg');

const google = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({ map: googleTexture })
);
google.position.set(10, 20, -10);
scene.add(google);

// scene helpers
// const lighHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper, lighHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  camera.position.z = t * -0.1;
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  
  // controls.update();

  renderer.render(scene, camera);
}

animate();

