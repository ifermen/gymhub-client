import search from "../../assets/icons/search.svg";
import { LineVertical } from '../Line/LineVertical';

interface SearchInputProps {
  searchString: string;
  changeSearchString: (searchString: string) => void;
}

export function SearchInput({ searchString, changeSearchString }: SearchInputProps) {

  return (
    <div className="flex flex-row w-full border border-primary-400 rounded-xl items-center py-0.5 px-1">
      <img className="h-6" src={search} alt="Icono de busqueda" />
      <LineVertical />
      <input
        id="search"
        onChange={(e) => changeSearchString(e.target.value)}
        value={searchString}
        className="w-full text-lg pl-1 focus:outline-none" />
    </div>
  )
}