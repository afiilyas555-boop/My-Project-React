// import { useState } from "react";

export function ListeForm({ props }) {
    // const[list,setlist]=useState(etudiants)
    return (
       <div>
           <h2>Liste desetudiants</h2>

            <table border={1}>
            
             <tr>
                <th>ID</th>
                <th>Nom</th>
                    <th>Prenom</th>
            </tr>
              

                <tbody>
                {props.listE.map((e) => (
                        <tr >
                            <td>{e.id}</td>
                            <td>{e.nom}</td>
                            <td>{e.prenom}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}




