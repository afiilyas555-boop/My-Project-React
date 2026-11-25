import {numservise, personnels} from "./data.jsx";
// import {Service} from "./ListeServise.jsx";
import { Services } from "./data.jsx";
// import { Personnels } from "./ListePersonnels.jsx";

const s1 = Services.find(x=>x.numero == numservise);
const nbr = personnels.filter(x=>x.serviceID === numservise).length ;
export function Informservice(){
    return <div>
        <fieldset>
            <legend>INFO service</legend>
                <p> numero : {s1.numero}</p>
                <p>titre : {s1.titre}</p>            
                <p>description : {s1.description}</p>
                <p>Nombre de personnele : {nbr}</p>
        </fieldset>
    </div>
}
