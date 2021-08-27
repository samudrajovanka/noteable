import Button from "@components/button";
import PinIcon from "@components/icon/pin";
import PinFillIcon from "@components/icon/pinFill";
import { useEffect, useState } from "react";
import style from "./style.module.css";

function NoteCard({ id, color, title, description, pinned }) {
    const [isPinned, setIsPinned] = useState(pinned);
    const [icon, setIcon] = useState();

    useEffect( () => {
        if (isPinned) {
            setIcon(<PinFillIcon/>);
        } else {
            setIcon(<PinIcon/>);
        }
    }, [isPinned] )

    let borderColor;
    if (color === 'green'){
        borderColor = 'border-na-green';
    } else if (color === 'red'){
        borderColor = 'border-na-red';
    } else if (color === 'yellow'){
        borderColor = 'border-na-yellow';
    } else if (color === 'violet'){
        borderColor = 'border-na-violet';
    }

    const handlerEdit = () => {
        console.log('cocote')
    }
    const handlerDelete = () => {
        console.log('cocote v2.0')
    }
    const togglePin = () => {
        setIsPinned( ( curerl ) =>! curerl ) 
    }

    return (
        <div className={ `flex flex-col bg-white border ${borderColor} rounded-md p-3 gap-2 ${style.note_card}` }>
            <div className="flex flex-row justify-between">
                <p className="font-bold text-xl">{title}</p>
                <i className={ `cursor-pointer invisible ${style.icon} ` } onClick={togglePin}>{icon}</i>
            </div>
            <p className="text-na-gray">{description}</p>
            <div className={ `grid grid-cols-2 gap-3 hidden ${style.button_container}` }>
                <Button type="primary" color="warning" onClick={handlerEdit}>Edit</Button>
                <Button type="primary" color="danger" onClick={handlerDelete}>Delete</Button>
            </div>
        </div>
    )
}

export default NoteCard;