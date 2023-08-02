import { useEffect, useState } from 'react';
import '../styling/header.css';
import Generate from './Generate';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';

function App() {
  const [array, setArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [play, setPlay] = useState(true);

  useEffect(() => {
    setArray(populateArray(selectedSize));
  }, []);

  const onGenerateClick = () => {
    setArray(populateArray(selectedSize));
    handlePlay(true);
  }

  const onAlgorithmSelect = (algorithm) => {
      setSelectedAlgorithm(algorithm);
      handlePlay(true);
  }

  const onSizeSelect = (sizeSelect) => {
    setSelectedSize(sizeSelect)
    setArray(populateArray(sizeSelect));
    handlePlay(true);
  }

  const populateArray = (sizeSelect) => {
    let newArray = [];
    if(sizeSelect === 'Large'){
      while(newArray.length < 200){
        let randomNumber = Math.floor(Math.random() * 399) + 1; 
        newArray.push(randomNumber);
      }
    } else if(sizeSelect === 'Small'){
      let numbers = Array.from({length: 10}, (_, i) => i + 1);
      // Shuffle array
      for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      newArray = numbers;
    }
    return newArray;
  }

  const handlePlay = (boolean) => {
    if(!boolean){
      setPlay(false);
    } else {
      setPlay(true);
    }
  }

  return (
    <div className="App">
      <header className="header-container">
        <h1 className="header-title">Sorting Algorithm Visualization</h1>
      </header>
      <Generate 
        array={array} 
        onGenerateClick={onGenerateClick} 
        onAlgorithmSelect={onAlgorithmSelect} 
        selectedAlgorithm={selectedAlgorithm}
        onSizeSelect={onSizeSelect}
        selectedSize={selectedSize}
        play={play}
        handlePlay={handlePlay}/>
      {selectedAlgorithm === 'Bubble Sort' && array.length > 0 && <BubbleSort array={array} key={array.join('-')} size={selectedSize} play={play}/>}
      {selectedAlgorithm === 'Selection Sort' && array.length > 0 && <SelectionSort array={array} key={array.join('-')} size={selectedSize} play={play}/>}
      {selectedAlgorithm === 'Insertion Sort' && array.length > 0 && <InsertionSort array={array} key={array.join('-')} size={selectedSize} play={play}/>}
    </div>
  );
}

export default App;
