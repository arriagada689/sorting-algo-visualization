import '../styling/graph.css';

const SmallBar = ({ value, height, highlight = false, sorted }) => {
    return (  
        <div className={`small-bar ${highlight ? 'highlight' : ''} ${sorted ? 'sorted' : ''}`} style={{height: `${height}`}}>
            
        </div>
    );
}
 
export default SmallBar;