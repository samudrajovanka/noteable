import ButtonColor from '@components/buttonColor';

function ColorStyle({ colorActive, handlerChangeColor }){
    
    return(
        <div className="flex flex-row gap-2 mt-2">
            <ButtonColor color='green' isActive={colorActive === 'green'} onClick={handlerChangeColor}/>
            <ButtonColor color='violet' isActive={colorActive === 'violet'} onClick={handlerChangeColor}/>
            <ButtonColor color='yellow' isActive={colorActive === 'yellow'} onClick={handlerChangeColor}/>
            <ButtonColor color='red' isActive={colorActive === 'red'} onClick={handlerChangeColor}/>
        </div>
    );
}

export default ColorStyle;