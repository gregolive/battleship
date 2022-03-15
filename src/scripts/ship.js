const ship = (name, length) => {
  const pieces = Array.from('O'.repeat(length));
  const coords = [];

  const placeOnBoard = (x, y, angle) => {
    if (angle === 0) {
      const xCoords = Array.from({ length }, (v, i) => i + x);
      xCoords.forEach((el) => coords.push([el, y]));
    } else {
      const yCoords = Array.from({ length }, (v, i) => i + y);
      yCoords.forEach((el) => coords.push([x, el]));
    }
  };

  const hit = (index) => {
    pieces[index] = 'X';
  };

  const isSunk = () => pieces.every((piece) => piece === 'X');

  return {
    name, length, pieces, coords, placeOnBoard, hit, isSunk,
  };
};

export default ship;
