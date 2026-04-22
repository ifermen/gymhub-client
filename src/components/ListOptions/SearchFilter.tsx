import { Dropdown } from "../Dropdown/Dropdown";
import { SearchInput } from './SearchInput';

interface SearchFilterProps {
  searchString: string;
  changeSearchString: (searchString: string) => void;
  filterOption: Map<string, string>;
  changeFilter: (value: string) => void;
  filter: string;
}
export function SearchFilter({ searchString, changeSearchString, filterOption, changeFilter, filter }: SearchFilterProps) {

  return (
    <div className="flex flex-row py-1 gap-1">
      <SearchInput searchString={searchString} changeSearchString={changeSearchString} />
      <div className="hidden md:flex">
        <Dropdown id="filtro" title="Filtro" options={filterOption} handlerChange={changeFilter} value={filter}></Dropdown>
      </div>
    </div>
  );
}