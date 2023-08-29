const formElements = document.querySelector('#form');
const billContainer = document.querySelector('.bill-container');
const peopleContainer = document.querySelector('.people-container');
const tipButtons = document.querySelectorAll('.tip');
const inputNumbers = document.querySelectorAll('.input-number');
const errorMessage = document.querySelectorAll('.error-message');
const inputBill = document.getElementById('billAmount');
const customTip = document.getElementById('customTip');
const inputPeople = document.getElementById('numberOfPeople');
const outputTip = document.getElementById('tipPerPerson');
const outputTotal = document.getElementById('totalPerPerson');

function calculator() {
	for (let i = 0; i < tipButtons.length; i++) {
		document.addEventListener('input', () => {
			let bill = Number(inputBill.value);
			let people = Number(inputPeople.value);
			const calculateTip = () => {
				let selectedTip = document.querySelector('.active');
				let tip = parseFloat(selectedTip.value) / 100;
				let calcPerPerson = (bill * tip) / people;
				let calcTotal = (bill + calcPerPerson * people) / people;
				outputTip.innerHTML = '$' + calcPerPerson.toFixed(2);
				outputTotal.innerHTML = '$' + calcTotal.toFixed(2);
			};

			const validateInput = () => {
				if (bill > 0 && people === 0) {
					peopleContainer.classList.add('error');
					errorMessage[0].classList.add('hidden');
					errorMessage[1].classList.remove('hidden');
					billContainer.classList.remove('error');
				} else if (bill === 0 && people > 0) {
					billContainer.classList.add('error');
					errorMessage[0].classList.remove('hidden');
					errorMessage[1].classList.add('hidden');
					peopleContainer.classList.remove('error');
				} else if (bill > 0 && people > 0) {
					billContainer.classList.remove('error');
					peopleContainer.classList.remove('error');
					errorMessage.forEach((message) => {
						message.classList.add('hidden');
					});
					calculateTip();
				} else {
					billContainer.classList.add('error');
					peopleContainer.classList.add('error');
					errorMessage.forEach((message) => {
						message.classList.remove('hidden');
					});
				}
			};

			tipButtons[i].addEventListener('input', () => {
				validateInput();
			});
			tipButtons[i].addEventListener('click', () => {
				if (i !== tipButtons.length - 1) {
					validateInput();
				}
			});
			tipButtons[i].addEventListener('keypress', () => {
				validateInput();
			});

			inputNumbers.forEach((input) => {
				input.addEventListener('blur', () => {
					validateInput();
				});
				input.addEventListener('keypress', (e) => {
					if (e.key === 'Enter') {
						validateInput();
					}
				});
			});

			const resetBtn = () => {
				const resetBtn = document.getElementById('reset');
				resetBtn.addEventListener('click', () => {
					bill = 0;
					people = 0;
					formElements.reset();
					billContainer.classList.remove('error');
					peopleContainer.classList.remove('error');
					errorMessage.forEach((message) => {
						message.classList.add('hidden');
					});
					tipButtons.forEach(() => {
						document.querySelector('.active')?.classList.remove('active');
					});
					outputTip.innerHTML = '$00.00';
					outputTotal.innerHTML = '$00.00';
				});
			};

			resetBtn();
		});

		tipButtons.forEach((button) => {
			button.addEventListener('click', () => {
				document.querySelector('.active')?.classList.remove('active');
				button.classList.add('active');
			});
			button.addEventListener('keypress', (e) => {
				if (e.key === 'Enter') {
					document.querySelector('.active')?.classList.remove('active');
					button.classList.add('active');
				}
			});
		});
	}
}

calculator();
