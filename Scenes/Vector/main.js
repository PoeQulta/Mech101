import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as dat from 'dat.gui';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({ alpha: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

const size = 10;
const divisions = 10;

const gridHelperZ = new THREE.GridHelper( size, divisions);
const gridHelperX = new THREE.GridHelper( size, divisions );
gridHelperX.rotation.x = Math.PI/2;
const gridHelperY = new THREE.GridHelper( size, divisions );
gridHelperY.rotation.z = Math.PI/2;
scene.add( gridHelperZ );
scene.add( gridHelperX );
scene.add( gridHelperY );
camera.position.z = 5;

const loader = new FontLoader();
loader.load( '../../node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json', function ( font ) {

	 const textGeoY = new TextGeometry( 'Y-Axis', {
		font: font,
    size: 0.1,
    depth: 0.01,
    curveSegments: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.0025,
    bevelOffset: 0,
    bevelSegments: 5
	} );
    const textGeoX = new TextGeometry( 'X-Axis', {
		font: font,
    size: 0.1,
    depth: 0.01,
    curveSegments: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.0025,
    bevelOffset: 0,
    bevelSegments: 5
	} );
    const textGeoZ = new TextGeometry( 'Z-Axis', {
		font: font,
    size: 0.1,
    depth: 0.01,
    curveSegments: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.0025,
    bevelOffset: 0,
    bevelSegments: 5
	} );
    var  color = new THREE.Color();
    color.setRGB(0, 0, 0);
    var  textMaterial = new THREE.MeshBasicMaterial({ color: color });
    var textY = new THREE.Mesh(textGeoY , textMaterial);
    var textX = new THREE.Mesh(textGeoX , textMaterial);
    var textZ = new THREE.Mesh(textGeoZ , textMaterial);
    textY.position.set(0, 1, 0);
    textY.rotation.set(0, 0, Math.PI/2);
    scene.add(textY);

    textX.position.set(1, 0, 0);
    textX.rotation.set(0, 0, 0);
    scene.add(textX);

    textZ.position.set(0, 0, 1);
    textZ.rotation.set(0, Math.PI/2, 0);
    scene.add(textZ);
} );

const dir = new THREE.Vector3( 1, 1, 0 );
//normalize the direction vector (convert to vector of length 1)
const origin = new THREE.Vector3( 0, 0, 0 );
const hex = 0x00CCCC;

const arrowHelper = new THREE.ArrowHelper( dir, origin, 1, hex );
scene.add( arrowHelper );

const gui = new dat.GUI()
const vectorFolder = gui.addFolder('Vector')
var vectPolarCoord = {R:1,theta:Math.PI/4, phi:Math.PI/2}
vectorFolder.add(vectPolarCoord, 'R', 0, 5)
vectorFolder.add(vectPolarCoord, 'theta', -Math.PI, Math.PI)
vectorFolder.open()

//Xangle Display
const xAxis = new THREE.Vector3(1,0,0)
const zAxis = new THREE.Vector3(0,0,1)

var Xcurve = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	1, 1,           // xRadius, yRadius
	0,  dir.angleTo(xAxis),  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);

var pointsX = Xcurve.getPoints( 50 );
var ArcgeometryX = new THREE.BufferGeometry().setFromPoints( pointsX );

const ArcmaterialX = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const ellipseX = new THREE.Line( ArcgeometryX, ArcmaterialX );
scene.add(ellipseX);

// Y angle
const yAxis = new THREE.Vector3(0,1,0)
function animate() {
    var r = vectPolarCoord.R;
    var theta = vectPolarCoord.theta;
    var phi = vectPolarCoord.phi;
    var hold = new THREE.Vector3(Math.cos(theta)*Math.sin(phi),Math.sin(theta)*Math.sin(phi),Math.cos(phi));
    hold.normalize()
	renderer.render( scene, camera );
    arrowHelper.setLength(vectPolarCoord.R);
    arrowHelper.setDirection(hold);



    Xcurve.aEndAngle =theta;
    Xcurve.aClockwise = (theta<0);
    Xcurve.xRadius = 0.5*r;
    Xcurve.yRadius = 0.5*r;
    pointsX = Xcurve.getPoints( 50 );
    ArcgeometryX = new THREE.BufferGeometry().setFromPoints( pointsX );
    ellipseX.geometry = ArcgeometryX;

}
renderer.setAnimationLoop( animate );