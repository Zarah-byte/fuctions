// AI Link: https://claude.ai/share/3e4dbf9c-7b90-4bea-bfde-2ccf5f829bce

// VARIABLES
let sections = Array.from(
	document.querySelectorAll(
		'#cover, #goal-title, #reward-title, #goal-number, #goal-icon, #goal-color, #card-color, #card'
	)
);

//MY UNDERSTANDING:
//Array.from() converts that list into a  JS array.

//an array enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.

//in my case sections groups every wizard screen (cover, goal-title, …, card)—not the buttons.

// mdn : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

//document.querySelectorAll() finds all elements on the page with these IDs: cover, goal-title, reward-title etc

//It gives them back as a list in that same order.

//The array is saved in sections. These become the ordered list of screens/steps that users can move through.


let nextButtons = document.querySelectorAll(
	'#step-01, #step-02, #step-03, #step-04, #step-05, #step-06, #step-07'
);

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

// basically for each count button: when it's clicked, clear selection on all count buttons, mark only the clicked one as selected, then update the card preview.

function getVisibleSectionIndex() {
	for (let punchIndex = 0; punchIndex < sections.length; punchIndex++) {
		if (sections[punchIndex].classList.contains('hidden') === false) {
			return punchIndex;
		}
	}
	return 0;
}

//MY UNDERSTANDING:

// This function checks your sections list from start to end.

// It looks for the first section that is not hidden.

// As soon as it finds one, it returns that section's position number (i).

// If it somehow can't find any visible section, it returns 0 (the first section) as a fallback.


// NEXT BUTTONS
for (let i = 0; i < nextButtons.length; i++) {
	let currentNextButton = nextButtons[i];

	currentNextButton.addEventListener('click', function (event) {
		event.preventDefault();

		let currentIndex = getVisibleSectionIndex();
		let currentSection = sections[currentIndex];

		if (canGoNext(currentSection) === false) {
			return;
		}

		if (currentIndex < sections.length - 1) {
			let nextSection = sections[currentIndex + 1];

			currentSection.classList.add('hidden');
			nextSection.classList.remove('hidden');

			if (nextSection.id === 'card') {
				updateCardPreview();
			}

			// Save state any time the step changes.
			saveFormState();
		}
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
// Ask the rules: is the user allowed to leave this step? If not then

// 	return;
// 	…stop here. Do not hide/show anything.

// 	if (currentIndex < sections.length - 1) {
// 	Only move forward if there is a next section/user are not already on the last one.

// 	let nextSection = sections[currentIndex + 1];
// 	Get the next section in the list (one index higher).

// 	currentSection.classList.add('hidden');
// 	Hide the current section

// 	nextSection.classList.remove('hidden');
// 	Show the next section.

//when Next is clicked, get which section is visible right now and check if user can go next in that section. if valid, hide current section and show next section in the list.

function canGoNext(currentSection) {
	let sectionId = currentSection.id;

	// cover: no required input
	if (sectionId === 'cover') {
		return true;
	}

	// goal-title: requires text
	if (sectionId === 'goal-title') {
		let goalInput = document.getElementById('goal-text');
		if (!goalInput.value.trim()) {
			alert('Please enter your goal.');
			goalInput.focus();
			return false;
		}
		return true;
	}

	// reward-title: requires text
	if (sectionId === 'reward-title') {
		let rewardInput = document.getElementById('reward-text');
		if (!rewardInput.value.trim()) {
			alert('Please enter your reward.');
			rewardInput.focus();
			return false;
		}
		return true;
	}

	// goal-number: one count button must be selected
	if (sectionId === 'goal-number') {
		let selectedCount = currentSection.querySelector('.count-btn.selected');
		if (!selectedCount) {
			alert('Please choose how many times.');
			return false;
		}
		return true;
	}

	// goal-icon: one icon button must be selected
	if (sectionId === 'goal-icon') {
		let selectedIcon = currentSection.querySelector('.icon-btn.selected');
		if (!selectedIcon) {
			alert('Please choose an icon.');
			return false;
		}
		return true;
	}

	// goal-color: color input must have a value
	if (sectionId === 'goal-color') {
		let goalColor = document.getElementById('goal-color-picker');
		if (!goalColor.value) {
			alert('Please pick a goal color.');
			return false;
		}
		return true;
	}

	// card-color: color input must have a value
	if (sectionId === 'card-color') {
		let cardColor = document.getElementById('card-color-picker');
		if (!cardColor.value) {
			alert('Please pick a card color.');
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
// 	alert('');
// 	return false;
// means that is a option is not picked show the error in the ''



// BACK BUTTONS
for (let i = 0; i < backButtons.length; i++) {
	let currentBackButton = backButtons[i];

	currentBackButton.addEventListener('click', function (event) {
		event.preventDefault();

		let currentIndex = getVisibleSectionIndex();

		if (currentIndex > 0) {
			let currentSection = sections[currentIndex];
			let previousSection = sections[currentIndex - 1];

			currentSection.classList.add('hidden');
			previousSection.classList.remove('hidden');

			// Save state any time the step changes.
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
	// basically figure out which count button is selected and if you can't then stay with  with 8 

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
	let selectedSymbol = '★';

	if (selectedIconButton) {
		selectedSymbol = selectedIconButton.textContent;
	}

	for (let punchIndex = 0; punchIndex < punchItems.length; punchIndex++) {
		let punchContent = punchItems[punchIndex].querySelector('.punch-content');
		if (punchContent) {
			punchContent.textContent = selectedSymbol;
		}
	}
}
// updates punch icon 

goalInput.addEventListener('input', function () { updateCardPreview(); saveFormState(); });
rewardInput.addEventListener('input', function () { updateCardPreview(); saveFormState(); });
// listens for typing in the inputs

goalColorPicker.addEventListener('input', function () { updateCardPreview(); saveFormState(); });
cardColorPicker.addEventListener('input', function () { updateCardPreview(); saveFormState(); });
// listens for color changes

for (let i = 0; i < iconButtons.length; i++) {
	iconButtons[i].addEventListener('click', function () {
		for (let j = 0; j < iconButtons.length; j++) {
			iconButtons[j].classList.remove('selected');
		}

		this.classList.add('selected');
		updateCardPreview();
		// Save state any time an icon is selected.
		saveFormState();
	});
}
// listens for icon button clicks

updateCardPreview();
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

	if (state.goal) goalInput.value = state.goal;
	if (state.reward) rewardInput.value = state.reward;
	if (state.goalColor) goalColorPicker.value = state.goalColor;
	if (state.cardColor) cardColorPicker.value = state.cardColor;
	// Restore text and color fields if those values exist.

	if (state.count) {
		let matchingCount = document.querySelector(`.count-btn[data-count="${state.count}"]`);
		if (matchingCount) matchingCount.classList.add('selected');
	}
	// Finds the count button with matching data-count and mark it selected.


	if (state.icon) {
		let matchingIcon = document.querySelector(`.icon-btn[data-icon="${state.icon}"]`);
		if (matchingIcon) {
			document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('selected'));
			matchingIcon.classList.add('selected');
		}
	}
	// 	Finds the icon button with matching data-icon.
	// Clear selected from all icons first, then select the matching one.

	if (state.currentStep) {
		sections.forEach(s => s.classList.add('hidden'));
		sections[state.currentStep].classList.remove('hidden');
	}
	// Hide all sections, then show only the saved step.

	updateCardPreview();
	// Refresh the card so it matches restored values.
}

loadFormState();
// this rus everything