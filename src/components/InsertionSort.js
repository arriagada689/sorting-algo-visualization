import React, { useState, useEffect } from 'react';
import '../styling/graph2.css';
import '../styling/algo-info.css';
import '../styling/source-code.css';
import SmallBar from './SmallBar';
import BigBar from './BigBar.js';
import CodeBlock from './CodeBlock';

const InsertionSort = ({ array, size, play }) => {
    const [newArray, setNewArray] = useState(array);
    const [highlightIndices, setHighlightIndices] = useState([0,1]);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(1);
    const [bound, setBound] = useState(1);
    const [foundPosition, setFoundPosition] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [value, setValue] = useState(javascript);
    
    useEffect(() => {
    
        const insertionSort = () => {
            if(bound === newArray.length + 1){
                setHighlightIndices([1000, 1001]);
            }
            if(bound <= array.length && play){
                let arr = [...newArray];
                if(i >= 0 && !foundPosition){ // has not reached the beginning
                    if(arr[j] < arr[i]){
                        //swap
                        let temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                        setI(i - 1);
                        setJ(j - 1);
                    } else {
                        setFoundPosition(true);
                    }
                } else { //has reached the beginning or bound has found its position
                    setBound(bound + 1);
                    setJ(bound);
                    setI(bound - 1);
                    setFoundPosition(false);
                }
                setNewArray(arr);
                setHighlightIndices([i, j]);
            }
        }
        if(size === 'Large'){
            setTimeout(insertionSort, 7);
        } else {
            setTimeout(insertionSort, 500);
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
                    <p className='description'>Insertion Sort is a comparison-based sorting algorithm that builds a sorted list one element at a time. 
                    It's much less efficient on large lists than more advanced algorithms such as QuickSort, HeapSort, or MergeSort, 
                    but it has its uses due to its simplicity and efficient performance on small or nearly sorted lists. 
                    In terms of time complexity, Insertion Sort performs very well for small lists or nearly sorted lists, running in linear time, O(n), 
                    in these cases. However, in the worst-case scenario, where the input array is sorted in reverse order, 
                    every insertion will be at the beginning of the array, so the time complexity is O(n^2), where n is the number of items to be sorted. 
                    Regarding space complexity, Insertion Sort is an in-place sorting algorithm and only uses constant memory.</p>
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
`function insertionSort(arr) {
    const n = arr.length
    for(let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}`;

const python = 
`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >=0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`;

const java = 
`void insertionSort(int arr[]) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`;

const cpp = 
`void insertionSort(int arr[], int n) {
    int key, j;
    for (int i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`;
 
export default InsertionSort;

