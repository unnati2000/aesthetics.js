import { CiSearch } from "react-icons/ci";

import { BsArrowReturnLeft } from "react-icons/bs";
import Kbd from "./Kbd";

interface SearchInput {
  setSearchInput: (searchInput: string) => void;
  searchInput: string;
}

const SearchInput = ({ setSearchInput, searchInput }: SearchInput) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search..."
        autoFocus
        className="w-full border-b placeholder-zinc-400 bg-transparent backdrop-blur-md border-zinc-800 outline-none text-white rounded-tl-xl py-3 pl-8 text-sm rounded-tr-xl"
      />
      <div className="absolute text-zinc-500 left-2 top-0 bottom-0 flex items-center justify-center">
        <CiSearch size={20} className="text-zinc-400" />
      </div>
      {searchInput.length > 0 && (
        <div className="absolute text-zinc-400 right-2 top-0 bottom-0 flex items-center justify-center">
          <Kbd>
            <BsArrowReturnLeft size={14} />
          </Kbd>
        </div>
      )}
    </div>
  );
};

export default SearchInput;

