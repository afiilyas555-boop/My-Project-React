
import { useState } from "react";

function Form() {
    const [P, X] = useState("");
    const [y, setY] = useState("");

    function F1(e) {
        X(e.target.value);
    }

    function F2() {
        setY(P);
    }

    return (
        <div>
            <input
                type="text"
                value={P}
                onChange={F1}
                placeholder="Saisir votre nom"
            />

            <button onClick={F2}>Click</button>

            <p>Nom : {y}</p>
        </div>
    );
}

export default Form;
