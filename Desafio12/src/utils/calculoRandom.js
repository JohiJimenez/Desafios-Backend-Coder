process.on('message', msg => {
  const num = calculos(msg)
  process.send(num)
  process.exit()
})

const calculos = (max) => {
    const numeros = {};
    for (let i = 0; i < max; i++) {
      let numero = Math.floor(Math.random() * 999) + 1;
      if (numeros[numero]) {
        numeros[numero]++;
      } else {
        numeros[numero] = 1;
      }
    }
    return numeros;
  };

