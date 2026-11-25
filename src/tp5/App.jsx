import { useState } from "react";
import { etudiant } from "./data.jsx";
import { AddForm } from "./addForm.jsx";
import {ListeForm} from "./listForm.jsx";

export function App() {

    const [list, setList] = useState(etudiant);

    function ajouter(n, p) {

        let et = {
            id: 0 ,
            nom: n,
            prenom: p
        };

        setList([...list, et]);
    }

    return (
        <div>
            <AddForm envoyer={ajouter} />
            <ListeForm listE={list} />
        </div>
    );
}

export default App;





























































// import { useState } from "react";

// export function  App(){
//     const [list,sitlist] = useState(etudiant);
//     let et = {id : 0  ,
//         nom : n ,
//         prenoom : p
//     }
//     function ajouter(n,p){
//         list([...list,et])
//     }
// return <div>
//     <AddForm envoyer={ajouter}/>
//     <ListForm listE={list}/>
// </div>
// }