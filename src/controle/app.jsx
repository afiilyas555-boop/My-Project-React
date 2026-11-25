import { Header } from "./Header.jsx";
IMPORT {Carte}
import { Carte, ListeCarte } from "./carte.jsx";
// import { liste_recettes } from "./data.jsx";
import { ListeCarte } from "./liste_Carte.jsx";
// import {liste_recette} from "./data.jsx"

export function App(){
    return (
        <>
            <Header/>
        {/* <Carte recette={liste_recettes.map(x=>x)}
                afficheIngredient = {true}
                /> */}
<ListeCarte/>
         {/* <button onClick={(affiche==false)?"afficher les ingredients" : "masquer les Ingredient"}></button> */}
        </>
        
    )
}