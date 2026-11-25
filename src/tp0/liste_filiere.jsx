// listefiliere.jsx

export function Listefiliere(){
    const filier = ["dEV","DD","GE","MATH","PC"]
    return  (
      <div> 
        <h3>Filiere</h3>
        <select >
            {filier.map(y=> <option>{y}</option>)}
        </select>

      </div>
      )
} 