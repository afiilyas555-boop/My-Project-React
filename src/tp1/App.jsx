import {Service} from "./ListeServise.jsx";
import {Informservice} from "./InfoServise.jsx";
import { Personnels } from "./ListePersonnels.jsx";
import {Per2} from "./liste_2_per.jsx";


export function App(){
    return <div>
        <Service/>
        <Informservice/>
        <Personnels/>
        <Per2/>
    </div>
}