const ship = (length) => {
  let sunk = false;
  const positions = Array.from('O'.repeat(length));

  const hit = (index) => {
    positions[index] = 'X';
    sunk = (positions.every((pos) => pos === 'X'));
  };

  const isSunk = () => sunk;

  return {
    length, positions, hit, isSunk,
  };
};

export default ship;
