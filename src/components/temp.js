import React, { useState, useEffect } from 'react';
import '../styling/graph.css';
import SmallBar from './SmallBar.js';
import BigBar from './BigBar.js';

const BubbleSort = ({ array, indices, size, play }) => {
    const [newArray, setNewArray] = useState(array);
    const [highlightIndices, setHighlightIndices] = useState(indices);
    const [done, setDone] = useState(false);
    const [i, setI] = useState(0);
    const [j, setj] = useState(1);
    const [bound, setBound] = useState(array.length);

    useEffect(() => {
        const bubbleSort = () => {
            if(size === 'Large'){
                if(!done && j < bound){
                    let arr = [...newArray];
                    if(arr[i] > arr[j]){
                        let temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = temp;
                    }
                    if(bound < 1){ //condition to check if done  bound === (array.length / 2)
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
            } else if(size === 'Small'){
                if(!done && j < bound){
                    let arr = [...newArray];
                    if(arr[i] > arr[j]){
                        let temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = temp;
                    }
                    if(bound < 1){ //condition to check if done  bound === (array.length / 2)
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
        }
        if(size === 'Large'){
            setTimeout(bubbleSort, 1);
        } else{
            setTimeout(bubbleSort, 100);
        }
    }, [newArray]);

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
        </div>
    );
}
 
export default BubbleSort;