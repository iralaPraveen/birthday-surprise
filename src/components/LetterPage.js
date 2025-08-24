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
          <p>Building something special for someone special... 🎉</p>
        </div>

        <div className="letters-display">
          <div className="entered-letters">
            {enteredLetters.split('').map((letter, index) => (
              <span key={index} className="letter revealed">{letter}</span>
            ))}
          </div>
          
          <div className="remaining-letters">
            {friendName.slice(currentPage).split('').map((letter, index) => (
              <span key={index} className={`letter ${index === 0 ? 'current' : 'hidden'}`}>
                {index === 0 ? '?' : '?'}
              </span>
            ))}
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
