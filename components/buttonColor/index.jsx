/* eslint-disable jsx-a11y/control-has-associated-label */
function ButtonColor({ color, isActive, onClick }) {
  const bgColor = {
    green: 'bg-na-green',
    violet: 'bg-na-violet',
    yellow: 'bg-na-yellow',
    red: 'bg-na-red',
  };

  let borderColor = '';
  if (isActive) {
    borderColor = 'border-2 border-gray-700';
  }

  const handlerChangeColor = () => {
    onClick(color);
  };

  return (
    <button
      className={`${bgColor[color]} ${borderColor} rounded-full h-8 w-8`}
      onClick={handlerChangeColor}
    />
  );
}

export default ButtonColor;
