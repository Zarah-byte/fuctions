// AI LINK: 

// AI Link: 

// LIVE TEXT RENDER - HEADING
const goalInput = document.getElementById('goal-text');
const goalCard = document.querySelector('#card-text');

goalInput.addEventListener('input', (e) => {
  const value = e.target.value;
  goalCard.textContent = value !== '' ? value : 'Get Started!';
});

// LIVE TEXT RENDER - REWARD
const rewardInput = document.getElementById('reward-text');
const rewardCard = document.querySelector('.card-text-reward');

rewardInput.addEventListener('input', (e) => {
  const value = e.target.value;
  rewardCard.textContent = value !== '' ? value : 'Add your reward!';
});

// RENDER OF GRID

// LIVE COLOR RENDER BACKGROUND + TEXT + STAMP GRID


// FONT CHANGE RENDER 

// PRINT STUFF



