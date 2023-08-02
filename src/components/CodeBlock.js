import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/railscasts.css';
import '../styling/code-block.css';

const CodeBlock = ({ language, value }) => {
    const codeRef = useRef(null);

    useEffect(() => {
        hljs.highlightBlock(codeRef.current);
    }, [value, language]);

    return (
        <pre className='extra2'> 
            <code ref={codeRef} className={`language-${language} extra`}>
                {value}
            </code>
        </pre>
    );
}
 
export default CodeBlock;