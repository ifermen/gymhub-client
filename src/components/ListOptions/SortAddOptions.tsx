import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Modal } from "../Modal/Modal";

interface SortAddOptionsProps {
  createNavegate: () => void;
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
export function SortAddOptions({
  createNavegate,
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
}: SortAddOptionsProps
) {
  return (<>
    <div className="hidden flex-row justify-between gap-1 md:flex">
      <Button
        id="btnCreateReport"
        type="button"
        variant="primary"
        width="fit"
        handleClick={createNavegate}
      >
        Añadir
      </Button>
      <div className="flex gap-1">
        <Dropdown
          id="sort"
          title="Ordenar por"
          options={sortOption}
          handlerChange={changeSort}
          value={sort} />
        <Dropdown
          id="direction"
          title="Dirección"
          options={directionOption}
          handlerChange={changeDirection}
          value={direction} />
      </div>
    </div>
    <div className="flex flex-col md:hidden">
      <Button id="btnShowOptions" type="button" handleClick={openModal}>
        Opciones
      </Button>
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <Dropdown
          id="sort"
          title="Ordenar por"
          options={sortOption}
          handlerChange={changeSort}
          value={sort}>
        </Dropdown>
        <Dropdown
          id="direction"
          title="Dirección"
          options={directionOption}
          handlerChange={changeDirection}
          value={direction} />
        <Dropdown
          id="filtro"
          title="Filtro"
          options={filterOption}
          handlerChange={changeFilter}
          value={filter} />
        <Button
          id="btnCreateReport"
          type="button"
          width="full"
          handleClick={createNavegate}>
          Añadir Empleado
        </Button>
      </Modal>
    </div>
  </>);
}