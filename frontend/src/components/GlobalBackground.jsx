import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

// ============================================================================
// 3D Mathematical Polyhedra Geometries (Vertices & Triangular Facets)
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

// 4. 4D Tesseract (Hypercube Wireframe Projection): 16 vertices, 32 struts
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

// 3D Math Helper: Rotation Matrices
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

// Project 3D point to 2D screen coordinates with perspective
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

  const springConfig = { damping: 30, stiffness: 160, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Volumetric cursor spotlight with multi-chromatic dispersion
  const spotlightBg = useMotionTemplate`radial-gradient(850px circle at ${smoothX}px ${smoothY}px, rgba(16, 185, 129, 0.05), rgba(56, 189, 248, 0.035), rgba(168, 85, 247, 0.02), transparent 70%)`;

  // Detect touch device & listen to global mouse / scroll
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

  // Main 3D Canvas Visual Engine
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

    // Camera 3D perspective orientation
    let camRotX = 0;
    let camRotY = 0;

    // Click wave ripple pulses
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
        radius: 12,
        maxRadius: Math.min(w, h) * 0.45,
        opacity: 0.55,
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    // Dynamic 3D Objects Positioned Along the Entire Portfolio Height
    const objects3D = [
      // 1. Hero Crystalline Icosahedron
      {
        id: "hero-icosa",
        type: "polyhedron",
        rawVertices: RAW_ICOSA_VERTS,
        faces: ICOSA_FACES,
        baseScale: 85,
        relX: 0.82,
        relY: 0.26,
        rx: 0.4,
        ry: 0.5,
        rz: 0.2,
        rotSpeedX: 0.0035,
        rotSpeedY: 0.0055,
        color: "52, 211, 153", // Emerald
        sectionRange: [0, 0.32],
      },
      // 2. About Multi-Axis Gyro Celestial Sphere
      {
        id: "about-gyro",
        type: "gyro",
        baseScale: 95,
        relX: 0.14,
        relY: 0.38,
        rx: 0.6,
        ry: 0.4,
        rz: 0.5,
        rotSpeedX: 0.004,
        rotSpeedY: 0.006,
        color: "56, 189, 248", // Sky Blue
        sectionRange: [0.12, 0.45],
      },
      // 3. Projects Gemstone Crystal
      {
        id: "projects-crystal",
        type: "polyhedron",
        rawVertices: RAW_CRYSTAL_VERTS,
        faces: CRYSTAL_FACES,
        baseScale: 90,
        relX: 0.88,
        relY: 0.54,
        rx: 0.5,
        ry: 0.7,
        rz: 0.2,
        rotSpeedX: 0.0045,
        rotSpeedY: 0.0035,
        color: "168, 85, 247", // Amethyst Purple
        sectionRange: [0.32, 0.65],
      },
      // 4. Skills 4D Hypercube Tesseract
      {
        id: "skills-tesseract",
        type: "tesseract",
        rawVertices: RAW_TESSERACT,
        edges: TESSERACT_EDGES,
        baseScale: 70,
        relX: 0.12,
        relY: 0.68,
        rx: 0.7,
        ry: 0.3,
        rz: 0.4,
        rotSpeedX: 0.005,
        rotSpeedY: 0.006,
        color: "20, 184, 166", // Teal
        sectionRange: [0.52, 0.82],
      },
      // 5. Experience Octahedron Star
      {
        id: "exp-octa",
        type: "polyhedron",
        rawVertices: RAW_OCTA_VERTS,
        faces: OCTA_FACES,
        baseScale: 85,
        relX: 0.85,
        relY: 0.78,
        rx: 0.3,
        ry: 0.6,
        rz: 0.1,
        rotSpeedX: 0.004,
        rotSpeedY: 0.005,
        color: "56, 189, 248", // Cyan
        sectionRange: [0.65, 0.92],
      },
      // 6. Contact Floating Core Icosahedron
      {
        id: "contact-core",
        type: "polyhedron",
        rawVertices: RAW_ICOSA_VERTS,
        faces: ICOSA_FACES,
        baseScale: 92,
        relX: 0.5,
        relY: 0.90,
        rx: 0.2,
        ry: 0.4,
        rz: 0.3,
        rotSpeedX: 0.003,
        rotSpeedY: 0.004,
        color: "52, 211, 153", // Emerald
        sectionRange: [0.78, 1.0],
      },
    ];

    // Background Ambient 3D Micro-Nodes (Depth Field Stars)
    const microNodes = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 1200,
      z: Math.random() * 800 - 200,
      size: Math.random() * 2 + 1,
      speedZ: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Main 3D Animation Render Loop
    const render = () => {
      time += 0.016;

      // Mouse easing with momentum
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 3D Camera parallax shift based on cursor
      camRotX += (mouse.normY * 0.08 - camRotX) * 0.05;
      camRotY += (mouse.normX * 0.08 - camRotY) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const isLight = document.documentElement.classList.contains("light");
      const currentScroll = window.scrollY || 0;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollNorm = currentScroll / docHeight;

      // Dynamic Light Vector (directional light source shifting with mouse)
      const lightVec = [
        -0.3 + mouse.normX * 0.25,
        -0.6 + mouse.normY * 0.25,
        0.75,
      ];
      const lightLen = Math.hypot(...lightVec);
      const normLight = lightVec.map((v) => v / lightLen);

      // ======================================================================
      // 1. 3D Micro-Node Depth Field (Drifting Celestial Depth Stars)
      // ======================================================================
      ctx.save();
      const nodeCenterX = w * 0.5;
      const nodeCenterY = h * 0.5;

      for (const node of microNodes) {
        node.z -= node.speedZ;
        if (node.z < -180) node.z = 600;

        const fov = 450;
        const dist = node.z + fov;
        if (dist <= 0) continue;
        const factor = fov / dist;

        // Apply camera tilt
        const rotX = node.x * Math.cos(camRotY) - node.z * Math.sin(camRotY);
        const rotZ = node.x * Math.sin(camRotY) + node.z * Math.cos(camRotY);
        const projX = nodeCenterX + rotX * factor;
        const projY = nodeCenterY + node.y * factor;

        if (projX < 0 || projX > w || projY < 0 || projY > h) continue;

        const alpha = node.opacity * (1 - node.z / 650) * (isLight ? 0.25 : 0.45);
        ctx.fillStyle = isLight
          ? `rgba(5, 150, 105, ${alpha})`
          : `rgba(167, 243, 208, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, node.size * factor, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // ======================================================================
      // 2. Digital Horizon Perspective Landscape (Undulating Harmonic Grid)
      // ======================================================================
      const horizonY = h * 0.68;
      const gridCols = w < 768 ? 14 : 26;
      const gridRows = w < 768 ? 8 : 13;

      ctx.save();
      for (let r = 0; r < gridRows; r++) {
        const rowNorm = r / gridRows;
        const perspectiveDepth = Math.pow(rowNorm, 2.2);
        const y = horizonY + (h - horizonY) * perspectiveDepth;
        const lineAlpha = (1 - rowNorm * 0.65) * (isLight ? 0.05 : 0.08);

        ctx.strokeStyle = isLight
          ? `rgba(5, 150, 105, ${lineAlpha})`
          : `rgba(16, 185, 129, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let c = 0; c <= gridCols; c++) {
          const colNorm = c / gridCols;
          const x = colNorm * w;

          // Undulating wave harmonics
          const wave =
            Math.sin(colNorm * 8 + time * 1.2) *
            Math.cos(rowNorm * 4 + time * 0.8) *
            (6 + rowNorm * 10);

          // Interactive mouse depression / gravity ripple
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.hypot(dx, dy);
          let mouseWave = 0;
          if (dist < 220 && dist > 0.1) {
            mouseWave = Math.sin((dist / 220) * Math.PI) * -16;
          }

          const finalY = y + wave + mouseWave;
          if (c === 0) ctx.moveTo(x, finalY);
          else ctx.lineTo(x, finalY);
        }
        ctx.stroke();
      }

      // Vertical converging perspective perspective lines
      for (let c = 0; c <= gridCols; c += 2) {
        const colNorm = c / gridCols;
        const bottomX = colNorm * w;
        const topX = w * 0.5 + (colNorm - 0.5) * w * 0.35;

        ctx.strokeStyle = isLight
          ? `rgba(37, 99, 235, 0.035)`
          : `rgba(56, 189, 248, 0.05)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      // Horizon atmospheric line glow
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 1, 0, horizonY + 24);
      horizonGrad.addColorStop(
        0,
        isLight ? "rgba(5, 150, 105, 0.1)" : "rgba(16, 185, 129, 0.16)"
      );
      horizonGrad.addColorStop(1, "transparent");
      ctx.fillStyle = horizonGrad;
      ctx.fillRect(0, horizonY - 1, w, 24);
      ctx.restore();

      // ======================================================================
      // 3. Interactive Click Shockwave Ripples
      // ======================================================================
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 4.5;
        rip.opacity *= 0.96;

        if (rip.opacity < 0.01 || rip.radius > rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = isLight
          ? `rgba(5, 150, 105, ${rip.opacity * 0.45})`
          : `rgba(52, 211, 153, ${rip.opacity * 0.55})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ======================================================================
      // 4. Floating 3D Geometric Polyhedra & Crystalline Engine
      // ======================================================================
      for (const obj of objects3D) {
        // Calculate visibility weight based on scroll elevation
        const [start, end] = obj.sectionRange;
        const mid = (start + end) / 2;
        const span = (end - start) / 2;
        const distFromMid = Math.abs(scrollNorm - mid);

        let visibility = 1 - distFromMid / span;
        if (visibility <= 0) continue;
        visibility = Math.min(Math.max(visibility, 0), 1);

        // Center position with parallax scrolling offset
        const cx = obj.relX * w;
        const scrollOffset = (scrollNorm - mid) * -190;
        const cy = obj.relY * h + scrollOffset;

        // Interactive mouse proximity & torque
        const mdx = mouse.x - cx;
        const mdy = mouse.y - cy;
        const mouseDist = Math.hypot(mdx, mdy);
        const mouseInfluence =
          mouseDist < 360 ? (1 - mouseDist / 360) * 0.8 : 0;

        obj.rx += obj.rotSpeedX + mouse.speedY * 0.0003 + mouseInfluence * 0.008;
        obj.ry += obj.rotSpeedY + mouse.speedX * 0.0003 + mouseInfluence * 0.01;
        obj.rz += 0.002;

        const currentScale =
          obj.baseScale * (1 + mouseInfluence * 0.15) * (w < 768 ? 0.7 : 1);
        const objAlpha =
          (isLight ? 0.22 : 0.38) *
          visibility *
          (1 + mouseInfluence * 0.4);

        ctx.save();

        if (obj.type === "gyro") {
          // Render concentric Gyro-Orbital Rings with Depth-Perspective
          for (let ring = 0; ring < 3; ring++) {
            const ringRadius = currentScale * (1 - ring * 0.28);
            ctx.strokeStyle = `rgba(${obj.color}, ${objAlpha * (0.8 - ring * 0.15)})`;
            ctx.lineWidth = 1.3;
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

          // Outer and inner cube struts
          ctx.strokeStyle = `rgba(${obj.color}, ${objAlpha})`;
          ctx.lineWidth = 1;
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
            const dotSize = (p.scale || 1) * 2;
            ctx.fillStyle = `rgba(${obj.color}, ${objAlpha * 1.6})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (obj.type === "polyhedron") {
          // Genuine 3D Crystalline Facets with Lambertian Light Shading & Painter's Depth Sorting
          const rotatedVerts = obj.rawVertices.map((v) => rotate3D(v, obj.rx, obj.ry, obj.rz));
          const projectedVerts = rotatedVerts.map((rot) => project3D(rot, cx, cy, currentScale));

          // Calculate faces with depth and surface normals
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

            // Average Z for Painter's algorithm depth sorting
            const avgZ = (rA[2] + rB[2] + rC[2]) / 3;

            // Lambertian lighting calculation
            const dot = nnx * normLight[0] + nny * normLight[1] + nnz * normLight[2];
            const lightIntensity = Math.max(0.12, (dot + 1) * 0.5);

            renderedFaces.push({
              pA, pB, pC,
              avgZ,
              lightIntensity,
              facing: nnz > 0, // Facing towards camera
            });
          }

          // Sort faces back to front
          renderedFaces.sort((a, b) => a.avgZ - b.avgZ);

          // Draw Shaded 3D Facets
          for (const face of renderedFaces) {
            const { pA, pB, pC, lightIntensity, facing } = face;

            // Translucent crystal fill
            const fillAlpha = objAlpha * (facing ? 0.35 : 0.12) * lightIntensity;
            ctx.fillStyle = `rgba(${obj.color}, ${fillAlpha})`;
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.lineTo(pC.x, pC.y);
            ctx.closePath();
            ctx.fill();

            // Edge highlight
            const edgeAlpha = objAlpha * (facing ? 0.85 : 0.35) * (0.5 + lightIntensity * 0.5);
            ctx.strokeStyle = `rgba(${obj.color}, ${edgeAlpha})`;
            ctx.lineWidth = facing ? 1.2 : 0.8;
            ctx.stroke();
          }

          // Illuminated vertex beacons
          for (const p of projectedVerts) {
            if (!p) continue;
            const dotSize = (p.scale || 1) * 2.2;
            ctx.fillStyle = `rgba(${obj.color}, ${objAlpha * 1.8})`;
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
        className="absolute inset-0 h-full w-full opacity-90"
      />

      {/* 4. Multi-Section Atmospheric Aurora Layers */}
      {/* Hero / About: Emerald Aurora Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 35, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-36 -left-36 h-[650px] w-[650px] rounded-full bg-emerald-500/[0.055] blur-[160px]"
      />

      {/* Projects / Skills: Electric Cyan & Blue Aurora */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 -right-36 h-[620px] w-[620px] rounded-full bg-sky-500/[0.045] blur-[160px]"
      />

      {/* Experience: Teal & Jade Atmospheric Core */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-2/3 left-1/4 h-[550px] w-[550px] rounded-full bg-teal-500/[0.04] blur-[170px]"
      />

      {/* Contact: Violet & Amethyst Convergence Sphere */}
      <motion.div
        animate={{
          scale: [1, 1.22, 1],
          x: [0, 30, 0],
          y: [0, -25, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-36 left-1/3 h-[680px] w-[680px] rounded-full bg-purple-500/[0.04] blur-[180px]"
      />
    </div>
  );
}
