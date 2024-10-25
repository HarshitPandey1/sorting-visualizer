export function insertionSort(array) {
    const animations = [];
  
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      // Move elements of array[0...i-1] that are greater than key
      // to one position ahead of their current position
      while (j >= 0 && array[j] > key) {
        animations.push({ type: 'compare', bars: [j, j + 1] });
        array[j + 1] = array[j];
        animations.push({ type: 'swap', array: array.slice() });
        j = j - 1;
      }
      array[j + 1] = key;
      animations.push({ type: 'swap', array: array.slice() });
    }
    
    return animations;
  }
  