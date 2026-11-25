
import { useState } from "react";

export function AddForm(props) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");

    function envoyer() {
         e.preventDefault();
        props.envoyer(nom, prenom);

        setNom("");
        setPrenom("");
    }

    return (
        <div>
            <form onSubmit={envoyer}>

                Nom :<input
                    type="text" value={nom}  onChange={(e) => setNom(e.target.value)}
                />
             Prenom : <input type="text" value={prenom}  onChange={(e) => setPrenom(e.target.value)}
                />

         <button type="submit"> Ajouter      </button>

            </form>
        </div>
    );
}


















































































