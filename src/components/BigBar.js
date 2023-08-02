import '../styling/graph.css';

const BigBar = ({ value, height, highlight = false, sorted }) => {
    return (  
        <div className={`big-bar ${highlight ? 'highlight' : ''} ${sorted ? 'sorted' : ''}`} style={{height: `${height}`}}>
            {value}
        </div>
    );
}
 
export default BigBar;