import React from 'react';

function SortingButtons({ onSort, resetArray, stopSorting, isSorting }) {
  return (
    <div className="sorting-buttons">
      <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
      <button onClick={() => onSort('bubbleSort')} disabled={isSorting}>Bubble Sort</button>
      <button onClick={() => onSort('quickSort')} disabled={isSorting}>Quick Sort</button>
      <button onClick={() => onSort('mergeSort')} disabled={isSorting}>Merge Sort</button>
      <button onClick={() => onSort('heapSort')} disabled={isSorting}>Heap Sort</button>
      <button onClick={() => onSort('insertionSort')} disabled={isSorting}>Insertion Sort</button>
    </div>
  );
}

export default SortingButtons;
