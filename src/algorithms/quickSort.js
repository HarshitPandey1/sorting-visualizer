export function quickSort(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      const pivotIndex = partition(array, low, high, animations);
      quickSortHelper(array, low, pivotIndex - 1, animations);
      quickSortHelper(array, pivotIndex + 1, high, animations);
    }
  }
  
  function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      animations.push({ type: 'compare', bars: [j, high] });
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]]; // Swap
        animations.push({ type: 'swap', array: array.slice() });
      }
      animations.push({ type: 'revert', bars: [j, high] });
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    animations.push({ type: 'swap', array: array.slice() });
    return i + 1;
  }
  