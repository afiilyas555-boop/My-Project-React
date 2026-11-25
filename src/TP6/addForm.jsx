import { useState } from "react";

export function AddForm({listE,envoyer}){
    const [nomA,setnomA] = useState('');
    const [prenomA,setprenomA] = useState('');
    return(
        <div>
            <form onSubmit={(e)=>{e.preventDefault();envoyer(nomA,prenomA);setnomA('');setprenomA('')}}>
            Nom : <input type="text" value={nomA} onChange={(e)=>setnomA(e.target.value)}/> <br />
            Prenom : <input type="text" value={prenomA} onChange={(e)=>setprenomA(e.target.value)} /> <br />
            <button type="submit">Ajouter</button>
            </form>
        </div>
        
    )
}