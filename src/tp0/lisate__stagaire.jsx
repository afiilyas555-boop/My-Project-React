// listeStagaire.jsx

export function Liste_stagaire(){
            const etudiants = [
          {
            nom: "Afi",
            prenom: "Ilyas",
            age: 21
          },
          {
            nom: "Amrani",
            prenom: "Youssef",
            age: 20
          },
          {
            nom: "Alaoui",
            prenom: "Sara",
            age: 19
          }
        ]
        return (
            <table border={1}>
                <tr>
                    <th>NOM</th>
                    <th>PRENOM</th>
                    <th>AGE</th>
                </tr>
{etudiants.map(x=>(<tr>
                   <td>{x.nom}</td>
                   <td>{x.prenom}</td>
                   <td>{x.age}</td>
                    
                </tr>))}
                
            </table>
        )

    }