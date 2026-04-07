
// SECTION TRANSITIONS IE GOING FROM 'ONE PAGE' TO ANATHOR
let stepOneButton = document.getElementById('step-01');
let coverSection = document.getElementById('cover');
let goalTitleSection = document.getElementById('goal-title');

if (stepOneButton) {
	if (coverSection) {
		if (goalTitleSection) {
			stepOneButton.addEventListener('click', function () {
				if (coverSection.classList.contains('hidden') === false) {
					coverSection.classList.add('hidden');
					goalTitleSection.classList.remove('hidden');
				}
			});
		}
	}
}
//my understanding 

// let stepOneButton = document.getElementById('step-01');
// let coverSection = document.getElementById('cover');
// let goalTitleSection = document.getElementById('goal-title');

// defines variables 

//if (stepOneButton) {
//	if (coverSection) {
//		if (goalTitleSection) {

// says if all 3 exsist do the following 

// stepOneButton.addEventListener('click', function () {
// 	if (coverSection.classList.contains('hidden') === false) {
// 		coverSection.classList.add('hidden');
// 		goalTitleSection.classList.remove('hidden');

// When clicked, check that the cover is currently visible if it is visible then hide the cover and show the goal-title section

let stepTwoButton = document.getElementById('step-02');

let goalInput = document.getElementById('goal-text');
let rewardInput = document.getElementById('reward-text');

let goalNumberSection = document.getElementById('goal-number');

if (stepTwoButton) {
	if (goalInput) {
		if (rewardInput) {
			if (goalTitleSection) {
				if (goalNumberSection) {
					stepTwoButton.addEventListener('click', function () {
						let goalValue = goalInput.value.trim();
						let rewardValue = rewardInput.value.trim();

						if (goalValue !== '' && rewardValue !== '') {
							goalTitleSection.classList.add('hidden');
							goalNumberSection.classList.remove('hidden');
						}
					});
				}
			}
		}
	}
}

//my understanding 


if (stepThreeButton) {
	if (goalInput) {
		if (rewardInput) {
			if (goalTitleSection) {
				if (goalNumberSection) {
					stepTwoButton.addEventListener('click', function () {
						let goalValue = goalInput.value.trim();
						let rewardValue = rewardInput.value.trim();

						if (goalValue !== '' && rewardValue !== '') {
							goalTitleSection.classList.add('hidden');
							goalNumberSection.classList.remove('hidden');
						}
					});
				}
			}
		}
	}
}





