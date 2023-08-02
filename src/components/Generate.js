import '../styling/generate.css';

const Generate = ({array, onGenerateClick, onAlgorithmSelect, selectedAlgorithm, onSizeSelect, selectedSize, handlePlay, play}) => {
    
    return ( 
        <div className='generate-container'> 
            <div className="generate-button-container">
                <button onClick={onGenerateClick} className='generate-button'>Generate New Array</button>
            </div>
            <div className="generate-button-container">
                <div className="label">Algorithm:</div>
                <button 
                    onClick={() => onAlgorithmSelect('Bubble Sort')} 
                    className={`generate-button ${selectedAlgorithm === 'Bubble Sort' && array.length > 0 ? 'selected' : ''}`}>
                    Bubble Sort
                </button>
                <button 
                    onClick={() => onAlgorithmSelect('Selection Sort')} 
                    className={`generate-button ${selectedAlgorithm === 'Selection Sort' && array.length > 0 ? 'selected' : ''}`}>
                    Selection Sort
                </button>
                <button 
                    onClick={() => onAlgorithmSelect('Insertion Sort')} 
                    className={`generate-button ${selectedAlgorithm === 'Insertion Sort' && array.length > 0 ? 'selected' : ''}`}>
                    Insertion Sort
                </button>
            </div>
            <div className="generate-button-container">
                <div className="label">Array Size:</div>
                <button 
                    onClick={() => onSizeSelect('Large')}
                    className={`generate-button ${selectedSize === 'Large' && array.length > 0 ? 'selected' : ''}`}>
                    Large
                </button>
                <button 
                    onClick={() => onSizeSelect('Small')}
                    className={`generate-button ${selectedSize === 'Small' && array.length > 0 ? 'selected' : ''}`}>
                    Small
                </button>
                {play && <i className="fa-sharp fa-solid fa-pause fa-2xl push-right"
                    onClick={() => handlePlay(false)}>     
                </i>}
                {!play &&
                <i className="fa-sharp fa-solid fa-play fa-2xl push-right"
                    onClick={() => handlePlay(true)}>
                </i>}
            </div>
        </div>
    );
}
 
export default Generate;