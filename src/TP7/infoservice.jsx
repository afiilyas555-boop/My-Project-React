// ---------

import { useState } from "react";
import {services,personnels} from "data.jsx" ;

export function InfoService(){
    const[ser,set_ser] = useState("");
    const variable = services.find(x=>x.nemuro == ser) ;


    return <div>
        service : <select onChange={(e)=>set_ser(e.target.value)}>
            {services.map(x=>{<option value={x.nemuro}>{x.titre}</option>})}

            nemuro : {variable.nemuro} ;
            titre : {variable.titre} ;
            description : {variable.description} ;
            numberPersonnaels : {personnels.filter(y=>y.service_Id == variable.nemuro ).length} 
        </select>
    </div>
}





// // code ch
// import { useState } from "react";
// import { services, personnels } from "./data.jsx";

// export function InfoService() {

//     const [ser, set_ser] = useState("");

//     const variable = services.find(x => x.numero == ser);

//     return (
//         <div>
//             Service :
//             <select onChange={(e) => set_ser(e.target.value)}>
//                 <option value="">Choisir un service</option>

//                 {services.map(x => (
//                     <option value={x.numero}>
//                         {x.titre}
//                     </option>
//                 ))}
//             </select>

//             {variable && (
//                 <div>
//                     Numero : <p>{variable.numero}</p>
//                     <p>Titre : {variable.titre}</p>
//                     <p>Description : {variable.description}</p>

//                     <p>
//                         Nombre de personnels : {
//                             personnels.filter(y => y.service_Id == variable.numero).length
//                         }
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// }
