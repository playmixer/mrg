import React, {useEffect} from "react";

interface Props {
  currentIndex: number
  onPage: any
  countPage: number
  difference?: number
  pageSize?: number
  countElements?: number
}

const Pagination = ({currentIndex, onPage, countPage, difference = 2, pageSize = 10, countElements = 0}: Props) => {
  const onChangePage = (id: number) => {
    onPage(id)
  }

  const getCountPage = () => {
    if (countPage)
      return countPage
    let count = Math.floor(countElements / pageSize);
    if (countElements % pageSize > 0) count++;

    return count;
  }

  const getPages = () => {
    let elements = []
    for (let i = 0; i < getCountPage(); i++) {
      elements.push(i + 1)
    }

    return elements;
  }

  const onPrev = () => {
    onPage(currentIndex - 1 <= 0 ? 1 : currentIndex - 1)
  }


  const onNext = () => {
    const num = currentIndex + 1 > getCountPage() ? currentIndex : currentIndex + 1;
    onPage(num)
  }


  const styleBtnPage = {borderRadius: 0};

  return <nav aria-label="Page navigation example">
    <ul className="pagination pagination-lg justify-content-center">
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous" style={{...styleBtnPage}} onClick={onPrev}>
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {getPages()
        .filter(v => v === 1 || v === getCountPage() || (currentIndex - difference <= v && v <= currentIndex + difference))
        .map((v, i, arr) => {
            return <>
              {arr[i - 1] + 1 !== v && i - 1 >= 0 && <li className="page-item" key={`dot${i}`} style={{width: 70}}>
                <span className="page-link d-flex justify-content-center">...</span>
              </li>}
              <li className={`page-item ${currentIndex == v && 'active'}`} key={i} style={{width: 70}}>
                <a className="page-link d-flex justify-content-center" href="#"
                   key={`a${i}`}
                   onClick={() => onChangePage(v)}
                >{v}</a>
              </li>
            </>
          }
        )}
      <li className="page-item">
        <a className="page-link" href="#" aria-label="Next" style={{...styleBtnPage}} onClick={onNext}>
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
}

export default Pagination;
