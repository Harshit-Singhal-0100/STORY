import * as THREE from "three";

export default function initThreeScene(canvas) {
  if (!canvas) return () => {};

  // ✅ Use devicePixelRatio for sharp rendering
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const { clientWidth, clientHeight } = canvas;
  renderer.setSize(clientWidth, clientHeight, false);

  // ✅ Scene
  const scene = new THREE.Scene();

  // ✅ Camera
  const camera = new THREE.PerspectiveCamera(
    35,
    clientWidth / clientHeight,
    0.1,
    1000
  );
  camera.position.z = 4;

  // ✅ Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const point = new THREE.PointLight(0x38bdf8, 1.4);
  point.position.set(2, 3, 4);
  scene.add(point);

  // ✅ Geometry
  const geometry = new THREE.TorusKnotGeometry(0.9, 0.3, 120, 18);

  const material = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x182747,
    metalness: 0.5,
    roughness: 0.15,
  });

  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  // ✅ Animation Loop (with cleanup-safe ID)
  let rafId;

  function animate() {
    knot.rotation.x += 0.01;
    knot.rotation.y += 0.01;
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  }

  animate();

  // ✅ Responsive Resize (CRITICAL)
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  window.addEventListener("resize", onResize);

  // ✅ FULL CLEANUP (prevents memory leaks)
  return () => {
    cancelAnimationFrame(rafId);

    geometry.dispose();
    material.dispose();

    renderer.dispose();
    window.removeEventListener("resize", onResize);
  };
}
