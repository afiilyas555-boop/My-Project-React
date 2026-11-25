import { useState } from "react";

export function Conteur(){

    const [count, setCount] = useState(0);

    return ( 
        <div>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>

            <p>counteur {count}</p>
        </div>
    )
}
