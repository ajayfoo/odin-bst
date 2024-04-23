const makeQueue = () => {
  const arr = [];
  let head = -1;
  let tail = -1;
  let numOfElements = 0;
  const enqueue = (ele) => {
    if (numOfElements === 0) {
      head = 0;
    }
    tail += 1;
    arr[tail] = ele;
    numOfElements += 1;
  };
  const dequeue = () => {
    if (numOfElements === 0) {
      throw new Error("Queue underflow");
    }
    if (numOfElements === 1) {
      tail = -1;
    }
    numOfElements -= 1;
    const ele = arr[head];
    head += 1;
    return ele;
  };
  const print = () => {
    if (numOfElements === 0) return;
    for (let i = head; i <= tail; i += 1) {
      console.log(arr[i]);
    }
  };
  const getLength = () => numOfElements;
  const isEmpty = () => numOfElements === 0;
  return { enqueue, dequeue, print, getLength, isEmpty };
};

const testQueue = () => {
  const queue = makeQueue();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.print();
  console.log("Length: " + queue.getLength());
  queue.dequeue();
  queue.dequeue();
  queue.dequeue();
  queue.print();
  console.log("Length: " + queue.getLength());
};

exports.makeQueue = makeQueue;
