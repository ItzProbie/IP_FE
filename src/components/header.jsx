
import { FaRegUser } from "react-icons/fa";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const Header = () => {

    return (
        <div className=" min-w-[100vw] py-4 flex flex-row justify-around items-center border border-b">
            <NavLink to="/home"><Button variant="ghost" className="text-base font-bold"><span>Home</span></Button></NavLink>
            <Button variant="ghost" className="text-base font-bold">Internships</Button>
            <Button variant="ghost" className="text-base font-bold">Domains</Button>
            <Button variant="ghost" className="text-base font-bold"><FaRegUser color="violet"/></Button>
        </div>
    );

}

export default Header;