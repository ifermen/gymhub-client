import { SearchFilter } from "./SearchFilter";
import { SortAddOptions } from "./SortAddOptions";

interface SearchFilterSortAddOptionsProps {
  createNavegate: () => void;
  searchString: string;
  changeSearchString: (searchString: string) => void;
  sortOption: Map<string, string>;
  sort: string;
  changeSort: (value: string) => void;
  directionOption: Map<string, string>;
  direction: string;
  changeDirection: (value: string) => void;
  filterOption: Map<string, string>;
  filter: string;
  changeFilter: (value: string) => void;
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}
export function SearchFilterSortAddOptions({
  createNavegate,
  searchString,
  changeSearchString,
  sortOption,
  sort,
  changeSort,
  directionOption,
  direction,
  changeDirection,
  filterOption,
  filter,
  changeFilter,
  isOpenModal,
  openModal,
  closeModal
}: SearchFilterSortAddOptionsProps) {
  return (<>
    <SearchFilter
      searchString={searchString}
      changeSearchString={changeSearchString}
      filterOption={filterOption}
      filter={filter}
      changeFilter={changeFilter}
    />
    <SortAddOptions
      isOpenModal={isOpenModal}
      openModal={openModal}
      closeModal={closeModal}
      sort={sort}
      sortOption={sortOption}
      changeSort={changeSort}
      direction={direction}
      directionOption={directionOption}
      changeDirection={changeDirection}
      filter={filter}
      filterOption={filterOption}
      changeFilter={changeFilter}
      createNavegate={createNavegate}
    />
  </>);
}