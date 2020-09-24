self.addEventListener('message', (e) => {
  const workerName = e.data;
  console.log('worker', workerName, ': start');
  let time = Math.floor(Math.random() * 3000);
  setTimeout(() => {
    console.log('worker', workerName, ': end, waited', time, 'ms');
  }, time);
});
