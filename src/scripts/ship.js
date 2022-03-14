const ship = (length, angle, start) => {
  let sunk = false;
  const positions = Array.from('O'.repeat(length));

  const hit = (index) => {
    positions[index] = 'X';
    sunk = (positions.every((pos) => pos === 'X'));
  };

  const isSunk = () => sunk;

  const calcCoords = () => {
    const coords = [];
    if (angle === 0) {
      const x = Array.from({ length }, (v, i) => i + start[0]);
      x.forEach((el) => coords.push([el, start[1]]));
    } else {
      const y = Array.from({ length }, (v, i) => i + start[1]);
      y.forEach((el) => coords.push([start[0], el]));
    }
    return coords;
  };

  return {
    length, angle, start, positions, hit, isSunk, calcCoords,
  };
};

export default ship;
