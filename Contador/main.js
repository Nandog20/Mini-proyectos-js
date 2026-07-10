const sub = document.getElementById('sub');
const add = document.getElementById('add');
const reset = document.getElementById('reset');
const p = document.getElementById('counter');
let counter = 0;

const updateP = () => {
  p.innerText = counter;
  if (counter > 0) {
    p.className = 'positive';
  }
  else if (counter < 0) {
    p.className = 'negative';
  }
  else {
    p.className = 'cero';
  }
};

updateP();



add.addEventListener('click', ()=> {counter++; updateP()});
sub.addEventListener('click', ()=> {counter--; updateP()});
reset.addEventListener('click', ()=> {counter = 0; updateP()});
