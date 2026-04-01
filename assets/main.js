// AI Link: 

// Live text rendering 
const textInput = document.getElementById('goal-text');
const cardText = document.querySelector('#card-text');

textInput.addEventListener('input', (e) => {
  cardText.textContent = e.target.value;
});

textInput.addEventListener('input', (e) => {
  const value = e.target.value;
  cardText.textContent = value !== '' ? value : 'Get Started!';
});

