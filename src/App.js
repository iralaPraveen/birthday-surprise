import React, { useState } from 'react';
import './App.css';
import LetterPage from './components/LetterPage';
import BirthdayMessage from './components/BirthdayMessage';

function App() {
  const friendName = "DINESH"; // Change this to your friend's name
  const letters = friendName.split('');
  
  const [currentPage, setCurrentPage] = useState(0);
  const [enteredLetters, setEnteredLetters] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleLetterSubmit = (letter) => {
    if (letter.toUpperCase() === letters[currentPage]) {
      setEnteredLetters(prev => prev + letter.toUpperCase());
      setCurrentPage(prev => prev + 1);
      setInputValue('');
    } else {
      alert(`Try again! Enter the ${currentPage + 1}${getOrdinalSuffix(currentPage + 1)} letter of the name.`);
      setInputValue('');
    }
  };

  const getOrdinalSuffix = (num) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const mod = num % 100;
    return suffixes[(mod - 20) % 10] || suffixes[mod] || suffixes[0];
  };

  if (currentPage >= letters.length) {
    return <BirthdayMessage friendName={friendName} />;
  }

  return (
    <div className="App">
      <LetterPage
        currentLetter={letters[currentPage]}
        currentPage={currentPage}
        totalPages={letters.length}
        enteredLetters={enteredLetters}
        onLetterSubmit={handleLetterSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        friendName={friendName}
      />
    </div>
  );
}

export default App;
