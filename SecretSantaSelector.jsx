import React, { useState } from 'react';
import ChristmasScene from './ChristmasScene.jsx';
import './SecretSantaSelector.css';


const PARTICIPANTS = [
  'Sarah', 'Cathy', 'Laurence', 'Frances', 'Andrew',
  'Biniam', 'Adnan', 'Jo', 'Joe', 'Dan',
];

const generateSecretSantaPairs = (participants) => {

    const USER_NAME = 'Sarah';
    const DAUGHTER_NAME = 'Cathy';

    let shuffledParticipants = [...participants].sort(() => 0.5 - Math.random());
    let pairs = {};

    for (let i = 0; i < participants.length; i++) {
        let giver = participants[i];
        let receiver = shuffledParticipants[i];

        // 1. Initial check for self-pairing
        if (giver === receiver) {
            // Standard swap logic
            if (i === participants.length - 1) {
                receiver = shuffledParticipants[i - 1];
                pairs[participants[i - 1]] = shuffledParticipants[i];
            } else {
                let temp = shuffledParticipants[i + 1];
                shuffledParticipants[i + 1] = shuffledParticipants[i];
                receiver = temp;
            }
        }

        // 2. 🎁 NEW CONSTRAINT CHECK 🎁
        // If the current pair is User -> Daughter OR Daughter -> User, swap the receiver.
        while (
            (giver === USER_NAME && receiver === DAUGHTER_NAME) ||
            (giver === DAUGHTER_NAME && receiver === USER_NAME)
        ) {
            // Find the index of the current receiver in the shuffled list
            let receiverIndex = shuffledParticipants.indexOf(receiver);

            // Swap the receiver with the person at the next index (circularly)
            let swapIndex = (receiverIndex + 1) % shuffledParticipants.length;
            receiver = shuffledParticipants[swapIndex];
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