
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

export const CardGallery3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const scrollPositionsRef = useRef([0, 0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  // Distribute cards across 3 columns
  const columns = [
    cards.filter((_, index) => index % 3 === 0),
    cards.filter((_, index) => index % 3 === 1),
    cards.filter((_, index) => index % 3 === 2)
  ];

  // Duplicate cards for seamless infinite scroll
  const duplicatedColumns = columns.map(column => [...column, ...column, ...column]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    const animate = () => {
      if (!isPaused) {
        // Auto-scroll columns at different speeds and directions
        scrollPositionsRef.current[0] += 0.8; // Column 1: down
        scrollPositionsRef.current[1] -= 0.6; // Column 2: up
        scrollPositionsRef.current[2] += 0.7; // Column 3: down

        // Reset positions for infinite loop (each card is ~300px, with duplicates)
        const resetThreshold = (cards.length / 3) * 300;
        scrollPositionsRef.current = scrollPositionsRef.current.map(pos => {
          if (Math.abs(pos) >= resetThreshold) {
            return 0;
          }
          return pos;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    document.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', handleMouseEnter);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div className="relative h-[600px] overflow-hidden bg-gray-950 rounded-xl">
      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-950 to-transparent z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent z-20" />
      
      {/* 3D Gallery Container */}
      <div 
        ref={containerRef}
        className="h-full perspective-1000 cursor-pointer"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className="h-full flex justify-center items-center gap-8"
          style={{
            transform: `rotateX(35deg) rotateY(-20deg) translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {duplicatedColumns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col gap-6 w-64"
              style={{
                transform: `translateY(${scrollPositionsRef.current[columnIndex]}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {column.map((card, cardIndex) => (
                <div
                  key={`${card.id}-${cardIndex}`}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer"
                  style={{
                    transform: 'translateZ(0)',
                    transformStyle: 'preserve-3d',
                    height: '280px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateZ(20px) rotateX(5deg) rotateY(5deg) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg) scale(1)';
                  }}
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Card Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-semibold text-green-400 bg-green-400/20 rounded-full">
                          {card.category}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm leading-tight">
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
      
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10 pointer-events-none" />
    </div>
  );
};
