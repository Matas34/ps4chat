import React, { useState, useEffect } from 'react';
import '../../styles/flashing.css';

const FlashingText = ({ sentence, interval = 400 }) => {
  const words = sentence.split(' ');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(wordInterval);
  }, [words.length, interval]);

  const beforeWords = words.slice(0, currentWordIndex).join(' ');
  const afterWords = words.slice(currentWordIndex + 1).join(' ');

  return (
    <>
      <div className='mainContainer' style={{ backgroundColor: 'red !important' }}>
        <div className='flashing'>
          <h2 data-testid='sentence-display'>
            {beforeWords}{' '}
            <span className='highlight' data-testid='highlighted-word'>
              {words[currentWordIndex]}
            </span>{' '}
            {afterWords}
          </h2>
        </div>
      </div>

      <div className='mainContainer' style={{ backgroundColor: 'red !important' }}>
        <div className='flashing'>
          <h3 data-testid='current-word'>{words[currentWordIndex]}</h3>
        </div>
      </div>
    </>
  );
};

export default FlashingText;