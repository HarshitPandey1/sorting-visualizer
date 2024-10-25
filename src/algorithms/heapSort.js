export function heapSort(array) {
    const animations = [];
    let n = array.length;
  
    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      // Swap current root to the end
      animations.push({ type: 'compare', bars: [0, i] });
      [array[0], array[i]] = [array[i], array[0]]; // Swap
      animations.push({ type: 'swap', array: array.slice() });
  
      // Heapify the reduced heap to maintain max-heap property
      heapify(array, i, 0, animations);
    }
  
    return animations;
  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    // Check if left child is larger than root
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    // Check if right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    // If the largest is not root, swap and continue heapifying
    if (largest !== i) {
      animations.push({ type: 'compare', bars: [i, largest] });
      [array[i], array[largest]] = [array[largest], array[i]];  // Swap
      animations.push({ type: 'swap', array: array.slice() });
      
      // Recursively heapify the affected sub-tree
      heapify(array, n, largest, animations);
    }
  }
  