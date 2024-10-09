// src/components/HalloweenGame.js
import React, { useState } from 'react';

const HalloweenGame = () => {
  const [userLocation, setUserLocation] = useState('front');
  const [gameState, setGameState] = useState(
    'On Halloween night, you stand in front of a spooky old house. You feel like something mysterious is waiting for you inside. You can "check the cellar" or "look in the living room".'
  );

  const submitAction = (actionInput) => {
    const action = actionInput.toLowerCase().trim();
    let newState = '';

    if (userLocation === 'front') {
      if (action === 'check the cellar') {
        setUserLocation('cellar');
        newState = 'You go to the cellar. It’s dark and spooky. You can hear whispers. You can "look for ghosts" or "go back".';
      } else if (action === 'look in the living room') {
        setUserLocation('living room');
        newState = 'You enter the living room. Suddenly the ghost appears. It’s filled with old furniture and strange pictures. You can "talk to a ghost" or say "goodbye".';
      } else {
        newState = 'You can "check the cellar" or "look in the living room".';
      }
    } else if (userLocation === 'cellar') {
      if (action === 'look for ghosts') {
        newState = 'You see a friendly ghost! They smile at you and say they need help finding their lost item. You can "help the ghost" or "go back".';
      } else if (action === 'go back') {
        setUserLocation('front');
        newState = 'You go back outside. You can "check the cellar" or "look in the living room".';
      } else {
        newState = 'After a while, you discover a small silver locket hidden behind some dusty books. The ghost beams with joy, thanking you for your kindness. You can "go back".';
      }
    } else if (userLocation === 'living room') {
      if (action === 'talk to a ghost') {
        newState = 'A ghost seems a bit lonely. It shares tales of adventures when it was alive. You can "listen to more stories" or say "goodbye".';
      } else if (action === 'goodbye') {
        setUserLocation('front');
        newState = 'You go back outside. You can "check the cellar" or "look in the living room".';
      } else {
        newState = ' The ghost describes a hidden garden where flowers bloom in colors unseen by the living. It’s a place where dreams take shape, and anyone who enters leaves with a new hope. Now you can say "goodbye".';
      }
    }

    setGameState(newState);
  };

  return (
    <div>
      <p id="state">{gameState}</p>
      <form onSubmit={(e) => { e.preventDefault(); submitAction(e.target.actionInput.value); e.target.actionInput.value = ''; }}>
        <input id="action-input" name="actionInput" placeholder="Enter your action here..." />
        <button id="submit-button" type="submit">Done</button>
      </form>
    </div>
  );
};

export default HalloweenGame;
