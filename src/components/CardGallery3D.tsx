import { useEffect, useRef, useState } from 'react';

interface Card {
  id: number;
  image: string;
  title: string;
  category: string;
}

const cards: Card[] = [
  {
    id: 1,
    image: "/lovable-uploads/dc7296f0-d63c-4051-8b3e-d27207542257.png",
    title: "Your Fitness Journey",
    category: "Dashboard"
  },
  {
    id: 2,
    image: "/lovable-uploads/c209cb36-dd4c-408a-a11e-76a8980d4a3b.png",
    title: "Today's Progress",
    category: "Tracking"
  },
  {
    id: 3,
    image: "/lovable-uploads/88502a72-677f-4e2c-b805-9be53a6a3c80.png",
    title: "Health & Wellness",
    category: "Insights"
  },
  {
    id: 4,
    image: "/lovable-uploads/4a53aaa6-0ad9-459f-9ebc-28e1e6d8e356.png",
    title: "Nutritional Stats",
    category: "Analytics"
  },
  {
    id: 5,
    image: "/lovable-uploads/a8c8bea3-57ac-45d1-a180-00b0418b9cf1.png",
    title: "AI Health Assistant",
    category: "AI Features"
  },
  {
    id: 6,
    image: "/lovable-uploads/67f067e9-83c9-49fb-9c04-f9c346a49476.png",
    title: "Nutrition Goals",
    category: "Goal Setting"
  },
  {
    id: 7,
    image: "/lovable-uploads/df343f0b-c245-4725-a278-2fd208955db2.png",
    title: "Settings & Preferences",
    category: "Profile"
  },
  {
    id: 8,
    image: "/lovable-uploads/01d3680d-64c4-49b1-b63c-f9d76022e365.png",
    title: "Photo AI Recognition",
    category: "Smart Features"
  },
  {
    id: 9,
    image: "/lovable-uploads/c3c52f13-dbca-4fb7-b8e1-91123e3f2bc2.png",
    title: "Nutritional Analysis",
    category: "Analysis"
  },
  {
    id: 10,
    image: "/lovable-uploads/f787f388-ccf1-4f11-94dd-fb39b903fcbd.png",
    title: "Complete Dashboard",
    category: "Overview"
  }
];

// Linear interpolation helper
function lerp(a: number, b: number, n: number) {
  return a + (b - a) * n;
}

// Particle for animated background
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      opacity: 0.2 + Math.random() * 0.3
    }));
    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(80,200,255,${p.opacity})`;
        ctx.shadowColor = '#5ef3ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ filter: 'blur(1.5px)' }}
    />
  );
};

export const CardGallery3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositions = useRef([0, 0, 0]);
  const scrollTargets = useRef([0, 0, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);

  // For card tilt: store refs for each card
  const cardRefs = useRef<(HTMLDivElement | null)[][]>([]);
  const cardRafRefs = useRef<{ [key: string]: number }>({});

  // Distribute cards across 3 columns
  const columns = [
    cards.filter((_, index) => index % 3 === 0),
    cards.filter((_, index) => index % 3 === 1),
    cards.filter((_, index) => index % 3 === 2)
  ];
  // Duplicate cards for seamless infinite scroll
  const duplicatedColumns = columns.map(column => [...column, ...column, ...column]);

  useEffect(() => {
    let lastTime = performance.now();
    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 2); // normalize to 60fps
      lastTime = now;
      if (!isPaused) {
        scrollTargets.current[0] += 0.8 * dt;
        scrollTargets.current[1] -= 0.6 * dt;
        scrollTargets.current[2] += 0.7 * dt;
        for (let i = 0; i < 3; i++) {
          scrollPositions.current[i] = lerp(scrollPositions.current[i], scrollTargets.current[i], 0.12);
        }
        const resetThreshold = (cards.length / 3) * 300;
        for (let i = 0; i < 3; i++) {
          if (Math.abs(scrollTargets.current[i]) >= resetThreshold) {
            scrollTargets.current[i] = 0;
            scrollPositions.current[i] = 0;
          }
        }
        const columns = document.querySelectorAll('.scroll-column');
        columns.forEach((column, index) => {
          if (column instanceof HTMLElement) {
            column.style.transform = `translateY(${scrollPositions.current[index]}px)`;
          }
        });
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // Mouse movement for 3D tilt of the whole gallery
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Helper for card tilt
  function handleCardMouseMove(e: React.MouseEvent<HTMLDivElement>, colIdx: number, cardIdx: number) {
    const card = cardRefs.current[colIdx]?.[cardIdx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    // Use rAF for smooth transform
    if (cardRafRefs.current[`${colIdx}-${cardIdx}`]) {
      cancelAnimationFrame(cardRafRefs.current[`${colIdx}-${cardIdx}`]);
    }
    cardRafRefs.current[`${colIdx}-${cardIdx}`] = requestAnimationFrame(() => {
      card.style.transform = `translateZ(20px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.06)`;
    });
  }
  function handleCardMouseLeave(colIdx: number, cardIdx: number) {
    const card = cardRefs.current[colIdx]?.[cardIdx];
    if (!card) return;
    if (cardRafRefs.current[`${colIdx}-${cardIdx}`]) {
      cancelAnimationFrame(cardRafRefs.current[`${colIdx}-${cardIdx}`]);
    }
    cardRafRefs.current[`${colIdx}-${cardIdx}`] = requestAnimationFrame(() => {
      card.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // Prepare refs for all cards
  cardRefs.current = duplicatedColumns.map((col, colIdx) =>
    Array(col.length).fill(null)
  );

  return (
    <div className="relative h-[600px] overflow-hidden rounded-xl" style={{ background: 'linear-gradient(135deg, #e0f7fa 0%, #e3f2fd 100%)' }}>
      <ParticleBackground />
      {/* Enhanced gradient overlays for stronger fade effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 via-white/60 to-transparent dark:from-[#16181d] dark:via-[#16181d]/80 dark:to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-[#16181d] dark:via-[#16181d]/80 dark:to-transparent z-20" />
      {/* Side fade effects */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white/80 to-transparent dark:from-[#16181d] dark:to-transparent z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white/80 to-transparent dark:from-[#16181d] dark:to-transparent z-20" />
      {/* 3D Gallery Container */}
      <div 
        ref={containerRef}
        className="h-full perspective-1000 cursor-pointer relative z-10"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="h-full flex justify-center items-center gap-8"
          style={{
            transform: `rotateX(35deg) rotateY(-20deg) translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s cubic-bezier(.4,2,.6,1)',
            willChange: 'transform',
          }}
        >
          {duplicatedColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="scroll-column flex flex-col gap-6 w-64"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {column.map((card, cardIndex) => (
                <div
                  key={`${card.id}-${cardIndex}`}
                  ref={el => { cardRefs.current[columnIndex][cardIndex] = el; }}
                  className="group relative bg-white/60 dark:bg-[#23262e]/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_8px_32px_0_rgba(94,243,255,0.25)] transition-all duration-500 cursor-pointer border border-white/30 dark:border-[#5ef3ff]/10"
                  style={{
                    transform: 'translateZ(0)',
                    transformStyle: 'preserve-3d',
                    height: '280px',
                    willChange: 'transform',
                  }}
                  onMouseMove={e => handleCardMouseMove(e, columnIndex, cardIndex)}
                  onMouseLeave={() => handleCardMouseLeave(columnIndex, cardIndex)}
                >
                  <div className="absolute -inset-1 rounded-2xl pointer-events-none group-hover:shadow-[0_0_32px_8px_#5ef3ff55] transition-all duration-500" />
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-100/80 dark:bg-cyan-400/20 rounded-full backdrop-blur-sm">
                          {card.category}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
