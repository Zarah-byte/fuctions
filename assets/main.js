// AI Link: https://claude.ai/share/3e4dbf9c-7b90-4bea-bfde-2ccf5f829bce

// VARIABLES
let cover = document.getElementById('cover');

let sections = Array.from(
	document.querySelectorAll(
		'#goal-title, #goal-number, #goal-icon, #goal-color, #card-color, #card'
	)
);
//MY UNDERSTANDING:
//Array.from() converts that list into a JS array.

//an array enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.

//in my case sections groups every wizard screen (cover, goal-title, etc)—not the buttons.

// mdn : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

//document.querySelectorAll() finds all elements on the page with these IDs: cover, goal-title, reward-title etc

//It gives them back as a list in that same order as the HTML.

//The array is saved in sections. These become the ordered list of screens/steps that users can move through.


// Cover dismiss
let step01 = document.getElementById('step-01');
if (step01) {
	step01.addEventListener('click', function () {
		cover.classList.add('cover--out');
		if (sharedNav) sharedNav.style.display = 'flex';
		updateProgressBar();
		setTimeout(function () {
			cover.classList.add('hidden');
			cover.classList.remove('cover--out');
		}, 500);
	});
}

let nextButtons = document.querySelectorAll('#nav-next');

//MY UNDERSTANDING:

//Find all elements with IDs step-01 → step-07 only (#card is a section, not a next button).

//allows users to go through that list one by one and tells each button what to do when a user clicks it.

let backButtons = document.querySelectorAll('.back-button');

let countButtons = document.querySelectorAll('.count-btn');

//MY UNDERSTANDING:

//countButtons stores all the number choice buttons in goal-number section.

//when one is clicked, remove selected from all then add selected to clicked button.


for (let punchIndex = 0; punchIndex < countButtons.length; punchIndex++) {
	countButtons[punchIndex].addEventListener('click', function () {
		for (let j = 0; j < countButtons.length; j++) {
			countButtons[j].classList.remove('selected');
		}
		this.classList.add('selected');
		updateCardPreview();
		// Save state any time a count button is clicked.
		saveFormState();
	});
}

//MY UNDERSTANDING:
// there are two loops.
//loop 1 - for (let punchIndex = 0; punchIndex < countButtons.length; punchIndex++)
// punchIndex is just the index (0, 1, 2, etc) while you walk through every count button.
// countButtons[punchIndex] is the current number button in this pass.
// So you're setting up one click handler per count button.
// countButtons[punchIndex].addEventListener('click', function () {})
// When that number button is clicked, run the function inside.

// Inner loop: for (let j = 0; j < countButtons.length; j++)
// j is another index for "all count buttons again."
// countButtons[j].classList.remove('selected') clears the selected state from every count button.
// So: before marking a new choice, unselect all of them.

// After the inner loop
// this.classList.add('selected') — on the button that was actually clicked, add selected (the handler's this is that button).
// updateCardPreview() — refresh the card preview so the punch count (and anything else that function updates) matches the new choice.

// 1.) go through each ctn-button
// 2.) When one is clicked, remove "Selected" from all buttons (inner loop)
// 3.) add selected to the "clicked" one
// 4.) refresh the preview and update the state
// basically for each count button: when it's clicked, clear selection on all count buttons, mark only the clicked one as selected, then update the card preview.

// Deck sections = form steps only (no cover, no final card)
let deckSections = sections.slice(0, sections.length - 1);
let finalCard = document.getElementById('card');

function getVisibleSectionIndex() {
	for (let i = 0; i < deckSections.length; i++) {
		if (deckSections[i].classList.contains('card--current')) return i;
	}
	if (finalCard && !finalCard.classList.contains('hidden')) return sections.length - 1;
	return 0;
}

let sharedNav = document.querySelector('.back-next-button');

function setDeckState(currentIdx) {
	deckSections.forEach(function (s) {
		s.classList.remove('card--current', 'card--exit-left', 'card--exit-right', 'card--enter-right', 'card--enter-left');
	});
	if (deckSections[currentIdx]) {
		deckSections[currentIdx].classList.add('card--current');
	}

	// Show shared nav (cover hides it via its own logic)
	if (sharedNav && cover.classList.contains('hidden')) {
		sharedNav.style.display = 'flex';
	}
}

const SLIDE_DURATION = 420;
let isSliding = false;

function slideCards(fromSection, toSection, direction) {
	if (isSliding) return;
	isSliding = true;

	let exitClass  = direction === 'forward' ? 'card--exit-left'  : 'card--exit-right';
	let enterClass = direction === 'forward' ? 'card--enter-right' : 'card--enter-left';

	fromSection.classList.remove('card--current');
	fromSection.classList.add(exitClass);
	toSection.classList.add(enterClass);

	setTimeout(function () {
		fromSection.classList.remove(exitClass);
		toSection.classList.remove(enterClass);
		toSection.classList.add('card--current');
		isSliding = false;
		updateProgressBar();
		saveFormState();
	}, SLIDE_DURATION);
}

// Initialise deck
setDeckState(0);


// PROGRESS BAR
// sections[0] = cover, sections[last] = card — hide bar on both ends.
// During form steps (indices 1 to length-2), fill proportionally.
function updateProgressBar() {
	let progressWrap = document.getElementById('progress-bar-wrap');
	let progressBar  = document.getElementById('progress-bar');

	// Hide if cover is showing or final card is showing
	if (!cover.classList.contains('hidden') || (finalCard && !finalCard.classList.contains('hidden'))) {
		progressWrap.classList.add('hidden');
		return;
	}

	let currentIndex = getVisibleSectionIndex();
	let formSteps    = deckSections.length;

	progressWrap.classList.remove('hidden');
	let percent = ((currentIndex + 1) / formSteps) * 100;
	progressBar.style.width = percent + '%';
}

// SHAKE ERROR STATE
function shakeSection(section) {
	let target = section.querySelector('.addgoal, .reward-title, .goal-number, .goal-icon, .goal-color, .card-color') || section;
	target.classList.remove('shake');
	void target.offsetWidth;
	target.classList.add('shake');

	setTimeout(function () {
		target.classList.remove('shake');
	}, 400);
}

//MY UNDERSTANDING:

// shakeSection() is a helper function for the error state.

// section is whichever section is currently being checked, like goal-title or reward-title.

// section.classList.remove('shake') removes the class first in case it was already there before.

// void section.offsetWidth forces the browser to re-read the layout.
// this helps restart the animation from the beginning every time.

// section.classList.add('shake') adds the shake class so the CSS animation runs.

// setTimeout removes the shake class after 400ms so the section can be shaken again later.

// basically:
// 1.) remove old shake
// 2.) force refresh/restart
// 3.) add shake class
// 4.) remove it after the animation finishes


// NEXT BUTTONS
for (let i = 0; i < nextButtons.length; i++) {
	nextButtons[i].addEventListener('click', function (event) {
		event.preventDefault();

		let currentIndex = getVisibleSectionIndex();
		let currentSection = deckSections[currentIndex];

		if (!currentSection || canGoNext(currentSection) === false) return;

		let nextIndex = currentIndex + 1;

		// Moving to the final card section — exit + loader + reveal
		if (nextIndex >= deckSections.length) {
			if (isSliding) return;
			isSliding = true;
			currentSection.classList.remove('card--current');
			currentSection.classList.add('card--exit-left');
			let loader = document.getElementById('loader');
			loader.classList.remove('hidden');

			setTimeout(function () {
				currentSection.classList.remove('card--exit-left');
				loader.classList.add('hidden');
				finalCard.classList.remove('hidden');
				if (sharedNav) sharedNav.style.display = 'none';
				isSliding = false;
				updateCardPreview();
				updateProgressBar();
				saveFormState();
			}, 1500);
			return;
		}

		// Horizontal slide to next card
		slideCards(currentSection, deckSections[nextIndex], 'forward');
	});
}

//MY UNDERSTANDING:

// for (let i = 0; i < nextButtons.length; i++) {
// Loop through every Next button. Start at index 0, stop when you've done all of them, increase i by 1 each time.

// let currentNextButton = nextButtons[i];
// Grab the Next button at position i.

// event.preventDefault();
// 	Stop the browser's default click behavior (e.g. form submit) so your script controls navigation.

// let currentIndex = getVisibleSectionIndex();
// Figure out which step/section is currently visible (a number like 0, 1, 2 etc).

// 	let currentSection = sections[currentIndex];
// 	Get the actual section element for that step.

// if (canGoNext(currentSection) === false) {
// Ask the rules: is the user allowed to leave this step? If not then return;

// 	if (currentIndex < sections.length - 1) {
// 	Only move forward if there is a next section/user are not already on the last one.

// 	let nextSection = sections[currentIndex + 1];
// 	Get the next section in the list (one index higher).

// 1.) loop through all buttons
// 2.) when something is clicked, we stopped the default processes
// 3.) check which sections are visible
// 4.) check if the user is eligible to move on
// 5.) if yes, we hide the current section and move on to the next
// 6.) if next section is card preview, we update it
// 7.) save state

function canGoNext(currentSection) {
	let sectionId = currentSection.id;

	// cover: no required input
	if (sectionId === 'cover') {
		return true;
	}

	// goal-title: both goal and reward inputs must be filled
	if (sectionId === 'goal-title') {
		let goalInput = document.getElementById('goal-text');
		let rewardInput = document.getElementById('reward-text');

		if (!goalInput.value.trim()) {
			shakeSection(currentSection.querySelector('.addgoal'));
			goalInput.focus();
			return false;
		}
		if (!rewardInput.value.trim()) {
			shakeSection(currentSection.querySelector('.reward-title'));
			rewardInput.focus();
			return false;
		}
		return true;
	}

	// goal-number: one count button must be selected
	if (sectionId === 'goal-number') {
		let selectedCount = currentSection.querySelector('.count-btn.selected');
		if (!selectedCount) {
			shakeSection(currentSection);
			return false;
		}
		return true;
	}

	// goal-icon: one icon button must be selected
	if (sectionId === 'goal-icon') {
		let selectedIcon = currentSection.querySelector('.icon-btn.selected');
		if (!selectedIcon) {
			shakeSection(currentSection);
			return false;
		}
		return true;
	}

	// goal-color: color input must have a value
	if (sectionId === 'goal-color') {
		let goalColor = document.getElementById('goal-color-picker');
		if (!goalColor.value) {
			shakeSection(currentSection);
			return false;
		}
		return true;
	}

	// card-color: color input must have a value
	if (sectionId === 'card-color') {
		let cardColor = document.getElementById('card-color-picker');
		if (!cardColor.value) {
			shakeSection(currentSection);
			return false;
		}
		return true;
	}

	return true;
}

//MY UNDERSTANDING:

//canGoNext checks rules for each section before moving forward.

//text sections must not be empty.

//count and icon sections must have a selected button.

//color sections must have a color value.

// if (!) {
// 	shakeSection(currentSection);
// 	return false;
// means that if the required option is missing, shake the current section and stop the user from moving on.

// goalInput.focus() or rewardInput.focus() moves the cursor back into that input so the user can fix it right away.


// BACK BUTTONS
for (let i = 0; i < backButtons.length; i++) {
	backButtons[i].addEventListener('click', function (event) {
		event.preventDefault();

		let currentIndex = getVisibleSectionIndex();

		// Going back from the final card section
		if (finalCard && !finalCard.classList.contains('hidden')) {
			finalCard.classList.add('hidden');
			if (sharedNav) sharedNav.style.display = 'flex';
			setDeckState(deckSections.length - 1);
			updateProgressBar();
			saveFormState();
			return;
		}

		if (currentIndex > 0) {
			slideCards(deckSections[currentIndex], deckSections[currentIndex - 1], 'back');
		} else {
			// Back from first step → return to cover
			cover.classList.remove('hidden', 'cover--out');
			if (sharedNav) sharedNav.style.display = 'none';
			updateProgressBar();
			saveFormState();
		}
	});
}

//MY UNDERSTANDING:
// all the back buttons are stored in backButtons.

//The loop attaches the same handler to each back button.

//On click: find the visible section. If index > 0, hide current and show the previous section in sections[].


// CARD PREVIEW VARIABLES
let goalInput = document.getElementById('goal-text');
let rewardInput = document.getElementById('reward-text');
let goalColorPicker = document.getElementById('goal-color-picker');
let cardColorPicker = document.getElementById('card-color-picker');

let cardText = document.getElementById('card-text');
let cardReward = document.getElementById('card-reward');
let cardLayout = document.querySelector('.card-layout');

let iconButtons = document.querySelectorAll('.icon-btn');
let punchItems = document.querySelectorAll('.punches li');


function updateCardPreview() {
	// update the card preview

	if (goalInput.value.trim() !== '') {
		cardText.textContent = goalInput.value;
	} else {
		cardText.textContent = 'Get Started!';
	}
	// update goal text

	if (rewardInput.value.trim() !== '') {
		cardReward.textContent = rewardInput.value;
	} else {
		cardReward.textContent = 'Add your reward!';
	}
	// updates reward text

	cardText.style.color = goalColorPicker.value;
	cardReward.style.color = goalColorPicker.value;
	// updates text color

	cardLayout.style.backgroundColor = cardColorPicker.value;
	// updates card background color

	let selectedCountButton = document.querySelector('.count-btn.selected');
	let count = 8;

	// Looks through the document for one element that matches the CSS selector .count-btn.selected.
	// That means: an element with class count-btn and class selected (your "this number is chosen" state).
	// The result is stored in selectedCountButton.
	// If nothing matches, you get null.
	// let count = 8;
	// Creates a variable count and sets it to 8.
	// It's usually a default fallback: "if we didn't find a selected count button, assume 8" (or use 8 until the user picks a number).
	// basically figure out which count button is selected and if you can't then stay with 8

	if (selectedCountButton) {
		count = Number(selectedCountButton.getAttribute('data-count'));
	}

	// if (selectedCountButton) Only run the next line if a selected count button was found. If selectedCountButton is null (nothing matched .count-btn.selected), the block is skipped and count stays whatever it was before

	for (let punchIndex = 0; punchIndex < punchItems.length; punchIndex++) {
		if (punchIndex < count) {
			punchItems[punchIndex].classList.remove('hidden');
		} else {
			punchItems[punchIndex].classList.add('hidden');
		}
	}
	// for (let punchIndex = 0; i < punchItems.length; punchIndex++)
	// Go through every punch row in order: first item is punchIndex = 0, then 1, then 2, until you've touched all of them (punchItems.length is how many there are).
	// if (punchIndex < count)
	// If this row's index is less than the chosen number (count), that punch slot should be visible.

	// punchItems[i].classList.remove('hidden')
	// Remove the hidden class so that row shows (your CSS usually makes .hidden display: none).

	// else
	// If punchIndex is not less than count (this row is past the number the user picked), it should be hidden.

	// punchItems[i].classList.add('hidden')
	// Add hidden so that extra row does not show.

	// Basically show only the first count punch rows; hide all the rest.

	let selectedIconButton = document.querySelector('.icon-btn.selected');
	let iconType = selectedIconButton ? selectedIconButton.getAttribute('data-icon') : null;

	let punchList = document.querySelector('.punches');
	if (punchList) {
		punchList.style.color = goalColorPicker.value;
	}

	for (let punchIndex = 0; punchIndex < punchItems.length; punchIndex++) {
		let punchContent = punchItems[punchIndex].querySelector('.punch-content');
		if (punchContent) {
			if (selectedIconButton) {
				let svgEl = selectedIconButton.querySelector('svg');
				punchContent.innerHTML = svgEl ? svgEl.outerHTML : '★';
				if (iconType) {
					punchContent.setAttribute('data-icon', iconType);
				}
			} else {
				punchContent.textContent = '★';
				punchContent.removeAttribute('data-icon');
			}
		}
	}
}
// updates punch icon

function updateMiniPreview() {
	let miniPreview = document.getElementById('mini-preview');
	let previewLetter = document.getElementById('preview-letter');
	let previewIconWrap = document.getElementById('preview-icon-wrap');
	let selectedIconButton = document.querySelector('.icon-btn.selected');

	if (previewLetter) {
		let goalVal = goalInput.value.trim();
		previewLetter.textContent = goalVal ? goalVal[0].toUpperCase() : '';
		previewLetter.style.color = goalColorPicker.value;
	}
	if (previewIconWrap) {
		let svgEl = selectedIconButton ? selectedIconButton.querySelector('svg') : null;
		previewIconWrap.innerHTML = svgEl ? svgEl.outerHTML : '';
		previewIconWrap.style.color = goalColorPicker.value;
	}
	if (miniPreview) {
		miniPreview.style.backgroundColor = cardColorPicker.value;
	}
}

goalInput.addEventListener('input', function () { updateCardPreview(); updateMiniPreview(); saveFormState(); });
rewardInput.addEventListener('input', function () { updateCardPreview(); saveFormState(); });
// listens for typing in the inputs

goalColorPicker.addEventListener('input', function () { updateCardPreview(); updateMiniPreview(); saveFormState(); });
cardColorPicker.addEventListener('input', function () { updateCardPreview(); updateMiniPreview(); saveFormState(); });
// listens for color changes

for (let i = 0; i < iconButtons.length; i++) {
	iconButtons[i].addEventListener('click', function () {
		for (let j = 0; j < iconButtons.length; j++) {
			iconButtons[j].classList.remove('selected');
		}

		this.classList.add('selected');
		updateCardPreview();
		updateMiniPreview();
		// Save state any time an icon is selected.
		saveFormState();
	});
}
// listens for icon button clicks

updateCardPreview();
updateMiniPreview();
// runs once when page loads


// SAVE TO DEVICE BUTTON

let saveButton = document.getElementById('save');

if (saveButton) {
	saveButton.addEventListener('click', function () {
		window.print();
	});
}

//MY UNDERSTANDING:

//document.getElementById('save') finds the Save button in the HTML (id="save").

//if (saveButton) means "only run this if that element exists," so the script won't error if the button is missing.

//addEventListener('click', etc) runs the function when the user clicks Save.

//Right now the handler calls window.print(), which opens the browser's print dialog (same behavior as Print).



// PRINT
let printButton = document.getElementById('print');

if (printButton) {
	printButton.addEventListener('click', function () {
		window.print();
	});
}

// same as save butn

// SAVE FORM STATE
function saveFormState() {
	let selectedCountButton = document.querySelector('.count-btn.selected');
	let selectedIconButton = document.querySelector('.icon-btn.selected');

	// 	let selectedCountButton = document.querySelector('.count-btn.selected');
	// Finds the one button that has both classes:
	// count-btn (it is a count option button)
	// selected (the one that is chosen)
	// Saves that element into selectedCountButton.
	// If none is selected, this becomes null.

	// let selectedIconButton = document.querySelector('.icon-btn.selected');
	// Same idea, but for icon options.

	// basically both say that when saving form state, first find which count button and which icon button are currently selected

	let state = {
		text: {
			goal: goalInput.value,
			reward: rewardInput.value
		},
		style: {
			goalColor: goalColorPicker.value,
			cardColor: cardColorPicker.value
		},
		choices: {
			count: selectedCountButton ? selectedCountButton.getAttribute('data-count') : null,
			icon: selectedIconButton ? selectedIconButton.getAttribute('data-icon') : null
		},
		progress: {
			currentStep: getVisibleSectionIndex()
		}
	};

	// just defines variables and saves it as 'state'

	localStorage.setItem('punchyFormState', JSON.stringify(state));

	// Converts state object into text (JSON.stringify(state)).
	// Save that text in the browser’s local storage under the key 'punchyFormState'.
}

// LOAD FORM STATE
function loadFormState() {
	let saved = localStorage.getItem('punchyFormState');
	// Read previously saved form data (as text).
	if (!saved) return;
	// If nothing is saved, stop.

	let state = JSON.parse(saved);
	// Convert saved text back into an object

	if (state.text && state.text.goal) goalInput.value = state.text.goal;
	if (state.text && state.text.reward) rewardInput.value = state.text.reward;
	if (state.style && state.style.goalColor) goalColorPicker.value = state.style.goalColor;
	if (state.style && state.style.cardColor) cardColorPicker.value = state.style.cardColor;
	// Restore text and color fields if those values exist.

	if (state.choices && state.choices.count) {
		let matchingCount = document.querySelector(`.count-btn[data-count="${state.choices.count}"]`);
		if (matchingCount) matchingCount.classList.add('selected');
	}
	// Finds the count button with matching data-count and mark it selected.

	if (state.choices && state.choices.icon) {
		let matchingIcon = document.querySelector(`.icon-btn[data-icon="${state.choices.icon}"]`);
		if (matchingIcon) {
			document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('selected'));
			matchingIcon.classList.add('selected');
		}
	}
	// 	Finds the icon button with matching data-icon.
	// Clear selected from all icons first, then select the matching one.

	if (state.progress && state.progress.currentStep !== undefined && state.progress.currentStep !== null) {
		let step = Number(state.progress.currentStep);
		if (step >= deckSections.length) {
			// Was on the final card
			finalCard.classList.remove('hidden');
			setDeckState(deckSections.length - 1);
		} else {
			finalCard.classList.add('hidden');
			setDeckState(step);
		}
	}
	// Restore the saved step in the deck.

	updateCardPreview();
	updateProgressBar();
	// Refresh the card so it matches restored values.
}

loadFormState();
updateMiniPreview();
// this rus everything


// MAKE A NEW CARD BUTTON
let returnToStartButton = document.getElementById('return-to-start');
let cardForm = document.getElementById('card-form');

if (returnToStartButton) {
	returnToStartButton.addEventListener('click', function () {
		// reset all form fields back to their original HTML values
		cardForm.reset();

		// remove selected state from all count buttons
		for (let i = 0; i < countButtons.length; i++) {
			countButtons[i].classList.remove('selected');
		}

		// remove selected state from all icon buttons
		for (let i = 0; i < iconButtons.length; i++) {
			iconButtons[i].classList.remove('selected');
		}

		// put the default icon back on the first icon button
		if (iconButtons.length > 0) {
			iconButtons[0].classList.add('selected');
		}

		// hide the final card, reset deck, and show the cover
		finalCard.classList.add('hidden');
		if (sharedNav) sharedNav.style.display = 'none';
		cover.classList.remove('hidden', 'cover--out');
		setDeckState(0);

		// clear saved progress from local storage
		localStorage.clear('punchyFormState');
		// googled how to clear local storage - got it frm mdn: https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear

		// redraw the preview card with the reset/default values
		updateCardPreview();
		updateProgressBar();
	});
}