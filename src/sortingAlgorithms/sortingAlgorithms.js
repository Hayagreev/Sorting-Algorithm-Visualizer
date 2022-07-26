//bubble sort
export const bubbleSortAnimations = (arr) => {
  var animations = [];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        animations.push([j, j + 1, true]); //animations is array of arrays (in form [[val1, val2, swapped]])
      } else {
        animations.push([j, j + 1, false]);
      }
    }
  }

  return animations;
};

//quick sort
export const quickSortAnimations = (arr) => {
  var animations = [];
  quickSortAnimationsP(arr, 0, arr.length - 1, animations);
  return animations;
};

function quickSortAnimationsP(arr, lowIndex, highIndex, animations) {
  if (lowIndex >= highIndex) {
    return;
  }

  var pivotIndex = getPivot(lowIndex, highIndex);
  var pivot = arr[pivotIndex];
  animations.push([pivotIndex, 2]); //[] in form of [index, color]. Note: 2 means green, 1 is secondary color, 0 is primary color

  swap(arr, pivotIndex, highIndex);
  animations.push([pivotIndex, highIndex, true]); //[] in form of [index1, index2, shouldSwap]

  animations.push([highIndex, 2]);

  var leftPointer = partition(arr, lowIndex, highIndex, pivot, animations);

  animations.push([highIndex, 0]);

  quickSortAnimationsP(arr, lowIndex, leftPointer - 1, animations);
  quickSortAnimationsP(arr, leftPointer + 1, highIndex, animations);
}

function partition(arr, lowIndex, highIndex, pivot, animations) {
  var leftPointer = lowIndex;
  var rightPointer = highIndex;

  animations.push([leftPointer, 1]);

  animations.push([rightPointer, 1]);

  while (leftPointer < rightPointer) {
    while (arr[leftPointer] <= pivot && leftPointer < rightPointer) {
      animations.push([leftPointer, 0]);
      leftPointer++;
      animations.push([leftPointer, 1]);
    }

    while (arr[rightPointer] >= pivot && leftPointer < rightPointer) {
      animations.push([rightPointer, 0]);
      rightPointer--;
      animations.push([rightPointer, 1]);
    }

    swap(arr, leftPointer, rightPointer);
    animations.push([leftPointer, rightPointer, true]);
  }

  if (arr[leftPointer] > arr[highIndex]) {
    swap(arr, leftPointer, highIndex);
    animations.push([leftPointer, highIndex, true]);
  } else {
    leftPointer = highIndex;
  }

  animations.push([leftPointer, 0]);
  animations.push([rightPointer, 0]);

  return leftPointer;
}

// function quickSortAnimationsP(arr, low, high, animations) {
//   if (low < high) {
//     // pi is partitioning index, arr[p]
//     // is now at right place
//     let pi = partition(arr, low, high, animations);

//     // Separately sort elements before
//     // partition and after partition
//     quickSortAnimationsP(arr, low, pi - 1, animations);
//     quickSortAnimationsP(arr, pi + 1, high, animations);
//   }
// }

// function partition(arr, low, high, animations) {
//   // pivot
//   let pivot = arr[high];

//   // Index of smaller element and
//   // indicates the right position
//   // of pivot found so far
//   let leftPointer = low;

//   for (let j = low; j <= high - 1; j++) {
//     // If current element is smaller
//     // than the pivot
//     if (arr[j] < pivot) {
//       // Increment index of
//       // smaller element

//       swap(arr, leftPointer, j);
//       animations.push([leftPointer, j, true]);
//       leftPointer++;
//     }
//   }
//   swap(arr, leftPointer, high);
//   animations.push([leftPointer, high, true]);
//   return leftPointer;
// }

function getPivot(lowIndex, highIndex) {
  return Math.floor(Math.random() * (highIndex - lowIndex) + 1) + lowIndex;
}

//merge sort

export const mergeSortAnimations = (arr) => {
  var animations = [];
  mergeSortAnimationsP(arr, 0, arr.length - 1, animations);
  console.log(animations);
  return animations;
};

function mergeSortAnimationsP(arr, startInd, endInd, animations) {
  var arrLen = arr.length;

  if (arrLen < 2) {
    return;
  }

  var midIndex = Math.floor(arrLen / 2);
  var leftHalf = [[], startInd, startInd + midIndex - 1];
  var rightHalf = [[], startInd + midIndex, endInd];

  for (var i = 0; i < midIndex; i++) {
    leftHalf[0].push(arr[i]);
  }

  for (var i = midIndex; i < arrLen; i++) {
    rightHalf[0].push(arr[i]);
  }

  mergeSortAnimationsP(leftHalf[0], leftHalf[1], leftHalf[2], animations);
  mergeSortAnimationsP(rightHalf[0], rightHalf[1], rightHalf[2], animations);

  merge(arr, leftHalf, rightHalf, animations);
}

function merge(arr, leftHalf, rightHalf, animations) {
  //note: leftHalf is [[array to be sorted], startInd, endInd]; same for rightHalf
  var leftLen = leftHalf[0].length;
  var rightLen = rightHalf[0].length;

  var leftIt = 0,
    rightIt = 0,
    arrIt = 0;

  var leftPointer = leftIt + leftHalf[1];
  var rightPointer = rightIt + rightHalf[1];

  animations.push([leftIt + leftHalf[1], rightIt + rightHalf[1], 2]); // form of [left pointer index, rightpointer index, color] --> 2 is pointer color, 1 is secondary color, 0 is primary color
  animations.push([leftIt + leftHalf[1], rightIt + rightHalf[1], 0]);

  while (leftIt < leftLen && rightIt < rightLen) {
    if (leftHalf[0][leftIt] <= rightHalf[0][rightIt]) {
      arr[arrIt] = leftHalf[0][leftIt];
      var arrToPush = [leftHalf[1] + leftIt + rightIt, arr[arrIt]]; // need to do leftHalf[1] + leftIt + rightIt because we want actual index in arr (leftIt and rightIt mark the number of numbers already inserted into arr)
      animations.push(arrToPush);

      leftIt++;

      leftPointer = leftIt + leftHalf[1];
      if (leftPointer > leftLen - 1) {
        leftPointer--;
      }

      animations.push([leftPointer, rightPointer, 2]); // form of [left pointer index, rightpointer index, color] --> 2 is pointer color, 1 is secondary color, 0 is primary color
      animations.push([leftPointer, rightPointer, 0]);
    } else {
      arr[arrIt] = rightHalf[0][rightIt];
      var arrToPush = [leftHalf[1] + leftIt + rightIt, arr[arrIt]];
      animations.push(arrToPush);

      rightIt++;

      rightPointer = rightIt + rightHalf[1];
      if (rightPointer > rightLen - 1) {
        rightPointer--;
      }

      animations.push([leftPointer, rightPointer, 2]); // form of [left pointer index, rightpointer index, color] --> 2 is pointer color, 1 is secondary color, 0 is primary color
      animations.push([leftPointer, rightPointer, 0]);
    }

    arrIt++;
  }

  while (leftIt < leftLen) {
    arr[arrIt] = leftHalf[0][leftIt];
    var arrToPush = [leftHalf[1] + leftIt + rightIt, arr[arrIt]];
    animations.push(arrToPush); //format: [index in overall array, height of box (number)]

    arrIt++;
    leftIt++;

    leftPointer = leftIt + leftHalf[1];
    if (leftPointer > leftLen - 1) {
      leftPointer--;
    }

    animations.push([leftPointer, rightPointer, 2]); // form of [left pointer index, rightpointer index, color] --> 2 is pointer color, 1 is secondary color, 0 is primary color
    animations.push([leftPointer, rightPointer, 0]);
  }

  while (rightIt < rightLen) {
    arr[arrIt] = rightHalf[0][rightIt];
    var arrToPush = [leftHalf[1] + leftIt + rightIt, arr[arrIt]];
    animations.push(arrToPush);

    arrIt++;
    rightIt++;

    rightPointer = rightIt + rightHalf[1];
    if (rightPointer > rightLen - 1) {
      rightPointer--;
    }

    animations.push([leftPointer, rightPointer, 2]); // form of [left pointer index, rightpointer index, color] --> 2 is pointer color, 1 is secondary color, 0 is primary color
    animations.push([leftPointer, rightPointer, 0]);
  }
}

//Heap sort
export const heapSortAnimations = (arr) => {
  var animations = [];
  heapSortAnimationsP(arr, arr.length, animations);
  return animations;
};

function heapSortAnimationsP(arr, arrLen, animations) {
  if (arrLen < 2) {
    return;
  }

  for (var i = Math.floor(arrLen / 2) - 1; i >= 0; i--) {
    heapify(arr, arrLen, i, animations);
  }

  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    animations.push([0, i, true]);
    arrLen--;
    heapify(arr, arrLen, 0, animations);
  }
}

function heapify(arr, arrLen, parentIndex, animations) {
  //i is parent index
  var largestParentIndex = parentIndex;
  const leftChild = 2 * parentIndex + 1;
  const rightChild = 2 * parentIndex + 2;

  if (leftChild < arrLen && arr[leftChild] > arr[largestParentIndex]) {
    largestParentIndex = leftChild;
  }

  if (rightChild < arrLen && arr[rightChild] > arr[largestParentIndex]) {
    largestParentIndex = rightChild;
  }

  if (largestParentIndex != parentIndex) {
    swap(arr, parentIndex, largestParentIndex);
    animations.push([parentIndex, largestParentIndex, true]);

    heapify(arr, arrLen, largestParentIndex, animations);
  }
}

// function heapSortAnimationsP(arr, animations) {
//   if (arr.length < 2) {
//     return arr;
//   }

//   let arrLen = arr.length;
//   for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
//     sortParentAndChild(arr, arrLen, i, animations);
//   }

//   for (let i = arr.length - 1; i > 0; i--) {
//     swap(arr, 0, i);
//     animations.push(0, i, true);
//     arrLen--;
//     sortParentAndChild(arr, arrLen, 0, animations);
//   }

//   return arr;
// }

// function sortParentAndChild(arr, arrLen, parentIndex, animations) {
//   const leftIndex = parentIndex * 2 + 1;
//   const rightIndex = parentIndex * 2 + 2;

//   let maxIndex = parentIndex;
//   if (leftIndex < arrLen && arr[leftIndex] > arr[maxIndex]) {
//     maxIndex = leftIndex;
//   }

//   if (rightIndex < arrLen && arr[rightIndex] > arr[maxIndex]) {
//     maxIndex = rightIndex;
//   }

//   if (maxIndex !== parentIndex) {
//     swap(arr, parentIndex, maxIndex);
//     animations.push([parentIndex, maxIndex, true]);
//     sortParentAndChild(arr, arrLen, maxIndex, animations);
//   }
// }

function swap(arr, ind1, ind2) {
  var temp = arr[ind1];
  arr[ind1] = arr[ind2];
  arr[ind2] = temp;
}
