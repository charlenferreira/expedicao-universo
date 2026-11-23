import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  depth: number; // parallax depth 0.15 to 1.0
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: 'white' | 'cyan' | 'indigo' | 'gold';
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let meteors: ShootingStar[] = [];
    let animationFrameId = 0;

    // Smooth mouse & scroll parallax state (kept strictly outside React state)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = window.scrollY;

    const starColorMap: Record<Star['hue'], string> = {
      white: '240, 249, 255',
      cyan: '125, 211, 252',
      indigo: '165, 180, 252',
      gold: '253, 224, 130',
    };

    const generateStars = () => {
      const area = width * height;
      const count = Math.min(Math.max(Math.floor(area / 6200), 140), 340);
      stars = Array.from({ length: count }, () => {
        const rand = Math.random();
        let hue: Star['hue'] = 'white';
        if (rand > 0.88) hue = 'gold';
        else if (rand > 0.68) hue = 'cyan';
        else if (rand > 0.52) hue = 'indigo';

        const depth = 0.18 + Math.random() * 0.82;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.45 + depth * 1.45,
          depth,
          baseAlpha: 0.25 + depth * 0.65,
          twinkleSpeed: 0.6 + Math.random() * 2.1,
          twinklePhase: Math.random() * Math.PI * 2,
          hue,
        };
      });
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / Math.max(width, 1) - 0.5) * 2;
      targetMouseY = (e.clientY / Math.max(height, 1) - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastTime = performance.now();
    let meteorCooldown = 4.2;

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now * 0.001;

      // Smooth interpolation for mouse parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // 1. Deep Night Blue Space Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width * 0.35, height);
      bgGrad.addColorStop(0, '#040814');
      bgGrad.addColorStop(0.5, '#071026');
      bgGrad.addColorStop(1, '#050c1f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Diffuse Nebulae Layers (Cobalt, Luminous Cyan, Deep Cosmic Indigo)
      const scrollDrift = (scrollY * 0.06) % (height * 1.4);

      const drawNebula = (
        cx: number,
        cy: number,
        radius: number,
        innerColor: string,
        midColor: string
      ) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, innerColor);
        grad.addColorStop(0.45, midColor);
        grad.addColorStop(1, 'rgba(4, 8, 20, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      const driftX = prefersReducedMotion ? 0 : Math.sin(t * 0.08) * 24;
      const driftY = prefersReducedMotion ? 0 : Math.cos(t * 0.06) * 18;

      drawNebula(
        width * 0.16 - currentMouseX * 26 + driftX,
        height * 0.22 - scrollDrift * 0.18 - currentMouseY * 18 + driftY,
        Math.max(width, height) * 0.46,
        'rgba(14, 116, 214, 0.16)',
        'rgba(11, 26, 59, 0.12)'
      );

      drawNebula(
        width * 0.84 - currentMouseX * 32 - driftX,
        height * 0.34 - scrollDrift * 0.12 - currentMouseY * 22,
        Math.max(width, height) * 0.48,
        'rgba(56, 189, 248, 0.13)',
        'rgba(30, 58, 138, 0.09)'
      );

      drawNebula(
        width * 0.52 - currentMouseX * 18,
        height * 0.82 - scrollDrift * 0.15 - currentMouseY * 16 - driftY,
        Math.max(width, height) * 0.52,
        'rgba(99, 102, 241, 0.13)',
        'rgba(11, 26, 59, 0.08)'
      );

      // Subtle stellar gold warmth far in the deep core
      drawNebula(
        width * 0.72 - currentMouseX * 12,
        height * 0.72 - scrollDrift * 0.08,
        Math.max(width, height) * 0.26,
        'rgba(252, 211, 77, 0.045)',
        'rgba(252, 211, 77, 0.01)'
      );

      // 3. Multi-layered Twinkling Stars with Parallax
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const pxOffsetX = -currentMouseX * 24 * s.depth;
        const pxOffsetY = -currentMouseY * 24 * s.depth - scrollY * 0.09 * s.depth;

        let drawX = (s.x + pxOffsetX) % width;
        let drawY = (s.y + pxOffsetY) % height;
        if (drawX < 0) drawX += width;
        if (drawY < 0) drawY += height;

        const twinkle = prefersReducedMotion
          ? 1
          : 0.62 + 0.38 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const alpha = Math.min(1, s.baseAlpha * twinkle);
        const rgb = starColorMap[s.hue];

        ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow halo on brighter foreground stars
        if (s.radius > 1.45 && alpha > 0.55) {
          ctx.fillStyle = `rgba(${rgb}, ${(alpha * 0.18).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, s.radius * 3.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Occasional Subtle Shooting Stars
      if (!prefersReducedMotion) {
        meteorCooldown -= dt;
        if (meteorCooldown <= 0 && meteors.length < 2) {
          meteorCooldown = 5.5 + Math.random() * 6.5;
          const startX = width * (0.2 + Math.random() * 0.75);
          const startY = height * (0.04 + Math.random() * 0.35);
          const speed = 520 + Math.random() * 260;
          const angle = Math.PI * (0.68 + Math.random() * 0.14);
          meteors.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            length: 70 + Math.random() * 65,
            life: 0,
            maxLife: 0.75 + Math.random() * 0.45,
          });
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.life += dt;
          m.x += m.vx * dt;
          m.y += m.vy * dt;

          const progress = m.life / m.maxLife;
          if (progress >= 1) {
            meteors.splice(i, 1);
            continue;
          }

          const fade = Math.sin(progress * Math.PI);
          const norm = Math.hypot(m.vx, m.vy) || 1;
          const tailX = m.x - (m.vx / norm) * m.length;
          const tailY = m.y - (m.vy / norm) * m.length;

          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          grad.addColorStop(0, `rgba(224, 242, 254, ${(fade * 0.85).toFixed(3)})`);
          grad.addColorStop(0.35, `rgba(56, 189, 248, ${(fade * 0.45).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none block w-full h-full"
    />
  );
}
