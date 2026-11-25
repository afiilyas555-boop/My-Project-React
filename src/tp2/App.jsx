import { Titre } from "./titre.jsx";
import { MenuX } from "./menu.jsx";
export function App(){
    return <>
            <Titre/><Titre/>
            <MenuX/> <MenuX/>
          
           
            <MenuX text = "produit"/>
            <MenuX text = "pannier"/>
            <Titre text="Site E-commerce"/>  
            <Titre text="Catalogue"/>

    </>
}