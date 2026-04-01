// LIVE TEXT RENDER - HEADING
const goalInput = document.getElementById('goal-text');
const goalCard = document.getElementById('card-text');

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

// REDER STAMP GRID
const goalNumbers = document.querySelectorAll('.goal-number li');
const punchItems = document.querySelectorAll('.punches li');

goalNumbers.forEach(li => {
	li.addEventListener('click', () => {
		const count = Number(li.textContent);

		punchItems.forEach((punch, index) => {
			if (index < count) {
				punch.classList.remove('hidden');
			} else {
				punch.classList.add('hidden');
			}
		});

	});
});

// ICONS IN STAMP GRID
const icons = {
	smiley: '🙂',
	star: '★',
	heart: '♥',
	check: '✓'
};

let currentIcon = null;

const iconBtns = document.querySelectorAll('.icon-btn');

iconBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    iconBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    currentIcon = icons[btn.dataset.icon];
    applyIconToGrid();
  });
});

iconBtns.forEach(b => b.classList.remove('selected'));

btn.classList.add('selected');

iconBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    iconBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    currentIcon = icons[btn.dataset.icon];
    applyIconToGrid();
  });
});

currentIcon = icons[btn.dataset.icon];

function applyIconToGrid() {
  if (!currentIcon) return;
  const punchItems = document.querySelectorAll('.punches li');
  punchItems.forEach(li => {
    li.textContent = currentIcon;
  });
}


// LIVE COLOR RENDER BACKGROUND + TEXT + STAMP GRID


// FONT CHANGE RENDER 

// PRINT STUFF



