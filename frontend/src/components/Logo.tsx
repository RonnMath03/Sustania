import React, { useState, useEffect } from 'react';

export const Logo = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  // Show animation on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 2000); // Animation plays for 2 seconds on load

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowAnimation(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowAnimation(false);
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        className="w-8 h-8 relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* SVG (static) */}
        <img
          src="/sustania.svg"
          alt="Sustania Logo"
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            showAnimation ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* GIF (animated) */}
        <img
          src="/sustania.gif"
          alt="Sustania Logo Animated"
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
            showAnimation ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Sustania
        </h1>
      </div>
    </div>
  );
};