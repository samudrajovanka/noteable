import DropDownItem from '@components/dropDownItem';

function DropDown() {
  return (
    <div className="flex flex-col border-na-gray border rounded-md overflow-hidden text-black bg-white">
      <DropDownItem href="/">New project</DropDownItem>
      <DropDownItem href="/">New note</DropDownItem>
    </div>
  );
}

export default DropDown;
