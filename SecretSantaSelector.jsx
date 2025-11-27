import React, { useState } from 'react';
import ChristmasScene from './ChristmasScene.jsx';
import './SecretSantaSelector.css';


const PARTICIPANTS = ['Nick', 'Stephen', 'Alina',
  'Sarah', 'Cathy', 'Laurence', 'Frances', 'Andrew',
  'Biniam', 'Adnan', 'Jo', 'Joe', 'Dan',
];

const getOrdSum = (name) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        // Use charCodeAt to get the 'ord' value of the character
        sum += name.charCodeAt(i);
    }
    return sum;
};

const generateSecretSantaPairs = (participants) => {
    // Note: Replace 'Your Name Here' with your name from the PARTICIPANTS array
    const USER_NAME = 'Your Name Here';
    const DAUGHTER_NAME = 'Cathy';

    let shuffledParticipants = [...participants];

    shuffledParticipants.sort((a, b) => {
        // 1. Calculate the sum of ords for comparison
        const ordSumA = getOrdSum(a);
        const ordSumB = getOrdSum(b);

        // 2. Apply Modulo 13 to create the Primary Sort Key (Mod 13)
        // Order by the result of Mod 13
        const mod13A = ordSumA % 13;
        const mod13B = ordSumB % 13;

        // Primary sort: Ascending order based on the Modulo 13 result
        const primarySort = mod13A - mod13B;

        if (primarySort !== 0) {
            return primarySort;
        }

        // 3. Tie-breaker: Order by the highest letter (ASCII/ord value)
        // Find the letter with the highest ord value in the name.
        const highestLetterA = a.split('').reduce((max, char) => Math.max(max, char.charCodeAt(0)), 0);
        const highestLetterB = b.split('').reduce((max, char) => Math.max(max, char.charCodeAt(0)), 0);

        // Secondary sort: Ascending order based on the highest character code
        return highestLetterA - highestLetterB;
    });

    // ... (Your constraint enforcement loop and final return goes here)
    let pairs = {};
    let tempShuffledParticipants = [...shuffledParticipants]; // Use the deterministically sorted list for the pairing array

    for (let i = 0; i < participants.length; i++) {
        let giver = participants[i];
        let receiver = tempShuffledParticipants[i];

        // Ensure no self-pairing
        if (giver === receiver) {
            // Swap logic (kept simple)
            if (i === participants.length - 1) {
                receiver = tempShuffledParticipants[i - 1];
                pairs[participants[i - 1]] = tempShuffledParticipants[i];
            } else {
                let temp = tempShuffledParticipants[i + 1];
                tempShuffledParticipants[i + 1] = tempShuffledParticipants[i];
                receiver = temp;
            }
        }

        // Ensure User <-> Daughter constraint is met
        while (
            (giver === USER_NAME && receiver === DAUGHTER_NAME) ||
            (giver === DAUGHTER_NAME && receiver === USER_NAME)
        ) {
            let receiverIndex = tempShuffledParticipants.indexOf(receiver);
            let swapIndex = (receiverIndex + 1) % tempShuffledParticipants.length;
            receiver = tempShuffledParticipants[swapIndex];
        }

        pairs[giver] = receiver;
    }
    return pairs;
};

const SECRET_SANTA_PAIRS = generateSecretSantaPairs(PARTICIPANTS);

const SecretSantaSelector = () => {
  const [selectedName, setSelectedName] = useState('');
  const [targetSanta, setTargetSanta] = useState(null);
  const [fanfareActive, setFanfareActive] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Logic triggers immediately upon selection
  const handleNameSelection = (e) => {
    const userEntry = e.target.value;
    setSelectedName(userEntry);

    const santaTarget = SECRET_SANTA_PAIRS[userEntry];

    if (santaTarget) {
      setFanfareActive(true);
      setTimeout(() => {
        setTargetSanta(santaTarget);
        setFanfareActive(false);
      }, 2000);
    }
  };

  const resetState = () => {
    setTargetSanta(null);
    setSelectedName('');
    setIsDropdownVisible(false);
  }

  if (fanfareActive) {
    return (
      <div className="full-screen-container fanfare-mode">
        <h1 className="fanfare-text">🎉 CRACKING THE CRACKER... 🦌</h1>
      </div>
    );
  }

  if (targetSanta) {
    return (
      <div className="full-screen-container reveal-mode">
        <div className="reveal-box festive-glow">
          <h1 className="reveal-heading">MERRY CHRISTMAS, {selectedName.toUpperCase()}</h1>
          <p className="reveal-text">**Your Secret Santa Target Is...**</p>
          <h2 className="target-name">{targetSanta}</h2>
          <button onClick={resetState} className="reset-button festive-button">
            Reset
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="full-screen-container input-mode">
      <ChristmasScene />

      <div className="santa-control-panel">
        <h3 className="panel-title">Your Secret Santa</h3>

        <div className="santa-interaction-area">
          <button
            type="button"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            className="cracker-button festive-button"
            style={{ marginBottom: isDropdownVisible ? '20px' : '0' }}
          >
            Click to find recipient
          </button>

          {isDropdownVisible && (
            <div className="dropdown-wrapper">
                <select
                  id="santa-name"
                  value={selectedName}
                  onChange={handleNameSelection}
                  className="name-select festive-select"
                >
                  <option value="" disabled>-- Choose Your Name --</option>
                  {PARTICIPANTS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecretSantaSelector;