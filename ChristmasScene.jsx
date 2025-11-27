import React from 'react';
// We assume the image is in your public/assets folder or src/assets
// If using Vite/Create-React-App, this path usually works if assets is in 'public'
// Otherwise you might need: import sceneImage from './assets/christmas-scene.jpg'; and use src={sceneImage}

const ChristmasScene = () => (
  <div className="christmas-scene-container">
    {/* 🛠️ FIX: Using a real IMG tag so it pushes the width open */}
    <img
      src="/christmas-scene.png"
      alt="Christmas Scene"
      className="scene-image"
    />

    {/* Twinkling lights overlaid on the image */}
    <div className="twinkle-light light-1"></div>
    <div className="twinkle-light light-2 delay-1"></div>
    <div className="twinkle-light light-3 delay-2"></div>
    <div className="twinkle-light light-4 delay-3"></div>
    <div className="twinkle-light light-5 delay-4"></div>
    <div className="twinkle-light light-6 delay-5"></div>
    <div className="twinkle-light light-7 delay-6"></div>
    <div className="twinkle-light light-8 delay-7"></div>
    <div className="twinkle-light light-9 delay-8"></div>
    <div className="twinkle-light light-10 delay-9"></div>
    <div className="twinkle-light light-11 delay-10"></div>
    <div className="twinkle-light light-12 delay-11"></div>
    <div className="twinkle-light light-13 delay-12"></div>
    <div className="twinkle-light light-14 delay-13"></div>
    <div className="twinkle-light light-15 delay-14"></div>

    {/* Star at the top of the tree */}
    <div className="twinkle-star"></div>
  </div>
);

export default ChristmasScene;