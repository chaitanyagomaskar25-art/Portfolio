import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

// ============================================================================
// Mathematical Polyhedra Definitions (3D Vertices & Triangular Facets)
// ============================================================================

const PHI = (1 + Math.sqrt(5)) / 2;

// 1. Icosahedron: 12 vertices, 20 triangular faces
const RAW_ICOSA_VERTS = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
});

const ICOSA_FACES = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

// 2. Octahedron: 6 vertices, 8 triangular faces
const RAW_OCTA_VERTS = [
  [1, 0, 0], [-1, 0, 0],
  [0, 1, 0], [0, -1, 0],
  [0, 0, 1], [0, 0, -1]
];

const OCTA_FACES = [
  [0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4],
  [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]
];

// 3. Gemstone Crystal Prism: 10 vertices, 16 triangular faces
const RAW_CRYSTAL_VERTS = [
  [0, 1.4, 0], // Top Apex (0)
  [0.85, 0.25, 0], [0, 0.25, 0.85], [-0.85, 0.25, 0], [0, 0.25, -0.85], // Upper Belt (1-4)
  [0.6, -0.4, 0.6], [-0.6, -0.4, 0.6], [-0.6, -0.4, -0.6], [0.6, -0.4, -0.6], // Lower Belt (5-8)
  [0, -1.4, 0] // Bottom Apex (9)
];

const CRYSTAL_FACES = [
  // Top Cap
  [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
  // Mid Facets
  [1, 5, 2], [2, 6, 3], [3, 7, 4], [4, 8, 1],
  [1, 8, 5], [2, 5, 6], [3, 6, 7], [4, 7, 8],
  // Bottom Cap
  [9, 6, 5], [9, 7, 6], [9, 8, 7], [9, 5, 8]
];

// 4. 4D Hypercube / Tesseract Projection: 16 vertices, 32 struts
const RAW_TESSERACT = [];
const sOuter = 1.0;
const sInner = 0.52;
for (let x of [-1, 1]) {
  for (let y of [-1, 1]) {
    for (let z of [-1, 1]) {
      RAW_TESSERACT.push([x * sOuter, y * sOuter, z * sOuter]);
    }
  }
}
for (let x of [-1, 1]) {
  for (let y of [-1, 1]) {
    for (let z of [-1, 1]) {
      RAW_TESSERACT.push([x * sInner, y * sInner, z * sInner]);
    }
  }
}

const TESSERACT_EDGES = [];
for (let i = 0; i < 8; i++) {
  for (let j = i + 1; j < 8; j++) {
    let diff = 0;
    if (RAW_TESSERACT[i][0] !== RAW_TESSERACT[j][0]) diff++;
    if (RAW_TESSERACT[i][1] !== RAW_TESSERACT[j][1]) diff++;
    if (RAW_TESSERACT[i][2] !== RAW_TESSERACT[j][2]) diff++;
    if (diff === 1) {
      TESSERACT_EDGES.push([i, j]);
      TESSERACT_EDGES.push([i + 8, j + 8]);
    }
  }
}
for (let i = 0; i < 8; i++) {
  TESSERACT_EDGES.push([i, i + 8]);
}

// 3D Matrix Math Helper: 3-Axis Euler Rotation
function rotate3D(point, rx, ry, rz) {
  let [x, y, z] = point;

  // X-axis rotation
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;

  // Y-axis rotation
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x2 = x * cosY + z1 * sinY;
  const z2 = -x * sinY + z1 * cosY;

  // Z-axis rotation
  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = x2 * sinZ + y1 * cosZ;

  return [x3, y3, z2];
}

// Project 3D point to 2D screen coordinates with camera perspective
function project3D(point, cx, cy, scale, fov = 480) {
  const [x, y, z] = point;
  const distance = z + fov;
  if (distance <= 0) return null;
  const factor = fov / distance;
  return {
    x: cx + x * scale * factor,
    y: cy + y * scale * factor,
    scale: factor,
    z,
  };
}

export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Global mouse coordinates for cursor-following lighting spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 28, stiffness: 180, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Multi-chromatic volumetric spotlight following user cursor
  const spotlightBg = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px, rgba(16, 185, 129, 0.08), rgba(56, 189, 248, 0.05), rgba(245, 158, 11, 0.025), transparent 70%)`;

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
        "ontouchstart" in window ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
      setIsTouch(hasTouch);
    };
    checkTouch();

    const onGlobalMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onGlobalMouseMove, { passive: true });
    window.addEventListener("resize", checkTouch);

    return () => {
      window.removeEventListener("mousemove", onGlobalMouseMove);
      window.removeEventListener("resize", checkTouch);
    };
  }, [mouseX, mouseY]);

  // Main 3D Live Interactive Visual Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf;
    let time = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      speedX: 0,
      speedY: 0,
      normX: 0,
      normY: 0,
    };

    // Camera 3D perspective orientation with inertial damping
    let camRotX = 0;
    let camRotY = 0;

    // Click wave shockwave ripple pulses
    let ripples = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.speedX = e.clientX - mouse.targetX;
      mouse.speedY = e.clientY - mouse.targetY;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.normX = (e.clientX / w - 0.5) * 2;
      mouse.normY = (e.clientY / h - 0.5) * 2;
    };

    const onMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
      mouse.normX = 0;
      mouse.normY = 0;
    };

    const onMouseDown = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 15,
        maxRadius: Math.min(w, h) * 0.55,
        opacity: 0.65,
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // ========================================================================
    // Interactive 3D Particle Constellation Engine
    // 90 interconnected particles floating in full 3D space with cursor physics
    // ========================================================================
    const PARTICLE_COUNT = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 90);
    const particles3D = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1400,
      z: Math.random() * 800 - 300,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.45 + 0.35,
    }));

    // Dynamic 3D Objects Positioned Along Portfolio Elevation
    const objects3D = [
      // 1. Hero Crystalline Icosahedron
      {
        id: "hero-icosa",
        type: "polyhedron",
        rawVertices: RAW_ICOSA_VERTS,
        faces: ICOSA_FACES,
        baseScale: 105,
        relX: 0.82,
        relY: 0.28,
        rx: 0.4,
        ry: 0.5,
        rz: 0.2,
        rotSpeedX: 0.0055,
        rotSpeedY: 0.008,
        color: "245, 158, 11", // Champagne Amber
        sectionRange: [0, 0.34],
      },
      // 2. About Multi-Axis Gyro Celestial Sphere
      {
        id: "about-gyro",
        type: "gyro",
        baseScale: 110,
        relX: 0.14,
        relY: 0.38,
        rx: 0.6,
        ry: 0.4,
        rz: 0.5,
        rotSpeedX: 0.005,
        rotSpeedY: 0.0075,
        color: "56, 189, 248", // Arctic Sky Blue
        sectionRange: [0.12, 0.45],
      },
      // 3. Projects Gemstone Crystal
      {
        id: "projects-crystal",
        type: "polyhedron",
        rawVertices: RAW_CRYSTAL_VERTS,
        faces: CRYSTAL_FACES,
        baseScale: 100,
        relX: 0.88,
        relY: 0.54,
        rx: 0.5,
        ry: 0.7,
        rz: 0.2,
        rotSpeedX: 0.006,
        rotSpeedY: 0.005,
        color: "217, 119, 6", // Ochre Copper
        sectionRange: [0.32, 0.65],
      },
      // 4. Skills 4D Hypercube Tesseract
      {
        id: "skills-tesseract",
        type: "tesseract",
        rawVertices: RAW_TESSERACT,
        edges: TESSERACT_EDGES,
        baseScale: 85,
        relX: 0.12,
        relY: 0.68,
        rx: 0.7,
        ry: 0.3,
        rz: 0.4,
        rotSpeedX: 0.0065,
        rotSpeedY: 0.008,
        color: "16, 185, 129", // Emerald Green
        sectionRange: [0.52, 0.82],
      },
      // 5. Experience Octahedron Star
      {
        id: "exp-octa",
        type: "polyhedron",
        rawVertices: RAW_OCTA_VERTS,
        faces: OCTA_FACES,
        baseScale: 98,
        relX: 0.86,
        relY: 0.78,
        rx: 0.3,
        ry: 0.6,
        rz: 0.1,
        rotSpeedX: 0.0055,
        rotSpeedY: 0.007,
        color: "56, 189, 248", // Ice Blue
        sectionRange: [0.65, 0.92],
      },
      // 6. Contact Floating Core Icosahedron
      {
        id: "contact-core",
        type: "polyhedron",
        rawVertices: RAW_ICOSA_VERTS,
        faces: ICOSA_FACES,
        baseScale: 108,
        relX: 0.5,
        relY: 0.90,
        rx: 0.2,
        ry: 0.4,
        rz: 0.3,
        rotSpeedX: 0.0045,
        rotSpeedY: 0.006,
        color: "245, 158, 11", // Champagne Amber
        sectionRange: [0.78, 1.0],
      },
    ];

    // Main 3D Animation Render Loop
    const render = () => {
      time += 0.016;

      // Mouse easing with fluid physics momentum
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // 3D Camera parallax shift based on cursor
      camRotX += (mouse.normY * 0.12 - camRotX) * 0.06;
      camRotY += (mouse.normX * 0.12 - camRotY) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.classList.contains("light");
      const currentScroll = window.scrollY || 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollNorm = currentScroll / docHeight;

      // Dynamic 3D Light Source vector tracking cursor
      const lightVec = [
        -0.3 + mouse.normX * 0.35,
        -0.6 + mouse.normY * 0.35,
        0.8,
      ];
      const lightLen = Math.hypot(...lightVec);
      const normLight = lightVec.map((v) => v / lightLen);

      // ======================================================================
      // 1. Interactive 3D Particle Constellation (Spatial Gravity & Connections)
      // ======================================================================
      ctx.save();
      const nodeCenterX = w * 0.5;
      const nodeCenterY = h * 0.5;
      const projectedParticles = [];

      for (let i = 0; i < particles3D.length; i++) {
        const p = particles3D[i];

        // Animate position
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around in 3D volume
        if (p.x < -800) p.x = 800;
        if (p.x > 800) p.x = -800;
        if (p.y < -700) p.y = 700;
        if (p.y > 700) p.y = -700;
        if (p.z < -250) p.z = 500;
        if (p.z > 500) p.z = -250;

        // 3D Camera Rotation
        const rotY = p.x * Math.cos(camRotY) - p.z * Math.sin(camRotY);
        const rotZ1 = p.x * Math.sin(camRotY) + p.z * Math.cos(camRotY);
        const rotX = p.y * Math.cos(camRotX) - rotZ1 * Math.sin(camRotX);
        const rotZ2 = p.y * Math.sin(camRotX) + rotZ1 * Math.cos(camRotX);

        const fov = 500;
        const dist = rotZ2 + fov;
        if (dist <= 0) continue;
        const factor = fov / dist;

        const screenX = nodeCenterX + rotY * factor;
        const screenY = nodeCenterY + rotX * factor;

        // Interactive cursor repulsion / orbital gravitation
        let interactionFactor = 1;
        if (mouse.x > -1000) {
          const dx = screenX - mouse.x;
          const dy = screenY - mouse.y;
          const mouseDist = Math.hypot(dx, dy);
          if (mouseDist < 160 && mouseDist > 1) {
            interactionFactor = 1 + (1 - mouseDist / 160) * 1.5;
            // Soft push
            p.vx += (dx / mouseDist) * 0.15;
            p.vy += (dy / mouseDist) * 0.15;
          }
        }

        // Apply friction to velocities
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (screenX >= -50 && screenX <= w + 50 && screenY >= -50 && screenY <= h + 50) {
          projectedParticles.push({
            screenX,
            screenY,
            z: rotZ2,
            size: p.size * factor * interactionFactor,
            alpha: p.baseAlpha * (1 - rotZ2 / 650) * (isLight ? 0.35 : 0.65),
          });
        }
      }

      // Draw Constellation Connecting Lines in 3D
      const connectionDist = w < 768 ? 95 : 130;
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const d = Math.hypot(dx, dy);

          if (d < connectionDist) {
            const lineAlpha = (1 - d / connectionDist) * 0.22 * Math.min(p1.alpha, p2.alpha);
            ctx.strokeStyle = isLight
              ? `rgba(13, 148, 136, ${lineAlpha})`
              : `rgba(52, 211, 153, ${lineAlpha * 1.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.stroke();
          }
        }

        // Connect directly to cursor if nearby
        if (mouse.x > -1000) {
          const mdx = p1.screenX - mouse.x;
          const mdy = p1.screenY - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < 140) {
            const lineAlpha = (1 - md / 140) * 0.35;
            ctx.strokeStyle = isLight
              ? `rgba(16, 185, 129, ${lineAlpha})`
              : `rgba(56, 189, 248, ${lineAlpha * 1.4})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw Glowing 3D Particles
      for (const p of projectedParticles) {
        ctx.fillStyle = isLight
          ? `rgba(15, 118, 110, ${p.alpha})`
          : `rgba(167, 243, 208, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ======================================================================
      // 2. 3D Digital Horizon Perspective Landscape (Harmonic Wave Grid)
      // ======================================================================
      const horizonY = h * 0.65;
      const gridCols = w < 768 ? 16 : 28;
      const gridRows = w < 768 ? 9 : 14;

      ctx.save();
      for (let r = 0; r < gridRows; r++) {
        const rowNorm = r / gridRows;
        const perspectiveDepth = Math.pow(rowNorm, 2.2);
        const y = horizonY + (h - horizonY) * perspectiveDepth;
        const lineAlpha = (1 - rowNorm * 0.6) * (isLight ? 0.06 : 0.12);

        ctx.strokeStyle = isLight
          ? `rgba(13, 148, 136, ${lineAlpha})`
          : `rgba(16, 185, 129, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let c = 0; c <= gridCols; c++) {
          const colNorm = c / gridCols;
          const x = colNorm * w;

          // Undulating wave harmonics
          const wave =
            Math.sin(colNorm * 7 + time * 1.4) *
            Math.cos(rowNorm * 4 + time * 0.9) *
            (7 + rowNorm * 12);

          // Interactive mouse depression / gravity ripple
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          let mouseWave = 0;
          if (dist < 240 && dist > 0.1) {
            mouseWave = Math.sin((dist / 240) * Math.PI) * -18;
          }

          const finalY = y + wave + mouseWave;
          if (c === 0) ctx.moveTo(x, finalY);
          else ctx.lineTo(x, finalY);
        }
        ctx.stroke();
      }

      // Vertical converging perspective grid lines
      for (let c = 0; c <= gridCols; c += 2) {
        const colNorm = c / gridCols;
        const bottomX = colNorm * w;
        const topX = w * 0.5 + (colNorm - 0.5) * w * 0.35;

        ctx.strokeStyle = isLight
          ? `rgba(37, 99, 235, 0.04)`
          : `rgba(56, 189, 248, 0.07)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      // Horizon atmospheric line glow
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 1, 0, horizonY + 30);
      horizonGrad.addColorStop(
        0,
        isLight ? "rgba(13, 148, 136, 0.12)" : "rgba(16, 185, 129, 0.22)"
      );
      horizonGrad.addColorStop(1, "transparent");
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 1, w, 30);
      ctx.restore();

      // ======================================================================
      // 3. Interactive Click Shockwave Ripples
      // ======================================================================
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 5;
        rip.opacity *= 0.95;

        if (rip.opacity < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = isLight
          ? `rgba(13, 148, 136, ${rip.opacity * 0.5})`
          : `rgba(52, 211, 153, ${rip.opacity * 0.7})`;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ======================================================================
      // 4. Floating 3D Geometric Polyhedra & Crystalline Engine
      // ======================================================================
      for (const obj of objects3D) {
        const [start, end] = obj.sectionRange;
        const mid = (start + end) / 2;
        const span = (end - start) / 2;
        const distFromMid = Math.abs(scrollNorm - mid);

        let visibility = 1 - distFromMid / span;
        if (visibility <= 0) continue;
        visibility = Math.min(Math.max(visibility, 0), 1);

        const cx = obj.relX * w;
        const scrollOffset = (scrollNorm - mid) * -220;
        const cy = obj.relY * h + scrollOffset;

        // Interactive mouse proximity, torque, and hover rotation
        const mdx = mouse.x - cx;
        const mdy = mouse.y - cy;
        const mouseDist = Math.hypot(mdx, mdy);
        const mouseInfluence =
          mouseDist < 400 ? (1 - mouseDist / 400) * 1.0 : 0;

        obj.rx += obj.rotSpeedX + mouse.speedY * 0.0004 + mouseInfluence * 0.012;
        obj.ry += obj.rotSpeedY + mouse.speedX * 0.0004 + mouseInfluence * 0.015;
        obj.rz += 0.0025;

        const currentScale =
          obj.baseScale * (1 + mouseInfluence * 0.2) * (w < 768 ? 0.75 : 1);
        const objAlpha =
          (isLight ? 0.3 : 0.52) *
          visibility *
          (1 + mouseInfluence * 0.5);

        ctx.save();

        if (obj.type === "gyro") {
          // Render concentric Gyro-Orbital Rings with 3D Depth
          for (let ring = 0; ring < 3; ring++) {
            const ringRadius = currentScale * (1 - ring * 0.28);
            ctx.strokeStyle = `rgba(${obj.color}, ${objAlpha * (0.85 - ring * 0.15)})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(
              cx,
              cy,
              ringRadius,
              ringRadius * Math.abs(Math.cos(obj.rx + ring * 1.2)),
              obj.ry + ring * 0.7,
              0,
              Math.PI * 2
            );
            ctx.stroke();
          }
        } else if (obj.type === "tesseract") {
          // Render 4D Tesseract Projection
          const projected = obj.rawVertices.map((v) => {
            const rot = rotate3D(v, obj.rx, obj.ry, obj.rz);
            return project3D(rot, cx, cy, currentScale);
          });

          ctx.strokeStyle = `rgba(${obj.color}, ${objAlpha * 1.1})`;
          ctx.lineWidth = 1.2;
          for (const [i, j] of obj.edges) {
            const p1 = projected[i];
            const p2 = projected[j];
            if (!p1 || !p2) continue;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }

          // Illuminated vertex hubs
          for (const p of projected) {
            if (!p) continue;
            const dotSize = (p.scale || 1) * 2.4;
            ctx.fillStyle = `rgba(${obj.color}, ${objAlpha * 1.8})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (obj.type === "polyhedron") {
          // Genuine 3D Crystalline Facets with Lambertian Light Shading & Painter's Sorting
          const rotatedVerts = obj.rawVertices.map((v) => rotate3D(v, obj.rx, obj.ry, obj.rz));
          const projectedVerts = rotatedVerts.map((rot) => project3D(rot, cx, cy, currentScale));

          const renderedFaces = [];
          for (const [i, j, k] of obj.faces) {
            const rA = rotatedVerts[i];
            const rB = rotatedVerts[j];
            const rC = rotatedVerts[k];

            const pA = projectedVerts[i];
            const pB = projectedVerts[j];
            const pC = projectedVerts[k];

            if (!pA || !pB || !pC) continue;

            // Surface Normal Vector
            const ux = rB[0] - rA[0], uy = rB[1] - rA[1], uz = rB[2] - rA[2];
            const vx = rC[0] - rA[0], vy = rC[1] - rA[1], vz = rC[2] - rA[2];
            const nx = uy * vz - uz * vy;
            const ny = uz * vx - ux * vz;
            const nz = ux * vy - uy * vx;
            const normLen = Math.hypot(nx, ny, nz);
            if (normLen < 0.0001) continue;

            const nnx = nx / normLen;
            const nny = ny / normLen;
            const nnz = nz / normLen;

            const avgZ = (rA[2] + rB[2] + rC[2]) / 3;
            const dot = nnx * normLight[0] + nny * normLight[1] + nnz * normLight[2];
            const lightIntensity = Math.max(0.15, (dot + 1) * 0.5);

            renderedFaces.push({
              pA, pB, pC,
              avgZ,
              lightIntensity,
              facing: nnz > 0,
            });
          }

          renderedFaces.sort((a, b) => a.avgZ - b.avgZ);

          for (const face of renderedFaces) {
            const { pA, pB, pC, lightIntensity, facing } = face;

            const fillAlpha = objAlpha * (facing ? 0.42 : 0.16) * lightIntensity;
            ctx.fillStyle = `rgba(${obj.color}, ${fillAlpha})`;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.lineTo(pC.x, pC.y);
            ctx.closePath();
            ctx.fill();

            const edgeAlpha = objAlpha * (facing ? 0.95 : 0.45) * (0.5 + lightIntensity * 0.5);
            ctx.strokeStyle = `rgba(${obj.color}, ${edgeAlpha})`;
            ctx.lineWidth = facing ? 1.4 : 0.9;
            ctx.stroke();
          }

          // Illuminated vertex beacons
          for (const p of projectedVerts) {
            if (!p) continue;
            const dotSize = (p.scale || 1) * 2.5;
            ctx.fillStyle = `rgba(${obj.color}, ${objAlpha * 2.0})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isTouch]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Global Subtle Topographic Grid Matrix */}
      <div className="absolute inset-0 grid-lines opacity-15 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_50%,black,transparent)]" />

      {/* 2. Full-Page Dynamic Mouse-Following Volumetric Spotlight */}
      {!isTouch && (
        <motion.div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ background: spotlightBg }}
        />
      )}

      {/* 3. Main 3D Interactive Cyber Engine Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-95"
      />

      {/* 4. Multi-Section Atmospheric Aurora Layers */}
      {/* Hero / About: Warm Champagne Amber Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 35, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-36 -left-36 h-[680px] w-[680px] rounded-full bg-amber-500/[0.05] blur-[160px]"
      />

      {/* Projects / Skills: Glacial Sky Blue Aurora */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -right-36 h-[650px] w-[650px] rounded-full bg-sky-500/[0.05] blur-[160px]"
      />

      {/* Experience: Architectural Titanium / Emerald Glow */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.035, 0.07, 0.035],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-2/3 left-1/4 h-[580px] w-[580px] rounded-full bg-emerald-500/[0.04] blur-[170px]"
      />

      {/* Contact: Warm Ochre Convergence Sphere */}
      <motion.div
        animate={{
          scale: [1, 1.22, 1],
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-36 left-1/3 h-[700px] w-[700px] rounded-full bg-amber-500/[0.04] blur-[180px]"
      />
    </div>
  );
}
