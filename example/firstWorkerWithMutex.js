importScripts('../asynclock.js');

self.addEventListener('message', (e) => {
  console.log('first worker with mutex: start');

  const someValue = 1000;

  const mutex = new AsyncLock(e.data);

  mutex.lock();

  let iterations = Math.floor(Math.random() * 1000000);
  for (let i = 0; i < iterations; i++) {}
  console.log('first worker with mutex: done, total iterations is', iterations);

  mutex.unlock();
});
