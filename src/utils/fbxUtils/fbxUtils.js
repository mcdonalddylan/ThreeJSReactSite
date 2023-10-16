import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

import artGeo from '../../assets/models/artPallete.fbx';

export const addingWebFBXFile = (scene, renderer, camera, material, shinyMaterial, animate) => {

    let fbxObject = {};
    let webGroup;
    let webMixer;

    const loader = new FBXLoader();

    loader.load(artGeo, (fbx) => {

        webGroup = fbx;

        webGroup.traverse((obj) => {
            if (obj.name.includes('Paint')) {
                obj.material = shinyMaterial;
            }
            else {
                obj.material = material;
            }
        });

        webGroup.scale.set( 0.003, 0.003, 0.003 );
        new THREE.Box3().setFromObject( webGroup ).getCenter( webGroup.position ).multiplyScalar( -1 ); 
        webGroup.position.set( 0, 0, -2 );
        webGroup.rotation.set(-0.4, 0, 0);

        webMixer = new THREE.AnimationMixer(webGroup);
        if (webGroup.animations.length > 0) {
            webMixer.clipAction( webGroup.animations[0] ).play();
        };

        scene.add( webGroup );

        renderer.render( scene, camera );
        fbxObject.webGroup = webGroup;
        fbxObject.webMixer = webMixer;

        animate(fbxObject);
        
    }, () => {},
    (error) => {
        console.error('***', error, '***');
    });
}