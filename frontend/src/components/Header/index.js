// import { Modal } from "../../context/Modal"
// import {beachImage} from "../Images/beach-house.jpg"
import "./Header.css"
import { Link } from "react-router-dom";


export const Header = ({children}) => {

    return (
        <div className="header">
            <Link to={'/'}>
            <img className="logoLeft" src="https://i.imgur.com/q2bfjUk.png"></img>
            </Link>
            {children}
        </div>
    )
}
