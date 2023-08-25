const calculateTip = (formSelector, outputSelector) => {
	const formElement = document.querySelector(formSelector);
	const outputElement = document.querySelector(outputSelector);
	const tipButtons = document.querySelectorAll('.tip-btn');
	const amountBill = document.getElementById('billAmount');
	const totalPeople = document.getElementById('numberOfPeople');
	const tipPerson = document.getElementById('tip-per-person');
	const totalPerson = document.getElementById('total-per-person');

	for (let i = 0; i < tipButtons.length; i++) {
		formElement.addEventListener('keyup', () => {
			let bill = parseInt(amountBill.value);
			let people = parseInt(totalPeople.value);

			tipButtons[i].addEventListener('click', () => {
				let tip = parseFloat(tipButtons[i].value);
				let calcTip = (bill * (tip / 100)) / people;
				let calcTotal = (bill + calcTip * people) / people;
				tipPerson.innerHTML = calcTip.toFixed(2);
				totalPerson.innerHTML = calcTotal.toFixed(2);
			});
		});

		tipButtons.forEach((button) => {
			button.addEventListener('click', () => {
				document.querySelector('.active')?.classList.remove('active');
				button.classList.add('active');
			});
			button.addEventListener('blur', () => {
				button.classList.remove('active');
			});
		});
	}

	formElement.setAttribute('novalidate', '');

	// reset all inputs on click
	function reset() {
		const resetBtn = document.getElementById('reset');
		resetBtn.addEventListener('click', () => {
			formElement.reset();
			outputElement.reset();
		});
	}

	reset();
};

calculateTip('#form', '.output-cost');
