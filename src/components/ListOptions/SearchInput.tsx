import { Input } from "../Input/Input";
import search from "../../assets/icons/search.svg";

interface SearchInputProps {
  searchString: string;
  changeSearchString: (searchString: string) => void;
}

export function SearchInput({ searchString, changeSearchString }: SearchInputProps) {

  return (
    <div className="flex justify-center items-center bg-primary-600 rounded-full w-full pr-0.5">
      <img className="h-10 bg-white border-3 border-primary-500 rounded-full p-1" src={search} alt="" />
      <Input id="search" name="search" placeholder="Buscar..." type="text" handleChange={(e) => changeSearchString(e.target.value)} value={searchString}></Input>
    </div>
  )
}