import React, { Component } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.137.5"; //ili from three
//cdn je bolji jer se manje ucitava, a three fiber instalacija ionako ne radi
//https://threejs.org/docs/#manual/en/introduction/Installation
//za post processing efekte, kontrole itd moze cdn iz dokumentacije, ili ovo:
//npm install three-orbitcontrols --save NE RADI
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//pocetni
class ThreeScene extends Component {
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.mount.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // cube
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    // add to scene
    this.scene.add(this.cube);
    this.animation();
    this.renderer.render(this.scene, this.camera);
    // orbit kontrole
    new OrbitControls(this.camera, this.renderer.domElement);

    // resize event
    window.addEventListener("resize", this.handleWindowResize);
  }

  //   anim
  animation = () => {
    requestAnimationFrame(this.animation);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
  // on resize
  handleWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.render(this.scene, this.camera);
  };
  render() {
    return (
      <div
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
export default ThreeScene;
