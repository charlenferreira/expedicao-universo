import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Compass,
  Eye,
  EyeOff,
  Maximize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  EXPLORER_BODIES,
  type ExplorerBody,
  type ExplorerScale,
} from '../data/cosmicData';

interface ScreenBodyPos {
  body: ExplorerBody;
  sx: number;
  sy: number;
  hitRadius: number;
  orbitScreenRadius?: number;
  parentSx?: number;
  parentSy?: number;
}

interface HoverTooltipState {
  body: ExplorerBody;
  x: number;
  y: number;
}

const SCALE_TABS: { id: ExplorerScale; label: string; subtitle: string }[] = [
  {
    id: 'solar',
    label: 'Escala Sistema Solar',
    subtitle: 'Sol, 8 órbitas planetárias e luas proeminentes',
  },
  {
    id: 'milkyway',
    label: 'Escala Via Láctea',
    subtitle: 'Sagitário A*, Braço de Órion e estrelas vizinhas',
  },
  {
    id: 'localgroup',
    label: 'Escala Grupo Local',
    subtitle: 'Via Láctea, Andrômeda, Triângulo e satélites',
  },
];

// Deterministic procedural star cloud for Milky Way & background depth
interface GalaxyParticle {
  angle: number;
  radius: number;
  size: number;
  alpha: number;
  color: string;
}

function createMilkyWayParticles(): GalaxyParticle[] {
  const particles: GalaxyParticle[] = [];
  let seed = 4219;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // 4 logarithmic spiral arms + bar dust
  for (let i = 0; i < 650; i++) {
    const arm = i % 4;
    const dist = Math.pow(rand(), 0.72) * 320;
    const baseAngle = (arm * Math.PI) / 2 + dist * 0.017;
    const spread = (rand() - 0.5) * (0.42 + dist / 460);
    const angle = baseAngle + spread;

    const paletteRoll = rand();
    let color = '186, 230, 253'; // sky-200
    if (dist < 68) color = '253, 224, 130'; // golden core
    else if (paletteRoll > 0.72) color = '129, 140, 248'; // indigo
    else if (paletteRoll > 0.45) color = '56, 189, 248'; // cyan

    particles.push({
      angle,
      radius: dist,
      size: 0.7 + rand() * 1.9,
      alpha: 0.18 + rand() * 0.65,
      color,
    });
  }
  return particles;
}

const MILKY_WAY_PARTICLES = createMilkyWayParticles();

export function SpaceExplorerSection() {
  const [scale, setScale] = useState<ExplorerScale>('solar');
  const [selectedBodyId, setSelectedBodyId] = useState<string | null>('terra');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [hoverTooltip, setHoverTooltip] = useState<HoverTooltipState | null>(null);
  const [isDraggingUI, setIsDraggingUI] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mutable animation & camera refs to keep 60fps with zero unnecessary React re-renders
  const simTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const showOrbitsRef = useRef<boolean>(showOrbits);
  const scaleRef = useRef<ExplorerScale>(scale);
  const selectedIdRef = useRef<string | null>(selectedBodyId);
  const hoveredIdRef = useRef<string | null>(null);

  const cameraRef = useRef({
    x: 0,
    y: 0,
    zoom: 1,
    targetX: 0,
    targetY: 0,
    targetZoom: 1,
  });

  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    camStartX: 0,
    camStartY: 0,
  });

  const screenPositionsRef = useRef<ScreenBodyPos[]>([]);

  const bodiesInScale = useMemo(
    () => EXPLORER_BODIES.filter((b) => b.scale === scale),
    [scale]
  );

  const selectedBody = useMemo(
    () => EXPLORER_BODIES.find((b) => b.id === selectedBodyId) ?? null,
    [selectedBodyId]
  );

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    showOrbitsRef.current = showOrbits;
  }, [showOrbits]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    selectedIdRef.current = selectedBodyId;
  }, [selectedBodyId]);

  const handleScaleChange = (newScale: ExplorerScale) => {
    setScale(newScale);
    setHoverTooltip(null);
    hoveredIdRef.current = null;
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1;
    setZoomPercent(100);

    // Pre-select iconic focal object for each scale
    if (newScale === 'solar') setSelectedBodyId('terra');
    else if (newScale === 'milkyway') setSelectedBodyId('sistema-solar-mw');
    else setSelectedBodyId('via-lactea-lg');
  };

  const adjustZoom = useCallback((factor: number) => {
    const next = Math.min(2.6, Math.max(0.55, cameraRef.current.targetZoom * factor));
    cameraRef.current.targetZoom = next;
    setZoomPercent(Math.round(next * 100));
  }, []);

  const resetCamera = useCallback(() => {
    cameraRef.current.targetX = 0;
    cameraRef.current.targetY = 0;
    cameraRef.current.targetZoom = 1;
    setZoomPercent(100);
  }, []);

  const focusOnBody = useCallback((bodyId: string) => {
    setSelectedBodyId(bodyId);
    const pos = screenPositionsRef.current.find((p) => p.body.id === bodyId);
    const canvas = canvasRef.current;
    if (!pos || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cx = rect.width * 0.5;
    const cy = rect.height * 0.5;
    const cam = cameraRef.current;
    // Convert current screen position back to world offset and ease toward it
    const worldX = (pos.sx - cx) / cam.zoom + cam.x;
    const worldY = (pos.sy - cy) / cam.zoom + cam.y;

    cam.targetX = worldX;
    cam.targetY = worldY;
    if (pos.body.visualType === 'moon') {
      cam.targetZoom = Math.max(cam.targetZoom, 1.85);
      setZoomPercent(Math.round(cam.targetZoom * 100));
    }
  }, []);

  // Main 60fps Canvas 2D Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId = 0;
    let lastTime = performance.now();

    const resize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const drawSpiralGalaxy = (
      x: number,
      y: number,
      radius: number,
      color: string,
      rotation: number,
      tiltY: number,
      isHighlighted: boolean
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(1, tiltY);

      const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 1.9);
      halo.addColorStop(0, 'rgba(254, 243, 199, 0.92)');
      halo.addColorStop(0.28, isHighlighted ? 'rgba(56, 189, 248, 0.55)' : 'rgba(129, 140, 248, 0.36)');
      halo.addColorStop(0.65, 'rgba(56, 189, 248, 0.12)');
      halo.addColorStop(1, 'rgba(4, 8, 20, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.9, 0, Math.PI * 2);
      ctx.fill();

      // 2 bright logarithmic arms
      for (let arm = 0; arm < 2; arm++) {
        ctx.beginPath();
        for (let step = 0; step < 36; step++) {
          const frac = step / 35;
          const theta = arm * Math.PI + frac * Math.PI * 2.15;
          const r = frac * radius * 1.35;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = isHighlighted ? 0.85 : 0.62;
        ctx.lineWidth = Math.max(1.6, radius * 0.11);
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#FFFBEB';
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.28, radius * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isPlayingRef.current && !prefersReducedMotion) {
        simTimeRef.current += dt;
      }
      const t = simTimeRef.current;

      // Smooth camera interpolation
      const cam = cameraRef.current;
      cam.x += (cam.targetX - cam.x) * 0.11;
      cam.y += (cam.targetY - cam.y) * 0.11;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.11;

      const currentScale = scaleRef.current;
      const activeScaleBodies = EXPLORER_BODIES.filter((b) => b.scale === currentScale);
      const hoveredId = hoveredIdRef.current;
      const selectedId = selectedIdRef.current;

      // Clear canvas with translucent cosmic stage backdrop
      ctx.clearRect(0, 0, width, height);

      // Subtle atmospheric radial depth inside stage
      const stageGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.68
      );
      stageGlow.addColorStop(0, 'rgba(14, 38, 84, 0.34)');
      stageGlow.addColorStop(0.65, 'rgba(7, 16, 38, 0.22)');
      stageGlow.addColorStop(1, 'rgba(4, 8, 20, 0.45)');
      ctx.fillStyle = stageGlow;
      ctx.fillRect(0, 0, width, height);

      // Coordinate reference grid (ultra subtle astrometric crosshair)
      ctx.save();
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.045)';
      ctx.lineWidth = 1;
      const gridSpacing = 72 * cam.zoom;
      const centerX = width * 0.5 - cam.x * cam.zoom;
      const centerY = height * 0.5 - cam.y * cam.zoom;

      if (gridSpacing > 24) {
        for (let gx = centerX % gridSpacing; gx < width; gx += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, height);
          ctx.stroke();
        }
        for (let gy = centerY % gridSpacing; gy < height; gy += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(width, gy);
          ctx.stroke();
        }
      }
      ctx.restore();

      const baseUnit = Math.min(width, height) * 0.44;
      const solarFitFactor = Math.min(width, height) / 890;
      const newPositions: ScreenBodyPos[] = [];
      const planetWorldPos = new Map<string, { wx: number; wy: number; sx: number; sy: number }>();

      // ================= BACKGROUND STRUCTURES BY SCALE =================
      if (currentScale === 'milkyway') {
        ctx.save();
        ctx.translate(centerX, centerY);
        const mwScale = (baseUnit / 290) * cam.zoom;
        ctx.scale(mwScale, mwScale * 0.78);
        ctx.rotate(t * 0.025);

        // Galactic disc glow
        const discGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, 330);
        discGrad.addColorStop(0, 'rgba(252, 211, 77, 0.38)');
        discGrad.addColorStop(0.24, 'rgba(56, 189, 248, 0.16)');
        discGrad.addColorStop(0.6, 'rgba(79, 70, 229, 0.09)');
        discGrad.addColorStop(1, 'rgba(4, 8, 20, 0)');
        ctx.fillStyle = discGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 330, 0, Math.PI * 2);
        ctx.fill();

        // Galactic Bar
        ctx.save();
        ctx.rotate(0.45);
        ctx.fillStyle = 'rgba(253, 224, 130, 0.28)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 74, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Spiral arm dust particles
        for (let i = 0; i < MILKY_WAY_PARTICLES.length; i++) {
          const p = MILKY_WAY_PARTICLES[i];
          const px = Math.cos(p.angle) * p.radius;
          const py = Math.sin(p.angle) * p.radius;
          ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Distance arc from Sagitário A* to Solar System
        if (showOrbitsRef.current) {
          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.ellipse(
            centerX,
            centerY,
            baseUnit * 0.44 * cam.zoom,
            baseUnit * 0.44 * 0.78 * cam.zoom,
            0,
            0,
            Math.PI * 2
          );
          ctx.stroke();
          ctx.restore();
        }
      }

      if (currentScale === 'localgroup' && showOrbitsRef.current) {
        // Subtle gravitational connection vector between Milky Way and Andromeda
        const mw = activeScaleBodies.find((b) => b.id === 'via-lactea-lg');
        const andr = activeScaleBodies.find((b) => b.id === 'andromeda-lg');
        const tri = activeScaleBodies.find((b) => b.id === 'triangulo-lg');
        if (mw && andr) {
          const x1 = centerX + (mw.x ?? 0) * baseUnit * 1.45 * cam.zoom;
          const y1 = centerY + (mw.y ?? 0) * baseUnit * 1.2 * cam.zoom;
          const x2 = centerX + (andr.x ?? 0) * baseUnit * 1.45 * cam.zoom;
          const y2 = centerY + (andr.y ?? 0) * baseUnit * 1.2 * cam.zoom;

          ctx.save();
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.25)';
          ctx.setLineDash([6, 6]);
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Distance midpoint label
          ctx.setLineDash([]);
          ctx.fillStyle = 'rgba(186, 230, 253, 0.72)';
          ctx.font = '500 11px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText('2,54 milhões de anos-luz', (x1 + x2) * 0.5, (y1 + y2) * 0.5 - 8);

          if (tri) {
            const x3 = centerX + (tri.x ?? 0) * baseUnit * 1.45 * cam.zoom;
            const y3 = centerY + (tri.y ?? 0) * baseUnit * 1.2 * cam.zoom;
            ctx.strokeStyle = 'rgba(129, 140, 248, 0.18)';
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // ================= PASS 1: COMPUTE POSITIONS & DRAW PLANETARY ORBITS =================
      const planetsFirst = activeScaleBodies.filter((b) => !b.parentBodyId);
      const moonsSecond = activeScaleBodies.filter((b) => Boolean(b.parentBodyId));

      for (const body of planetsFirst) {
        let wx = 0;
        let wy = 0;
        let orbitScreenR: number | undefined;

        if (currentScale === 'solar') {
          const r = (body.orbitRadius ?? 0) * solarFitFactor;
          const angle = (body.initialAngle ?? 0) + t * (body.orbitSpeed ?? 0);
          wx = Math.cos(angle) * r;
          wy = Math.sin(angle) * r * 0.86; // Gentle perspective inclination
          orbitScreenR = r * cam.zoom;

          // Draw primary planetary orbital path!
          if (showOrbitsRef.current && r > 0) {
            const isBodyActive =
              hoveredId === body.id ||
              selectedId === body.id ||
              activeScaleBodies.some(
                (m) => m.parentBodyId === body.id && (m.id === hoveredId || m.id === selectedId)
              );

            ctx.save();
            ctx.beginPath();
            ctx.ellipse(
              centerX,
              centerY,
              r * cam.zoom,
              r * 0.86 * cam.zoom,
              0,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = isBodyActive
              ? 'rgba(56, 189, 248, 0.62)'
              : 'rgba(186, 230, 253, 0.16)';
            ctx.lineWidth = isBodyActive ? 1.8 : 1;
            ctx.stroke();

            // Luminous directional orbital wake behind planet
            ctx.beginPath();
            ctx.ellipse(
              centerX,
              centerY,
              r * cam.zoom,
              r * 0.86 * cam.zoom,
              0,
              angle - 0.55,
              angle
            );
            ctx.strokeStyle = isBodyActive ? body.color : 'rgba(56, 189, 248, 0.34)';
            ctx.lineWidth = isBodyActive ? 2.4 : 1.4;
            ctx.stroke();
            ctx.restore();
          }
        } else {
          const spreadX = currentScale === 'localgroup' ? baseUnit * 1.45 : baseUnit;
          const spreadY = currentScale === 'localgroup' ? baseUnit * 1.2 : baseUnit * 0.85;
          wx = (body.x ?? 0) * spreadX;
          wy = (body.y ?? 0) * spreadY;
        }

        const sx = centerX + wx * cam.zoom;
        const sy = centerY + wy * cam.zoom;
        planetWorldPos.set(body.id, { wx, wy, sx, sy });

        newPositions.push({
          body,
          sx,
          sy,
          hitRadius: Math.max(body.radius * Math.min(cam.zoom, 1.35) + 9, 17),
          orbitScreenRadius: orbitScreenR,
        });
      }

      // Compute moon positions & draw moon orbital rings
      for (const moon of moonsSecond) {
        if (!moon.parentBodyId) continue;
        const parent = planetWorldPos.get(moon.parentBodyId);
        if (!parent) continue;

        const mr = (moon.orbitRadius ?? 22) * Math.max(solarFitFactor, 0.75);
        const angle = (moon.initialAngle ?? 0) + t * (moon.orbitSpeed ?? 2);
        const wx = parent.wx + Math.cos(angle) * mr;
        const wy = parent.wy + Math.sin(angle) * mr * 0.86;
        const sx = centerX + wx * cam.zoom;
        const sy = centerY + wy * cam.zoom;

        const isMoonOrParentActive =
          hoveredId === moon.id ||
          selectedId === moon.id ||
          hoveredId === moon.parentBodyId ||
          selectedId === moon.parentBodyId;

        if (showOrbitsRef.current) {
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(
            parent.sx,
            parent.sy,
            mr * cam.zoom,
            mr * 0.86 * cam.zoom,
            0,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = isMoonOrParentActive
            ? 'rgba(186, 230, 253, 0.55)'
            : 'rgba(186, 230, 253, 0.19)';
          ctx.lineWidth = isMoonOrParentActive ? 1.2 : 0.8;
          ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.restore();
        }

        newPositions.push({
          body: moon,
          sx,
          sy,
          hitRadius: Math.max(moon.radius * cam.zoom + 10, 14),
          parentSx: parent.sx,
          parentSy: parent.sy,
        });
      }

      screenPositionsRef.current = newPositions;

      // ================= PASS 2: RENDER CELESTIAL BODIES & HOVER EFFECTS =================
      for (const item of newPositions) {
        const { body, sx, sy } = item;
        const isHovered = hoveredId === body.id;
        const isSelected = selectedId === body.id;
        const visualScale = Math.min(Math.max(cam.zoom, 0.72), 1.65);
        const r = body.radius * visualScale * (isHovered ? 1.14 : 1);

        // Enhanced subtle hover & selected aura ring
        if (isHovered || isSelected) {
          const pulse = prefersReducedMotion ? 0 : Math.sin(now * 0.005) * 2;
          ctx.save();
          ctx.beginPath();
          ctx.arc(sx, sy, r + 9 + pulse, 0, Math.PI * 2);
          ctx.strokeStyle = isSelected
            ? 'rgba(56, 189, 248, 0.88)'
            : 'rgba(252, 211, 77, 0.78)';
          ctx.lineWidth = isSelected ? 1.8 : 1.5;
          ctx.stroke();

          // Soft ambient hover glow boost
          const boostGrad = ctx.createRadialGradient(sx, sy, r * 0.5, sx, sy, r + 24);
          boostGrad.addColorStop(0, body.glowColor);
          boostGrad.addColorStop(1, 'rgba(4, 8, 20, 0)');
          ctx.fillStyle = boostGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, r + 24, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Render by celestial visualType
        if (body.visualType === 'spiral_galaxy') {
          drawSpiralGalaxy(
            sx,
            sy,
            r,
            body.color,
            body.id === 'andromeda-lg' ? -0.45 : 0.35,
            0.55,
            isHovered || isSelected
          );
        } else if (body.visualType === 'irregular_galaxy') {
          const gGrad = ctx.createRadialGradient(sx, sy, 2, sx, sy, r * 1.9);
          gGrad.addColorStop(0, 'rgba(253, 224, 130, 0.85)');
          gGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.35)');
          gGrad.addColorStop(1, 'rgba(4, 8, 20, 0)');
          ctx.fillStyle = gGrad;
          ctx.beginPath();
          ctx.ellipse(sx, sy, r * 1.6, r * 1.1, 0.4, 0, Math.PI * 2);
          ctx.fill();
        } else if (body.visualType === 'blackhole') {
          // Glowing accretion disk + dark event horizon
          const bhGrad = ctx.createRadialGradient(sx, sy, r * 0.3, sx, sy, r * 2.4);
          bhGrad.addColorStop(0, 'rgba(254, 243, 199, 0.95)');
          bhGrad.addColorStop(0.38, 'rgba(251, 191, 36, 0.55)');
          bhGrad.addColorStop(0.75, 'rgba(245, 158, 11, 0.14)');
          bhGrad.addColorStop(1, 'rgba(4, 8, 20, 0)');
          ctx.fillStyle = bhGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, r * 2.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#040814';
          ctx.beginPath();
          ctx.arc(sx, sy, r * 0.56, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FCD34D';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        } else if (body.visualType === 'nebula') {
          const nebGrad = ctx.createRadialGradient(sx, sy, 1, sx, sy, r * 2.1);
          nebGrad.addColorStop(0, body.color);
          nebGrad.addColorStop(0.45, body.glowColor);
          nebGrad.addColorStop(1, 'rgba(4, 8, 20, 0)');
          ctx.fillStyle = nebGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, r * 2.1, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Star, Planet, Moon, or Marker
          const glowMult = body.visualType === 'star' ? 2.9 : body.visualType === 'moon' ? 2.2 : 2.3;
          const halo = ctx.createRadialGradient(sx, sy, r * 0.2, sx, sy, r * glowMult);
          halo.addColorStop(0, body.glowColor);
          halo.addColorStop(1, 'rgba(4, 8, 20, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(sx, sy, r * glowMult, 0, Math.PI * 2);
          ctx.fill();

          // Saturn rings behind/around planet
          if (body.hasRings) {
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(-0.32);
            ctx.strokeStyle = body.ringColor ?? 'rgba(253, 230, 138, 0.5)';
            ctx.lineWidth = Math.max(2.2, r * 0.24);
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 2.05, r * 0.68, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }

          // Planet/Star/Moon body sphere gradient
          const sphereGrad = ctx.createRadialGradient(
            sx - r * 0.32,
            sy - r * 0.32,
            r * 0.12,
            sx,
            sy,
            r
          );
          sphereGrad.addColorStop(0, '#FFFFFF');
          sphereGrad.addColorStop(0.28, body.color);
          sphereGrad.addColorStop(1, body.secondaryColor ?? body.color);

          ctx.fillStyle = sphereGrad;
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // Clean canvas labels (always show main bodies; show moons on zoom or when hovered/selected/parent selected)
        const shouldShowLabel =
          body.visualType !== 'moon' ||
          isHovered ||
          isSelected ||
          selectedId === body.parentBodyId ||
          hoveredId === body.parentBodyId ||
          cam.zoom >= 1.38;

        if (shouldShowLabel) {
          ctx.save();
          ctx.font =
            isHovered || isSelected
              ? '600 12px "Plus Jakarta Sans", sans-serif'
              : body.visualType === 'moon'
              ? '500 10px "Plus Jakarta Sans", sans-serif'
              : '500 11px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle =
            isHovered || isSelected
              ? '#F8FAFC'
              : body.visualType === 'moon'
              ? 'rgba(186, 230, 253, 0.78)'
              : 'rgba(224, 242, 254, 0.85)';

          // Crisp subtle text shadow for legibility
          ctx.shadowColor = 'rgba(4, 8, 20, 0.92)';
          ctx.shadowBlur = 6;
          ctx.fillText(body.name, sx, sy + r + (body.visualType === 'moon' ? 12 : 15));
          ctx.restore();
        }
      }

      animId = window.requestAnimationFrame(drawFrame);
    };

    animId = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  // Pointer Hit Testing Helper (prioritizes moons if directly hovered, then closest body)
  const findBodyAtPoint = (clientX: number, clientY: number): ScreenBodyPos | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    let bestMatch: ScreenBodyPos | null = null;
    let bestDist = Infinity;

    for (const item of screenPositionsRef.current) {
      const dist = Math.hypot(x - item.sx, y - item.sy);
      if (dist <= item.hitRadius) {
        // Give slight priority to moons when pointer is directly on them
        const priorityDist = item.body.visualType === 'moon' ? dist * 0.85 : dist;
        if (priorityDist < bestDist) {
          bestDist = priorityDist;
          bestMatch = item;
        }
      }
    }
    return bestMatch;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      camStartX: cameraRef.current.targetX,
      camStartY: cameraRef.current.targetY,
    };
    setIsDraggingUI(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (dragRef.current.active) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (Math.hypot(dx, dy) > 4) {
        dragRef.current.moved = true;
      }
      if (dragRef.current.moved) {
        const zoom = cameraRef.current.zoom;
        cameraRef.current.targetX = dragRef.current.camStartX - dx / zoom;
        cameraRef.current.targetY = dragRef.current.camStartY - dy / zoom;
        setHoverTooltip(null);
        hoveredIdRef.current = null;
        return;
      }
    }

    // Hover detection for enhanced highlight & floating name preview before clicking
    const hit = findBodyAtPoint(e.clientX, e.clientY);
    if (hit) {
      hoveredIdRef.current = hit.body.id;
      const rect = canvas.getBoundingClientRect();
      // Keep tooltip safely inside canvas bounds
      const clampedX = Math.min(Math.max(hit.sx, 110), rect.width - 110);
      const clampedY = Math.max(hit.sy - hit.body.radius - 18, 64);
      setHoverTooltip({
        body: hit.body,
        x: clampedX,
        y: clampedY,
      });
    } else if (hoveredIdRef.current !== null) {
      hoveredIdRef.current = null;
      setHoverTooltip(null);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const wasClick = !dragRef.current.moved;
    dragRef.current.active = false;
    setIsDraggingUI(false);

    if (wasClick) {
      const hit = findBodyAtPoint(e.clientX, e.clientY);
      if (hit) {
        setSelectedBodyId(hit.body.id);
      }
    }
  };

  const handlePointerLeave = () => {
    if (!dragRef.current.active) {
      hoveredIdRef.current = null;
      setHoverTooltip(null);
    }
  };

  const handleDoubleClick = () => {
    adjustZoom(1.25);
  };

  const cursorClass = isDraggingUI
    ? 'cursor-grabbing'
    : hoverTooltip
    ? 'cursor-pointer'
    : 'cursor-grab';

  return (
    <section
      id="explorador"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Section Header + Scale Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs sm:text-sm font-medium text-sky-300/90">
              Seção 02 · Mapa Espacial Interativo
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-slate-50 tracking-tight">
              Explorador Orbital e Galáctico
            </h2>
            <p className="text-sm sm:text-base text-sky-100/80 leading-relaxed">
              Arraste o espaço para navegar, passe o cursor sobre planetas, luas ou galáxias para
              destacá-los e clique para abrir o dossiê científico completo.
            </p>
          </div>

          {/* 3 Scale Selector Tabs */}
          <div
            role="tablist"
            aria-label="Escala do Explorador Espacial"
            className="liquid-glass rounded-2xl p-1.5 flex flex-wrap sm:flex-nowrap gap-1.5 self-start lg:self-end"
          >
            {SCALE_TABS.map((tab) => {
              const isActive = scale === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleScaleChange(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isActive
                      ? 'liquid-btn-primary text-slate-50'
                      : 'text-sky-100/75 hover:text-slate-50 hover:bg-sky-400/10'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Viewport Container */}
        <div className="liquid-glass rounded-3xl overflow-hidden relative">
          {/* Top Explorer Toolbar Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-sky-200/15 bg-[#040814]/45">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-slate-100 truncate">
                {SCALE_TABS.find((t) => t.id === scale)?.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                aria-label={isPlaying ? 'Pausar órbitas' : 'Retomar órbitas'}
                className="liquid-glass-subtle rounded-xl px-2.5 py-1.5 text-xs font-medium text-sky-100 inline-flex items-center gap-1.5 hover:border-sky-300/40 cursor-pointer whitespace-nowrap"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
                    <span className="hidden sm:inline">Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                    <span className="hidden sm:inline">Animar</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowOrbits((o) => !o)}
                aria-label={showOrbits ? 'Ocultar órbitas' : 'Mostrar órbitas'}
                className="liquid-glass-subtle rounded-xl px-2.5 py-1.5 text-xs font-medium text-sky-100 inline-flex items-center gap-1.5 hover:border-sky-300/40 cursor-pointer whitespace-nowrap"
              >
                {showOrbits ? (
                  <Eye className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-sky-200/60" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">Órbitas</span>
              </button>

              <div className="flex items-center rounded-xl bg-[#040814]/55 border border-sky-200/15 p-0.5">
                <button
                  type="button"
                  onClick={() => adjustZoom(0.82)}
                  aria-label="Diminuir zoom"
                  className="p-1.5 text-sky-100/80 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] text-sky-200/80 tabular-nums px-1.5 select-none">
                  {zoomPercent}%
                </span>
                <button
                  type="button"
                  onClick={() => adjustZoom(1.22)}
                  aria-label="Aumentar zoom"
                  className="p-1.5 text-sky-100/80 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={resetCamera}
                aria-label="Centralizar visualização"
                className="liquid-glass-subtle rounded-xl p-1.5 text-sky-100/80 hover:text-sky-300 hover:border-sky-300/40 transition-colors cursor-pointer"
                title="Resetar câmera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas + Floating Desktop Side Panel */}
          <div className="relative h-[520px] sm:h-[600px] lg:h-[620px] w-full overflow-hidden">
            <div ref={containerRef} className="absolute inset-0">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onDoubleClick={handleDoubleClick}
                className={`block w-full h-full touch-none select-none ${cursorClass}`}
              />
            </div>

            {/* Enhanced Hover Floating Preview Tooltip (Appears BEFORE Click) */}
            {hoverTooltip && !isDraggingUI && (
              <div
                style={{
                  left: `${hoverTooltip.x}px`,
                  top: `${hoverTooltip.y}px`,
                }}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-full z-20 transition-opacity duration-150"
              >
                <div className="liquid-glass-strong rounded-2xl px-3.5 py-2.5 max-w-[230px] text-center">
                  <p className="font-display text-sm font-semibold text-slate-50 leading-tight">
                    {hoverTooltip.body.name}
                  </p>
                  <p className="text-[11px] text-sky-200/80 mt-0.5 leading-snug">
                    {hoverTooltip.body.hoverHint}
                  </p>
                  <p className="text-[10px] font-medium text-sky-300 mt-1">
                    Clique para inspecionar
                  </p>
                </div>
              </div>
            )}

            {/* Desktop Floating Liquid Glass Inspector Side Panel */}
            {selectedBody && (
              <aside
                aria-label={`Detalhes de ${selectedBody.name}`}
                className="hidden lg:flex flex-col absolute top-4 right-4 bottom-4 w-[360px] z-30 liquid-glass-strong rounded-2xl overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-sky-200/15">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-sky-300/90 truncate">
                      {selectedBody.classification}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-slate-50 mt-0.5">
                      {selectedBody.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBodyId(null)}
                    aria-label="Fechar painel de detalhes"
                    className="p-1.5 rounded-xl text-sky-200/70 hover:text-slate-50 hover:bg-sky-400/15 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
                  {/* Cosmic Address */}
                  <div>
                    <p className="text-xs font-medium text-sky-200/65 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-sky-300" aria-hidden="true" />
                      <span>Posição no Endereço Cósmico</span>
                    </p>
                    <p className="text-sm text-slate-100 mt-1 leading-relaxed">
                      {selectedBody.cosmicAddress}
                    </p>
                    {selectedBody.orbitalPeriodLabel && (
                      <p className="text-xs text-sky-200/70 mt-1 font-mono tabular-nums">
                        Período orbital: {selectedBody.orbitalPeriodLabel}
                      </p>
                    )}
                  </div>

                  {/* Distance from Earth */}
                  <div className="pt-4 border-t border-sky-200/12 space-y-2">
                    <p className="text-xs font-medium text-sky-200/65">Distância da Terra</p>
                    <dl className="space-y-1.5 text-xs">
                      <div className="flex items-baseline justify-between gap-2">
                        <dt className="text-sky-200/70">UA</dt>
                        <dd className="font-mono text-amber-300 tabular-nums text-right">
                          {selectedBody.distanceFromEarth.ua}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <dt className="text-sky-200/70">Anos-luz</dt>
                        <dd className="font-mono text-sky-300 tabular-nums text-right">
                          {selectedBody.distanceFromEarth.lightYears}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <dt className="text-sky-200/70">Parsecs</dt>
                        <dd className="font-mono text-indigo-300 tabular-nums text-right">
                          {selectedBody.distanceFromEarth.parsecs}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Prominent Moons Section (when viewing a planet with prominent moons) */}
                  {selectedBody.prominentMoons && selectedBody.prominentMoons.length > 0 && (
                    <div className="pt-4 border-t border-sky-200/12 space-y-2.5">
                      <p className="text-xs font-medium text-amber-300/90 flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Luas Proeminentes</span>
                      </p>
                      <div className="space-y-2.5">
                        {selectedBody.prominentMoons.map((moon) => (
                          <div
                            key={moon.id}
                            className="rounded-xl bg-[#040814]/50 border border-sky-200/12 p-3 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-display text-sm font-semibold text-slate-100">
                                {moon.name}
                              </p>
                              <span className="font-mono text-[11px] text-sky-200/70 tabular-nums">
                                {moon.diameter} · {moon.orbitalPeriod}
                              </span>
                            </div>
                            <p className="text-xs text-sky-100/80 leading-relaxed">
                              {moon.summary}
                            </p>
                            {moon.clickableBodyId && (
                              <button
                                type="button"
                                onClick={() => focusOnBody(moon.clickableBodyId!)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-300 hover:text-sky-200 cursor-pointer pt-0.5"
                              >
                                <Maximize2 className="w-3 h-3" aria-hidden="true" />
                                <span>Focar {moon.name} na órbita</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Parent Planet Quick Link when inspecting a Moon */}
                  {selectedBody.parentBodyId && (
                    <div className="pt-3 border-t border-sky-200/12">
                      <button
                        type="button"
                        onClick={() => focusOnBody(selectedBody.parentBodyId!)}
                        className="text-xs font-medium text-sky-300 hover:text-sky-200 transition-colors cursor-pointer"
                      >
                        ← Voltar ao planeta hospedeiro (
                        {EXPLORER_BODIES.find((b) => b.id === selectedBody.parentBodyId)?.name})
                      </button>
                    </div>
                  )}

                  {/* 2 Scientific Curiosities */}
                  <div className="pt-4 border-t border-sky-200/12 space-y-2.5">
                    <p className="text-xs font-medium text-sky-300/90 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Curiosidades Científicas</span>
                    </p>
                    <ul className="space-y-2.5 text-xs text-sky-100/85 leading-relaxed">
                      {selectedBody.curiosities.map((fact, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono text-sky-300/90 shrink-0">0{idx + 1}.</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            )}

            {/* Mobile / Tablet Bottom Sheet Inspector inside viewport */}
            {selectedBody && (
              <div
                role="dialog"
                aria-label={`Detalhes de ${selectedBody.name}`}
                className="lg:hidden absolute inset-x-3 bottom-3 max-h-[62%] z-30 liquid-glass-strong rounded-2xl flex flex-col overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-sky-200/15">
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-sky-300/90 truncate">
                      {selectedBody.classification}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-slate-50">
                      {selectedBody.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedBodyId(null)}
                    aria-label="Fechar detalhes"
                    className="p-2 rounded-xl text-sky-200/80 hover:text-slate-50 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto px-4 py-3 space-y-3.5 text-xs">
                  <p className="text-sky-100/85">{selectedBody.cosmicAddress}</p>

                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-sky-200/12">
                    <div>
                      <span className="text-[10px] text-sky-200/65 block">UA</span>
                      <span className="font-mono text-amber-300 tabular-nums">
                        {selectedBody.distanceFromEarth.ua}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-sky-200/65 block">Anos-luz</span>
                      <span className="font-mono text-sky-300 tabular-nums">
                        {selectedBody.distanceFromEarth.lightYears}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-sky-200/65 block">Parsecs</span>
                      <span className="font-mono text-indigo-300 tabular-nums">
                        {selectedBody.distanceFromEarth.parsecs}
                      </span>
                    </div>
                  </div>

                  {selectedBody.prominentMoons && selectedBody.prominentMoons.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="font-medium text-amber-300">Luas Proeminentes</p>
                      {selectedBody.prominentMoons.map((m) => (
                        <div key={m.id} className="bg-[#040814]/45 rounded-xl p-2.5 space-y-1">
                          <div className="flex justify-between gap-2">
                            <span className="font-semibold text-slate-100">{m.name}</span>
                            <span className="font-mono text-[10px] text-sky-200/70">
                              {m.diameter}
                            </span>
                          </div>
                          <p className="text-sky-100/80 leading-relaxed">{m.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="space-y-1.5 text-sky-100/85 leading-relaxed">
                    {selectedBody.curiosities.map((c, idx) => (
                      <li key={idx}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Quick Astro & Moon Focus Bar */}
          <div className="px-4 sm:px-5 py-3.5 border-t border-sky-200/15 bg-[#040814]/45">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-sky-200/65 whitespace-nowrap shrink-0 mr-1">
                Acesso rápido:
              </span>
              {bodiesInScale.map((body) => {
                const isSelected = selectedBodyId === body.id;
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => focusOnBody(body.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-400/25 text-slate-50 border border-sky-300/50'
                        : 'bg-sky-950/40 text-sky-100/75 border border-sky-200/12 hover:border-sky-300/35 hover:text-slate-50'
                    }`}
                  >
                    {body.visualType === 'moon' ? `Lua · ${body.name}` : body.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
