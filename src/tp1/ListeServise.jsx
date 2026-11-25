import  {Services} from "./data.jsx";
import {numservise} from "./data.jsx";

export  function Service(){
    return <div>
        Service :
    <select >{Services.map(x=><option>{x.titre}</option>)}</select>

    </div>
}