
import { FaRegUser } from "react-icons/fa";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const Header = () => {

    return (
        <div className=" min-w-[100vw] py-4 flex flex-row justify-around items-center border border-b fixed top-0 bg-black">
            <NavLink to="/home"><Button variant="ghost" className="text-base font-bold"><span>Home</span></Button></NavLink>
            <NavLink to="/internship"><Button variant="ghost" className="text-base font-bold">Internships</Button></NavLink>
            <NavLink to="/domain"><Button variant="ghost" className="text-base font-bold">Domains</Button></NavLink>
            <NavLink to="/profile"><Button variant="ghost" className="text-base font-bold"><FaRegUser color="violet"/></Button></NavLink>
        </div>
    );

}

export default Header;