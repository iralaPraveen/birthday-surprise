import React, { useState, useEffect } from 'react';
import './BirthdayMessage.css';

const BirthdayMessage = ({ friendName }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 500);
    const timer2 = setTimeout(() => setShowConfetti(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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
          <div className="friend-name">
            {friendName.split('').map((letter, index) => (
              <span 
                key={index} 
                className="name-letter"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {letter}
              </span>
            ))}
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
          <p className="signature">Made with ❤️ just for you!</p>
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
