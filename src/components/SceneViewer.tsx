"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SceneViewer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0x818cf8, 1.5);
    directional.position.set(5, 5, 5);
    scene.add(directional);

    // Central nucleus (sphere)
    const nucleusGeo = new THREE.SphereGeometry(0.6, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.3,
      metalness: 0.5,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    scene.add(nucleus);

    // Electron orbits
    const orbits: THREE.Mesh[] = [];
    const electrons: THREE.Mesh[] = [];
    const orbitData = [
      { radius: 1.4, speed: 1.0, color: 0x38bdf8 },
      { radius: 2.0, speed: 0.65, color: 0x34d399 },
      { radius: 2.7, speed: 0.4, color: 0xf472b6 },
    ];

    orbitData.forEach(({ radius, speed, color }) => {
      // Orbit ring
      const ringGeo = new THREE.TorusGeometry(radius, 0.015, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        opacity: 0.3,
        transparent: true,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + Math.random() * 0.5;
      ring.rotation.y = Math.random() * Math.PI;
      scene.add(ring);
      orbits.push(ring);

      // Electron
      const eGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const eMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.8 });
      const electron = new THREE.Mesh(eGeo, eMat);
      electron.userData = { radius, speed, angle: Math.random() * Math.PI * 2, ring };
      scene.add(electron);
      electrons.push(electron);
    });

    // Particle field (stars / data points)
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.04 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Handle resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      nucleus.rotation.y = t * 0.3;
      nucleus.rotation.x = t * 0.15;
      particles.rotation.y = t * 0.02;

      electrons.forEach((e) => {
        const { radius, speed, angle, ring } = e.userData as {
          radius: number;
          speed: number;
          angle: number;
          ring: THREE.Mesh;
        };
        const a = angle + t * speed;
        // Rotate in the plane of the orbit ring
        const pos = new THREE.Vector3(
          Math.cos(a) * radius,
          0,
          Math.sin(a) * radius
        );
        pos.applyEuler(ring.rotation);
        e.position.copy(pos);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
