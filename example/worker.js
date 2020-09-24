self.addEventListener('message', (e) => {
  const workerName = e.data;
  console.log('worker', workerName, ': start');
  let time = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    console.log('worker', workerName, ': end, total time is', time);
  }, time);
});
