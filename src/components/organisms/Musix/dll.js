class Node {
  constructor(_data) {
    this.data = _data;
    this.previous = null;
    this.next = null;
  }
}

export default class Dll {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getLength = () => {
    return this.length;
  }

  getNodeAt = (index) => {
    if (index >= 0 && index < this.length) {
      for (let i = 0, node = this.head; ; node = node.next, i += 1) {
        if (i === index) {
          // console.log(node.data);
          return node;
        }
      }
    } else {
      console.log('List index out of range.');
      return null;
    }
  }

  addToLast = (data) => {
    const newNode = new Node(data);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }
  }

  addToFront = (data) => {
    const newNode = new Node(data);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  add = (data, index) => {
    // console.log('adding node...');
    if (index === 0) {
      this.addToFront(data);
    } else if (index === this.length || index === undefined) {
      this.addToLast(data);
    } else if (index < this.length) {
      const newNode = new Node(data);
      const tempNode = this.getNodeAt(index);
      newNode.previous = tempNode.previous;
      newNode.next = tempNode;
      tempNode.previous = newNode;
    } else {
      console.log('List index out of range.');
      return;
    }
    this.length += 1;
  }

  remove = (index) => {
    if (index === 0 && this.length) {
      this.head = this.head.next;
      this.head.previous = null;
    } else if (index === this.length - 1) {
      this.tail = this.tail.previous;
      this.tail.next = null;
    } else if (index < this.length - 1) {
      const node = this.getNodeAt(index);
      const previousNode = node.previous;
      const nextNode = node.next;
      node.previous = null;
      node.next = null;
      previousNode.next = nextNode;
      nextNode.previous = previousNode;
    } else {
      console.log('List index out of range.');
      return;
    }
    this.length -= 1;
  }

  printList = () => {
    if (this.length) {
      const list = [];
      for (let node = this.head; node != null; node = node.next) {
        list.push(node.data);
      }
      console.log(list);
    } else {
      console.log('List is Empty.');
    }
  }
  return;
}
