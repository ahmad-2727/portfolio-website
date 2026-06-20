"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TECH_NODES = [
  "React",
  "Python",
  "Node.js",
  "MySQL",
  "C#",
  "JavaScript",
  "HTML/CSS",
];

export default function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 13;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const cyan = new THREE.Color(0x5eead4);
    const violet = new THREE.Color(0xa78bfa);

    // Build a node graph: each node = a technology
    const group = new THREE.Group();
    const nodeCount = TECH_NODES.length;
    const radius = 5.2;
    const positions = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      positions.push(new THREE.Vector3(x, y, z));
    }

    // central core node
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: cyan,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const nodeMeshes = [];
    positions.forEach((pos, i) => {
      const geo = new THREE.SphereGeometry(0.16, 16, 16);
      const color = i % 2 === 0 ? cyan : violet;
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      group.add(mesh);
      nodeMeshes.push(mesh);

      // glow halo
      const haloGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.15,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(pos);
      group.add(halo);

      // line from core to node
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.35,
      });
      group.add(new THREE.Line(lineGeo, lineMat));
    });

    // connecting lines between nearby nodes (network feel)
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 6.5) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            positions[i],
            positions[j],
          ]);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x3a4256,
            transparent: true,
            opacity: 0.4,
          });
          group.add(new THREE.Line(lineGeo, lineMat));
        }
      }
    }

    scene.add(group);

    // ambient particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePos[i] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.025,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * 0.12 + mouseX * 0.4;
      group.rotation.x = mouseY * 0.25;
      core.rotation.y += 0.003;
      core.rotation.x += 0.002;
      particles.rotation.y = elapsed * 0.01;

      nodeMeshes.forEach((m, i) => {
        m.position.y =
          positions[i].y + Math.sin(elapsed * 1.2 + i) * 0.08;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-0"
      aria-hidden="true"
    />
  );
}
