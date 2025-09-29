// src/components/WordShuffle.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// A simpler animation for each letter
const letterVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
};

const WordShuffle = ({ words, duration = 2500, className }) => {
  const [index, setIndex] = React.useState(0);
  const [currentWord, setCurrentWord] = React.useState(words[index]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  React.useEffect(() => {
    let scrambleTimeout;
    const targetWord = words[index];
    const currentLength = currentWord.length;
    const targetLength = targetWord.length;

    const scramble = (iteration) => {
      if (iteration >= targetLength) {
        setCurrentWord(targetWord);
        return;
      }
      let newText = "";
      for (let i = 0; i < targetLength; i++) {
        if (i <= iteration) { newText += targetWord[i]; } 
        else { newText += CHARS[Math.floor(Math.random() * CHARS.length)]; }
      }
      for (let i = targetLength; i < currentLength; i++) {
        newText += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setCurrentWord(newText);
      scrambleTimeout = setTimeout(() => scramble(iteration + 1), 50);
    };
    scramble(0);
    return () => clearTimeout(scrambleTimeout);
  }, [index, words, currentWord.length]);

  return (
    <div className={`word-shuffle-container ${className}`}>
      <AnimatePresence mode="popLayout">
        {currentWord.split("").map((char, i) => (
          <motion.span
            key={`${index}-${i}`}
            variants={letterVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="word-shuffle-char"
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WordShuffle;