import style from './style.module.css';

function DropDown({ children }) {
  return (
    <div className={`flex flex-col py-1 border border-na-gray rounded-md overflow-hidden text-black bg-white ${style.dropdown}`}>
      {children}
    </div>
  );
}

export default DropDown;
