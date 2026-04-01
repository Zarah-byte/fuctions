// LIVE TEXT RENDER - HEADING
const goalInput = document.getElementById('goal-text');
const goalCard = document.getElementById('card-text');

goalInput.addEventListener('input', (e) => {
	const value = e.target.value;
	goalCard.textContent = value !== '' ? value : 'Get Started!';
});


// LIVE TEXT RENDER - REWARD
const rewardInput = document.getElementById('reward-text');
const rewardCard = document.getElementById('card-reward');

rewardInput.addEventListener('input', (e) => {
	const value = e.target.value;
	rewardCard.textContent = value !== '' ? value : 'Add your reward!';
});


// RENDER STAMP GRID
const countBtns = document.querySelectorAll('.count-btn');
const punchItems = document.querySelectorAll('.punches li');

countBtns.forEach(btn => {
		btn.addEventListener('click', () => {
				// Toggle selected state
				countBtns.forEach(b => b.classList.remove('selected'));
				btn.classList.add('selected');

				const count = Number(btn.dataset.count);

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

let currentIcon = '★';

const iconBtns = document.querySelectorAll('.icon-btn');

iconBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		iconBtns.forEach((b) => b.classList.remove('selected'));
		btn.classList.add('selected');

		currentIcon = icons[btn.dataset.icon];
		applyIconToGrid();
	});
});

function applyIconToGrid() {
	const punchItems = document.querySelectorAll('.punches li');

	punchItems.forEach((li) => {
		const content = li.querySelector('.punch-content');

		if (content) {
			content.textContent = currentIcon;
		} else {
			li.textContent = currentIcon;
		}
	});
}

// LIVE COLOR RENDER BACKGROUND + TEXT
const goalColorPicker = document.getElementById('goal-color-picker');
const cardColorPicker = document.getElementById('card-color-picker');
const card = document.getElementById('card');

if (goalColorPicker && card) {
	card.style.color = goalColorPicker.value;
	goalColorPicker.addEventListener('input', (event) => {
		card.style.color = event.target.value;
	});
}

if (cardColorPicker && card) {
	card.style.backgroundColor = cardColorPicker.value;
	cardColorPicker.addEventListener('input', (event) => {
		card.style.backgroundColor = event.target.value;
	});
}

// FONT CHANGE RENDER 

// PRINT STUFF
const printBtn = document.getElementById('print');

printBtn.addEventListener('click', () => {
  window.print();
});

//FILE SAVE STUFF



