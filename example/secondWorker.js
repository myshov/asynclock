self.addEventListener('message', (e) => {
  console.log('second worker: start');

  const someValue = 1000;

  let iterations = Math.floor(Math.random() * 1000000);
  for (let i = 0; i < iterations; i++) {}
  console.log('second worker: done, total iterations is', iterations);
});
