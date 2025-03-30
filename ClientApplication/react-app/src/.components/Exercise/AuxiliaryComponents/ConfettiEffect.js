import React from 'react';
import Confetti from 'react-dom-confetti';

const ConfettiEffect = ({ active }) => {
  const config = {
    angle: 136,
    spread: 360,
    startVelocity: 100,
    elementCount: 117,
    dragFriction: 0.4,
    duration: 800,
    stagger: 3,
    width: '12px',
    height: '10px',
    perspective: '471px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
  };

  return (
    <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <Confetti active={active} config={config} />
    </div>
  );
};

export default ConfettiEffect;
