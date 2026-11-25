import { Carte } from "./carte"
import { liste_recettes } from "./data"
export function ListeCarte(){
    
                {liste_recettes.map((x) => (
                     <Carte recette={x} afficheIngredient={true}/>))}
    
}