const os = require ('os')

process.on('message', cant=> {
  const num = randoms(cant)
  process.send(num)
  process.exit()
})

const randoms = (max) => {
   const numbers=[]
    for (let i = 0; i < max; i++) {
      let number = Math.floor(Math.random() * 999999);
      numbers.push(number)
    }
    const NumCPUs= os.cpus().length
    return ({num_random: numbers,NumCPUs: NumCPUs});
    
  };

