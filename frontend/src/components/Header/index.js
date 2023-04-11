// import { Modal } from "../../context/Modal"
// import {beachImage} from "../Images/beach-house.jpg"
import "./Header.css"
import { Link } from "react-router-dom";


export const Header = ({children}) => {

    return (
        <div className="header">
            <Link to={'/'}>
            <img className="logo" src="https://cdn.cdnlogo.com/logos/a/94/airbnb.png"></img>
            </Link>
            {children}
        </div>
    )
}
