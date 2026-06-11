import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SKILLS = [
  { name: "JavaScript", slug: "javascript",  color: "#f7df1e", bg: "#2b2700" },
  { name: "TypeScript", slug: "typescript",  color: "#3178c6", bg: "#0d1a2e" },
  { name: "HTML5",      slug: "html5",       color: "#e34f26", bg: "#2a0c04" },
  { name: "CSS3",       slug: "css3",        color: "#1572b6", bg: "#0b1e30" },
  { name: "React",      slug: "react",       color: "#61dafb", bg: "#0d2026" },
  { name: "Flutter",    slug: "flutter",     color: "#54c5f8", bg: "#0d1f26" },
  { name: "Dart",       slug: "dart",        color: "#00b4ab", bg: "#002d2b" },
  { name: "MongoDB",    slug: "mongodb",     color: "#47a248", bg: "#0a1f0a" },
  { name: "Firebase",   slug: "firebase",    color: "#ffca28", bg: "#2b2000" },
  { name: "MySQL",      slug: "mysql",       color: "#4479a1", bg: "#0c1a26" },
  { name: "Express",    slug: "express",     color: "#cccccc", bg: "#1a1a1a" },
  { name: "C++",        slug: "cplusplus",   color: "#9b4dca", bg: "#1a0a2b" },
  { name: "Java",       slug: "java",        color: "#f89820", bg: "#2b1800" },
  { name: "Node.js",    slug: "nodedotjs",   color: "#5fa04e", bg: "#0a1a08" },
  { name: "Git",        slug: "git",         color: "#f05032", bg: "#2a0a06" },
  { name: "Figma",      slug: "figma",       color: "#f24e1e", bg: "#2a0c04" },
  { name: "Python",     slug: "python",      color: "#3776ab", bg: "#0b1e30" },
  { name: "Docker",     slug: "docker",      color: "#2496ed", bg: "#051830" },
  { name: "Android",    slug: "android",     color: "#3ddc84", bg: "#062616" },
  { name: "GitHub",     slug: "github",      color: "#aaaaaa", bg: "#1a1a1a" },
  { name: "Postman",    slug: "postman",     color: "#ff6c37", bg: "#2a1008" },
  { name: "VS Code",    slug: "visualstudiocode", color: "#007acc", bg: "#001b30" },
  { name: "Linux",      slug: "linux",       color: "#fcc624", bg: "#2b2000" },
  { name: "Vue.js",     slug: "vuedotjs",    color: "#42b883", bg: "#0a2018" },
];

const BOWL_R  = 3.4;
const BALL_R  = 0.44;
const GRAVITY = 0.055;
const DAMPING = 0.86;
const REPEL_R = 1.8;
const REPEL_F = 0.22;
const SEP_K   = 0.09;

interface BallState {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
}

function makeCanvasTexture(sk: (typeof SKILLS)[number]): THREE.CanvasTexture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const x = c.getContext("2d")!;

  function drawFace(logoImg?: HTMLImageElement) {
    x.clearRect(0, 0, S, S);

    // ── background circle ──
    x.beginPath();
    x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
    x.fillStyle = sk.bg;
    x.fill();

    // ── logo or text ──
    if (logoImg) {
      const pad = S * 0.2;
      x.save();
      x.beginPath();
      x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
      x.clip();
      x.drawImage(logoImg, pad, pad, S - pad * 2, S - pad * 2);
      x.restore();
    } else {
      x.fillStyle = sk.color;
      x.font = `bold ${S * 0.22}px 'Space Grotesk', monospace`;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText(sk.name.slice(0, 3), S / 2, S / 2);
    }

    // ── spherical glass sheen ──
    const shine = x.createRadialGradient(S * 0.35, S * 0.28, 0, S / 2, S / 2, S / 2);
    shine.addColorStop(0,    "rgba(255,255,255,0.55)");
    shine.addColorStop(0.35, "rgba(255,255,255,0.12)");
    shine.addColorStop(0.7,  "rgba(255,255,255,0.02)");
    shine.addColorStop(1,    "rgba(0,0,0,0.45)");
    x.beginPath();
    x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
    x.fillStyle = shine;
    x.fill();

    // ── coloured rim ──
    x.beginPath();
    x.arc(S / 2, S / 2, S / 2 - 4, 0, Math.PI * 2);
    x.strokeStyle = sk.color + "99";
    x.lineWidth = 7;
    x.stroke();
  }

  drawFace();
  const tex = new THREE.CanvasTexture(c);

  // Load SVG logo and redraw
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `https://cdn.simpleicons.org/${sk.slug}/${sk.color.replace("#", "")}`;
  img.onload = () => { drawFace(img); tex.needsUpdate = true; };

  return tex;
}

// 2-D fallback when WebGL is unavailable
function FallbackOrbs() {
  return (
    <div className="w-full flex flex-wrap gap-3 justify-center items-center py-6" style={{ height: 560 }}>
      {SKILLS.map((sk) => (
        <div
          key={sk.slug}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono font-semibold"
          style={{
            background: sk.bg,
            border: `1.5px solid ${sk.color}55`,
            color: sk.color,
            boxShadow: `0 0 10px ${sk.color}22`,
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: sk.color }}
          />
          {sk.name}
        </div>
      ))}
    </div>
  );
}

export function TechOrbs() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    // Quick WebGL support check before mounting Three.js
    try {
      const testCanvas = document.createElement("canvas");
      const testCtx = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!testCtx) { setWebglFailed(true); return; }
    } catch {
      setWebglFailed(true);
      return;
    }

    const mount = mountRef.current!;

    // ── Renderer ─────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const setSize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    setSize();

    // ── Lights ───────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(6, 8, 5);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x88aaff, 0.5);
    rim.position.set(-5, -3, 4);
    scene.add(rim);
    const fill = new THREE.PointLight(0xaaddff, 0.3, 20);
    fill.position.set(0, 0, 6);
    scene.add(fill);

    // ── Outer glass bowl ─────────────────────────────────────────────
    const bowlGeo = new THREE.SphereGeometry(BOWL_R, 64, 64);

    // Inner surface — soft glass tint
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x4466bb,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
      shininess: 120,
      specular: 0x8899ff,
    });
    scene.add(new THREE.Mesh(bowlGeo, innerMat));

    // Outer surface — thin specular highlight
    const outerMat = new THREE.MeshPhongMaterial({
      color: 0x5577cc,
      transparent: true,
      opacity: 0.04,
      side: THREE.FrontSide,
      shininess: 200,
      specular: 0xaabbff,
    });
    scene.add(new THREE.Mesh(bowlGeo, outerMat));

    // Wireframe bowl skeleton
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x1144aa,
      wireframe: true,
      transparent: true,
      opacity: 0.10,
    });
    scene.add(new THREE.Mesh(bowlGeo, wireMat));

    // ── Small balls ───────────────────────────────────────────────────
    const ballGeo = new THREE.SphereGeometry(BALL_R, 36, 36);
    const balls: BallState[] = SKILLS.map((sk) => {
      const mat = new THREE.MeshStandardMaterial({
        map: makeCanvasTexture(sk),
        roughness: 0.18,
        metalness: 0.08,
      });
      const mesh = new THREE.Mesh(ballGeo, mat);

      // Spread initial positions inside bowl (not all at exact center)
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = (BOWL_R - BALL_R - 0.2) * (0.3 + Math.random() * 0.6);
      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      scene.add(mesh);
      return { mesh, vel: new THREE.Vector3() };
    });

    // ── Mouse / ray ───────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouseNDC  = new THREE.Vector2(-9999, -9999);
    let mActive     = false;

    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      mouseNDC.set(
        ((e.clientX - r.left)  / r.width)  *  2 - 1,
        ((e.clientY - r.top)   / r.height) * -2 + 1
      );
      mActive = true;
    };
    const onLeave = () => { mActive = false; };
    mount.addEventListener("mousemove", onMove);
    mount.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    // ── Physics loop ──────────────────────────────────────────────────
    const _tmp  = new THREE.Vector3();
    const _tmp2 = new THREE.Vector3();
    let rafId   = 0;

    const loop = () => {
      rafId = requestAnimationFrame(loop);

      if (mActive) raycaster.setFromCamera(mouseNDC, camera);

      for (let i = 0; i < balls.length; i++) {
        const a   = balls[i];
        const pos = a.mesh.position;

        // 1. Gravity toward centre (spring)
        _tmp.copy(pos).multiplyScalar(-GRAVITY);
        a.vel.add(_tmp);

        // 2. Cursor repulsion — closest point on camera ray
        if (mActive) {
          _tmp.copy(pos).sub(raycaster.ray.origin);
          const t = Math.max(0, _tmp.dot(raycaster.ray.direction));
          _tmp2.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, t);
          const repelDist = pos.distanceTo(_tmp2);
          if (repelDist < REPEL_R && repelDist > 0.01) {
            const f = REPEL_F * Math.pow(1 - repelDist / REPEL_R, 1.8);
            _tmp.copy(pos).sub(_tmp2).normalize().multiplyScalar(f);
            a.vel.add(_tmp);
          }
        }

        // 3. Ball-ball separation (symmetric)
        for (let j = i + 1; j < balls.length; j++) {
          const b    = balls[j];
          _tmp.copy(pos).sub(b.mesh.position);
          const d    = _tmp.length();
          const minD = BALL_R * 2.08;
          if (d < minD && d > 0.001) {
            const push = (minD - d) * SEP_K;
            _tmp.normalize().multiplyScalar(push * 0.5);
            a.vel.add(_tmp);
            b.vel.sub(_tmp);
          }
        }

        // 4. Hard boundary — keep inside bowl
        const dist    = pos.length();
        const maxDist = BOWL_R - BALL_R;
        if (dist > maxDist) {
          pos.normalize().multiplyScalar(maxDist);
          // Cancel outward velocity component
          const vn = a.vel.dot(pos.clone().normalize());
          if (vn > 0) a.vel.addScaledVector(pos.clone().normalize(), -vn * 1.1);
        }

        // 5. Damp + integrate
        a.vel.multiplyScalar(DAMPING);
        pos.addScaledVector(a.vel, 1);

        // Slow spin for visual depth
        a.mesh.rotation.y += 0.004;
        a.mesh.rotation.x += 0.0015;
      }

      // Gently rotate the whole bowl
      scene.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mount.removeEventListener("mousemove", onMove);
      mount.removeEventListener("mouseleave", onLeave);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (webglFailed) return <FallbackOrbs />;

  return (
    <div
      ref={mountRef}
      className="w-full cursor-none"
      style={{ height: 560 }}
    />
  );
}
