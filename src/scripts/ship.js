const newShip = (name, length) => {
  const pieces = Array.from('O'.repeat(length));
  const coords = [];

  const placeOnBoard = (row, col, angle) => {
    if (angle === '0') {
      const colEls = Array.from({ length }, (v, i) => i + col);
      colEls.forEach((el) => coords.push([row, el]));
    } else {
      const rowEls = Array.from({ length }, (v, i) => i + row);
      rowEls.forEach((el) => coords.push([el, col]));
    }
  };

  const hit = (index) => { pieces[index] = 'X'; };

  const isSunk = () => pieces.every((piece) => piece === 'X');

  return {
    name, length, pieces, coords, placeOnBoard, hit, isSunk,
  };
};

export default newShip;
