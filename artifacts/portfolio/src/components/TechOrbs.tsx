import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Duplicate popular techs so the space feels full
const BALLS = [
  // JS x3
  { name: "JS",         slug: "javascript",       color: "#f7df1e", bg: "#2b2700" },
  { name: "JS",         slug: "javascript",       color: "#f7df1e", bg: "#2b2700" },
  { name: "JS",         slug: "javascript",       color: "#f7df1e", bg: "#2b2700" },
  // Flutter x3
  { name: "Flutter",    slug: "flutter",          color: "#54c5f8", bg: "#0d1f26" },
  { name: "Flutter",    slug: "flutter",          color: "#54c5f8", bg: "#0d1f26" },
  { name: "Flutter",    slug: "flutter",          color: "#54c5f8", bg: "#0d1f26" },
  // Java x3
  { name: "Java",       slug: "java",             color: "#f89820", bg: "#2b1800" },
  { name: "Java",       slug: "java",             color: "#f89820", bg: "#2b1800" },
  { name: "Java",       slug: "java",             color: "#f89820", bg: "#2b1800" },
  // C++ x2
  { name: "C++",        slug: "cplusplus",        color: "#9b4dca", bg: "#1a0a2b" },
  { name: "C++",        slug: "cplusplus",        color: "#9b4dca", bg: "#1a0a2b" },
  // Dart x2
  { name: "Dart",       slug: "dart",             color: "#00b4ab", bg: "#002d2b" },
  { name: "Dart",       slug: "dart",             color: "#00b4ab", bg: "#002d2b" },
  // Firebase x2
  { name: "Firebase",   slug: "firebase",         color: "#ffca28", bg: "#2b2000" },
  { name: "Firebase",   slug: "firebase",         color: "#ffca28", bg: "#2b2000" },
  // MySQL x2
  { name: "MySQL",      slug: "mysql",            color: "#4479a1", bg: "#0c1a26" },
  { name: "MySQL",      slug: "mysql",            color: "#4479a1", bg: "#0c1a26" },
  // MongoDB x2
  { name: "MongoDB",    slug: "mongodb",          color: "#47a248", bg: "#0a1f0a" },
  { name: "MongoDB",    slug: "mongodb",          color: "#47a248", bg: "#0a1f0a" },
  // C# x2
  { name: "C#",         slug: "csharp",           color: "#239120", bg: "#0a1a0a" },
  { name: "C#",         slug: "csharp",           color: "#239120", bg: "#0a1a0a" },
  // Singles
  { name: "TypeScript", slug: "typescript",       color: "#3178c6", bg: "#0d1a2e" },
  { name: "React",      slug: "react",            color: "#61dafb", bg: "#0d2026" },
  { name: "Node.js",    slug: "nodedotjs",        color: "#5fa04e", bg: "#0a1a08" },
  { name: "Express",    slug: "express",          color: "#cccccc", bg: "#1a1a1a" },
  { name: "Git",        slug: "git",              color: "#f05032", bg: "#2a0a06" },
  { name: "VS Code",    slug: "visualstudiocode", color: "#007acc", bg: "#001b30" },
  { name: "Android",    slug: "android",          color: "#3ddc84", bg: "#062616" },
  { name: "GitHub",     slug: "github",           color: "#aaaaaa", bg: "#1a1a1a" },
  { name: "Postman",    slug: "postman",          color: "#ff6c37", bg: "#2a1008" },
  { name: "PHP",        slug: "php",              color: "#777bb4", bg: "#10102a" },
  { name: "REST",       slug: "openapiinitiative",color: "#6ba539", bg: "#0f1a08" },
  { name: "Tailwind",   slug: "tailwindcss",      color: "#38bdf8", bg: "#0d2030" },
];

const BOWL_R  = 3.8;   // invisible boundary radius
const BALL_R  = 0.52;  // ball radius (bigger)
const GRAVITY = 0.05;
const DAMPING = 0.84;
const REPEL_R = 2.0;
const REPEL_F = 0.24;
const SEP_K   = 0.08;

interface BallState {
  mesh: THREE.Mesh;
  sprite: THREE.Sprite;
  vel: THREE.Vector3;
}

/** Canvas texture: 3D shiny sphere look with bg + rim */
function makeSphereTexture(sk: (typeof BALLS)[number]): THREE.CanvasTexture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;

  const draw = (logo?: HTMLImageElement) => {
    ctx.clearRect(0, 0, S, S);

    // base fill
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
    ctx.fillStyle = sk.bg;
    ctx.fill();

    // sheen — top-left highlight makes it look 3D
    const shine = ctx.createRadialGradient(S * 0.33, S * 0.28, 0, S / 2, S / 2, S / 2);
    shine.addColorStop(0,    "rgba(255,255,255,0.60)");
    shine.addColorStop(0.30, "rgba(255,255,255,0.15)");
    shine.addColorStop(0.65, "rgba(255,255,255,0.03)");
    shine.addColorStop(1,    "rgba(0,0,0,0.50)");
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2);
    ctx.fillStyle = shine;
    ctx.fill();

    // colored rim
    ctx.beginPath();
    ctx.arc(S / 2, S / 2, S / 2 - 4, 0, Math.PI * 2);
    ctx.strokeStyle = sk.color + "bb";
    ctx.lineWidth = 8;
    ctx.stroke();
  };

  draw();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;

  // logo drawn into another canvas used by the Sprite
  return tex;
}

/** Sprite texture: logo only on transparent bg — always faces camera */
function makeSpriteTexture(sk: (typeof BALLS)[number]): THREE.CanvasTexture {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d")!;

  // text fallback
  const drawText = () => {
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = sk.color;
    ctx.font = `bold ${S * 0.26}px 'Space Grotesk', monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sk.name.slice(0, 4), S / 2, S / 2 + 2);
  };
  drawText();

  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = `https://cdn.simpleicons.org/${sk.slug}/${sk.color.replace("#", "")}`;
  img.onload = () => {
    ctx.clearRect(0, 0, S, S);
    const pad = S * 0.15;
    ctx.drawImage(img, pad, pad, S - pad * 2, S - pad * 2);
    tex.needsUpdate = true;
  };

  return tex;
}

// 2-D fallback when WebGL unavailable
function FallbackOrbs() {
  return (
    <div className="w-full flex flex-wrap gap-3 justify-center items-center py-8" style={{ height: 560 }}>
      {BALLS.filter((b, i, a) => a.findIndex(x => x.slug === b.slug) === i).map((sk) => (
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
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sk.color }} />
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
    // WebGL availability check
    try {
      const t = document.createElement("canvas");
      if (!t.getContext("webgl") && !t.getContext("experimental-webgl")) {
        setWebglFailed(true);
        return;
      }
    } catch { setWebglFailed(true); return; }

    const mount = mountRef.current!;

    // ── Renderer ─────────────────────────────────────────────────────
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch { setWebglFailed(true); return; }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const setSize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ─────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 11);
    setSize();

    // ── Lights ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(5, 8, 6);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x88aaff, 0.5);
    rim.position.set(-6, -3, 5);
    scene.add(rim);
    const fill = new THREE.PointLight(0xaaddff, 0.3, 25);
    fill.position.set(0, 0, 7);
    scene.add(fill);

    // ── Balls ─────────────────────────────────────────────────────
    const ballGeo = new THREE.SphereGeometry(BALL_R, 40, 40);
    const balls: BallState[] = BALLS.map((sk) => {
      // Sphere mesh — shiny 3D look from canvas texture
      const sphereTex = makeSphereTexture(sk);
      const mat = new THREE.MeshStandardMaterial({
        map: sphereTex,
        roughness: 0.15,
        metalness: 0.05,
      });
      const mesh = new THREE.Mesh(ballGeo, mat);

      // Sprite child — logo always faces camera (no UV-wrap distortion)
      const spriteTex = makeSpriteTexture(sk);
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteTex,
        transparent: true,
        depthTest: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      // Size slightly smaller than ball diameter, slightly in front
      sprite.scale.set(BALL_R * 1.3, BALL_R * 1.3, 1);
      sprite.position.set(0, 0, BALL_R * 0.55); // pushed toward camera face
      mesh.add(sprite);

      // Random start position inside bowl
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = (BOWL_R - BALL_R - 0.3) * (0.2 + Math.random() * 0.7);
      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      scene.add(mesh);
      return { mesh, sprite, vel: new THREE.Vector3() };
    });

    // ── Mouse ──────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouseNDC  = new THREE.Vector2(-9999, -9999);
    let mActive     = false;

    const onMove = (e: MouseEvent) => {
      const r = mount.getBoundingClientRect();
      mouseNDC.set(
        ((e.clientX - r.left) / r.width)  *  2 - 1,
        ((e.clientY - r.top)  / r.height) * -2 + 1
      );
      mActive = true;
    };
    const onLeave = () => { mActive = false; };
    mount.addEventListener("mousemove", onMove);
    mount.addEventListener("mouseleave", onLeave);

    const ro = new ResizeObserver(setSize);
    ro.observe(mount);

    // ── Physics loop ───────────────────────────────────────────────
    const _a = new THREE.Vector3();
    const _b = new THREE.Vector3();
    let rafId = 0;

    const loop = () => {
      rafId = requestAnimationFrame(loop);

      if (mActive) raycaster.setFromCamera(mouseNDC, camera);

      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const pos  = ball.mesh.position;

        // 1. Gravity — spring toward center
        _a.copy(pos).multiplyScalar(-GRAVITY);
        ball.vel.add(_a);

        // 2. Cursor repulsion via ray distance
        if (mActive) {
          _a.copy(pos).sub(raycaster.ray.origin);
          const t = Math.max(0, _a.dot(raycaster.ray.direction));
          _b.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, t);
          const rd = pos.distanceTo(_b);
          if (rd < REPEL_R && rd > 0.01) {
            const f = REPEL_F * Math.pow(1 - rd / REPEL_R, 1.6);
            _a.copy(pos).sub(_b).normalize().multiplyScalar(f);
            ball.vel.add(_a);
          }
        }

        // 3. Ball-ball separation (symmetric, only i<j to avoid double-apply)
        for (let j = i + 1; j < balls.length; j++) {
          const b2   = balls[j];
          _a.copy(pos).sub(b2.mesh.position);
          const d    = _a.length();
          const minD = BALL_R * 2.1;
          if (d < minD && d > 0.001) {
            const push = (minD - d) * SEP_K * 0.5;
            _a.normalize().multiplyScalar(push);
            ball.vel.add(_a);
            b2.vel.sub(_a);
          }
        }

        // 4. Hard boundary — invisible containing sphere
        const dist    = pos.length();
        const maxDist = BOWL_R - BALL_R;
        if (dist > maxDist) {
          pos.normalize().multiplyScalar(maxDist);
          const normal = pos.clone().normalize();
          const vn = ball.vel.dot(normal);
          if (vn > 0) ball.vel.addScaledVector(normal, -vn * 1.05);
        }

        // 5. Damp + integrate
        ball.vel.multiplyScalar(DAMPING);
        pos.addScaledVector(ball.vel, 1);

        // Gentle rotation for 3D depth feel
        ball.mesh.rotation.y += 0.005;
        ball.mesh.rotation.x += 0.002;
      }

      // Slow scene auto-rotate
      scene.rotation.y += 0.0006;

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
