import React, { useState, useEffect } from 'react';
import '../styling/graph.css';
import '../styling/algo-info.css';
import '../styling/source-code.css';
import SmallBar from './SmallBar.js';
import BigBar from './BigBar.js';
import CodeBlock from './CodeBlock';

const BubbleSort = ({ array, size, play}) => {
    const [newArray, setNewArray] = useState(array);
    const [highlightIndices, setHighlightIndices] = useState([0, 1]);
    const [done, setDone] = useState(false);
    const [i, setI] = useState(0);
    const [j, setj] = useState(1);
    const [bound, setBound] = useState(array.length);

    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [value, setValue] = useState(javascript);

    useEffect(() => {

        const bubbleSort = () => {
            if(j === 1) {
                setHighlightIndices([1000, 1001]);
            }
            if(!done && j < bound && play){
                let arr = [...newArray];
                if(arr[i] > arr[j]){
                    let temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                }
                if(bound < 1){ 
                    setDone(true);
                } else{ //not done
                    setI(i + 1);
                    setj(j + 1);
                    if(j + 1 === bound){ //reset i and j if at the end of array and decrement bound
                        setI(0);
                        setj(1);
                        setBound(bound - 1);
                    }
                    setHighlightIndices([i, j]);
                    setNewArray(arr);
                }
            }
        }
        if(size === 'Large'){
            setTimeout(bubbleSort, 3);
        } else{
            setTimeout(bubbleSort, 200);
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
                    sorted={index >= bound || (index === 0 && bound === 1)}
                />
            );
        } else if(size === 'Small'){
            return newArray.map((value, index) => 
                <BigBar 
                    key={index} 
                    value={value} 
                    height={`${value * 40}px`} 
                    highlight={index === highlightIndices[0] || index === highlightIndices[1]}
                    sorted={index >= bound || (index === 0 && bound === 1)}
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
                    <p className='description'>Bubble Sort is a simple comparison-based sorting algorithm. 
                    It operates by repeatedly swapping adjacent elements if they are in the wrong order, 
                    with each pass "bubbling" the largest unsorted element to its correct position at the end of the list. 
                    Because Bubble Sort checks each element with every other element, the worst-case time complexity is O(n^2), 
                    where n is the number of items in the list. This worst-case scenario occurs when the input list is sorted in descending order and needs to be sorted in ascending order.
                    Regarding space complexity, Bubble Sort is an in-place sorting algorithm and only uses constant memory.</p>
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
`function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}`;

const python = 
`def bubbleSort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`;

const java = 
`void bubbleSort(int arr[]) {
    for(int i = 0; i < arr.length - 1; i++) {
        for(int j = 0; j < arr.length - i - 1; j++) {
            if(arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`;

const cpp = 
`void bubbleSort(int arr[], int n) {
    for(int i = 0; i < n - 1; i++) {
        for(int j = 0; j < n - i - 1; j++){
            if(arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`;
 
export default BubbleSort;