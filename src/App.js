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
  const [customArray, setCustomArray] = useState(""); // New state for user input array
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');
  const [comparisonResults, setComparisonResults] = useState([]);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  // Generate a new random array
  function resetArray() {
    if (isSorting) return;
    const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500) + 1);
    setArray(newArray);
    setCustomArray(""); // Clear custom array input
  }

  // Update array based on custom input
  function handleCustomArrayInput(event) {
    setCustomArray(event.target.value);
  }

  // Parse and set custom array
  function setCustomArrayAsArray() {
    const parsedArray = customArray
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num)); // Parse input and filter invalid numbers
    if (parsedArray.length) {
      setArray(parsedArray);
      setArraySize(parsedArray.length); // Adjust slider to match custom array size
    } else {
      alert("Please enter a valid array of numbers, separated by commas.");
    }
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

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = 'turquoise';
      }
      setIsSorting(false);
    }, animations.length * 50);
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
          onChange={(e) => setArraySize(e.target.value)}
          disabled={isSorting}
          className="slider"
        />
      </label>

      <div className="custom-array-input">
        <input
          type="text"
          value={customArray}
          onChange={handleCustomArrayInput}
          placeholder="Enter numbers separated by commas"
          disabled={isSorting}
        />
        <button onClick={setCustomArrayAsArray} disabled={isSorting}>Use Custom Array</button>
      </div>

      <Visualization array={array} arraySize={arraySize} />
      <TimeComplexityWindow algorithm={selectedAlgorithm} />
    </div>
  );
}

export default App;
