import React, { useState, useEffect } from 'react';
import './BirthdayMessage.css';

const BirthdayMessage = ({ friendName }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 500);
    const timer2 = setTimeout(() => setShowConfetti(true), 1000);
    
    // Start revealing letters after page loads
    const startLetterAnimation = setTimeout(() => {
      const letterTimer = setInterval(() => {
        setRevealedLetters(prev => {
          if (prev < friendName.length) {
            return prev + 1;
          }
          clearInterval(letterTimer);
          return prev;
        });
      }, 300); // 300ms delay between each letter
      
      return () => clearInterval(letterTimer);
    }, 1500); // Start after 1.5 seconds
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(startLetterAnimation);
    };
  }, [friendName.length]);

  const createConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      confetti.push(
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
          }}
        />
      );
    }
    return confetti;
  };

  // Function to calculate circular positions (semi-circle at top)
  const getCircularPosition = (index, total, radius = 120) => {
    // Create a semi-circle at the top (from -180° to 0°)
    const startAngle = -180; // Start from left
    const endAngle = 0;      // End at right
    const angleRange = endAngle - startAngle;
    const angle = startAngle + (index * angleRange) / (total - 1);
    
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return { x, y, angle };
  };

  return (
    <div className="birthday-message">
      {showConfetti && (
        <div className="confetti-container">
          {createConfetti()}
        </div>
      )}
      
      <div className={`message-content ${showMessage ? 'show' : ''}`}>
        <div className="celebration-header">
          <h1 className="surprise-text">🎉 SURPRISE! 🎉</h1>
        </div>

        <div className="name-reveal">
          <h2>You spelled it right!</h2>
          <div className="circular-name-container">
            <div className="circular-name">
              {friendName.split('').map((letter, index) => {
                const position = getCircularPosition(index, friendName.length);
                const isRevealed = index < revealedLetters;
                
                return (
                  <div
                    key={index}
                    className={`final-circle-letter ${isRevealed ? 'revealed' : 'hidden'}`}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      animationDelay: `${index * 0.3}s`,
                      transitionDelay: `${index * 0.2}s`
                    }}
                  >
                    <span className="letter-text">{letter}</span>
                    <div className="letter-glow"></div>
                  </div>
                );
              })}
              
              {/* Center sparkle that appears after all letters */}
              <div className={`name-center ${revealedLetters >= friendName.length ? 'show-sparkle' : ''}`}>
                <div className="sparkle">✨</div>
                <div className="sparkle-ring"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="birthday-wish">
          <h1 className="main-message">
            🎂 HAPPY BIRTHDAY 🎂
          </h1>
          <h2 className="secondary-message">
            Dear {friendName}!
          </h2>
        </div>

        <div className="birthday-content">
          <div className="wish-text">
            <p>🌟 Wishing you a day filled with happiness and a year filled with joy! 🌟</p>
            <p>🎈 Hope your special day brings you all that your heart desires! 🎈</p>
            <p>🎁 Here's to another year of amazing adventures and memories! 🎁</p>
          </div>

          <div className="birthday-images">
            <div className="image-placeholder">🎂</div>
            <div className="image-placeholder">🎉</div>
            <div className="image-placeholder">🎁</div>
            <div className="image-placeholder">🎈</div>
          </div>
        </div>

        <div className="final-message">
          <p className="signature">Made with ❤️ just for you by Praveen Irala!</p>
          <button 
            className="celebrate-btn"
            onClick={() => window.location.reload()}
          >
            🎉 Celebrate Again! 🎉
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayMessage;
