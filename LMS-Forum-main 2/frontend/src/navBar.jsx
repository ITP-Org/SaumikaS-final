

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { GoHomeFill } from "react-icons/go";
import { MdLibraryBooks } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { IoMailUnread } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { MdForum } from "react-icons/md"; // Importing a forum icon

function NavBar() {
    return (
        <div className="flex flex-col justify-evenly items-center bg-purple-600 h-[70%] mt-[2.5%] ml-[1%] rounded-[40px] w-[5%] absolute">
            <Link to="/" className="flex justify-center items-center w-[60%] h-[5%] text-white text-[30px] rounded-[20px] transition duration-500 hover:bg-[#5d3da7]">
                <GoHomeFill />
            </Link>
            <Link to="/Content" className="flex justify-center items-center w-[60%] h-[5%] text-white text-[30px] rounded-[20px] transition duration-500 hover:bg-[#5d3da7]">
                <MdLibraryBooks />
            </Link>
            <Link to="/Users" className="flex justify-center items-center w-[60%] h-[5%] text-white text-[30px] rounded-[20px] transition duration-500 hover:bg-[#5d3da7]">
                <MdGroups />
            </Link>
            <Link to="/forum_admin" className="flex justify-center items-center w-[60%] h-[5%] text-white text-[30px] rounded-[20px] transition duration-500 hover:bg-[#5d3da7]">
                <MdForum />
            </Link>
            <Link to="/Inquiry" className="flex justify-center items-center w-[60%] h-[5%] text-white text-[30px] rounded-[20px] transition duration-500 hover:bg-[#5d3da7]">
                <IoMailUnread />
            </Link>
            <Link to="/Analytics" className="flex justify-center items-center w-[60%] h-[5%] text-white text-[30px] rounded-[20px] transition duration-500 hover:bg-[#5d3da7]">
                <VscGraph />
            </Link>
        </div>
    );
}

export default NavBar;
