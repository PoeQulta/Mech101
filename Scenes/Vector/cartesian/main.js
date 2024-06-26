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
const controls = new OrbitControls( camera, renderer.domElement );

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
const i_vector = new THREE.Vector3( 1, 0, 0 );
const j_vector = new THREE.Vector3( 0, 1, 0 );
const k_vector = new THREE.Vector3( 0, 0, 1 );

const hex = 0x00CCCC;

const arrowHelper = new THREE.ArrowHelper( dir, origin, 1, hex );
const arrowHelper_x = new THREE.ArrowHelper(i_vector, origin, 1, 0xFF0000 );
const arrowHelper_y = new THREE.ArrowHelper(j_vector, origin, 1, 0x00FF00 );
const arrowHelper_z = new THREE.ArrowHelper(k_vector, dir, origin, 1, 0x0000FF);


scene.add( arrowHelper );
scene.add( arrowHelper_x );
scene.add( arrowHelper_y );
scene.add( arrowHelper_z );


const gui = new dat.GUI()
const vectorFolder = gui.addFolder('Vector')
vectorFolder.add(dir, 'x', 0, 5)
vectorFolder.add(dir, 'y', 0, 5)
vectorFolder.add(dir, 'z', 0, 5)
vectorFolder.open()

function animate() {
    var hold = dir.clone()
    hold.normalize()
	renderer.render( scene, camera );
    arrowHelper.setLength(dir.length());
    arrowHelper.setDirection(hold);

    var comp_x = i_vector.clone();
    comp_x.multiplyScalar(dir.x)
    var comp_y = j_vector.clone();
    comp_y.multiplyScalar(dir.y)


    arrowHelper_x.setLength(dir.x);
   
    arrowHelper_y.setLength(dir.y);
    
    arrowHelper_y.position.copy(comp_x);
    var temp = new THREE.Vector3();
    temp.addVectors(comp_x,comp_y);
    arrowHelper_z.position.copy(temp);

    arrowHelper_z.setLength(dir.z)
}
renderer.setAnimationLoop( animate );