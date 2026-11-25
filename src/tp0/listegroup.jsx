// Listegroup.jsx

export function Listegroup(){
    const group = ['201','202','203','204','205']
    return (
  <div className="form-row">            <h3>Groupe  :</h3>
            <select >
               {group.map(x => <option>{x}</option>)} 
            </select>
        </div>
    )
}