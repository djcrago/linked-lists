function NodeFactory(value = null, previousNode = null, nextNode = null) {
  return {
    value,
    previousNode,
    nextNode,
  };
}

function LinkedListFactory() {
  const linkedList = {};

  function append(value) {
    if (!linkedList.head) {
      const firstNode = NodeFactory(value);
      linkedList.head = firstNode;
    } else {
      const currentTailNode = findLastNode();
      const newTailNode = NodeFactory(value, currentTailNode);
      currentTailNode.nextNode = newTailNode;
    }
  }

  function prepend(value) {
    const currentHeadNode = linkedList.head;
    const newHeadNode = NodeFactory(value, null, currentHeadNode);
    currentHeadNode.previousNode = newHeadNode;
    linkedList.head = newHeadNode;
  }

  function size() {
    if (!linkedList.head) {
      return 0;
    }

    let numberOfNodes = 1;
    let currentNode = linkedList.head;

    while (currentNode.nextNode) {
      numberOfNodes += 1;
      currentNode = currentNode.nextNode;
    }

    return numberOfNodes;
  }

  function head() {
    return linkedList.head;
  }

  function tail() {
    const tailNode = findLastNode();
    return tailNode;
  }

  function at(index) {
    let currentNode = linkedList.head;

    for (let i = 0; i < index; i += 1) {
      if (currentNode.nextNode) {
        currentNode = currentNode.nextNode;
      } else {
        return undefined;
      }
    }

    return currentNode;
  }

  function pop() {
    const lastNode = findLastNode();
    const secondToLastNode = lastNode.previousNode;
    secondToLastNode.nextNode = null;
  }

  function contains(passedInValue, currentNode = linkedList.head) {
    if (currentNode.value === passedInValue) {
      return true;
    }
    if (currentNode.nextNode) {
      return contains(passedInValue, currentNode.nextNode);
    }
    return false;
  }

  function find(passedInValue, currentNode = linkedList.head, index = 0) {
    if (currentNode.value === passedInValue) {
      return index;
    }
    if (currentNode.nextNode) {
      return find(passedInValue, currentNode.nextNode, (index += 1));
    }
    return null;
  }

  function toString() {
    let string = '';

    let currentNode = linkedList.head;

    if (currentNode.value) {
      string = `(${currentNode.value})`;
    }

    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
      string += ` -> (${currentNode.value})`;
    }

    return string;
  }

  function insertAt(value, index) {
    let currentNode = at(index);
    if (currentNode) {
      const previous = currentNode.previousNode;
      const next = currentNode.nextNode;

      const newNode = NodeFactory(value, previous, currentNode);
      previous.nextNode = newNode;
      currentNode.previousNode = newNode;
    } else {
      append(value);
    }
  }

  function removeAt(index) {
    let nodeToRemove = at(index);
    if (nodeToRemove) {
      let previous = nodeToRemove.previousNode;
      let newNodeAtIndex = nodeToRemove.nextNode;

      if (previous === null) {
        linkedList.head = newNodeAtIndex;
        newNodeAtIndex.previousNode = null;
      } else if (newNodeAtIndex === null) {
        pop();
      } else {
        previous.nextNode = newNodeAtIndex;
        newNodeAtIndex.previousNode = previous;
      }
    }
  }

  function findLastNode(currentNode = linkedList.head) {
    if (currentNode.nextNode === null) {
      return currentNode;
    }
    let lastNode = findLastNode(currentNode.nextNode);
    return lastNode;
  }

  return {
    linkedList,
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

// Examples of how to use the above code

const listAndMethods = LinkedListFactory();
const list = listAndMethods.linkedList;
const append = listAndMethods.append;
const prepend = listAndMethods.prepend;

append('test1');
append('test2');
append('test3');
prepend('test4');
prepend('test5');

console.log(listAndMethods.size());
console.log(listAndMethods.head());
console.log(listAndMethods.tail());
console.log(listAndMethods.at(3));
listAndMethods.pop();
console.log(listAndMethods.contains('test2'));
console.log(listAndMethods.find('test4'));
console.log(listAndMethods.toString());
listAndMethods.insertAt('test6', 3);
console.log(listAndMethods.toString());
listAndMethods.removeAt(2);
console.log(listAndMethods.toString());
