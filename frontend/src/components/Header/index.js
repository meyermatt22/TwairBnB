// import { Modal } from "../../context/Modal"
import beachImage from "../Images/beach-house.jpg"
import "./Header.css"


export const Header = ({children}) => {

    return (
        <div className="header">
            {beachImage}
            {children}
        </div>
    )
}
