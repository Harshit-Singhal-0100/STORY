// app/(components)/ThreeHero.jsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 2);
    pointLight.position.set(-2, 2, 4);
    scene.add(pointLight);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 6;
    controls.rotateSpeed = 0.5;

    // Load GLTF model
    let model, mixer, clock, handBone;
    const loader = new GLTFLoader();

    loader.load(
      "/models/avtar.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(0.6, 0.6, 0.6);
        model.position.set(0, -1, 0);
        scene.add(model);

        clock = new THREE.Clock();

        // Use animation clip if exists
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const waveAction = gltf.animations.find((anim) =>
            anim.name.toLowerCase().includes("wave")
          );
          if (waveAction) mixer.clipAction(waveAction).play();
        } else {
          // No animation: find hand bone for manual waving
          model.traverse((child) => {
            if (child.isBone && child.name.toLowerCase().includes("hand")) {
              handBone = child;
            }
          });
        }
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * Math.PI;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * Math.PI * 0.5;
    };

    canvasRef.current?.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (mixer && clock) mixer.update(clock.getDelta());

      if (model) {
        // Optional smooth rotation towards mouse
        model.rotation.y += (mouseX - model.rotation.y) * 0.05;
        model.rotation.x += (mouseY - model.rotation.x) * 0.05;
      }

      // Manual waving
      if (handBone) {
        const time = Date.now() * 0.005;
        handBone.rotation.z = Math.sin(time * 2) * 0.5;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (model) scene.remove(model);
      controls.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-2xl touch-none"
    />
  );
}
