// HOF

const closureCount = () => {
  let counter = 0;
  return () => counter++;
};

const extCounter = closureCount();

console.log(extCounter()); // 0
console.log(extCounter()); // 1
console.log(extCounter()); // 2
