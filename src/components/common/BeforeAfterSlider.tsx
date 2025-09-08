'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  beforeImagePosition?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
  beforeImagePosition = '50% 98%'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDocumentMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  // Add global event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDocumentMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleDocumentMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleDocumentMouseMove, handleMouseUp]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    if (isDragging) {
      setSliderPosition(percentage);
    }
  }, [isDragging]);

  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    if (isDragging) {
      setSliderPosition(percentage);
    }
  }, [isDragging]);

  return (
    <div 
      className={`relative select-none cursor-grab active:cursor-grabbing ${className}`}
      ref={containerRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Before Image (Background) */}
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          style={{ objectPosition: beforeImagePosition, transform: 'scale(1.2)', transformOrigin: beforeImagePosition }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Before Label */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {beforeLabel}
        </div>
      </div>

      {/* After Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden rounded-xl"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          style={{ objectPosition: '50% 100%', transform: 'scale(1.2)', transformOrigin: '50% 100%' }}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* After Label */}
        <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-white/80 cursor-grab active:cursor-grabbing"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Triangle Handle */}
        <div 
          className="absolute top-1/2 left-1/2 cursor-grab active:cursor-grabbing"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          {/* Left Triangle */}
          <div 
            className="absolute top-1/2 -left-3 w-0 h-0"
            style={{
              transform: 'translateY(-50%)',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '12px solid white'
            }}
          ></div>
          
          {/* Right Triangle */}
          <div 
            className="absolute top-1/2 -right-3 w-0 h-0"
            style={{
              transform: 'translateY(-50%)',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderLeft: '12px solid white'
            }}
          ></div>
          
          {/* Center White Symbol */}
          <div className="w-1.5 h-5 bg-white"></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium opacity-80">
        Drag to compare
      </div>
    </div>
  );
}