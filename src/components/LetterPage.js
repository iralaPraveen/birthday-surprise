import React from 'react';
import './LetterPage.css';

const LetterPage = ({
  currentLetter,
  currentPage,
  totalPages,
  enteredLetters,
  onLetterSubmit,
  inputValue,
  setInputValue,
  friendName
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onLetterSubmit(inputValue.trim());
    }
  };

  const progressPercentage = ((currentPage) / totalPages) * 100;

  // Function to calculate circular positions
  const getCircularPosition = (index, total, radius = 120) => {
    const angle = (index * 360) / total;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y, angle };
  };

  return (
    <div className="letter-page">
      <div className="background-animation"></div>
      
      <div className="content">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="page-info">
          <h2>Page {currentPage + 1} of {totalPages}</h2>
          <p>Building something special for Dinesh's Birthday🎉</p>
        </div>

        {/* Circular Letter Display */}
        <div className="letters-circle-container">
          <div className="letters-circle">
            {friendName.split('').map((letter, index) => {
              const position = getCircularPosition(index, friendName.length);
              const isRevealed = index < enteredLetters.length;
              const isCurrent = index === currentPage;
              // Removed the unused 'isHidden' variable

              return (
                <div
                  key={index}
                  className={`circle-letter ${
                    isRevealed ? 'revealed' : 
                    isCurrent ? 'current' : 
                    'hidden'
                  }`}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="letter-content">
                    {isRevealed ? letter : (isCurrent ? '?' : '•')}
                  </span>
                  {isCurrent && <div className="current-indicator">👆</div>}
                </div>
              );
            })}
            
            {/* Center element showing progress */}
            <div className="circle-center">
              <div className="center-content">
                <span className="center-number">{enteredLetters.length}</span>
                <span className="center-total">/ {friendName.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="input-section">
          <h3>Enter the {currentPage + 1}{getOrdinalSuffix(currentPage + 1)} letter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength="1"
              className="letter-input"
              placeholder="?"
              autoFocus
            />
            <button type="submit" className="submit-btn">
              ✨ Next
            </button>
          </form>
        </div>

        <div className="hint">
          <p>💡 Hint: Think about whose special day this is for!</p>
        </div>

        <div className="decorative-elements">
          <div className="floating-heart">💖</div>
          <div className="floating-star">⭐</div>
          <div className="floating-gift">🎁</div>
        </div>
      </div>
    </div>
  );
};

const getOrdinalSuffix = (num) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const mod = num % 100;
  return suffixes[(mod - 20) % 10] || suffixes[mod] || suffixes[0];
};

export default LetterPage;
