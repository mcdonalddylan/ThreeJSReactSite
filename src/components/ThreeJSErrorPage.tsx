import { request } from 'https';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { IState } from '..';
import { setupLights } from './HomePageFunctions';
import { WEBGL } from './WebGL';
import fontJson from '../assets/fonts/LieraSans-Bold-msdf.json';

export const ThreeJSErrorPage: React.FC = () => {
    
    const quality: any = useSelector<IState>(state=>state.qualityState);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(()=>{
        if (WEBGL.isWebGLAvailable()){

        // Renderer setup
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setPixelRatio( window.devicePixelRatio/quality );

        let mobileAspectRatio = false;
        if(window.innerHeight > window.innerWidth) {
            mobileAspectRatio = true;
        } else {
            mobileAspectRatio = false;
        }

        renderer.domElement.id = 'dom';
        renderer.domElement.className = 'position-fixed';
        if (document.body.contains( document.getElementById( 'dom' ) ) === false) {
            document.body.append( renderer.domElement );
        } else {
            const dom = document.getElementById('dom');
            if(dom !== null) {
                document.body.removeChild( dom );
                document.body.append( renderer.domElement );
            } 
        }
        
        window.onresize = () => {
            //console.log('You just resized the window');
            renderer.setSize( window.innerWidth, window.innerHeight);
            setRefresh(!refresh);
        };

        // Camera / Scene setup
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);

        // Light setup
        setupLights( scene );

        let textMesh: THREE.Mesh | undefined;
        const loader = new THREE.FontLoader();
        let font = loader.parse(fontJson);
        let textGeo = new THREE.TextGeometry('ERROR PAGE', {
            font: font,
            size: 80,
            height: 5,
            curveSegments: Math.floor(3/quality)
        });
    
        const basicMat = new THREE.MeshPhongMaterial({color: 0x00ff00});
        textMesh = new THREE.Mesh(textGeo, basicMat);
        //textMesh.rotation.x = 340;
        scene.add( textMesh );

        // Render function babyyyyy
        renderer.render( scene, camera );

        const animate = () => {
            requestAnimationFrame( animate );

            if (textMesh !== undefined){
                console.log(textMesh.rotation.x%360);
                console.log(textMesh.rotation.x);
                if (textMesh.rotation.x >= 350 ){
                    textMesh.rotation.x += 0.1;
                } else {
                    textMesh.rotation.x += 1;
                }
            }

            renderer.render( scene, camera );
        }
        //animate();

        } else {
            const warning = WEBGL.getWebGLErrorMessage();
            document.body.appendChild( warning );
        }
    })
    
    return(
        <div style={{margin: "0 auto", display: "block"}}>
        </div>
    )
}