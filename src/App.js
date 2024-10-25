import React, { useState, useEffect } from 'react';
import SortingButtons from './components/SortingButtons';
import Visualization from './components/Visualization';
import TimeComplexityWindow from './components/TimeComplexityWindow';
import { bubbleSort } from './algorithms/bubbleSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import { heapSort } from './algorithms/heapSort';
import { insertionSort } from './algorithms/insertionSort';
import './App.css';

function App() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [comparisonResults, setComparisonResults] = useState([]); // To store comparison results

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  // Generate a new random array
  function resetArray() {
    if (isSorting) return;
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500) + 1);
    setArray(newArray);
  }

  // Handle sorting based on selected algorithm
  function handleSort(algorithm) {
    setIsSorting(true);
    setSelectedAlgorithm(algorithm);
    let animations;

    switch (algorithm) {
      case 'bubbleSort':
        animations = bubbleSort(array.slice());
        break;
      case 'quickSort':
        animations = quickSort(array.slice());
        break;
      case 'mergeSort':
        animations = mergeSort(array.slice());
        break;
      case 'heapSort':
        animations = heapSort(array.slice());
        break;
      case 'insertionSort':
        animations = insertionSort(array.slice());
        break;
      default:
        return;
    }

    applyAnimations(animations);
  }

  // Function to apply animations
  function applyAnimations(animations) {
    animations.forEach((animation, index) => {
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array-bar');

        if (animation.type === 'compare') {
          const [barOneIdx, barTwoIdx] = animation.bars;
          if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
            arrayBars[barOneIdx].style.backgroundColor = 'red';
            arrayBars[barTwoIdx].style.backgroundColor = 'red';
          }
        } else if (animation.type === 'swap') {
          setArray(animation.array);
        } else if (animation.type === 'revert') {
          const [barOneIdx, barTwoIdx] = animation.bars;
          if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
            arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
            arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
          }
        }
      }, index * 50);
    });

    // Reset bars to default color after sorting
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = 'turquoise';
      }
      setIsSorting(false);
    }, animations.length * 50);
  }

  // Function to compare algorithms based on execution time
  function compareAlgorithms() {
    const algorithms = [
      { name: 'Bubble Sort', func: bubbleSort },
      { name: 'Quick Sort', func: quickSort },
      { name: 'Merge Sort', func: mergeSort },
      { name: 'Heap Sort', func: heapSort },
      { name: 'Insertion Sort', func: insertionSort },
    ];

    const results = [];
    const arrayCopy = array.slice();

    algorithms.forEach(({ name, func }) => {
      const start = performance.now();
      func(arrayCopy.slice()); // Sort a copy of the array
      const end = performance.now();
      const timeTaken = (end - start).toFixed(2); // Calculate time taken in milliseconds
      results.push({ name, timeTaken });
    });

    setComparisonResults(results);
  }

  // Update array size based on slider
  function handleArraySizeChange(event) {
    setArraySize(event.target.value);
  }

  return (
    <div className="App">
      <h1>Sorting Visualizer</h1>
      <SortingButtons onSort={handleSort} resetArray={resetArray} isSorting={isSorting} />

      <label className="slider-label">
        Array Size: {arraySize}
        <input
          type="range"
          min="5"
          max="100"
          value={arraySize}
          onChange={handleArraySizeChange}
          disabled={isSorting}
          className="slider"
        />
      </label>

      <button onClick={compareAlgorithms} disabled={isSorting} className="compare-button">
        Compare Algorithms
      </button>

      {/* Display comparison results */}
      {comparisonResults.length > 0 && (
        <div className="comparison-results">
          <h2>Algorithm Execution Time (ms)</h2>
          <table>
            <thead>
              <tr>
                <th>Algorithm</th>
                <th>Execution Time</th>
              </tr>
            </thead>
            <tbody>
              {comparisonResults.map(({ name, timeTaken }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{timeTaken} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TimeComplexityWindow algorithm={selectedAlgorithm} />
      <Visualization array={array} arraySize={arraySize} />
    </div>
  );
}

export default App;
