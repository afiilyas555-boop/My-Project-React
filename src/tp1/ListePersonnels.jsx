import {personnels,numservise} from "./data.jsx";
const t1 = personnels.filter(x=>x.serviceID==numservise);
export function Personnels(){
    return <div>
        <h3>liste des personnels de id 100</h3>
        {t1.map(x=>
        <div><input type="checkbox" checked={x.actif}/>{x.nom }  {x.prenom }</div>
    )} </div>

}