class AsyncLock {
  static INDEX = 0;
  static UNLOCKED = 0;
  static LOCKED = 1;

  constructor(sab) {
    this.sab = sab;
    this.i32a = new Int32Array(sab);
  }

  lock() {
    while (true) {
      const oldValue = Atomics.compareExchange(this.i32a, AsyncLock.INDEX,
                         /* old value >>> */  AsyncLock.UNLOCKED,
                         /* new value >>> */  AsyncLock.LOCKED);
      if (oldValue == AsyncLock.UNLOCKED) {
        return;
      }
      Atomics.wait(this.i32a, AsyncLock.INDEX,
                   AsyncLock.LOCKED); // <<< expected value at start
    }
  }

  unlock() {
    const oldValue = Atomics.compareExchange(this.i32a, AsyncLock.INDEX,
                        /* old value >>> */  AsyncLock.LOCKED,
                        /* new value >>> */  AsyncLock.UNLOCKED);
    if (oldValue != AsyncLock.LOCKED) {
      throw new Error('Tried to unlock while not holding the mutex');
    }
    Atomics.notify(this.i32a, AsyncLock.INDEX, 1);
  }

  executeLocked(f) {
    const self = this;

    async function tryGetLock() {
      while (true) {
        const oldValue = Atomics.compareExchange(self.i32a, AsyncLock.INDEX,
                            /* old value >>> */  AsyncLock.UNLOCKED,
                            /* new value >>> */  AsyncLock.LOCKED);
        if (oldValue == AsyncLock.UNLOCKED) {
          f();
          self.unlock();
          return;
        }
        const result = Atomics.waitAsync(self.i32a, AsyncLock.INDEX,
                                         AsyncLock.LOCKED);
                                     //  ^ expected value at start
        await result.value;
      }
    }

    tryGetLock();
  }
}
