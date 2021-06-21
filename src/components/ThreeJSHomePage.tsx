import React, { useEffect, useState } from 'react';
import * as THREE from "three";
import { setupLights, setupObjects } from './HomePageFunctions';
import '../components/HomePage.scss';
import { useSelector } from 'react-redux';
import { IState } from '..';
import { WEBGL } from './WebGL';
import { ImagesContainer } from './ImagesContainer';
import resLogo from '../assets/logo svgs/resumeLogo.svg';
import linLogo from '../assets/logo svgs/tieLogo.svg';
import emaLogo from '../assets/logo svgs/emailLogo.svg';
import gitLogo from '../assets/logo svgs/githubLogo.svg';

import webImg1 from '../assets/web images/push-up2.0_2.jpg';
import webImg2 from '../assets/web images/FoodGenerator2.jpg';
import webImg3 from '../assets/web images/mochiCircle6.jpg';
import webImg4 from '../assets/web images/foodar1.jpg';

interface IProps {

}

export const ThreeJSHomePage: React.FC<IProps> = ( props: IProps ) => {

    const quality: any = useSelector<IState>(state=>state.qualityState);
    const [refresh, setRefresh] = useState(false);

    useEffect(()=>{

    if ( WEBGL.isWebGLAvailable() ) { 

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
        let camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);

        // Render function babyyyyy
        renderer.render( scene, camera );

        // Light setup
        setupLights( scene );
        
        // Object placement/animation/inputs
        setupObjects( scene, renderer, camera, quality, mobileAspectRatio );

    } else {
        
        const warning = WEBGL.getWebGLErrorMessage();
        document.body.appendChild( warning );
    }

    });

    const wobbleToggle = (event: any) => {
        const element: HTMLCanvasElement = event.target;
        //console.log(element.tagName);
        const container: HTMLCanvasElement = event.currentTarget;

        if (element.tagName !== 'IMG' && element.tagName !== 'A'){
            if (container.classList.contains('wobble')){
                container.classList.remove('wobble');
                container.classList.add('non-wobble');
            } else {
                container.classList.remove('non-wobble');
                container.classList.add('wobble');
            }
        }
        
    }

    return(
        <div className="container position-absolute" style={{right: 0, left: "50%", transform: `translate(-50%)`, zIndex: 2 }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="row justify-content-center text-grid wobble" id="first" onClick={wobbleToggle}>
                <div className="col-sm-8 center-block">
                    <h1 className="main-header">
                        Dylan McDonald
                    </h1>
                    <hr className="main-hr"></hr>
                    <h3 className="main-sub">
                        React & Java Developer  |  Game Developer
                    </h3>
                    <div className="row justify-content-center" style={{margin: "auto", textAlign: "center"}}>
                        <div className="col-sm-3">
                            <a href='https://dylandavidmcdonald.files.wordpress.com/2020/01/dylan-mcd-game-developer-resume-2.pdf' 
                            className="main-link" target='_blank'>
                                Resume 
                            </a>
                            <img alt='resume-logo' className="main-img"
                            src={resLogo}/>
                        </div>
                        <div className="col-sm-3">
                            <a href='http://www.linkedin.com/in/dylan-mcdonald-968709193' 
                            className="main-link" target='_blank'>
                                Linked-in 
                            </a>
                            <img alt='linkedin-logo' className="main-img"
                            src={linLogo}/>
                        </div>
                        <div className="col-sm-3">
                            <a href='mailto:dylandavidmcdonald@gmail.com' 
                            className="main-link" target='_blank'>
                                Email 
                            </a>
                            <img alt='email-logo' className="main-img"
                            src={emaLogo}/>
                        </div>
                        <div className="col-sm-3">
                            <a href='https://github.com/mcdonalddylan'
                            className="main-link" target='_blank'>
                                GitHub 
                            </a>
                            <img alt='github-logo' className="main-img"
                            src={gitLogo}/>
                        </div>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="row justify-content-center text-grid fade-out wobble" id="second" onClick={wobbleToggle}>
                <div className="col-sm-8 my-auto" >
                    <a href='/web' className="larger-link">
                        Check out my web development work!
                    </a>
                </div>
                <div className="col-sm-4" >
                    <ImagesContainer
                        image1={webImg1}
                        image2={webImg2}
                        image3={webImg3}
                        image4={webImg4}
                    />
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div className="row justify-content-center text-grid fade-out wobble" id="third" onClick={wobbleToggle}>
                <div className="col-sm-8" >
                    <a href='game' className="larger-link">
                        Check out my game development work!
                    </a>
                </div>
                <div className="col-sm-4" >
                    <img alt='web photos'></img>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="row justify-content-center text-grid fade-out wobble" id="fourth" onClick={wobbleToggle}>
                <div className="col-sm-8" >
                    <a href='art' className="larger-link">
                        Check out my art!
                    </a>
                </div>
                <div className="col-sm-4" >
                    <img alt='web photos'></img>
                </div>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );

}