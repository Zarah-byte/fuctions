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
const goalNumbers = document.querySelectorAll('.goal-number li');
const punchItems = document.querySelectorAll('.punches li');

// RENDER OF ICONS
  li.innerHTML = currentIcon;
  const icons = {
    star:`insert svg code here`,

    smiley:`<?xml version="1.0" encoding="utf-8"?>

    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
    
    <g fill="#000000">
    
    <path d="M8 12c-1.01 0-1.782-.504-2.267-.945a4.72 4.72 0 01-.564-.614 3.31 3.31 0 01-.212-.305.75.75 0 011.284-.775 3.214 3.214 0 00.5.584c.341.31.769.555 1.259.555.49 0 .918-.246 1.258-.555a3.214 3.214 0 00.5-.584.75.75 0 011.285.775l-.212.305c-.128.167-.317.39-.564.614C9.782 11.495 9.01 12 8 12zM5 6a1 1 0 011-1h.007a1 1 0 010 2H6a1 1 0 01-1-1zM10 5a1 1 0 100 2h.007a1 1 0 100-2H10z"/>
    
    <path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z" clip-rule="evenodd"/>
    
    </g>
    
    </svg>`,
  }

  let currentIcon = icons.smiley;

// LIVE COLOR RENDER BACKGROUND + TEXT + STAMP GRID


// FONT CHANGE RENDER 

// PRINT STUFF



