import { personnel,services } from "./data"; 
import { useState } from "react";


export function FormX() {
    const [nom,set_nom] = useState("");
    const [id,set_id] = useState(0);
    const [list,set_list] = useState(personnel);
    const [serevice,set_serevice] = useState(0);

    function afficher(){
    }
    return (
     <form onSubmit={afficher}>

        <h1>nouveau personnel</h1>
        id : <input type="text" onChange={(e)=>set_id(e.target.value)} />
        nom : <input type="text" onChange={(e)=>set_nom(e.target.value)} />
       service : 
       <select onChange={(e)=>set_serevice(e.target.value)} >
            <option ></option>
       </select>
   


   <h2>liste  de personnel </h2>

<table border={1}>
   <thead>
    <tr>
        <th>nom</th>
        <th>prenom</th>
        <th>serviceID</th>
        <th>action</th>
    </tr>
   </thead>

<tbody>
      
{list.map((x) => (
    <tr >
            
            <td>{x.nom}</td>
            <td>{x.prenom}</td>
            <td>{x.serviceID}</td>    
    </tr>
))
}
</tbody>

</table>
    </form>



    )
}