export function bubbleSort(array) {
  const animations = [];
  let n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ type: 'compare', bars: [j, j + 1] });
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap
        animations.push({ type: 'swap', array: array.slice() });
      }
      
      animations.push({ type: 'revert', bars: [j, j + 1] });
    }
  }
  
  return animations;
}
