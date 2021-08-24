import moment from "moment";
import {useSession} from "next-auth/client";
import DownArrowIcon from "@components/icon/downArrowIcon";
import PlusIcon from "@components/icon/plusIcon";
import { useState } from "react";
import DropDown from "@components/dropDown";

function TopNav(){

    const [session, loading] = useSession();
    const dateNow = moment().format('ddd, DD MMMM YYYY');
    const [activeDropDown, setActiveDropDown] = useState(false);
    const toogleDropDown = () => {
        setActiveDropDown((currentEl)=>!currentEl)
    }

    return(
        <div className="bg-na-green text-1xl py-3 px-10 text-white flex justify-between items-center">  
            <div>
              <p>{dateNow}</p>  
            </div>
            <div className="flex gap-7">
                <button  onClick={toogleDropDown}>
                    <div className="flex items-center w-7 relative">
                    <PlusIcon />
                    <DownArrowIcon />
                    {activeDropDown && (
                        <div className="absolute top-7 -right-3 w-56 filter drop-shadow-xl">
                            <DropDown />
                        </div>
                    )}
                    </div>
                </button> 
                {/* <p>{session && session.name}</p> */}
                <p>HARaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            </div>      
        </div>
    );
}

export default TopNav;