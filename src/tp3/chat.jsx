
import { useState } from "react";

export function App1() {
    const [nom, setnom] = useState("");

    return (
        <div>
            <h1>saisir votre nom</h1>
            <input
                type="text"
                onChange={(e) => setnom(e.target.value)}
            />

            <p>Bonjour {nom}</p>
        </div>
    );
}
