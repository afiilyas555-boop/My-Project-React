
import { Header } from "./Header.jsx";
import { Carte } from "./carte.jsx";
import { liste_recette } from "./data.jsx";
export function App() {
    return (
        <div>
            <Header />
            <Carte
                recette={liste_recette[0]}
                afficheIngredient={true}
            />
        </div>
    );
}
