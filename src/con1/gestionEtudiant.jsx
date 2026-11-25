// 







import { useState } from "react";
import { listFilieres, etudiants } from "./data";

export function GestionEtudiant() {

    const [nom, setnom] = useState("");
    const [prenom, setprenom] = useState("");
    const [filiere, setfiliere] = useState("");
    const [note, setnote] = useState("");

    const [liste, setliste] = useState(etudiants);

    // Ajouter un étudiant
    function ajouter() {
        const nouveau = {
            id: Date.now(),
            nom: nom,
            prenom: prenom,
            filiere: filiere,
            note: Number(note)
        };

        setliste([...liste, nouveau]);

        setnom("");
        setprenom("");
        setfiliere("");
        setnote("");
    }

    // Supprimer un étudiant
    function supprimer(id) {
        setliste(liste.filter(x => x.id !== id));
    }

    // Nombre des étudiants admis
    const admis = liste.filter(x => x.note > 10).length;

    return (
        <div>

            <h3>Ajouter un étudiant</h3>

            Nom :
            <input
                type="text"
                value={nom}
                onChange={(e) => setnom(e.target.value)}
            />
            <br />

            Prénom :
            <input
                type="text"
                value={prenom}
                onChange={(e) => setprenom(e.target.value)}
            />
            <br />

            Note :
            <input
                type="number"
                value={note}
                onChange={(e) => setnote(e.target.value)}
            />
            <br />

            Filière :
            <select
                value={filiere}
                onChange={(e) => setfiliere(e.target.value)}
            >
                <option value="">Choisir une filière</option>

                {listFilieres.map((x, i) => (
                    <option key={i} value={x}>
                        {x}
                    </option>
                ))}
            </select>

            <br />

            <button onClick={ajouter}>
                Ajouter
            </button>

            <h3>Liste des étudiants</h3>

            <table border={1}>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Note</th>
                        <th>Filière</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {liste.map(x => (
                        <tr key={x.id}>
                            <td>{x.nom}</td>
                            <td>{x.prenom}</td>
                            <td>{x.note}</td>
                            <td>{x.filiere}</td>
                            <td>
                                <button onClick={() => supprimer(x.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Nombre des étudiants admis : {admis}</h3>

        </div>
    );
}
