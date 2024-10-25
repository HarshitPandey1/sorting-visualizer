import React from 'react';

function TimeComplexityWindow({ algorithm }) {
  const complexities = {
    bubbleSort: {
      best: 'Ω(n)',
      average: 'Θ(n²)',
      worst: 'O(n²)',
    },
    quickSort: {
      best: 'Ω(n log(n))',
      average: 'Θ(n log(n))',
      worst: 'O(n²)',
    },
    mergeSort: {
      best: 'Ω(n log(n))',
      average: 'Θ(n log(n))',
      worst: 'O(n log(n))',
    },
    heapSort: {
      best: 'Ω(n log(n))',
      average: 'Θ(n log(n))',
      worst: 'O(n log(n))',
    },
    insertionSort: {
      best: 'Ω(n)',
      average: 'Θ(n²)',
      worst: 'O(n²)',
    },
  };

  const { best, average, worst } = complexities[algorithm] || {};

  return (
    <div className="complexity-window">
      <h3>Time Complexity</h3>
      <p><strong>Best:</strong> {best || 'N/A'}</p>
      <p><strong>Average:</strong> {average || 'N/A'}</p>
      <p><strong>Worst:</strong> {worst || 'N/A'}</p>
    </div>
  );
}

export default TimeComplexityWindow;
