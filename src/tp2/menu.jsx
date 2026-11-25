export {menu_produit} from "./data.jsx";

export function MenuX(props){
    return <div>
            <h3>Menu {props.text}</h3>
            <ul>
                {props.menu_produit.map(x=><li>{x}</li>)}
            </ul>
    </div>
}
