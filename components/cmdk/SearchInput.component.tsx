import { CiSearch } from "react-icons/ci";

import { BsArrowReturnLeft } from "react-icons/bs";
import Kbd from "./Kbd";

const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        autoFocus
        className="w-full border-b border-stone-400/35 outline-none text-stone-500 rounded-tl-xl py-3 pl-8 text-sm rounded-tr-xl"
      />
      <div className="absolute left-2 top-0 bottom-0 flex items-center justify-center">
        <CiSearch size={20} />
      </div>
      <div className="absolute right-2 top-0 bottom-0 flex items-center justify-center">
        <Kbd>
          <BsArrowReturnLeft size={14} />
        </Kbd>
      </div>
    </div>
  );
};

export default SearchInput;

