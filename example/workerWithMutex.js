importScripts('../asynclock.js');

self.addEventListener('message', (e) => {
  const {workerName, lockData} = e.data;

  console.log('worker', workerName, ': start');
  const mutex = new AsyncLock(lockData);
  mutex.lock();

  let time = Math.floor(Math.random() * 3000);
  setTimeout(() => {
    console.log('worker', workerName, ': end, waited', time, 'ms');
    mutex.unlock();
  }, time);
});
