const button = document.querySelector('button');

const changeBackground = () => {
  let color = '#';
  const hexCharacters = '0123456789abcdef';

  for (let i = 0; i < 6; i++) {
    let randomNumber = Math.floor(Math.random() * 16);
    color = color + hexCharacters[randomNumber];
  }

  document.body.style.background = color
};

button.addEventListener('click', changeBackground);
