const dialogBox = () => {
  const text = document.createElement('p');
  const section = document.createElement('section');

  section.className = 'dialog-box';
  section.appendChild(text);

  return section;
};

const boardRow = () => {
  const row = document.createElement('div');
  row.className = 'row';

  for (let i = 0; i < 10; i += 1) {
    const col = document.createElement('span');
    col.className = 'col';
    row.appendChild(col);
  }

  return row;
};

const boardGrid = () => {
  const grid = document.createElement('div');
  grid.className = 'board-grid';

  for (let i = 0; i < 10; i += 1) {
    const row = boardRow();
    grid.appendChild(row);
  }

  return grid;
};

const boardSection = (title, className) => {
  const section = document.createElement('section');
  const heading = document.createElement('h2');

  heading.textContent = title;

  section.className = `board ${className}-board`;
  section.appendChild(heading);
  section.appendChild(boardGrid());

  return section;
};

const board = () => {
  const wrapper = document.createElement('div');

  wrapper.className = 'board-wrapper';
  wrapper.appendChild(boardSection('Your Board', 'player'));
  wrapper.appendChild(boardSection('Enemy Board', 'enemy'));

  return wrapper;
};

const addBoard = () => {
  const main = document.createElement('main');

  document.querySelector('.new-game').remove();
  main.appendChild(dialogBox());
  main.appendChild(board());
};

export default addBoard;
