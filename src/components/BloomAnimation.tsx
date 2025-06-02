import React from 'react';

const BloomAnimation: React.FC = () => (
  <div className="relative w-32 h-32 mx-auto mb-6">
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-teal-400 animate-pulse"></div>
    <div className="absolute inset-2 rounded-full bg-gradient-to-r from-coral-400 to-yellow-400 animate-spin" style={{animationDuration: '8s'}}></div>
    <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">B</span>
    </div>
  </div>
);

export default BloomAnimation; 