

export function  Carte(props){
    return (
        <div>
            <h4>{props.recette.nom}</h4>
            <p>{props.recette.categorie} </p>
            {props.afficheIngredient && <ul>
                    {props.recette.ingredients.map(x=><li>{x}</li>)}
            </ul> }
        </div>

        
    )
}