process.on('message', cant=> {
  const num = randoms(cant)
  process.send(num)
  process.exit()
})

const randoms = (max) => {
    const numbers = {};
    for (let i = 0; i < max; i++) {
      let number = Math.floor(Math.random() * 999) + 1;
      if (numbers[number]) {
        numbers[number]++;
      } else {
        numbers[number] = 1;
      }
    }
    return numbers;
  };

