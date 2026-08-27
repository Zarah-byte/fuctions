// Step navigation: shows one <section> at a time via main[data-step].
// .btn-start / .btn-next advance, .btn-back goes back. Other buttons are ignored.
const main = document.querySelector("main");
const LAST_STEP = 5;
let step = 1;

function go(n) {
	const next = Math.min(LAST_STEP, Math.max(1, n));
	main.dataset.dir = next < step ? "back" : "fwd"; // drives the slide direction (CSS)
	step = next;
	main.dataset.step = step;
}

// Live preview: goal/reward text and punch-circle count mirror the form inputs.
const goalEl = document.querySelector(".preview-goal");
const rewardEl = document.querySelector(".preview-reward");
const punchesEl = document.querySelector(".preview-punches");
let count = 8; // default
let icon = "star"; // default punch icon (matches the .is-selected picker button)

// The picker buttons hold the canonical SVGs; punches clone the selected one.
function renderPunches(n) {
	const svg = document.querySelector(`.icon-btn[data-icon="${icon}"] svg`);
	punchesEl.replaceChildren(...Array.from({ length: n }, () => {
		const li = document.createElement("li");
		if (svg) li.appendChild(svg.cloneNode(true));
		return li;
	}));
}

const goalInput = document.querySelector("#goal-text");
const rewardInput = document.querySelector("#reward-text");

goalInput.addEventListener("input", (e) => {
	goalEl.textContent = e.target.value.trim() || "your goal!";
	clearInvalid(e.target);
});
rewardInput.addEventListener("input", (e) => {
	rewardEl.textContent = e.target.value.trim() || "your reward!";
	clearInvalid(e.target);
});

function clearInvalid(el) {
	el.classList.remove("invalid");
	el.removeAttribute("aria-invalid");
}

// Re-triggers the shake animation even if the element is already flagged invalid.
function flagInvalid(el) {
	el.classList.remove("invalid");
	void el.offsetWidth; // force reflow so the animation restarts
	el.classList.add("invalid");
	el.setAttribute("aria-invalid", "true");
}

// Each step must be completed before advancing.
function validateStep(s) {
	if (s === 2) {
		let firstEmpty = null;
		[goalInput, rewardInput].forEach((inp) => {
			if (inp.value.trim()) clearInvalid(inp);
			else { flagInvalid(inp); if (!firstEmpty) firstEmpty = inp; }
		});
		if (firstEmpty) { firstEmpty.focus(); return false; }
		return true;
	}
	if (s === 3) {
		if (document.querySelector(".count-btn.is-selected")) return true;
		const list = document.querySelector('[class="03"] ul');
		list.classList.remove("shake");
		void list.offsetWidth;
		list.classList.add("shake");
		return false;
	}
	return true;
}

// Colour pickers (step 4) → live preview.
const cardEl = document.querySelector(".preview-card");
const cardColor = document.querySelector(".card-color");
const textColor = document.querySelector(".text-color");
cardColor.addEventListener("input", (e) => {
	cardEl.style.backgroundColor = e.target.value;
});
textColor.addEventListener("input", (e) => {
	goalEl.style.color = e.target.value;
	rewardEl.style.color = e.target.value;
});

// Reset everything back to the intro and its defaults.
function restart() {
	document.querySelector("#goal-text").value = "";
	document.querySelector("#reward-text").value = "";
	goalEl.textContent = "your goal!";
	rewardEl.textContent = "your reward!";
	count = 8;
	icon = "star";
	cardColor.value = "#F4AECF";
	textColor.value = "#D42A22";
	cardEl.style.backgroundColor = "";
	goalEl.style.color = "";
	rewardEl.style.color = "";
	document.querySelectorAll(".count-btn, .icon-btn").forEach((b) => b.classList.remove("is-selected"));
	document.querySelector('.icon-btn[data-icon="star"]').classList.add("is-selected");
	renderPunches(count);
	go(1);
}

main.addEventListener("click", (e) => {
	const btn = e.target.closest("button");
	if (!btn) return;
	if (btn.classList.contains("count-btn")) {
		count = Number(btn.dataset.count);
		renderPunches(count);
		document.querySelectorAll(".count-btn").forEach((b) => b.classList.remove("is-selected"));
		btn.classList.add("is-selected");
	} else if (btn.classList.contains("icon-btn")) {
		icon = btn.dataset.icon;
		renderPunches(count);
		document.querySelectorAll(".icon-btn").forEach((b) => b.classList.remove("is-selected"));
		btn.classList.add("is-selected");
	} else if (btn.classList.contains("btn-print")) {
		window.print();
	} else if (btn.classList.contains("btn-restart")) {
		restart();
	} else if (btn.classList.contains("btn-start") || btn.classList.contains("btn-next")) {
		if (validateStep(step)) go(step + 1);
	} else if (btn.classList.contains("btn-back")) go(step - 1);
});

// Info popover: buttons live in <header>, outside main's delegation, so wire it here.
// CSS reveals/hides .info and swaps the buttons off header's .info-open class.
const header = document.querySelector("header");
header.addEventListener("click", (e) => {
	if (e.target.closest(".btn-info")) header.classList.add("info-open");
	else if (e.target.closest(".btn-exit")) header.classList.remove("info-open");
});

renderPunches(count);
go(1);
