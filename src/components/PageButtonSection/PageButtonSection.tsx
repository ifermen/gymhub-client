import { ButtonPage } from "../Button/ButtonPage";

interface PageButtonSectionProps {
  pageKey: number;
  setPageKey: (newPageKey: number) => void;
  totalPages: number;
}

export function PageButtonSection({ pageKey, setPageKey, totalPages }: PageButtonSectionProps) {

  const toFirst = () => {
    setPageKey(0)
  }

  const toPrevious = () => {
    setPageKey(pageKey - 1);
  }

  const toNext = () => {
    setPageKey(pageKey + 1);
  }

  const toLast = () => {
    setPageKey(totalPages - 1)
  }

  return (
    <div className="
        flex
        flex-row
        justify-center
        gap-2
      ">
      <ButtonPage id="btnInitPage" type="button" handleClick={toFirst}>{"<<"}</ButtonPage>
      <ButtonPage id="btnPreviousPage" type="button" handleClick={toPrevious}>{"<"}</ButtonPage>
      {pageKey > 2 ?
        <ButtonPage id="btn3PreviousPage" variant="light" type="button" handleClick={() => { }}>{pageKey - 2}</ButtonPage> :
        ""}
      {pageKey > 1 ?
        <ButtonPage id="btn2PreviousPage" variant="light" type="button" handleClick={() => { }}>{pageKey - 1}</ButtonPage> :
        ""}
      {pageKey > 0 ?
        <ButtonPage id="btn1PreviousPage" variant="light" type="button" handleClick={() => { }}>{pageKey}</ButtonPage> :
        ""}
      <ButtonPage id="btnActualPage" variant="dark" type="button" handleClick={() => { }}>{pageKey + 1}</ButtonPage>
      {pageKey >= totalPages - 1 ? "" :
        <ButtonPage id="btn1NextPage" variant="light" type="button" handleClick={() => { }}>{pageKey + 2}</ButtonPage>}
      {pageKey >= totalPages - 2 ? "" :
        <ButtonPage id="btn2NextPage" variant="light" type="button" handleClick={() => { }}>{pageKey + 3}</ButtonPage>}
      {pageKey >= totalPages - 3 ? "" :
        <ButtonPage id="btn3NextPage" variant="light" type="button" handleClick={() => { }}>{pageKey + 4}</ButtonPage>}
      <ButtonPage id="btnNextPage" type="button" handleClick={toNext}>{">"}</ButtonPage>
      <ButtonPage id="btnLastPage" type="button" handleClick={toLast}>{">>"}</ButtonPage>
    </div>
  )
}