import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfettiEffect from '../AuxiliaryComponents/ConfettiEffect'; 
import '@testing-library/jest-dom';

jest.mock('react-dom-confetti', () => {
  return ({ active, config }) => (active ? <div data-testid="confetti" /> : null);
});

describe('ConfettiEffect Component', () => {
  const mockConfig = {
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
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const setup = (active = false) => {
    render(<ConfettiEffect active={active} />);
  };

  test('renders Confetti when active is true', () => {
    setup(true);

    const confettiElement = screen.getByTestId('confetti');
    expect(confettiElement).toBeInTheDocument();
  });

  test('does not render Confetti when active is false', () => {
    setup(false);

    const confettiElement = screen.queryByTestId('confetti');
    expect(confettiElement).not.toBeInTheDocument();
  });
});
