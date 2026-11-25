import { Entete } from "./entete.jsx";
import { GestionEtudiant } from "./gestionEtudiant.jsx";

export function App(){
   return  <>
    <Entete titre="gestion d'etudiant "/>
    <GestionEtudiant/>
    </>
}