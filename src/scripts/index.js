import '../style.css';
import '@fortawesome/fontawesome-free/js/all';
import newGame from './game';
import addBoard from './components';

const startBtns = Array.from(document.querySelectorAll('.start-btn'));
startBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const difficulty = startBtns.indexOf(btn) + 1;
    addBoard();
    newGame(difficulty);
  });
});
