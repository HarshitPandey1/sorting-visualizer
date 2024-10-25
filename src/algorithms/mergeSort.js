export function mergeSort(array) {
    const animations = [];
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
  
    while (i <= middleIdx && j <= endIdx) {
      animations.push({ type: 'compare', bars: [i, j] });
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        mainArray[k++] = auxiliaryArray[j++];
      }
      animations.push({ type: 'revert', bars: [i, j] });
      animations.push({ type: 'swap', array: mainArray.slice() });
    }
  
    while (i <= middleIdx) {
      mainArray[k++] = auxiliaryArray[i++];
      animations.push({ type: 'swap', array: mainArray.slice() });
    }
  
    while (j <= endIdx) {
      mainArray[k++] = auxiliaryArray[j++];
      animations.push({ type: 'swap', array: mainArray.slice() });
    }
  }
  