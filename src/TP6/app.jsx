import { useState } from 'react'
import {AddForm} from './addForm'
import { Etudiant } from './data'
import { ListForm } from './listform';
export  function App(){
    const[list,setlist] = useState(Etudiant);
    function ajouter(n,p){
        const id = Math.max(...list.map(x=>x.id))+1
        let Groupe = {
            id : id ,
            nom : n ,
            prenom : p
        }
        setlist([...list,Groupe])
    }
    return(
        <div>
            <AddForm listE={list} envoyer={ajouter}/>
            <ListForm listA={list} />
        </div>
    );
}