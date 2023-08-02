import React, { useState, useEffect } from 'react';

import '../styling/graph.css';
import '../styling/algo-info.css';
import '../styling/source-code.css';

import SmallBar from './SmallBar';
import BigBar from './BigBar.js';
import CodeBlock from './CodeBlock';

const SelectionSort = ({ array, size, play }) => {
    const [newArray, setNewArray] = useState(array);
    const [highlightIndices, setHighlightIndices] = useState([0, 1]);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(1);
    const [bound, setBound] = useState(0);
    const [minIndex, setMinIndex] = useState(0);

    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [value, setValue] = useState(javascript);

    useEffect(() => {
    
        const selectionSort = () => {  
            if(bound === newArray.length){
                setHighlightIndices([1000, 1001]);
            }
            if(bound < newArray.length && play){
                let arr = [...newArray];
                if(arr[j] < arr[minIndex]){
                    setMinIndex(j);
                }
                if(!(j === array.length)){ //not the end
                    setI(i + 1);
                    setJ(j + 1);
                } else { //j has reached the end
                    
                    let temp = arr[bound];
                    arr[bound] = arr[minIndex];
                    arr[minIndex] = temp;
                    // reset i and j and increment bound
                    setI(bound);
                    setJ(bound + 1);
                    setMinIndex(bound + 1);
                    setBound(bound + 1)
                }
                setNewArray(arr);
                setHighlightIndices([bound, j]);
            }
        }
        
        if(size === 'Large'){
            setTimeout(selectionSort, 5);
        } else {
            setTimeout(selectionSort, 200);
        }
        
    }, [newArray, play]);

    const createBars = () => {
        if(size === 'Large'){
            return newArray.map((value, index) => 
                <SmallBar 
                    key={index} 
                    value={value} 
                    height={`${value}px`} 
                    highlight={index === highlightIndices[0] || index === highlightIndices[1]}
                    sorted={index < bound}
                />
            );
        } else if(size === 'Small'){
            return newArray.map((value, index) => 
                <BigBar 
                    key={index} 
                    value={value} 
                    height={`${value * 40}px`} 
                    highlight={index === highlightIndices[0] || index === highlightIndices[1]}
                    sorted={index < bound}
                />
            );
        }
    }

    const handleButtonClick = (language) => {
        if(language === 'javascript'){
            setSelectedLanguage('javascript');
            setValue(javascript);
        } else if(language === 'python'){
            setSelectedLanguage('python');
            setValue(python);
        } else if(language === 'java'){
            setSelectedLanguage('java');
            setValue(java);
        } else {
            setSelectedLanguage('c++');
            setValue(cpp);
        }
    }

    return (  
        <div>
            {size === 'Large' && 
                <div className='large-array-graph-container'>
                    {createBars()}
                </div>
            }
            {size === 'Small' && 
                <div className='small-array-graph-container'>
                    {createBars()}
                </div>
            }
            <div className="algo-info-container">
                <div className="color-key">
                    <div className="color-key-label">Color Key:</div>
                    <div className="color-label">Unsorted = </div>
                    <div className="color-box1"></div>
                    <div className="color-label">Sorted = </div>
                    <div className="color-box2"></div>
                    <div className="color-label">Two values being compared = </div>
                    <div className="color-box3"></div>
                </div>
                <div className="complexity-container">
                    <div className="complexity add-radius add-shadow">
                        <div className='complexity-label'>Time Complexity</div>
                        <div className="big-o"> O(n^2) </div>
                    </div>
                    <div className="complexity add-radius add-shadow">
                        <div className='complexity-label'>Space Complexity</div>
                        <div className="big-o"> O(1) </div>
                    </div>
                </div>
                <div className="description-container add-radius add-shadow">
                    <div className="description-label">Description</div>
                    <p className='description'>Selection Sort is a simple comparison-based sorting algorithm. The main idea behind Selection Sort is dividing the 
                    input into a sorted and an unsorted region. The sorted region starts empty at the left end of the input, 
                    while the unsorted region occupies the rest. The algorithm repeatedly selects the smallest 
                    (or largest, depending on the sorting order) element from the unsorted region and moves it to the end of the sorted region.
                    The worst-case time complexity for Selection Sort is O(n^2), where n is the number of items in the list. This is because, much like Bubble Sort, 
                    it requires comparing each element with every other element. This time complexity holds for best, average, 
                    and worst-case scenarios since the algorithm makes the same number of comparisons regardless of the input order. Regarding space complexity, 
                    Selection sort is an in-place sorting algorithm and only uses constant memory.</p>
                </div>
                <div className="source-code-container add-radius add-shadow">
                    <div className="description-label">Source Code</div>
                    <div className="code-button-container">
                        <button className={`code-button ${selectedLanguage === 'javascript' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('javascript')}>
                                Javascript
                        </button>
                        <button className={`code-button ${selectedLanguage === 'python' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('python')}>
                                Python
                        </button>
                        <button className={`code-button ${selectedLanguage === 'java' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('java')}>
                                Java
                        </button>
                        <button className={`code-button ${selectedLanguage === 'c++' ? 'selected' : ''}`}
                                onClick={() => handleButtonClick('c++')}>
                                C++
                        </button>
                    </div>
                    <CodeBlock language={selectedLanguage} value={value}/>
                </div>
            </div>
        </div>
    );
}

const javascript = 
`function selectionSort(arr) {
    let n = array.length;
    for(let i = 0; i < n; i++) {
        let minIndex = i;
        for(let j = i + 1; j < n; j++){
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if(minIndex != i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}`;

const python = 
`def selectionSort(arr):
    for i in range(len(arr)):
        minIndex = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[minIndex]:
                minIndex = j
        arr[i], arr[minIndex] = arr[minIndex], arr[i]
    return arr`;

const java = 
`void selectionSort(int arr[]) {
    int n = arr.length;
    for(int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for(int j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        int temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
}`;

const cpp = 
`void selectionSort(int arr[], int n) {
    for(int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for(int j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[minIndex], arr[i]);
    }
}`;
 
export default SelectionSort;