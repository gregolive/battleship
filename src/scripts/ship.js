const ship = (length) => {
  const sunk = false;
  const hits = [];

  const sayHello = () => console.log('hello!');

  return {
    length, sunk, hits, sayHello,
  };
};

export default ship;
