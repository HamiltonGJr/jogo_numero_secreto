// Este tipo de código não está errado, mas podemos substituir por uma function, onde fica algo mais dinâmico.
// let title = document.querySelector('h1');
// let paragraph = document.querySelector('p');

// title.innerHTML = 'Jogo do número secreto.';
// paragraph.innerHTML = 'Escolha um número entre 1 e 10';

let listOfDrawnNumbers = [];
let limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function displayTextOnScreen(tag, text) {
  let field = document.querySelector(tag);

  field.innerHTML = text;

  responsiveVoice.speak(text, 'Brazilian Portuguese Female', { rate: 1.2 });
};

function displayInitialMessage() {
  displayTextOnScreen('h1', 'Jogo do número secreto.');
  displayTextOnScreen('p', 'Escolha um número entre 1 e 10');
};

displayInitialMessage();

function checkKick() {
  let kick = document.querySelector('input').value;

  if (kick == secretNumber) {
    displayTextOnScreen('h1', 'Acertou!');

    let attemptedMessage = attempts > 1 ? 'tentativas' : 'tentativa';
    let messageAttempts = `Você descobrou o número secreto, com ${attempts} ${attemptedMessage}!`;

    displayTextOnScreen('p', messageAttempts);

    document.getElementById('restart').removeAttribute('disabled');
  } else {
    if (kick > secretNumber) {
      displayTextOnScreen('h1', 'Menor!');
      displayTextOnScreen('p', 'O número secreto é menor que este!');
    } else {
      displayTextOnScreen('h1', 'Maior!');
      displayTextOnScreen('p', 'O número secreto é maior que este!');
    };

    attempts++;
    clearTheField();
  };
};

function generateRandomNumber() {
  let chosenNumber = parseInt((Math.random() * limitNumber) + 1);
  let numberOfListElements = listOfDrawnNumbers.length;

  if (numberOfListElements == limitNumber) {
    listOfDrawnNumbers = [];
  };

  if (listOfDrawnNumbers.includes(chosenNumber)) {
    return generateRandomNumber();
  } else {
    listOfDrawnNumbers.push(chosenNumber);
    console.log(listOfDrawnNumbers);

    return chosenNumber;
  };
};

function clearTheField() {
  kick = document.querySelector('input');

  kick.value = '';
};

function restartGame() {
  secretNumber = generateRandomNumber();
  clearTheField();
  attempts = 1;
  displayInitialMessage();
  document.getElementById('restart').setAttribute('disabled', true);
};
