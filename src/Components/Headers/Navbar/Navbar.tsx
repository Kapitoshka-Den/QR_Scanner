import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"

const Navbar = () =>{
    return (
        <nav className="nav">
            <Link to="/">
                <img src="https://spb-rtk.ru/wp-content/themes/spbrtk_f/images/logo.png"/>
            </Link>
            <ul>
                <NavLink to="/qrscanner" >Qr Scanner</NavLink>
                <NavLink to="/qrlist">Qr List</NavLink>
            </ul>
        </nav>
    )
}

export default Navbar;