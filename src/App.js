import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const friendName = "PRAVEEN"; // Change this to your friend's name
  const [currentPage, setCurrentPage] = useState(0);
  const [enteredLetters, setEnteredLetters] = useState("");
  const [showBirthday, setShowBirthday] = useState(false);
  const [showError, setShowError] = useState(false);
  const [celebrationMode, setCelebrationMode] = useState(false);

  const handleLetterInput = (event) => {
    const inputLetter = event.target.value.toUpperCase();
    
    if (inputLetter === friendName[currentPage]) {
      const newEnteredLetters = enteredLetters + inputLetter;
      setEnteredLetters(newEnteredLetters);
      
      if (currentPage === friendName.length - 1) {
        // All letters entered correctly
        setCelebrationMode(true);
        setTimeout(() => {
          setShowBirthday(true);
        }, 1500);
      } else {
        // Move to next page
        setCurrentPage(currentPage + 1);
      }
      
      // Clear input
      event.target.value = "";
    } else {
      // Wrong letter - show error
      setShowError(true);
      event.target.style.borderColor = "red";
      setTimeout(() => {
        setShowError(false);
        event.target.style.borderColor = "#ddd";
        event.target.value = "";
      }, 1000);
    }
  };

  if (showBirthday) {
    return (
      <motion.div 
        className="birthday-container"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <motion.div 
          className="birthday-content"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1 
            className="birthday-title"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 10
            }}
          >
            🎉 HAPPY BIRTHDAY {friendName}! 🎉
          </motion.h1>

          <motion.div 
            className="birthday-images"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.img 
              src="https://via.placeholder.com/300x200/ff6b6b/ffffff?text=🎂+Birthday+Cake" 
              alt="Birthday Cake" 
              className="birthday-image"
              initial={{ x: -200, rotate: -90 }}
              animate={{ x: 0, rotate: 0 }}
              transition={{ 
                delay: 1.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            />
            <motion.img 
              src="https://via.placeholder.com/300x200/4ecdc4/ffffff?text=🎈+Balloons" 
              alt="Balloons" 
              className="birthday-image"
              initial={{ x: 200, rotate: 90 }}
              animate={{ x: 0, rotate: 0 }}
              transition={{ 
                delay: 1.7,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1, 
                y: [-5, 5, -5],
                transition: { duration: 0.5, repeat: Infinity }
              }}
            />
          </motion.div>

          <motion.p 
            className="birthday-message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            Hope your special day is filled with happiness, laughter, and all your favorite things! 
            🎁✨
          </motion.p>

          <div className="confetti">
            {[...Array(50)].map((_, i) => (
              <motion.div 
                key={i} 
                className="confetti-piece"
                initial={{ 
                  y: -100, 
                  x: Math.random() * window.innerWidth,
                  rotate: 0,
                  opacity: 0
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  rotate: 360,
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentPage}
        className="app-container"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.6
        }}
      >
        <motion.div 
          className="page-content"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Animated Background Elements */}
          <div className="animated-background">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-element"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.3
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          {/* Progress Bar with Animation */}
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="progress-fill" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentPage + 1) / friendName.length) * 100}%` }}
              transition={{ 
                duration: 1,
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
            />
          </motion.div>
          
          {/* Page Title with Bounce Animation */}
          <motion.h1 
            className="page-title"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.6,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05,
              color: "#ff6b6b",
              transition: { duration: 0.2 }
            }}
          >
            Page {currentPage + 1} of {friendName.length}
          </motion.h1>
          
          {/* Letters Display with Stagger Animation */}
          <motion.div 
            className="letters-display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2>Letters so far: 
              {enteredLetters.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.9 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.2, 
                    color: "#ff6b6b",
                    rotate: [0, -10, 10, 0]
                  }}
                  style={{ display: 'inline-block', margin: '0 2px' }}
                >
                  {letter}
                </motion.span>
              ))}
            </h2>
          </motion.div>
          
          {/* Page Image with Crazy Animations */}
          <motion.div 
            className="page-image"
            initial={{ scale: 0, rotate: 360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <motion.img 
              src={getPageImage(currentPage)} 
              alt={`Page ${currentPage + 1}`} 
              className="main-image"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, 5, -5, 0],
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>
          
          {/* Input Section with Error Animation */}
          <motion.div 
            className="input-section"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.h3
              animate={showError ? { 
                x: [0, -10, 10, -10, 10, 0],
                color: "#ff0000"
              } : {}}
              transition={{ duration: 0.5 }}
            >
              Enter the {getOrdinal(currentPage + 1)} letter of your name:
            </motion.h3>
            
            <motion.input
              type="text"
              maxLength="1"
              className="letter-input"
              onInput={handleLetterInput}
              placeholder="?"
              autoFocus
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 1.4,
                type: "spring",
                stiffness: 200
              }}
              whileFocus={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(255, 107, 107, 0.5)",
                borderColor: "#ff6b6b"
              }}
              animate={showError ? {
                x: [0, -20, 20, -20, 20, 0],
                borderColor: "#ff0000"
              } : {}}
            />
            
            <motion.p 
              className="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              animate={showError ? {
                color: "#ff0000",
                scale: [1, 1.1, 1]
              } : {}}
            >
              Hint: Looking for letter "{friendName[currentPage]}"
            </motion.p>
          </motion.div>

          {/* Celebration Mode Overlay */}
          <AnimatePresence>
            {celebrationMode && (
              <motion.div
                className="celebration-overlay"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="celebration-text"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  🎉 AMAZING! 🎉
                  <br />
                  Get ready for your surprise!
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function getPageImage(pageIndex) {
  const images = [
    "https://via.placeholder.com/400x300/ff9ff3/ffffff?text=🌟+Page+1",
    "https://via.placeholder.com/400x300/54a0ff/ffffff?text=🎯+Page+2", 
    "https://via.placeholder.com/400x300/5f27cd/ffffff?text=🚀+Page+3",
    "https://via.placeholder.com/400x300/00d2d3/ffffff?text=⭐+Page+4",
    "https://via.placeholder.com/400x300/ff6348/ffffff?text=🎪+Page+5",
    "https://via.placeholder.com/400x300/a55eea/ffffff?text=🎨+Page+6",
    "https://via.placeholder.com/400x300/26de81/ffffff?text=🎵+Page+7"
  ];
  return images[pageIndex] || images[0];
}

function getOrdinal(num) {
  const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  return ordinals[num - 1] || `${num}th`;
}

export default App;
