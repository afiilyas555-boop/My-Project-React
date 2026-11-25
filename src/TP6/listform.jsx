import { AddForm } from "./addForm"
import { useState } from "react"

export function ListForm({listA}){
    return(
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                   <th>Nom</th>
                <th>Prenom</th>
                <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listA.map((e)=><tr>
                        <td>{e.id}</td>
                        <td>{e.nom}</td>
                        <td>{e.prenom}</td>
                        <td>
                            <button type="reset">Supprimer</button>
                            <button>Modiffier</button>
                        </td>
                    </tr>)}
                </tbody>

            </table>
        </div>
    )
}