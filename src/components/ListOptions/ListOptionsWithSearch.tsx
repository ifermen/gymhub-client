import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Modal } from "../Modal/Modal";
import { SearchInput } from "./SearchInput";

interface ListOptionsProps {
  searchString: string;
  changeSearchString: (search: string) => void;
  create: () => void;
  filter: string;
  changeFilter: (filter: string) => void;
  filterOption: Map<string, string>;
  sort: string;
  changeSort: (sort: string) => void;
  sortOption: Map<string, string>;
  direction: string;
  changeDirection: (direction: string) => void;
  directionOption: Map<string, string>;
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function ListOptionsWithSearch({
  searchString,
  changeSearchString,
  create,
  filter,
  changeFilter,
  filterOption,
  sort,
  changeSort,
  sortOption,
  direction,
  changeDirection,
  directionOption,
  isOpenModal,
  openModal,
  closeModal
}: ListOptionsProps) {
  return (
    <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
      <span className="text-sm font-bold text-text-500">OPCIONES DE LISTADO</span>
      <div className="flex flex-row gap-3 w-full">
        <SearchInput changeSearchString={changeSearchString} searchString={searchString} />
        <div className="hidden sm:block">
          <Button id="btnAdd" type="button" width="fit" handleClick={create}>
            Añadir
          </Button>
        </div>
      </div>
      <div className="sm:flex flex-row w-full justify-between gap-3 hidden">
        <Dropdown
          id="ddFilter"
          title="FILTRO"
          width="fit"
          handlerChange={changeFilter}
          options={filterOption}
          value={filter} />
        <div className="flex flex-row gap-3">
          <Dropdown
            id="ddSort"
            title="ORDEN"
            width="fit"
            handlerChange={changeSort}
            options={sortOption}
            value={sort} />
          <Dropdown
            id="ddDirection"
            title="DIRECCIÓN"
            width="fit"
            handlerChange={changeDirection}
            options={directionOption}
            value={direction} />
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:hidden">
        <Button id="btnAdd" type="button" width="full" handleClick={create}>
          Añadir
        </Button>
        <Button id="btnOption" type="button" handleClick={openModal}>Opciones de lista</Button>
        <Modal isOpen={isOpenModal} onClose={closeModal}>
          <div className="flex flex-col gap-3">
            <span className="text-base font-bold text-center">OPCIONES DE LISTADO</span>
            <Dropdown
              id="ddFilter"
              title="FILTRO"
              handlerChange={changeFilter}
              options={filterOption}
              value={filter} />
            <Dropdown
              id="ddSort"
              title="ORDEN"
              handlerChange={changeSort}
              options={sortOption}
              value={sort} />
            <Dropdown
              id="ddDirection"
              title="DIRECCIÓN"
              handlerChange={changeDirection}
              options={directionOption}
              value={direction} />
          </div>
        </Modal>
      </div>
    </div>
  )
}