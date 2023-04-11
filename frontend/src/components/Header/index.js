// import { Modal } from "../../context/Modal"
// import {beachImage} from "../Images/beach-house.jpg"
import "./Header.css"


export const Header = ({children}) => {

    return (
        <div className="header">
            <img className="logo" src="https://cdn.cdnlogo.com/logos/a/94/airbnb.png"></img>
            {children}
        </div>
    )
}
